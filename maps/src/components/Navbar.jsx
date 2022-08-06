import React from "react";
import { useState } from "react";
import logo_best from "../assets/images/logo_with_name.png";
import { DEPLOY_URL } from "../const";
const Navbar = () => {
  const [nav, _] = useState(false);
  return (
    <div className="w-screen h-[80px] z-10 bg-[#9EBEC0] fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          {/* <h1 className="text-3xl font-bold mr-4 sm:text-4xl">E-Dumpster</h1> */}
          <img src={logo_best} alt="" className="h-10" />
          <ul className="flex">
            <li>
              <a href={`${DEPLOY_URL}/home/`}>Home</a>
            </li>
            <li>
              <a href={`${DEPLOY_URL}/marketplace/`}>Marketplace</a>
            </li>
          </ul>
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
        <li className="border-b-2 border-zinc-300 w-full">Home</li>
        <li className="border-b-2 border-zinc-300 w-full">About</li>
        <li className="border-b-2 border-zinc-300 w-full">Support</li>
        <li className="border-b-2 border-zinc-300 w-full"> Platforms</li>
        <li className="border-b-2 border-zinc-300 w-full">Pricing</li>
        <div className="flex flex-col my-4">
          <button className="bg-transparent text-indigo-600 px-8 py-3 mb-4">
            Sign In
          </button>
          <button className="px-8 py-3">Sign UP</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
