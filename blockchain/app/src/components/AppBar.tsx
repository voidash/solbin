import { FC } from 'react';
import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from '../contexts/AutoConnectProvider';

export const AppBar: FC = props => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <div>

      {/* NavBar / Header */}
      <div className="navbar flex flex-row md:mb-2 text-neutral-content bg-primary ">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost md:hidden">

            <svg className="inline-block w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        
          <div className="hidden sm:inline w-22 h-22 md:p-2">
            {/* logo here */}
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:inline md:navbar-center">
          <div className="flex items-stretch">
            <Link href="/">
              <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
            </Link>
          </div>
        </div>

        {/* Wallet & Settings */}
        <div className="navbar-end">
          <WalletMultiButton className="btn btn-ghost mr-4" />
        </div>
      </div>
      {props.children}
    </div>
  );
};
