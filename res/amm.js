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

program.parse(process.argv);const { Command } = require('commander');
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

program.parse(process.argv);const { Command } = require('commander');
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

program.parse(process.argv);"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AMM = void 0;

class AMM {
    constructor(virtualSolReserves, virtualTokenReserves, realSolReserves, realTokenReserves, initialVirtualTokenReserves) {
        this.virtualSolReserves = BigInt(virtualSolReserves);
        this.virtualTokenReserves = BigInt(virtualTokenReserves);
        this.realSolReserves = BigInt(realSolReserves);
        this.realTokenReserves = BigInt(realTokenReserves);
        this.initialVirtualTokenReserves = BigInt(initialVirtualTokenReserves);
    }

    static fromGlobalAccount(global) {
        return new AMM(
            global.initialVirtualSolReserves,
            global.initialVirtualTokenReserves,
            0n,
            global.initialRealTokenReserves,
            global.initialVirtualTokenReserves
        );
    }

    static fromBondingCurveAccount(bonding_curve, initialVirtualTokenReserves) {
        return new AMM(
            bonding_curve.virtualSolReserves,
            bonding_curve.virtualTokenReserves,
            bonding_curve.realSolReserves,
            bonding_curve.realTokenReserves,
            initialVirtualTokenReserves
        );
    }

    getBuyPrice(tokens) {
        tokens = BigInt(tokens);
        const productOfReserves = this.virtualSolReserves * this.virtualTokenReserves;
        const newVirtualTokenReserves = this.virtualTokenReserves - tokens;
        const newVirtualSolReserves = productOfReserves / newVirtualTokenReserves + 1n;
        const amountNeeded = newVirtualSolReserves > this.virtualSolReserves ? newVirtualSolReserves - this.virtualSolReserves : 0n;
        return amountNeeded > 0n ? amountNeeded : 0n;
    }

    applyBuy(tokenAmount) {
        tokenAmount = BigInt(tokenAmount);
        const finalTokenAmount = tokenAmount > this.realTokenReserves ? this.realTokenReserves : tokenAmount;
        const solAmount = this.getBuyPrice(finalTokenAmount);
        this.virtualTokenReserves -= finalTokenAmount;
        this.realTokenReserves -= finalTokenAmount;
        this.virtualSolReserves += solAmount;
        this.realSolReserves += solAmount;
        return {
            tokenAmount: finalTokenAmount,
            solAmount: solAmount
        };
    }

    applySell(tokenAmount) {
        tokenAmount = BigInt(tokenAmount);
        this.virtualTokenReserves += tokenAmount;
        this.realTokenReserves += tokenAmount;
        const sellPrice = this.getSellPrice(tokenAmount);
        this.virtualSolReserves -= sellPrice;
        this.realSolReserves -= sellPrice;
        return {
            tokenAmount: tokenAmount,
            solAmount: sellPrice
        };
    }

    getSellPrice(tokens) {
        tokens = BigInt(tokens);
        const scalingFactor = this.initialVirtualTokenReserves;
        const tokenSellProportion = (tokens * scalingFactor) / this.virtualTokenReserves;
        const solReceived = (this.virtualSolReserves * tokenSellProportion) / scalingFactor;
        return solReceived < this.realSolReserves ? solReceived : this.realSolReserves;
    }
}

exports.AMM = AMM;
