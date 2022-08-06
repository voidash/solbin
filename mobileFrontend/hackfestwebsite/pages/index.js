import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Slider from "react-slick";
import { DEPLOY_URL } from '../const';

export default function Home() {

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };


  return (
    <>
      <Head>
        <title>Sol-Bin | Home</title>
        <meta name="keywords" content="Solana Dustbin sol-bin kuhackfest" />
      </Head>
      <div>
        {/* component: landing */}

        <div className=' mt-8 mx-3 h-64' id="home">
          <div className='bg-white rounded-xl h-5/6'>
            <div className='grid grid-cols-2'>
              <div className='mt-5'>
                <Image alt="ok" src='/bin.png' width={200} height={250}  />
              </div>
              <div className=' ml-2 mt-9'>
                <h1 className="text-2xl font-bold text-[#045256] ">SOL-BIN</h1>
                <p className='text-[10px] font-light'>The Smart Bin</p>
                <a href={`${DEPLOY_URL}/aryal/`}>
                  <div className="p-2 mt-3 rounded-3xl bg-darkGreen w-20 grid place-items-center">
                    <h2 className=" text-white font-semibold">Map</h2>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* component : what is sol-bin ? */}
        <div className='mx-3' id="solbin">
          <h1 className='mb-3 text-xl  font-semibold'>What is Sol-Bin ?</h1>
          <div className='bg-white rounded-xl '>
            <div className='p-1 h-full'>
              <div className='p-5 grid grid-cols-3 gap-1'>
                <Image alt="ok" src='/bin.png' width={100} height={150} />
                <div className='w-3/4 m-5'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-3/4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className='w-full h-full mt-5'>
                  <Image alt="ok" src='/solana.png' width={100} height={100} />
                </div>
              </div>
              <div className='w-4/5 mx-5  h-0.5 bg-slate-600'></div>
              <div className="w-4/5 mx-5 my-2">
                <p className=' text-sm font-normal'>Get incentivized by throwing recyclable and decomposable waste into right bins</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-2 mt-5' id="how">
          <h1 className='mb-3 text-xl font-semibold'>How we work ?</h1>
          <div className='grid place-items-center'>

            <div className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
              <div>
                <div>
                  <div className='grid place-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>

                  <p className='mt-2  mx-8 text-xs text-center'>Get to hotspot point</p>
                </div>
              </div>
            </div>

            <div className='w-3/4 m-5 grid place-items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>

            <div className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
              <div>
                <div>
                  <div className='grid place-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <p className='mt-2  mx-8 text-xs text-center'>Scan the QR code</p>
                </div>
              </div>
            </div>

            <div className='w-3/4 m-5 grid place-items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>

            <div className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
              <div>
                <div>
                  <div className='grid place-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>

                  <p className='mt-2  mx-8 text-xs text-center'>Insert your trash</p>
                </div>
              </div>
            </div>

            <div className='w-3/4 m-5 grid place-items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth="4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 17l-4 4m0 0l-4-4m4 4V3" />
              </svg>
            </div>

            <div className="w-[200px] h-[200px] bg-white rounded-full flex justify-center items-center">
              <div>
                <div>
                  <div className='grid place-items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>

                  <p className='mt-2  mx-8 text-xs'>Get incentivized</p>
                </div>
              </div>
            </div>




          </div>


          {/* <div className="font-bold text-gray-700 rounded-full bg-white flex items-center justify-center font-mono" style="height: 100px; width: 100px; font-size: 170px;">404</div> */}

        </div>

        <div className='mx-4 mt-5' id="dustbinType">
          <h1 className='mb-3 text-xl  font-semibold'>Dustbins of type</h1>
        </div>

        <div className="flex justify-center m-4 h-72">
          <div className="block p-4 rounded-lg shadow-lg bg-white max-w-sm">
            <div className='mb-2' style={{ width: '100%', height: '50%', position: 'relative' }}>
              <Image alt="ok" src='/assets/decomposable.png' layout='fill' objectFit='contain' />
            </div>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 mt-2">Decomposable Items Dustbin</h5>
            <p className="text-gray-700 text-base">You can place Decomposable items such as waste food as a feed for livestock, or waste unedible organic material for compost</p>
          </div>
        </div>

        <div className="flex justify-center m-4 h-72">
          <div className="block p-4 rounded-lg shadow-lg bg-white max-w-sm">
            <div className='mb-2' style={{ width: '100%', height: '50%', position: 'relative' }}>
              <Image alt="ok" src='/assets/paper.png' layout='fill' objectFit='contain' />
            </div>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 mt-2">Paper Dustbin</h5>
            <p className="text-gray-700 text-base">
              You can place Newspaper, magazines, books, notebooks and all sort of paper items
            </p>
          </div>
        </div>

        <div className="flex justify-center m-4 h-72">
          <div className="block p-4 rounded-lg shadow-lg bg-white max-w-sm">
            <div className='mb-2' style={{ width: '100%', height: '50%', position: 'relative' }}>
              <Image alt="ok" src='/assets/plastic.png' layout='fill' objectFit='contain' />
            </div>
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 mt-2">Plastics Dustbin</h5>
            <p className="text-gray-700 text-base">You can place Plastics of type ABS and PET such as coke bottles, Water bottles, Other plastics such as polyestere also</p>
          </div>
        </div>


        <div className="p-4 flex flex-row relative w-5/6 m-auto h-20 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">

          <div className=" my-auto">
            <Image alt="ok" src='/logo1.png' width={50} height={50} />

          </div>
          <div className="m-2">
            <div className=" bg-darkGreen w-0.5 h-4/5 mt-1"></div>
          </div>
          <div className=" my-auto mx-3">
            <h2 className=" text-4xl font-semibold text-darkGreen">Sol-Bin</h2>
          </div>
        </div>

















      </div>


    </>
  )
}