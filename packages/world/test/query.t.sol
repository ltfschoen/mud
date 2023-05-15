// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";

import { Schema, SchemaLib } from "@latticexyz/store/src/Schema.sol";
import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

import { World } from "../src/World.sol";
import { IBaseWorld } from "../src/interfaces/IBaseWorld.sol";
import { ResourceSelector } from "../src/ResourceSelector.sol";
import { ROOT_NAMESPACE } from "../src/constants.sol";

import { CoreModule } from "../src/modules/core/CoreModule.sol";
import { KeysInTableModule } from "../src/modules/keysintable/KeysInTableModule.sol";
import { union, intersection, Fragment } from "../src/modules/keysintable/query.sol";

contract queryTest is Test {
  using ResourceSelector for bytes32;
  IBaseWorld world;
  KeysInTableModule keysInTableModule = new KeysInTableModule(); // Modules can be deployed once and installed multiple times

  bytes16 namespace = ROOT_NAMESPACE;
  bytes16 nameA = bytes16("sourceA");
  bytes16 nameB = bytes16("sourceB");

  Schema tableSchema;
  Schema tableKeySchema;
  bytes32 tableA = ResourceSelector.from(namespace, nameA);
  bytes32 tableB = ResourceSelector.from(namespace, nameB);

  bytes32[][] keys = new bytes32[][](2);

  Fragment[] fragmentsTrueFalse;
  Fragment[] fragmentsTrueTrue;

  function setUp() public {
    tableSchema = SchemaLib.encode(SchemaType.UINT256);
    tableKeySchema = SchemaLib.encode(SchemaType.BYTES32);
    world = IBaseWorld(address(new World()));
    world.installRootModule(new CoreModule(), new bytes(0));

    keys[0] = new bytes32[](1);
    keys[1] = new bytes32[](1);
    keys[0][0] = "test1";
    keys[1][0] = "test2";

    fragmentsTrueFalse.push(Fragment(true, tableA));
    fragmentsTrueFalse.push(Fragment(false, tableB));
    fragmentsTrueTrue.push(Fragment(true, tableA));
    fragmentsTrueTrue.push(Fragment(true, tableB));
  }

  function _installKeysInTableModule() internal {
    // Register source table
    tableA = world.registerTable(namespace, nameA, tableSchema, tableKeySchema);
    tableB = world.registerTable(namespace, nameB, tableSchema, tableKeySchema);

    // Install the index module
    // TODO: add support for installing this via installModule
    // -> requires `callFrom` for the module to be able to register a hook in the name of the original caller
    // !gasreport install keys in table module
    world.installRootModule(keysInTableModule, abi.encode(tableA));
    world.installRootModule(keysInTableModule, abi.encode(tableB));
  }

  function testUnionOneTable(uint256 value) public {
    _installKeysInTableModule();

    // Set a value in the source table
    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));

    bytes32[] memory tableIds = new bytes32[](1);
    tableIds[0] = tableA;

    bytes32[][] memory keyTuples = union(world, tableIds);

    // Assert that the list includes all the keys in the table
    assertEq(keyTuples.length, 1);
    for (uint256 i; i < 1; i++) {
      assertEq(keyTuples[i][0], keys[i][0]);
    }

    // Set another key with a different value
    world.setRecord(namespace, nameA, keys[1], abi.encodePacked(value));

    // Get the list of keys in the target table
    keyTuples = union(world, tableIds);

    // Assert that the list includes all the keys in the table
    assertEq(keyTuples.length, 2);
    for (uint256 i; i < 2; i++) {
      assertEq(keyTuples[i][0], keys[i][0]);
    }
  }

  function testUnionTwoTables21(uint256 value) public {
    _installKeysInTableModule();

    bytes32[] memory tableIds = new bytes32[](2);
    tableIds[0] = tableA;
    tableIds[1] = tableB;

    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameA, keys[1], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[0], abi.encodePacked(value));

    bytes32[][] memory keyTuples = union(world, tableIds);

    // Assert that the list is the union of both tables keys
    assertEq(keyTuples.length, 2);
    assertEq(keyTuples[0][0], keys[1][0]);
    assertEq(keyTuples[1][0], keys[0][0]);
  }

  function testUnionTwoTables12(uint256 value) public {
    _installKeysInTableModule();

    bytes32[] memory tableIds = new bytes32[](2);
    tableIds[0] = tableA;
    tableIds[1] = tableB;

    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[1], abi.encodePacked(value));

    bytes32[][] memory keyTuples = union(world, tableIds);

    // Assert that the list is the union of both tables keys
    assertEq(keyTuples.length, 2);
    assertEq(keyTuples[0][0], keys[0][0]);
    assertEq(keyTuples[1][0], keys[1][0]);
  }

  function testUnionTwoTables22(uint256 value) public {
    _installKeysInTableModule();

    bytes32[] memory tableIds = new bytes32[](2);
    tableIds[0] = tableA;
    tableIds[1] = tableB;

    // Set both keys in both tables
    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameA, keys[1], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[1], abi.encodePacked(value));

    bytes32[][] memory keyTuples = union(world, tableIds);

    // Assert that the list is the union of both tables keys
    assertEq(keyTuples.length, 2);
    assertEq(keyTuples[0][0], keys[0][0]);
    assertEq(keyTuples[1][0], keys[1][0]);
  }

  function testIntersectionOneTable(uint256 value) public {
    _installKeysInTableModule();

    // Set a value in the source table
    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));

    Fragment[] memory fragments = new Fragment[](1);
    fragments[0] = Fragment(true, tableA);

    bytes32[][] memory keyTuples = intersection(world, fragments);

    // Assert that the list includes all the keys in the table
    assertEq(keyTuples.length, 1);
    for (uint256 i; i < 1; i++) {
      assertEq(keyTuples[i][0], keys[i][0]);
    }

    // Set another key with a different value
    world.setRecord(namespace, nameA, keys[1], abi.encodePacked(value));

    // Get the list of keys in the target table
    keyTuples = intersection(world, fragments);

    // Assert that the list includes all the keys in the table
    assertEq(keyTuples.length, 2);
    for (uint256 i; i < 2; i++) {
      assertEq(keyTuples[i][0], keys[i][0]);
    }
  }

  function testIntersectionTwoTables21(uint256 value) public {
    _installKeysInTableModule();

    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameA, keys[1], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[0], abi.encodePacked(value));

    bytes32[][] memory keyTuples1 = intersection(world, fragmentsTrueFalse);
    bytes32[][] memory keyTuples2 = intersection(world, fragmentsTrueTrue);

    // Assert that the list is the intersection of both tables keys
    assertEq(keyTuples1.length, 1);
    assertEq(keyTuples1[0][0], keys[1][0]);
    assertEq(keyTuples2.length, 1);
    assertEq(keyTuples2[0][0], keys[0][0]);
  }

  function testIntersectionTwoTables12(uint256 value) public {
    _installKeysInTableModule();

    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[1], abi.encodePacked(value));

    bytes32[][] memory keyTuples1 = intersection(world, fragmentsTrueFalse);
    bytes32[][] memory keyTuples2 = intersection(world, fragmentsTrueTrue);

    // Assert that the list is the intersection of both tables keys
    assertEq(keyTuples1.length, 0);
    assertEq(keyTuples2.length, 1);
    assertEq(keyTuples2[0][0], keys[0][0]);
  }

  function testIntersectionTwoTables22(uint256 value) public {
    _installKeysInTableModule();

    // Set both keys in both tables
    world.setRecord(namespace, nameA, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameA, keys[1], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[0], abi.encodePacked(value));
    world.setRecord(namespace, nameB, keys[1], abi.encodePacked(value));

    bytes32[][] memory keyTuples1 = intersection(world, fragmentsTrueFalse);
    bytes32[][] memory keyTuples2 = intersection(world, fragmentsTrueTrue);

    // Assert that the list is the intersection of both tables keys
    assertEq(keyTuples1.length, 0);
    assertEq(keyTuples2.length, 2);
    assertEq(keyTuples2[0][0], keys[0][0]);
    assertEq(keyTuples2[1][0], keys[1][0]);
  }
}
