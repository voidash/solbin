import type { NextPage } from "next";
import Head from "next/head";
import {useRouter} from 'next/router';
import {useState} from 'react';

import {URL} from '../../utils/const';
import axios from 'axios';
import useSWR from 'swr';
import { MarketPlaceCardProps } from "components/MarketPlaceCard";
import { imageBasedOnType } from "utils/misc";

// wallet realted stuff
import { useAnchorWallet, useWallet, useConnection } from "@solana/wallet-adapter-react";

// from the store
import useBidStore from "stores/BidStore";
import useSolbinAccountStore from "stores/SolbinAccountStore";
import { BidObject } from "models/types";
import { useEffect } from "react";
import Link from "next/link";
import { MakeBid,MakeBidProps } from "components/MakeBid";

const fetcher = url => axios.get(url).then(res => res.data);

const MarketPlace: NextPage = (props) => {

    const {publicKey, sendTransaction} = useWallet();
    const {connection} = useConnection();
    const wallet = useAnchorWallet();
    const {solbinAccount,getSolbinAccount} = useSolbinAccountStore();
    const {bids, getAllBids}  = useBidStore();
    const router = useRouter();
    const {uid} = router.query;
    let [detailFetched, setDetailFetched] = useState<Boolean>(false);

    let [bidProps,setBuildProps] = useState<MakeBidProps | undefined>(null);
    const {data, error} = useSWR(`${URL}/marketplace_item/${useRouter().query.uid}`, fetcher);
    console.log(`${URL}/marketplace_item/${useRouter().query.uid}`);
    let auctionData: MarketPlaceCardProps | undefined = null;

    if (data) {
       auctionData = {id: data.id, unit: data.unit, startDate: data.start_date, endDate: data.end_date, totalUnits: data.total_no_of_units} as MarketPlaceCardProps
    }


    useEffect (() => {
        getAllBids(wallet);
        getSolbinAccount(wallet);
    },[wallet]);

  const fetchSolbinDetails = () => {
   if(solbinAccount != null) {
    console.log(solbinAccount.handle);
    setDetailFetched(true);
     setBuildProps({
      bidAmount: 12,
      bidCount: 23,
      handle: solbinAccount.handle,
      itemToBidTo: uid as string,
      publicKey: solbinAccount.publicKey, 
      getAllBids: getAllBids
    });
    }
   };
   console.log(bids);

  return (
    <div>
      <Head>
        <title>Marketplace</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>

      {error && <h1>Invalid UID</h1>}
      {data && solbinAccount && bids &&
      <div className="container bg-secondary rounded-md mt-8 w-80 m-auto ">
        
        <div className="w-3/4  mx-auto mt-5">
          <div className="py-5">
           <img src={imageBasedOnType(auctionData.type)} className="w-22 rounded-lg "/>
          </div>
          <div className="flex flex-row">
            <h1 className=" text-base font-semibold">Auction_UID :  </h1>
            <h3 className=" text-base font-medium ml-3">{auctionData.id.substring(0,5)}</h3>
          </div>
          <div className="flex flex-row">
            <h1 className=" text-base font-semibold">Start Date: </h1>
            <h3 className=" text-base font-medium ml-3">{ new Date(auctionData.startDate).toLocaleDateString('en-US',{month:'long', day:'2-digit',year:'numeric'})}</h3>
          </div>
          <div className="flex flex-row">
            <h1 className=" text-base font-semibold">Start Date: </h1>
            <h3 className=" text-base font-medium ml-3">{new Date(auctionData.endDate).toLocaleDateString('en-US',{month:'long', day:'2-digit',year:'numeric'})}</h3>
          </div>
          <div className="flex flex-row">
            <h1 className=" text-base font-semibold">Weight: </h1>
            <h3 className=" text-base font-medium ml-3">{auctionData.totalUnits} {auctionData.unit}</h3>
          </div>
          <div className="grid place-items-center">
            <button className="bg-primary hover:bg-secondary text-white my-5 font-bold py-2 px-4 rounded-2xl  block" onClick={()=> fetchSolbinDetails()}>Fetch Your details</button> 
          </div>
        </div>
        

        <div className="flex flex-row">
          <div className="productImage"></div>    
        </div>
        {/* <h2>{auctionData.id}</h2> */}
        {detailFetched && <MakeBid {...bidProps} />}
      </div>}

      {!solbinAccount && <a href="/">If not loading Create a account. Head to create account</a>}
      
      <div><h3 className="text-center text-3xl mt-5 mb-4">Bids</h3></div>
      <div className="mx-auto"> 
      {bids && <div className="flex flex-row flex-wrap">{bids.map(
        (bid) => {
          if (bid.item_to_bid == uid) {
          return (
<>
<div className="flex justify-center mb-6 ml-4">
  <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
    <div className="py-3 px-6 border-b border-gray-300">
      <h4 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#2d2d30] to-[#14F195]">
        {'#'+bid.handle.substring(1,bid.handle.length)}
      </h4>
    </div>
    <div className="p-6">

      <h4 className="text-center text-xs font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#25258e] to-[#e40c0c]">
        {`Bid Amount  ${bid.bidNumber} SOL`}
      </h4>
  </div>
  </div>
  </div>
</>
          )
          }
        }
      )}</div>}
      </div>
    </div>
  );
};

export default MarketPlace;
