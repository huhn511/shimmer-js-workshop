/**
 * This example generates a new address.  
 */
 const getUnlockedManager = require('./account-manager');
 
 async function run() {
     try {
         const manager = await getUnlockedManager();
 
         const account = await manager.getAccount('Alice');
         console.log('Address:', account?.meta?.publicAddresses);
 
 
         // Use the Faucet to send testnet tokens to your address:
         console.log("Fill your address with the Faucet:  https://faucet.testnet.shimmer.network")
     } catch (error) {
         console.log('Error: ', error);
     }
     process.exit(0);
 }
 
 run();