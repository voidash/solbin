import create, {State} from "zustand";
import {AnchorWallet} from "@solana/wallet-adapter-react";
import {BidObject} from "../models/types";
import * as util from '../utils/util';

interface BidStore extends State {
    bids: BidObject[];
    getAllBids: (wallet: AnchorWallet | undefined) => void
}

const useBidStore = create<BidStore>((set,_get) => ({
    bids: [],
    getAllBids: async (wallet: AnchorWallet | undefined) => {
        let bids : BidObject[] = [];
        try {
            if (!wallet) throw("Wallet is not connected");
            bids = await util.getAllBids(wallet);
        }catch (e) {
            console.log(e);
        }

        set((s) => ({
            bids: bids
        }));
    },
}));

export default useBidStore;
