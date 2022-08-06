// Next, React
import { FC, useEffect, useState , useCallback} from 'react';
import Link from 'next/link';
// Wallet
import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

// Components
import pkg from '../../../package.json';
import { MarketplaceCard } from 'components/MarketPlaceCard';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import useSolbinAccountStore from '../../stores/SolbinAccountStore';
import { utils } from '@project-serum/anchor';
import * as util from '../../utils/util';
import { getDisplayName } from 'next/dist/shared/lib/utils';
import {URL} from '../../utils/const';

import useSWR from 'swr';

const fetcher = url => axios.get(url).then(res => res.data);

export const HomeView: FC = ({ }) => {
  const {publicKey, sendTransaction} = useWallet();
  const wallet = useAnchorWallet(); 
  const { connection } = useConnection();
  const [handle,setHandle] = useState<string>('');

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const {solbinAccount, getSolbinAccount} = useSolbinAccountStore();

  async function createSolbinAccount() {
    let newHandle = handle;


    if (newHandle.charAt(0) !== '@') {
      newHandle = '@' + newHandle;
      setHandle("@" + handle);
    }
    if (!wallet) throw("wallet is not connected");
    const [tx, provider] = await util.createProfileTransaction(wallet, newHandle);
    const sx = await sendTransaction(tx, provider.connection);

    await provider.connection.confirmTransaction(sx);
    getSolbinAccount(wallet);
  }

  // Memoized version of createSolbinAccount 
  const onClickCreateAccount = useCallback(
    async () => {
      await createSolbinAccount();
    },
    [wallet, handle]
  );

  useEffect(() => {
      getSolbinAccount(wallet);
  },[wallet]);

  console.log(`solbin account : ${solbinAccount}`);
  useEffect(() => {
    if (publicKey) {
      console.log(publicKey.toBase58())
      getUserSOLBalance(publicKey, connection)
    }
  }, [publicKey, connection, getUserSOLBalance])

    const {data, error} = useSWR(URL+'/marketplace',fetcher);

  return (
    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        {!publicKey &&
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Connect your account
        </h1>
        }
        {publicKey && !solbinAccount &&  
        <>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Create new solbin account
        </h1>
                      <div>
                        <div className="bg-primary p-8 rounded-lg">
                            <input 
                                className="text-lg border-2 rounded-lg border-[#6e6e6e] px-6 py-2 mt-5 ml-4"
                                type="text" placeholder="Your New Handle" onChange={e => setHandle(e.target.value)}/>
                            <button 
                                className="text-lg text-black border-2 rounded-lg border-[#6e6e6e] px-6 py-2 mt-5 ml-4 bg-[#74a8fc]"
                                onClick={() => onClickCreateAccount()}><span>Create Account</span></button>
                        </div>
                    </div>
        </>}
         { publicKey && solbinAccount && data != undefined &&
         <>
         <h3 className="text-center text-2xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
            Market Place for {'#' + solbinAccount.handle.substring(1,solbinAccount.handle.length)}
          </h3>
          {data.map((d) => {
                return (<MarketplaceCard id={d.id} type={d.type} startDate={new Date(d.start_date)} endDate={new Date(d.end_date)} unit={d.unit} totalUnits={d.total_no_of_units} key={d.id}/>)
          })}
          <div className="text-center">
          {wallet && <p className="text-center text-1xl md:pl-12">SOL Balance: {(balance || 0).toLocaleString()}</p>}
        </div>
        </>
          }
      </div>
    </div>
  );
};

