// test
import { clusterApiUrl, Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import bs58 from "bs58";

(async () => {
  const CONNECTION = new Connection(clusterApiUrl("devnet"));
  // my own private key
  const PRIVATE_KEY = "5C6qtgp6QEXRh5MFWHL8jb8aUZ7x38hrzzp68xgEi9vRtzVQxGwoAEE2JfjtYjJAPTvKTKeUttg9HP4wdqUEh4Qb";
  const decoded = bs58.decode(PRIVATE_KEY);

  const MY_KEYPAIR = Keypair.fromSecretKey(decoded);
  
  console.log(MY_KEYPAIR.publicKey);
  console.log(MY_KEYPAIR.secretKey);

  const minimumRent = await CONNECTION.getMinimumBalanceForRentExemption(0);
  const tx = new Transaction();
  const NEW_ACCOUNT_KEYPAIR = Keypair.generate();

  
  tx.instructions = [
    SystemProgram.createAccount({      // creates new account
      fromPubkey: MY_KEYPAIR.publicKey,
      newAccountPubkey: NEW_ACCOUNT_KEYPAIR.publicKey,
      lamports: minimumRent,
      space: 0,
      programId: SystemProgram.programId,
    })]
    
  const txHash = await CONNECTION.sendTransaction(tx, [MY_KEYPAIR, NEW_ACCOUNT_KEYPAIR]);
  console.log(txHash);
})();