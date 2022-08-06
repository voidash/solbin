import create, { State } from "zustand";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { SolbinProfile } from "../models/types";
import * as util from '../utils/util';

interface SolbinAccountStore extends State {
    solbinAccount: SolbinProfile,
    getSolbinAccount: (wallet: AnchorWallet | undefined) => void
}

const useSolbinAccountStore = create<SolbinAccountStore>((set) => ({
    solbinAccount: null,
    getSolbinAccount: async (wallet: AnchorWallet | undefined) => {
        let solbinAccount: SolbinProfile = null;
        try {
            if (!wallet) throw("wallet not connected");
            solbinAccount = await util.getProfile(wallet);
        } catch(e) {
            console.log(e);
        };
        console.log(solbinAccount);
        set((s)=> ({
            solbinAccount: solbinAccount
        }));
    },
}));

export default useSolbinAccountStore;
