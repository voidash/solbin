import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image.js';
// const CanvasJSReact = dynamic(() => import("../components/canvasjs.react.js"), { ssr: false });
// let CanvasJS = CanvasJSReact.CanvasJS;
// let CanvasJSChart = CanvasJSReact.CanvasJSChart;


// import CanvasJSReact from '../components/canvasjs.react.js';

import axios from "axios";

const Analytics = () => {
	const [response,setResponse] = useState();
	const [totalBins,setTotalBins] = useState();

	const [paper,setPaper] = useState(undefined);
	const [metal,setMetal] = useState();
	const [plastics,setPlastics] = useState();


	useEffect(() => {
		getData();
		
	  }, []);
	
	const getData = async () => {
		const res  = await axios.get(`http://solanabin.pythonanywhere.com/get_average_data/`);
		const data = res.data.data
		const totalDustbin = data.Paper.total_number + data.Plastics.total_number + data.Metal.total_number + data['Waste Food'].total_number + data.Bottles.total_number
		console.log(data)
		setResponse(data);
		setTotalBins(totalDustbin)

		setPaper(data.Paper)
		setMetal(data.Metal)
		setPlastics(data.Plastics)
	};  

	
    return (  
        <div className=' h-screen'>
			<div className='mx-6  mt-3 '>
				<h1 className=' text-lg font-semibold'>Total Dustbin according to Catagories</h1>
			</div>
			<div className='mx-3 grid grid-cols-3 gap-1'>
				

				<div className='bg-white rounded-xl m-4 h-20'>
					<div className='p-0.5'>
						<h1 className=' m-2  text-sm  font-semibold'>Paper</h1>
						<div className=' m-2 h-0.5 bg-slate-600'></div>
						<div className="grid place-items-center">
							<h1 className='font-bold'>{paper != undefined && paper.total_number}</h1>
							{/* <p className=' text-sm font-normal'>{response.aper.total_weight}</p> */}
						</div>
					
					</div>
				</div>

        	</div>

			<div className="flex justify-center m-4 h-72">
				<div className="block p-4 rounded-lg shadow-lg bg-white max-w-sm">
					<div className='mb-2' style={{width: '100%', height: '50%', position: 'relative'}}>
					<Image src='/assets/plastic.png' layout='fill' objectFit='contain' />
					</div>
					<h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 mt-2">Paper Dustbins</h5>
					<h2>Total weight : {paper != undefined && paper.total_weight}</h2>
					<h2>Total Height : {paper != undefined && paper.total_height}</h2>
					<h2>percentage weight filled : {paper != undefined && parseInt(paper.average_weight*100)/100} %</h2>
					<h2>Percentage height filled : {paper != undefined && parseInt(paper.average_height*100)/100} %</h2>
				</div>
			</div>
			
		</div>
    );
}
 
export default Analytics;      

{/* <div className='mx-3'>
	<div className='bg-white rounded-xl '>
		<div className='p-1 h-full'>
			<h1 className='mb-3 text-xl  font-semibold'>Total DustBin</h1>

		<div className='w-4/5 mx-5  h-0.5 bg-slate-600'></div>
		<div className="w-4/5 mx-5 my-2">
			<p className=' text-sm font-normal'>{totalBins}</p>
		</div>
		
		</div>
	</div>
</div> */}


			{/* <CanvasJSChart options = {options} /> */}

// const options = {
// 	animationEnabled: true,
// 	exportEnabled: true,
// 	theme: "dark2", // "light1", "dark1", "dark2"
// 	title:{
// 		text: "Trip Expenses"
// 	},
// 	data: [{
// 		type: "pie",
// 		indexLabel: "{label}: {y}%",		
// 		startAngle: -90,
// 		dataPoints: [
// 			{ y: 20, label: "Airfare" },
// 			{ y: 24, label: "Food & Drinks" },
// 			{ y: 20, label: "Accomodation" },
// 			{ y: 14, label: "Transportation" },
// 			{ y: 12, label: "Activities" },
// 			{ y: 10, label: "Misc" }	
// 		]
// 	}]
// }