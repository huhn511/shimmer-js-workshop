// Libraries
const bip39 = require('bip39')
 
// For better readability, some console output will be printed in a different color
const consoleColor = '\x1b[36m%s\x1b[0m';
async function run() {
    // A 256-bits entropy leads to a 24 word mnemonic seed phrase
    const mnemonic = bip39.generateMnemonic(256);
    console.log(consoleColor, 'Copy your mnemonic seed phrase and paste it into the .env file:');
    console.log(mnemonic, '\n');
}
run();