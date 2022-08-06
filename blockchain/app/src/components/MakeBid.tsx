import * as anchor from "@project-serum/anchor";
import * as util from '../utils/util';
import {BidObject} from '../models/types';
import {AnchorWallet, useAnchorWallet, useWallet} from '@solana/wallet-adapter-react';
import {useState} from 'react';
import { useCallback } from "react";



export interface MakeBidProps  {
    publicKey: anchor.web3.PublicKey,
    handle: string,
    bidCount: number,
    bidAmount: number,
    itemToBidTo: string,
    getAllBids: (wallet: AnchorWallet | undefined) => void
}

export const MakeBid = (props: MakeBidProps) => {
    const {publicKey, sendTransaction} = useWallet();
    const wallet = useAnchorWallet();
    const [bidValue, setBidValue] = useState<number>(0);

    async function makeBidNow(bidAmount:number, itemToBidTo: String) {
        if (!wallet) throw("wallet not found");
        const [tx, provider] = await util.createBid(wallet,bidValue,itemToBidTo);
        const sx =  await sendTransaction(tx, provider.connection);
        await provider.connection.confirmTransaction(sx);
    }

    const onClickMakeBid = useCallback(async (form: BidObject) => {
        console.log('test');
            await makeBidNow(form.bidAmount, form.item_to_bid);
            props.getAllBids(wallet);
    },[wallet,props]);

    return(
          <div className="text-lg border-2 rounded-lg px-6 py-2 my-2 bg-[#045256] w-full">
            <p className="text-[#a3a3a3]">
                You are going to bid as
            </p>
            <p className="text-2xl my-2">
                <span className="text-[#29d688]">
                    {props.handle.substring(1,props.handle.length)}
                </span>
            </p>
            <div className="grid grid-cols-3 place-items-center my-5 "> 
            <input 
                className="w-full h-12 text-black px-4 rounded-md col-span-2" 
                type="number"
                placeholder="Enter Bid Amount" onChange={(e) => setBidValue(parseInt(e.target.value))}/>
            <button 
                className="text-lg text-black  rounded-lg px-6 py-2 mt- ml-4 h-12 bg-[#74a8fc]"
                onClick={() => onClickMakeBid({
                    bidAmount: bidValue,
                    item_to_bid: props.itemToBidTo,
                    bidNumber: 0,
                    handle: props.handle,
                    walletPubkey: props.publicKey
                })}><span className="text-white font-bold">Bid</span>
            </button>
            </div>
            
                {/* {bidValue} */}
        </div>
    );
}