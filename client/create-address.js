const { Converter } = require("@iota/util.js");
const { Bip32Path, Bip39 } = require("@iota/crypto.js");
const {
  Bech32Helper,
  Ed25519Address,
  Ed25519Seed,
  ED25519_ADDRESS_TYPE,
  generateBip44Address,
  IOTA_BIP44_BASE_PATH,
  SingleNodeClient,
} = require("@iota/iota.js");

require("dotenv").config({ path: "./.env" });

const API_ENDPOINT = "https://api.testnet.shimmer.network";

async function run() {
  const client = new SingleNodeClient(API_ENDPOINT);

  const info = await client.info();

  console.log("Base");

  // Generate the seed from the Mnemonic
  const baseSeed = Ed25519Seed.fromMnemonic(process.env.MNEMONIC);
  console.log("\tSeed", Converter.bytesToHex(baseSeed.toBytes()));

  // Generate the next addresses for your account.
  console.log();
  console.log("Generated Addresses...");
  const addressGeneratorAccountState = {
    accountIndex: 0,
    addressIndex: 0,
    isInternal: false,
  };
  const path = generateBip44Address(addressGeneratorAccountState);
  const addressSeed = baseSeed.generateSeedFromPath(new Bip32Path(path));
  const addressKeyPair = addressSeed.keyPair();
  const indexEd25519Address = new Ed25519Address(addressKeyPair.publicKey);
  const indexPublicKeyAddress = indexEd25519Address.toAddress();

  console.log(
    "\tAddress (Bech32)",
    Bech32Helper.toBech32(
      ED25519_ADDRESS_TYPE,
      indexPublicKeyAddress,
      info.protocol.bech32Hrp
    )
  );
}

run()
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));