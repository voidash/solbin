import { FC } from 'react';
import Link from "next/link";
import {URL} from '../utils/const';
import { imageBasedOnType } from 'utils/misc';

export interface MarketPlaceCardProps  {
    id: string,
    type: string,
    startDate: Date,
    endDate: Date, 
    totalUnits: number,
    unit: string
};


export const MarketplaceCard = (props: MarketPlaceCardProps) => {
  return (
    <a href={'/marketplace/'+props.id} className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img src={imageBasedOnType(props.type)} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.type}</h5>
        <div className='flex flex-row bg-primary text-white rounded-md p-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3>Date</h3>
        </div>
        <div>Bid Start Date : {props.startDate.toLocaleString('default', {month: 'short', day: '2-digit'})}</div>
        <div>Bid End Date: {props.endDate.toLocaleString('default', {month: 'short', day: '2-digit'})}</div>
        <div className='flex flex-row bg-primary text-white rounded-md p-1'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>
         <div>Total Unit: </div>
        </div>
         <div>{props.totalUnits} {props.unit}</div>
        <div className="flex flex-row bg-primary text-white rounded-md p-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <div>price</div>
        </div>
        <div>234</div>
    </div>
    </a>
  );
};

