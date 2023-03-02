import { SchemaType, SchemaTypeId } from "@latticexyz/schema-type";
import { hexToArray } from "./utils/hexToArray";
import { TableSchema } from "./constants";

export function decodeSchema(rawSchema: string): TableSchema {
  const schemaBytes = new DataView(hexToArray(rawSchema).buffer);
  const staticDataLength = schemaBytes.getUint16(0);
  const numStaticFields = schemaBytes.getUint8(2);
  const numDynamicFields = schemaBytes.getUint8(3);
  const staticFields: SchemaType[] = [];
  const dynamicFields: SchemaType[] = [];
  for (let i = 4; i < 4 + numStaticFields; i++) {
    staticFields.push(schemaBytes.getUint8(i));
  }
  for (let i = 4 + numStaticFields; i < 4 + numStaticFields + numDynamicFields; i++) {
    dynamicFields.push(schemaBytes.getUint8(i));
  }
  // TODO: validate sum of static field lengths is equal to staticDataLength?
  const fieldTypes = [...staticFields, ...dynamicFields].map((type) => SchemaTypeId[type]);
  const abi = `(${fieldTypes.join(",")})`;

  return { staticDataLength, staticFields, dynamicFields, rawSchema, abi };
}
