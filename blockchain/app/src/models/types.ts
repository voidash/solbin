import * as anchor from "@project-serum/anchor";
export type EndpointTypes = 'mainnet' | 'devnet' | 'localnet'

export interface SolbinProfile {
    publicKey: anchor.web3.PublicKey,
    handle: string,
    bid_count: number
}

export interface BidObject {
    walletPubkey: anchor.web3.PublicKey,
    handle: string,
    bidNumber: number,
    bidAmount: number,
    item_to_bid: string
}

export interface MakeBidObject {
    wallet_pubkey: anchor.web3.PublicKey,
    bid_number: number,
    item_to_bid: string
}
