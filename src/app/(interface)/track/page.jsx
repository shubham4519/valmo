import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

function Track() {
    return (
        <div className='pt-28 flex flex-col sm:flex-row justify-center items-center bg-[#0c1421]'>
            <div className='w-full sm:w-1/2 flex justify-center items-center'>
                <img src='/truck_image_desktop.png' className='max-w-full w-[600px] h-auto' />
            </div>

            <div className='w-full py-8 sm:w-1/2 flex justify-center items-center'>
                <div className='shadow-xl bg-white p-4 sm:p-10 rounded-xl w-full sm:w-[498px] '>
                    <div className='bg-green-900 w-48 rounded-xl p-2 text-3xl font-bold mb-4'>
                        <img src='/valmologo.png' alt='valmologo' className='w-[80%] mx-auto h-auto' />
                    </div>
                    <p className='opacity-50 text-[14px] font-[400] text-center'>Welcome back !!</p>
                    <h2 className='text-[46px] text-center font-bold mb-4'>Track Your Order</h2>

                    <div className='flex flex-col w-full gap-4'>
                        <div>
                            <Label>AWB/tracking ID</Label>
                            <Input className='rounded-none text-black mt-2 border-0 bg-green-100' placeholder='Enter AWB/tracking ID' />
                        </div>
                    </div>

                    <div className='flex flex-col w-full justify-center items-center gap-4 mt-6 mb-6'>
                        <Button className={`w-full h-12 text-[16px] align-middle py-2 text-white font-medium`}>
                            Track Now
                        </Button>
                    </div>

                    <div className=' font-sans'>
                        <div className='border-[1px] border-gray-200 mb-4 w-40'></div>
                        <h2 className='text-[15px] font-medium'>Can't Find Your Tracking Details?</h2>
                        <p className='text-[13px] opacity-40'>We sent your AWB/tracking ID to you via SMS upon booking confirmation</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Track