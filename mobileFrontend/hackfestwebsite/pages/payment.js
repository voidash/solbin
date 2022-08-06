import Image from "next/image";
import { DEPLOY_URL } from "../const";
const Payment = (data) => {
    console.log(data)
    return ( 
        <div className="max-w-7xl h-screen mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto py-5 sm:py-24 lg:py-32 lg:max-w-none">

            <div className=" space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 mt-12">
                <div className="group relative">
                <div className=" m-1 flex flex-col relative w-full h-96 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <div className=" grid place-items-center mt-5">
                        <Image src="/trash.png" width={150} height={150}/>
                    </div>
                    <div className="grid place-items-center">
                        <h1 className=" font-extrabold text-4xl">{`${data.change} Kg`}</h1>
                    </div>
                    <div className="grid place-items-center m-3">
                        <p>{`For your ${data.change} Kg of litter, You will get Rs.${data.amount_to_pay}/- worth of Solana that is of ${data.amount_to_pay_in_sol}.`}</p>
                    </div>
                    <div className="mx-2 my-1 font-semibold">
                        <h3>Redeem With</h3>
                    </div>

                    <div className="grid gap-4 grid-cols-2 mx-2">
                        <div className=" basis-1/2  grid place-items-center relative h-8 bg-darkGreen rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                <h1 className=" text-white font-semibold">Esewa</h1>
                        </div>
                        <a href={`${DEPLOY_URL}/marketplace/payments/${data.uid}`}><div className=" basis-1/2 grid place-items-center relative h-8 bg-darkGreen rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                <h1 className=" text-white font-semibold">Solana</h1>
                        </div>
                        </a>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
     );
}
 
export default Payment;