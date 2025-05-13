import Image from "next/image";
import Home from "./(interface)/home/page";
import Nav from "@/components/Nav";
import { Mail, MapPin } from "lucide-react";

export default function Page() {
    return (
        <div className='h-full w-full overflow-y-auto overflow-x-hidden'>
            <Nav />
            <Home />

            <footer className='bg-[#092d5e] text-gray-400 font-roboto py-8'>
                <div className=' flex px-8 md:px-28 gap-8 py-8 flex-col md:flex-row'>
                    <img src='/valmologo.png' alt='valmologo' className='md:h-12 md:w-auto w-[190px]'></img>

                    <div className='w-full md:w-[25%] flex flex-col justify-center md:ml-8'>
                        <h2 className='text-gray-200 text-[18px] mb-1'>Fashnear Technologies Private Limited</h2>
                        <div className='flex gap-2'>
                            <MapPin className='w-32' />
                            <p className='text-[13px]'>
                                Fashnear Technologies Private Limited ,
                                CIN: U74900KA2015PTC082263
                                3rd Floor, Wing-E, Helios Business Park,Kadubeesanahalli Village, Varthur Hobli, Outer Ring Road Bellandur, Bangalore, Bangalore South, Karnataka, India, 560103
                            </p>
                        </div>
                    </div>

                    <div className='items-center w-full md:w-[25%]'>
                        <Mail className='size-6 mr-2' />
                        <div className='text-[14px] break-words'>support@valmodeliverylogistics.ind.in <br/> hello@valmodeliverylogistics.ind.in
                        </div>
                    </div>

                    <div className='w-full md:w-[25%] text-gray-100 text-[20px] flex flex-col gap-2'>
                        <a href='#'>Legal</a>
                        <a href='#'>Privacy Policy</a>
                        <a href='#'>Terms of use</a>
                    </div>
                </div>
                <p className='px-8 md:px-28 py-4 text-[15px] leading-4 font-mono'>
                    Disclaimer: Any official communication for business related formalities will be sent by Valmo using our authorised official email addresses (@valmodeliverylogistics.ind.in
                    or @meesho.com). Kindly DO NOT interact with any communications or requests for payments from any other sources or share any personal information.
                </p>
                <div className='px-8 md:px-28 pt-2 text-gray-200 border-t-[1px] border-gray-400'>
                    Copyright © 2024. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
