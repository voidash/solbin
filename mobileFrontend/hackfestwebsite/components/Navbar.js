import { useState } from "react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";
import { DEPLOY_URL } from "../const";
const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleClick = () => {
        setNav(!nav);
    };

    const navigation = [
        { name: 'Home', href: '#home', current: true },
        { name: 'What is Sol-bin ?', href: '#solbin', current: false },
        { name: 'How it works', href: '#how', current: false },
        { name: 'Types of Sol-bin', href: '#dustbinType', current: false },
        { name: 'Analytics', href: '/analytics', current: false },
        { name: 'Map', href: `${DEPLOY_URL}/aryal/`, current: false },
        { name: 'Marketplace', href: `${DEPLOY_URL}/marketplace/`, current: false },

      ]


    return (
        <Disclosure as="nav" className=" bg-bgBlue">
      {({ open }) => (
        <>
          <div className="navbar max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 w-50 hover:text-red-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
                <div className="mx-4 z-0">
                    <Image src="/logoFrame.png" width={200} height={50} bo/>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-darkGreen">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={
                    item.current ? ' text-white block px-3 py-2 rounded-md text-base font-medium' : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                  }
                  aria-current={item.current ? 'page' : undefined}
                >
                    <Link href={item.href}><a>{item.name}</a></Link>
                  
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
        // <div className="w-screen h-[80px]  drop-shadow-lg">
        //     <div className="flex justify-between items-center w-full h-full">
        //         <div className="md:hidden mx-3" onClick={handleClick}>
        //             {!nav ? (
        //                 <MenuIcon className="w-8"></MenuIcon>
        //             ) : (
        //                 <XIcon className="w-8"></XIcon>
        //             )}
        //         </div>
        //         <div className="flex items-center z-0">
        //             {/* <h1 className="text-3xl font-bold mr-4 sm:text-4xl">E-Dumpster</h1> */}
        //             <div className="mx-4 z-0">
        //                 <Image src="/logoFrame.png" width={200} height={50} bo/>
        //             </div>

        //             <div className=" bg-darkGreen p-4 rounded-bl-xl z-0">
        //                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="#ffffff" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        //                     <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        //                     <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        //                 </svg>
        //             </div>
        //             {/* <img src={logo} alt="" className="h-10" /> */}
        //             <ul className="hidden md:flex">
        //                 <li>Home</li>
        //                 <li>How we work?</li>
        //                 <li>Marketplace</li>
        //                 <li>What we buy?</li>
        //                 <li>What is Sol-Bin?</li>
        //                 <li>Map</li>
        //             </ul>
        //         </div>
        //     </div>

        //     <div className={!nav ? "hidden" : " static w-full bg-darkGreen px-8 h-screen"}>
        //         <div>
        //             <div className="grid place-items-center m-2 text-slate-50 font-semibold">
        //                 <Link href="/"><a>Home</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/a"><a>What is Sol-bin ?</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/b"><a>How we work ?</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/c"><a>What we buy ?</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/d"><a>Stat</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/map"><a> Map</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/scan"><a>Scan</a></Link>
        //             </div>
        //             <div className="grid place-items-center">
        //                 <Link href="/marketplace"><a> Market Place</a></Link>
        //             </div>
        //         </div>
        //     </div>
        // </div>
      );
}
 
export default Navbar;


// <nav className="relative w-full flex flex-nowrap items-center justify-between py-3   ">
        //     <div >
        //         <div className="ml-5">
        //             <div class="space-y-0.5">
        //                 <span className="block h-1 w-6  bg-black rounded-sm"></span>
        //                 <span className="block h-1 w-6  bg-black rounded-sm"></span>
        //                 <span className="block h-1 w-6  bg-black rounded-sm"></span>
        //             </div>
        //         </div>
        //     </div>
        //     <div>
        //         <h1>Logo</h1>
        //     </div>
        //     <div className="mr-5">
        //         <h1>Scan</h1>
        //     </div>
        // </nav>