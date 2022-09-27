/**
 * This example will send native tokens
 */
 const getUnlockedManager = require('./account-manager');

 async function run() {
     try {
         const manager = await getUnlockedManager();
 
         const account = await manager.getAccount('Alice');
 
         await account.sync();
 
         // Get a tokenId from your account balance after running example
         // 22-mint-native-tokens.js
         let tokenId =
             '0x08a39354f7005bd7cf57307aa873acbd83ad653952bc54fa2aeac98c167856daab0100000000';
         // `100` hex encoded
         let tokenAmount = "0x64"
 
         // Send native tokens with a storage deposit return and an expiraiton of one day
         // This means that the receiver has to claim the output in time (can be done with 21-claim-outputs.js),
         // where the storage deposit of the output is returned, or if not, the sender gets full control back after one day passed.
         const response = await account.sendNativeTokens([
             {
                 //TODO: Replace with the address of your choice!
                 address: 'rms1qz5rxgrtu7a4f973uu3kv3qt2zage2waehgkc80z9ksp44lk0yckk7yfjd2',
                 nativeTokens: [[tokenId, tokenAmount]],
             }
         ]);
 
         console.log(response);
 
         console.log(
             `Check your block on https://explorer.shimmer.network/testnet/block/${response.blockId}`,
         );
     } catch (error) {
         console.log('Error: ', error);
     }
     process.exit(0);
 }
 
 run();