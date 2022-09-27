const {
    logInfo,
    logTips,
    SingleNodeClient
} = require("@iota/iota.js");
const { NeonPowProvider } = require("@iota/pow-neon.js");

const API_ENDPOINT = "https://api.testnet.shimmer.network/";

// If running the node locally
// const API_ENDPOINT = "http://localhost:14265/";


async function run() {
    // Neon localPoW is blazingly fast, but you need rust toolchain to build
    const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});

    const health = await client.health();
    console.log("Is the node healthy", health ? "Yes" : "No");
    console.log();

    const info = await client.info();
    console.log("Node Info");
    logInfo("", info);
    console.log();

    // const tipsResponse = await client.tips();
    // console.log("Tips");
    // logTips("", tipsResponse);
    // console.log();
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));