import { ComponentValue } from "@latticexyz/recs";
import { Contract, ethers } from "ethers";
import { registerSchema } from "./tableSchemas";
import { getMetadata, registerMetadata } from "./tableMetadata";
import { decodeData } from "./decodeData";
import { arrayToHex } from "./utils/arrayToHex";
import { schemaTableId, metadataTableId } from "./constants";

export async function decodeStoreSetRecord(
  contract: Contract,
  table: string,
  keyTuple: string[],
  data: string
): Promise<ComponentValue> {
  // registerSchema event
  if (table === schemaTableId) {
    const [tableForSchema, ...otherKeys] = keyTuple;
    if (otherKeys.length) {
      console.warn("registerSchema event has more than one value in key tuple", table, keyTuple);
    }
    registerSchema(contract, tableForSchema, data);
  }

  const schema = await registerSchema(contract, table);
  const decoded = decodeData(schema, data);

  if (table === metadataTableId) {
    const [tableForMetadata, ...otherKeys] = keyTuple;
    if (otherKeys.length) {
      console.warn("setMetadata event has more than one value in key tuple", table, keyTuple);
    }
    const tableName = decoded[0];
    const [fieldNames] = ethers.utils.defaultAbiCoder.decode(["string[]"], arrayToHex(decoded[1]));
    registerMetadata(contract, tableForMetadata, tableName, fieldNames);
  }

  const metadata = getMetadata(contract, table);
  if (metadata) {
    const { tableName, fieldNames } = metadata;
    const namedValues: Record<string, any> = {};
    for (const [index, fieldName] of fieldNames.entries()) {
      namedValues[fieldName] = decoded[index];
    }
    return {
      ...decoded,
      ...namedValues,
    };
  }

  return decoded;
}
