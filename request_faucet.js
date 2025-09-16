
// request_faucet.js
import dotenv from "dotenv";
import { CdpClient } from "@coinbase/cdp-sdk";
import { ethers } from "ethers";

dotenv.config();

async function main() {
  const cdp = new CdpClient();
  const privateKey = process.env.BASE_SEPOLIA_PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey);
  const account = { address: wallet.address };
  console.log("Created account:", account.address);

  // Request ETH (native) from the Base Sepolia faucet
  const ethResp = await cdp.evm.requestFaucet({
    address: account.address,
    network: "base-sepolia",
    token: "eth"
  });
  console.log("ETH tx:", `https://sepolia.basescan.org/tx/${ethResp.transactionHash}`);

//   // Request USDC (ERC-20) from the faucet
//   const usdcResp = await cdp.evm.requestFaucet({
//     address: account.address,
//     network: "base-sepolia",
//     token: "usdc"
//   });
//   console.log("USDC tx:", `https://sepolia.basescan.org/tx/${usdcResp.transactionHash}`);
}

main().catch(e => { console.error(e); process.exit(1); });
