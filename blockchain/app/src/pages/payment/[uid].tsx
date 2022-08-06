import type { NextPage } from "next";
import {useState} from 'react';
import {useRouter} from 'next/router';
import {URL} from '../../utils/const';
import useSWR from 'swr';
import axios from 'axios';
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";


const fetcher = url => axios.get(url).then(res => res.data);
const Payment: NextPage = (props) => {
  const {publicKey, sendTransaction} = useWallet();
  let [didSend, setSend] = useState(false);
  const router = useRouter();

  let {data, error} = useSWR(`${URL}/listen_for_changes/${useRouter().query.uid}/`,fetcher);

  let pay = async () => {
   //axios POST 
   let options =  {
    url : `${URL}/send_money/`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      "recipient_address": publicKey.toString(),
      "dustbin_uid": router.query.uid,
    }
  }

  try{
    let d = await axios(options);
    setSend(true);
    console.log(d);
  }catch(e) {
    console.log(e);
  }
}
  return (
    <div>
      <Head>
        <title>Sol-Bin Marketplace</title>
        <meta
          name="description"
          content="Sol bin marketplace"
        />
      </Head>
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        {data &&
        <>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#2d2d30] to-[#14F195]">
          You are about to be paid {Math.floor(data.data.amount_to_pay_in_sol * 100000)/100000 } SOL for 
        </h1>
        <h2 className="text-center text-3xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#440202] to-[#d13c3c]">{router.query.uid}</h2>
        <div className="mb-4"></div>
        <div className="bg-[#2d2d30] text-white p-1 rounded-sm">{publicKey && <div>{publicKey.toString()}</div>}</div>
        <div className="mb-4"></div>
        {<div className="mx-auto">
          {!publicKey ? <WalletMultiButton className="btn btn-ghost bg-primary col text-white" /> : 
          (!didSend && <div className="btn btn-ghost bg-primary text-white" onClick={() => {pay()}}>Get paid</div>)}
        </div>}
        </>
        }
        {didSend && <div className="text-center btn cursor-default mt-4">Sent successfully</div>}
      </div>
    </div>
    </div>
  );
};

export default Payment;
