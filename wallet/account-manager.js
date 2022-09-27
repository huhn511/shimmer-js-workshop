require("dotenv").config();
const { AccountManager, CoinType } = require("@iota/wallet");

async function getUnlockedManager() {
  const manager = new AccountManager({
    storagePath: "./alice-database"
  });
  await manager.setStrongholdPassword(process.env.SH_PASSWORD);
  return manager;
}

module.exports = getUnlockedManager;
