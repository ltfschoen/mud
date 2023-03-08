// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

import { SchemaType } from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

import { IStore } from "../IStore.sol";
import { StoreSwitch } from "../StoreSwitch.sol";
import { StoreCore } from "../StoreCore.sol";
import { Bytes } from "../Bytes.sol";
import { SliceLib } from "../Slice.sol";
import { EncodeArray } from "../tightcoder/EncodeArray.sol";
import { Schema, SchemaLib } from "../Schema.sol";
import { PackedCounter, PackedCounterLib } from "../PackedCounter.sol";

uint256 constant _tableId = uint256(keccak256("/store_internals/tables/StoreMetadata"));
uint256 constant StoreMetadataTableId = _tableId;

struct StoreMetadataData {
  string tableName;
  bytes abiEncodedFieldNames;
}

library StoreMetadata {
  /**
   * Get the table's schema
   */
  function getSchema() internal pure returns (Schema) {
    SchemaType[] memory _schema = new SchemaType[](2);
    _schema[0] = SchemaType.STRING;
    _schema[1] = SchemaType.BYTES;

    return SchemaLib.encode(_schema);
  }

  /**
   * Register the table's schema
   */
  function registerSchema() internal {
    StoreSwitch.registerSchema(_tableId, getSchema());
  }

  /**
   * Register the table's schema for the specified store
   */
  function registerSchema(IStore _store) internal {
    _store.registerSchema(_tableId, getSchema());
  }

  /**
   * Get tableName
   */
  function getTableName(uint256 tableId) internal view returns (string memory tableName) {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = StoreSwitch.getField(_tableId, _primaryKeys, 0);
    return string(_blob);
  }

  /**
   * Get tableName from the specified store
   */
  function getTableName(IStore _store, uint256 tableId) internal view returns (string memory tableName) {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = _store.getField(_tableId, _primaryKeys, 0);
    return string(_blob);
  }

  /**
   * Set tableName
   */
  function setTableName(uint256 tableId, string memory tableName) internal {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    StoreSwitch.setField(_tableId, _primaryKeys, 0, bytes(tableName));
  }

  /**
   * Push a slice to tableName
   */
  function pushTableName(uint256 tableId, string memory _slice) internal {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = StoreSwitch.getField(_tableId, _primaryKeys, 0);
    bytes memory _newBlob = abi.encodePacked(_blob, bytes(_slice));
    StoreSwitch.setField(_tableId, _primaryKeys, 0, _newBlob);
  }

  /**
   * Get abiEncodedFieldNames
   */
  function getAbiEncodedFieldNames(uint256 tableId) internal view returns (bytes memory abiEncodedFieldNames) {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = StoreSwitch.getField(_tableId, _primaryKeys, 1);
    return bytes(_blob);
  }

  /**
   * Get abiEncodedFieldNames from the specified store
   */
  function getAbiEncodedFieldNames(IStore _store, uint256 tableId)
    internal
    view
    returns (bytes memory abiEncodedFieldNames)
  {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = _store.getField(_tableId, _primaryKeys, 1);
    return bytes(_blob);
  }

  /**
   * Set abiEncodedFieldNames
   */
  function setAbiEncodedFieldNames(uint256 tableId, bytes memory abiEncodedFieldNames) internal {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    StoreSwitch.setField(_tableId, _primaryKeys, 1, bytes(abiEncodedFieldNames));
  }

  /**
   * Push a slice to abiEncodedFieldNames
   */
  function pushAbiEncodedFieldNames(uint256 tableId, bytes memory _slice) internal {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = StoreSwitch.getField(_tableId, _primaryKeys, 1);
    bytes memory _newBlob = abi.encodePacked(_blob, bytes(_slice));
    StoreSwitch.setField(_tableId, _primaryKeys, 1, _newBlob);
  }

  /**
   * Get the full data
   */
  function get(uint256 tableId) internal view returns (StoreMetadataData memory _table) {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = StoreSwitch.getRecord(_tableId, _primaryKeys, getSchema());
    return decode(_blob);
  }

  /**
   * Get the full data from the specified store
   */
  function get(IStore _store, uint256 tableId) internal view returns (StoreMetadataData memory _table) {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    bytes memory _blob = _store.getRecord(_tableId, _primaryKeys);
    return decode(_blob);
  }

  /**
   * Set the full data using individual values
   */
  function set(
    uint256 tableId,
    string memory tableName,
    bytes memory abiEncodedFieldNames
  ) internal {
    uint16[] memory _counters = new uint16[](2);
    _counters[0] = uint16(bytes(tableName).length);
    _counters[1] = uint16(bytes(abiEncodedFieldNames).length);
    PackedCounter _encodedLengths = PackedCounterLib.pack(_counters);

    bytes memory _data = abi.encodePacked(_encodedLengths.unwrap(), bytes(tableName), bytes(abiEncodedFieldNames));

    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    StoreSwitch.setRecord(_tableId, _primaryKeys, _data);
  }

  /**
   * Set the full data using the data struct
   */
  function set(uint256 tableId, StoreMetadataData memory _table) internal {
    set(tableId, _table.tableName, _table.abiEncodedFieldNames);
  }

  /**
   * Decode the tightly packed blob using this table's schema
   */
  function decode(bytes memory _blob) internal view returns (StoreMetadataData memory _table) {
    // 0 is the total byte length of static data
    PackedCounter _encodedLengths = PackedCounter.wrap(Bytes.slice32(_blob, 0));

    uint256 _start;
    uint256 _end = 32;

    _start = _end;
    _end += _encodedLengths.atIndex(0);
    _table.tableName = string(SliceLib.getSubslice(_blob, _start, _end).toBytes());

    _start = _end;
    _end += _encodedLengths.atIndex(1);
    _table.abiEncodedFieldNames = bytes(SliceLib.getSubslice(_blob, _start, _end).toBytes());
  }

  /* Delete all data for given keys */
  function deleteRecord(uint256 tableId) internal {
    bytes32[] memory _primaryKeys = new bytes32[](1);

    _primaryKeys[0] = bytes32(uint256(tableId));

    StoreSwitch.deleteRecord(_tableId, _primaryKeys);
  }
}
