import { useRouter } from "next/router";
import useSWR from 'swr';
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import Image from "next/image";

import axios from 'axios';
import Link from "next/link";
import payment from '../payment';

// 1a77d81f-4ed4-45f0-bdf6-c8980cbfac1e

const fetcher = url => axios.get(url).then(res => res.data);
// const fetcher = url => fetch(url).then(r => r.json())
const Details = () => {
    let { data, error } = useSWR(`http://solanabin.pythonanywhere.com/dustbin_data/${useRouter().query.id}/`, fetcher);
    const uid = useRouter().query.id;
    const router = useRouter();
    const [dataForPayment, setDataForPaayment] = useState()
    const [openDustbin, setOpendustbin] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [recent, setRecent] = useState(0)

    const [placedPayload, setPlacedPayload] = useState(false);
    const [showTimeout, setShowTimeout] = useState(false);
    const handleOpen = () => {
        setOpendustbin(true)
    }

    const handleModalOpen = async () => {

        setShowTimeout(false);
        setModalOpen(true)
        setOpendustbin(true);
        try {
            let c = await axios.get(`http://solanabin.pythonanywhere.com/open_dustbin/${uid}/`);
        } catch (e) {
            console.log("unable to close dustbin");
        }

        await listenForChange()
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            border: 'none',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '50vh',
        },
    };

    const clearTheInterval = async (e, newPayloadFound, payloadNotFound) => {
        clearInterval(e);
        if (newPayloadFound) {
            setModalOpen(false);
            setPlacedPayload(true);
        }
        if (!newPayloadFound) {
            setModalOpen(false);
            setShowTimeout(true);
        }

        try {
            let c = await axios.get(`http://solanabin.pythonanywhere.com/close_dustbin/${uid}/`);
        } catch (e) {
            console.log("unable to close dustbin");
        }

    }

    async function listenForChange() {
        let time = new Date();
        time.getSecond
        let e = setInterval(async () => {
            let d = await axios.get(`http://solanabin.pythonanywhere.com/listen_for_changes/${uid}/`);
            setDataForPaayment(d.data.data)
            let newDataLessThan60Seconds = d.data.data.recent < 60;
            let timeGreaterThan60Seconds = (new Date() - time) > 60000;
            if (newDataLessThan60Seconds || timeGreaterThan60Seconds) {
                clearTheInterval(e, newDataLessThan60Seconds, timeGreaterThan60Seconds);
            }
            console.log(new Date() - time);
            console.log(d.data.data.recent);
        }, 5000);



        // console.log(d.data.data);

    }


    function getData() {

        console.log(data)
        if (error) return <div>Error</div>
        if (!data) return <div>empty</div>

        return (<>
            <div className="max-w-2xl mx-auto py-5 sm:py-24 lg:py-32 lg:max-w-none">
                <div className=" space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                    <div className="group relative">
                        <div className="grid grid-cols-4 gap-2 relative w-full h-80 bg-white  z-0 rounded-lg ">
                            <div className="col-span-2 grid place-items-center mt-5">
                                <Image src="/bin.png" width={150} height={150} alt="ok" />
                            </div>
                            <div className="col-span-2">
                                <div className="mt-12">
                                    <h1 className="text-base font-semibold text-gray-900  ml-1">{`Bin-id : ${uid.substring(0, 4)}`}</h1>
                                    <h3 className=" mt-1 text-sm text-gray-800 ml-1 ">{`${data.dustbin_type}`}</h3>
                                    <div className="flex flex-row mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 basis-1/4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            Open  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h2 className=" text-sm text-gray-900 basis-3/4">{`${data.location}`}</h2>
                                    </div>
                                </div>

                            </div>
                            <div className="col-span-3 flex flex-col h-12 ml-5">
                                <h3 className="text-lg font-medium text-gray-900">{`capacity : ${data.capacity} L`}</h3>
                                <h3 className="text-lg font-medium text-gray-900">{`Occupancy : ${data.weight_filled} L`}</h3>
                            </div>


                            <div className=" flex flex-col h-12 justify-start mx-auto">
                                <div className=" bg-green-700 rounded-full text-white p-3">
                                    <h2>{`${parseInt((data.weight_filled / data.capacity) * 100)}%`}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto py-5 sm:py-24 lg:py-32 lg:max-w-none">
                <div className=" space-y-1placeComponent2 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                    <div className="group relative">
                        <div className="flex flex-row relative w-full h-20 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                            <div className="m-2">
                                <div className=" bg-red-600 w-1 h-full"></div>
                            </div>
                            <div className=" my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="red" viewBox="0 0 24 24" stroke="#ffffff" strokWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                                </svg>
                            </div>
                            <div className=" my-auto mx-3">
                                <h2 className=" text-sm font-medium text-gray-900">Please place your trash</h2>
                                <h2 className=" text-xs  font-normal text-gray-500">
                                    Place with caution
                                </h2>
                            </div>
                        </div>
                        {!placedPayload &&
                            <div className="max-w-2xl mx-auto my-0 py-5 sm:py-24 lg:py-32 lg:max-w-none">
                                <div className=" space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                                    <div className="group relative">
                                        <div className="grid place-items-center relative w-full h-12 bg-darkGreen rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
                                            onClick={handleModalOpen}>
                                            <h1 className=" text-white font-semibold">Open Dustbin</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>

            <div>
                <Modal
                    isOpen={modalOpen}
                    style={customStyles}
                    contentLabel="opening modal"
                >
                    {/* <button onClick={handleModalClose}>Close Modal</button> */}
                    <div className="max-w-2xl">
                        <div className=" space-y-1placeComponent2">
                            <div className="group relative">
                                <div className="flex flex-col justify-center items-center relative w-full h-64 bg-bgBlue rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                    <div className="animate-spin mb-5">
                                        <Image src='/hourglass.png' width="100" height="100" alt="ok" />
                                    </div>
                                    <div className=" w-4/5">
                                        <h1 className="text-xs  font-normal text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, possimus!</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </>);
    }

    function anotherData() {
        return (
            <div>you have placed payload</div>
        )
    }

    return (
        <div className="max-w-7xl h-screen mx-auto px-4 sm:px-6 lg:px-8">
            {showTimeout && <div className="bg-blue-500 text-white rounded-md"><h3 className="pl-5">Timout Open again</h3></div>}
            {!placedPayload && data && getData(data)}
            {placedPayload && payment(dataForPayment)}

        </div>
        // <div>
        //     <h1>id page particular page</h1>
        //     {getData()}
        //     {/* <h1>{ninja.name}</h1>
        //     <h1>{ninja.email}</h1>
        //     <h1>{ninja.website}</h1>
        //     <h1>{ninja.address.city}</h1> */}
        // </div>
    );
}

export default Details;