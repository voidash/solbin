import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import {SolbinProfile, BidObject} from '../models/types';
import * as constants from './const';
import { profile } from "console";
function getAnchorConfigs(wallet: AnchorWallet): [anchor.AnchorProvider, anchor.Program] | [null, null] {
    if (!wallet) {
        return [null, null];
    }
    const provider = new anchor.AnchorProvider(
        new anchor.web3.Connection(constants.NETWORK, constants.PREFLIGHT_COMMITMENT), 
        wallet, 
        { "preflightCommitment": constants.PREFLIGHT_COMMITMENT }
    );
    const idl = require("../utils/idl.json");
    const program = new anchor.Program(idl, idl.metadata.address, provider);
    return [provider, program];
}

    /// this function getPda is trying to get program derived address
    /// Since program Derived Address don't have any kind of private key they use something called Seed to generate it
    /// Seed can be anything that can be represented in bytes. For example : your_name.to_be_bytes()
    ///
    /// ```
    /// seeds = [
    ///     authority.key().as_ref(),
    ///     b"_solbin_"
    /// ],
    /// ```
    /// has beed defined on smart contracts  so we need publicKey + our seed in this case _solbin_
async function getPda(provider: anchor.AnchorProvider, program: anchor.Program, seeds: string[]) {
    let pdaSeeds = [provider.wallet.publicKey.toBuffer()];
    for (var s of seeds) pdaSeeds.push(Buffer.from(s));
    return await anchor.web3.PublicKey.findProgramAddress(
        pdaSeeds,
        program.programId,
    );
}


export async function createProfileTransaction(
    wallet: AnchorWallet,
    handle: string,
): Promise<[anchor.web3.Transaction, anchor.AnchorProvider]> {
   const [provider, program]  = getAnchorConfigs(wallet);

   if (!provider) throw("provider is null");
   const profilePda = (await getPda(provider, program, [constants.SOLBIN_PROFILE_SEED]))[0];
   console.log(`Address: ${profilePda}`);
   console.log(`Handle: ${handle}`);
   const ix = await program.methods.createUserAccount(
    handle 
   ).accounts({
    solbinAccount: profilePda,
    authority: provider.wallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
   }).instruction();

   let tx = new anchor.web3.Transaction().add(ix);
   return[tx,provider];

};

export async function getProfile(wallet: AnchorWallet): Promise<SolbinProfile> {
    const [provider, program ]  = getAnchorConfigs(wallet);
    if(!provider) throw("provider is needed");

    const [profilePda , _] = await getPda(provider, program, [constants.SOLBIN_PROFILE_SEED]);
    try{
        const returnedAccount = await program.account.solbinAccountInfo.fetch(profilePda);
        console.log(`Address: ${profilePda}`);
        console.log(`Address: ${returnedAccount.handle}`);

        return {
            publicKey: provider.wallet.publicKey as anchor.web3.PublicKey,
            handle: returnedAccount.handle as string,
            bid_count: returnedAccount.tweetCount as number
        };

    }catch(e) {
        console.log(e);
        throw("profile not found");
    }
};

/// Our return type is set like this because we can chain multiple functions 
export async function createBid(wallet: AnchorWallet, bidAmount: number, itemToBid: String) : 
Promise<[anchor.web3.Transaction, anchor.AnchorProvider]> {
    const [provider, program] = getAnchorConfigs(wallet);
    if (!provider) throw("Provider is null");
    const [profilePda, profilePdaBump] = await getPda(provider, program, [constants.SOLBIN_PROFILE_SEED]);
    const bidCount = (await program.account.solbinAccountInfo.fetch(profilePda)).bidCount as number;
    const bidPda = (await getPda(provider, program, [constants.BID_SEED, (bidCount + 1).toString()]))[0];
    const ix = await program.methods.makeBid(
            new anchor.BN(bidAmount), itemToBid, profilePdaBump 
        )
        .accounts({
            bid: bidPda,
            solbinAccount: profilePda,
            authority: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .instruction();
    let tx = new anchor.web3.Transaction().add(ix);
    return [tx, provider];

}

export async function getAllBids(wallet: AnchorWallet): Promise<BidObject[]> {
    const [provider, program] = getAnchorConfigs(wallet);
    if (!provider) throw("provider is null");
    if (!program) throw("Program is null");
    let allBids: BidObject[] = [];
    const bids = await program.account.bid.all();
    for (var bd of bids) {
        const bidAccount = await program.account.solbinAccountInfo.fetch(bd.account.solbinAccountPubkey as anchor.web3.PublicKey);
        allBids.push({
            walletPubkey: provider.wallet.publicKey as anchor.web3.PublicKey,
            handle: bidAccount.handle as string,
            bidNumber: bd.account.bidNumber as number,
            bidAmount: bd.account.bidAmount as number,
            item_to_bid: bd.account.itemToBid as string,
        });
    };
    return allBids;
};




