import { Network } from "./types";

export const KEYS_FILENAME = "keys.txt";

export const MIN_TOKENS_MINT = 6; // нужно настроить
export const MAX_TOKENS_MINT = 90; // нужно настроить

export const DELAY_FROM_SEC = 100; // нужно настроить
export const DELAY_TO_SEC = 200; // нужно настроить

export const TOKEN_CONTRACT = "0x61f1F74D9902a96429ed3fAF31B5D8140d025B7F";
export const TOKEN_ABI = [
  "function claim(address, uint256, address, uint256, (bytes32[], uint256, uint256, address), bytes)",
];

export const RPC_URL = {
  [Network.XAI]: "https://testnet.xai-chain.net/rpc",
};

export const TX_SCAN = {
  [Network.XAI]: "https://testnet-explorer.xai-chain.net/tx/",
};
