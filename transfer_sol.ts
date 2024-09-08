// sends sol from PRIVATE_KEY to toPubKey

import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";
  
(async () => {
  const CONNECTION = new Connection(clusterApiUrl("devnet"));

  const PRIVATE_KEY = "5C6qtgp6QEXRh5MFWHL8jb8aUZ7x38hrzzp68xgEi9vRtzVQxGwoAEE2JfjtYjJAPTvKTKeUttg9HP4wdqUEh4Qb";   // my private key

  const decoded = bs58.decode(PRIVATE_KEY);

  const MY_KEYPAIR = Keypair.fromSecretKey(decoded);

  const tx = new Transaction();
  const lamports = await CONNECTION.getMinimumBalanceForRentExemption(0);

  tx.instructions = [
    SystemProgram.transfer({
      fromPubkey: MY_KEYPAIR.publicKey,
      toPubkey: new PublicKey("BNmMoLvMnCWgZE8vrf9NUTatZv3vZoYcz34oyMSf8vVk"),
      lamports,
      programId: SystemProgram.programId,
    }),
  ];

  const txHash = await CONNECTION.sendTransaction(tx, [MY_KEYPAIR]);

  console.log(txHash);
})();