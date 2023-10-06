import cli from "cli";
import random from "lodash/random";
import { Contract, formatEther, parseEther, Wallet } from "ethers";
import {
  delayProgress,
  getBalance,
  getTxLink,
  loadKeys,
  providers,
} from "./utils";
import {
  DELAY_FROM_SEC,
  DELAY_TO_SEC,
  MAX_TOKENS_MINT,
  MIN_TOKENS_MINT,
  TOKEN_ABI,
  TOKEN_CONTRACT,
} from "./constants";
import { Network } from "./types";

const keys = await loadKeys();

async function mint(key: string): Promise<boolean> {
  const provider = providers.get(Network.XAI);
  const wallet = new Wallet(key, provider);
  const contract = new Contract(TOKEN_CONTRACT, TOKEN_ABI, wallet);

  const randomTokensAmount = random(MIN_TOKENS_MINT, MAX_TOKENS_MINT);
  const amount = parseEther(randomTokensAmount.toString());

  try {
    cli.spinner(`Минтим ${formatEther(amount)} токенов`);

    const txArgs = [
      wallet.address,
      amount,
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      0,
      [
        ["0x0000000000000000000000000000000000000000000000000000000000000000"],
        200000000000000000000n,
        0,
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      ],
      "0x",
    ];

    const gasLimit = await contract.claim.estimateGas(...txArgs);

    const { maxFeePerGas, maxPriorityFeePerGas } = await provider
      .getFeeData();

    const tx = await contract.claim(...txArgs, {
      maxFeePerGas,
      maxPriorityFeePerGas,
      gasLimit,
    });

    await provider.waitForTransaction(tx.hash);

    cli.spinner(getTxLink(Network.XAI, tx.hash), true);

    cli.spinner("", true);
    return true;
  } catch (_) {
    console.log(_);
    cli.spinner("", true);
    return false;
  }
}

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const count = i + 1;
  const { length } = keys;
  const last = i === keys.length - 1;
  const { address } = new Wallet(key);

  console.log(`${count}/${length} address: ${address}`);

  try {
    const xaiEthBalance = await getBalance(
      Network.XAI,
      address,
    );

    if (xaiEthBalance === 0n) {
      console.log(`Нет ETH в сети ${Network.XAI}`);
    } else {
      const result = await mint(key);

      if (!result) {
        console.log("Ошибка минта");
        continue;
      }
    }
  } catch (e) {
    cli.spinner("", true);
    console.log("Error", e);
  }

  if (!last) {
    const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
    await delayProgress(delayTimeout);
  }
}
