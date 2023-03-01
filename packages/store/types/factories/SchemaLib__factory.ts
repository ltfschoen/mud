/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SchemaLib, SchemaLibInterface } from "../SchemaLib";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "SchemaLib_InvalidLength",
    type: "error",
  },
  {
    inputs: [],
    name: "SchemaLib_StaticTypeAfterDynamicType",
    type: "error",
  },
];

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220c3696f8149bd23f5d0b1f045f7cdc0f0fc8952c9fe05078ca1fa42b83459a44c64736f6c634300080d0033";

type SchemaLibConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SchemaLibConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SchemaLib__factory extends ContractFactory {
  constructor(...args: SchemaLibConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "SchemaLib";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SchemaLib> {
    return super.deploy(overrides || {}) as Promise<SchemaLib>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SchemaLib {
    return super.attach(address) as SchemaLib;
  }
  connect(signer: Signer): SchemaLib__factory {
    return super.connect(signer) as SchemaLib__factory;
  }
  static readonly contractName: "SchemaLib";
  public readonly contractName: "SchemaLib";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SchemaLibInterface {
    return new utils.Interface(_abi) as SchemaLibInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SchemaLib {
    return new Contract(address, _abi, signerOrProvider) as SchemaLib;
  }
}
