// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { console } from "forge-std/console.sol";
import { StoreView } from "store/StoreView.sol";
import { StoreCore } from "store/StoreCore.sol";
import { Schema } from "store/Schema.sol";

import { OwnerTable, tableId as OwnerTableId } from "./tables/OwnerTable.sol";
import { RouteAccessTable } from "./tables/RouteAccessTable.sol";
import { RouteTable } from "./tables/RouteTable.sol";
import { SystemRouteTable } from "./tables/SystemRouteTable.sol";
import { SystemTable } from "./tables/SystemTable.sol";

bytes32 constant ROOT_ROUTE_ID = keccak256(bytes(""));

contract World is StoreView {
  error RouteInvalid(string route);
  error RouteExists(string route);

  constructor() {
    SystemTable.registerSchema();
    RouteTable.registerSchema();
    RouteAccessTable.registerSchema();
    SystemRouteTable.registerSchema();
    OwnerTable.registerSchema();

    // Register root route and give ownership to msg.sender
    RouteTable.set({ routeId: ROOT_ROUTE_ID, route: "" }); // Storing this explicitly to trigger the event for indexers
    OwnerTable.set({ key: ROOT_ROUTE_ID, owner: msg.sender });
    RouteAccessTable.set({ routeId: ROOT_ROUTE_ID, caller: msg.sender, access: true });
  }

  /************************************************************************
   *
   *    REGISTRATION METHODS
   *
   ************************************************************************/

  /**
   * Register a new route by extending an existing route
   */
  function registerRoute(string calldata baseRoute, string calldata subRoute) public returns (bytes32 routeId) {
    // Require subroute to be a valid route fragment (ie don't contain any `/`)
    if (!_isRouteFragment(subRoute)) revert RouteInvalid(subRoute);

    // Require base route to exist (with a special check for the root route because it's empty and fails the `has` check)
    if (!(keccak256(bytes(baseRoute)) == ROOT_ROUTE_ID || RouteTable.has(keccak256(bytes(baseRoute)))))
      revert RouteInvalid(baseRoute);

    // Construct the new route
    string memory route = string(abi.encodePacked(baseRoute, "/", subRoute));
    routeId = keccak256(bytes(route));

    // Require route to not exist yet
    if (RouteTable.has(routeId)) revert RouteExists(route);

    // Store the route
    RouteTable.set({ routeId: routeId, route: route });

    // Add caller as owner of the new route
    OwnerTable.set({ key: routeId, owner: msg.sender });

    // Give caller access to the route
    RouteAccessTable.set({ routeId: routeId, caller: msg.sender, access: true });
  }

  /**
   * Register register a table with given schema at the given route
   */
  function registerTable(
    string calldata baseRoute,
    string calldata tableRoute,
    Schema schema
  ) public returns (bytes32 routeId) {
    // Register table route
    routeId = registerRoute(baseRoute, tableRoute);

    // StoreCore handles checking for existence
    StoreCore.registerSchema(routeId, schema);
  }
}

// Require route fragment to end with `/` and not contain any other `/`
function _isRouteFragment(string calldata) pure returns (bool) {
  // TODO: implement
  return true;
}
