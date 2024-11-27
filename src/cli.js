const { Command } = require('commander');
const program = new Command();

program
    .name('CLI Tool')
    .description('CLI tool for managing transactions, wallets, tokens, and LUTs')
    .version('1.0.0');

// Main Menu
program
    .command('bundler')
    .description('Bundler menu')
    .action(() => {
        console.log('Bundler menu');
        // Add bundler menu options here
    });

program
    .command('wallet')
    .description('Wallet menu')
    .action(() => {
        console.log('Wallet menu');
        // Add wallet menu options here
    });

program
    .command('token')
    .description('Token management menu')
    .action(() => {
        console.log('Token management menu');
        // Add token management menu options here
    });

program
    .command('lut')
    .description('LUT management menu')
    .action(() => {
        console.log('LUT management menu');
        // Add LUT management menu options here
    });

program.parse(process.argv);