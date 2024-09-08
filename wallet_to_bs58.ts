import bs58 from "bs58";

(async () => {
  // my own private key
  const PRIVATE_KEY = "5C6qtgp6QEXRh5MFWHL8jb8aUZ7x38hrzzp68xgEi9vRtzVQxGwoAEE2JfjtYjJAPTvKTKeUttg9HP4wdqUEh4Qb";
  
  const decoded = bs58.decode(PRIVATE_KEY);
  console.log(decoded);

  const encoded = bs58.encode(decoded);
  console.log(encoded);
})();