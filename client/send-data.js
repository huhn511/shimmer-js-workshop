// https://wiki.iota.org/iotajs/how_tos/data

const { retrieveData, sendData, SingleNodeClient } = require("@iota/iota.js")

const  {Converter} = require("@iota/util.js")
const  {NeonPowProvider} = require("@iota/pow-neon.js")

const API_ENDPOINT = "https://api.testnet.shimmer.network";
// If running the node locally
// const API_ENDPOINT = "http://localhost:14265/";

async function run() {
    // Neon localPoW is blazingly fast, but you need rust toolchain to build
    const client = new SingleNodeClient(API_ENDPOINT, {powProvider: new NeonPowProvider()});

    const myTag = Converter.utf8ToBytes("MY-DATA-TAG");

    const blockIds = [];

    for (let i = 0; i < 10; i++) {
        console.log("Sending Data");
        const sendResult = await sendData(client, myTag, Converter.utf8ToBytes(`This is data ${i} 🚀`));
        console.log("Received Block Id", sendResult.blockId);
        blockIds.push(sendResult.blockId);
    }

    console.log();

    for (let i = 0; i < blockIds.length; i++) {
        console.log("Retrieving Data");

        const firstResult = await retrieveData(client, blockIds[i]);
        if (firstResult) {
            console.log("Block");
            console.log("\tTag: ", firstResult.tag ? Converter.bytesToUtf8(firstResult.tag) : "None");
            console.log("\tData: ", firstResult.data ? Converter.bytesToUtf8(firstResult.data) : "None");
        }
    }
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));