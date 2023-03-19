import { Contract } from "ethers";
import { NetworkComponentUpdate } from "../types";
import orderBy from "lodash/orderBy";
import { isDefined } from "@latticexyz/utils";
import { storeEvents } from "./common";
import { ecsEventFromLog } from "./ecsEventFromLog";

export async function fetchStoreEvents(
  contract: Contract,
  fromBlock: number,
  toBlock: number
): Promise<NetworkComponentUpdate[]> {
  const topicSets = storeEvents.map((eventName) => contract.filters[eventName]().topics).filter(isDefined);

  const logSets = await Promise.all(
    topicSets.map((topics) => contract.provider.getLogs({ address: contract.address, topics, fromBlock, toBlock }))
  );

  const logs = orderBy(
    logSets.flatMap((logs) => logs.map((log) => ({ log, parsedLog: contract.interface.parseLog(log) }))),
    ["log.blockNumber", "log.logIndex"]
  );

  const lastLogForTx: Record<string, number> = {};
  logs.map(({ log }) => {
    lastLogForTx[log.transactionHash] = log.logIndex;
  });

  const ecsEvents = await Promise.all(
    logs.map(({ log, parsedLog }) => {
      const { transactionHash, logIndex } = log;
      return ecsEventFromLog(contract, log, parsedLog, lastLogForTx[transactionHash] === logIndex);
    })
  );

  return ecsEvents.filter(isDefined);
}
