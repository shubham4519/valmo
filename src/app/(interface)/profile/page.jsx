'use client'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const MapSelector = dynamic(
  () => import("@/components/LocationPicker").then((mod) => mod.MapSelector),
  { ssr: false }
);
function page() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [refundAmount, setRefundAmount] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [fType, setFtype] = useState('');
    const [status, setStatus] = useState('InActive')
    const [pdf, setPdf] = useState('');

    const [accountInfo, setAccountInfo] = useState({});
    const [accountInfo2, setAccountInfo2] = useState({});

    useEffect(() => {
        axios.get('/api/user').then(res => {
            const data = res.data.data;
            const { id, email,name, phone, refundAmount, state, address, pinCode, fType, status } = data
            setName(name);
            setId(id); setEmail(email); setPhone(phone); setRefundAmount(refundAmount);
            setState(state); setAddress(address); setPinCode(pinCode); setFtype(fType); setStatus(status);
            setPdf(() => modifyPdfUrl(data.pdf));
            setAccountInfo(data.accountInfo);
        }).catch(err => {
            console.log(err)
        })

          async function fetchData() {
            const res = await fetch("/api/account-info");
            const result = await res.json();

            if (result?.accountInfo) {
                setAccountInfo2({...result.accountInfo})
            }
        }
        fetchData();
        
    }, [])
    const modifyPdfUrl = (url) => {
        url = url.replace('http', 'https')
        const urlParts = url.split("/upload/");
        if (urlParts.length === 2) {
            return `${urlParts[0]}/upload/fl_attachment/${urlParts[1]}`;
        }
        return url; // Return original URL if it's not a valid Cloudinary URL
    };
    const logOut = ()=>{
        axios.post('/api/logout').then(res=>{
            toast({
                title:res.data.message
            })
            window.location.href = '/home'

        }).catch(err => {
            console.log(err);
            toast({
                title:err.response?.data.message || err.message
            })
        })
    }

    //   const forceDownload = () => {
    //     const downloadUrl = pdf.replace('/upload/', '/upload/fl_attachment/');
    //     const link = document.createElement('a');
    //     link.href = downloadUrl;
    //     link.download = 'Approval-letter.pdf';
    //     link.click();
    //   };
    return (
        <div className='pt-24 md:pt-28 flex justify-center bg-yellow-50'>
            <div className='max-w-[980px] w-full p-2 md:p-4 bg-yellow-50'>
                <h2 className='text-[28px] p-1 md:text-[42px] font-medium leading-8'>Application No.: {id}</h2>
                <marquee className='py-3 text-green-900 font-mono text-[16px] md:text-[18px] font-semibold'>Welcome {name || 'Unknown'} - view your application</marquee>
                <Button onClick={logOut} className='bg-red-600 float-right mb-1 rounded-2xl'>Logout</Button>

                <div className='overflow-x-auto w-full bg-yellow-50'>
                    <div className='text-nowrap min-w-[600px] bg-slate-50 font-sans opacity-80 text-[14px] md:text-[16px] overflow-x-auto'>

                        <div className='flex min-w-fit gap-2 w-full p-4 bg-gray-200'>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Application No.</b>
                                <p className='w-1/2'>{id || 'Non..'}</p>
                            </div>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Document No.</b>
                                <p className='w-1/2'>{id || 'Non..'}</p>
                            </div>
                        </div>


                        <div className='flex min-w-fit gap-2 w-full p-4'>
                            <b className='w-1/2'>Application Details</b>
                        </div>

                        <div className='flex min-w-fit gap-2 w-full  p-4 bg-gray-200'>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Name</b>
                                <p className='w-1/2'>{name || 'Unknown'}</p>
                            </div>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Status</b>
                                <p className={`w-1/2 ${status == 'Active' ? 'text-green-700' : 'text-red-700'}`}>{status || 'Inactive'}</p>
                            </div>
                        </div>

                        <div className='flex min-w-fit gap-2 w-full  p-4'>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Email</b>
                                <p className='w-1/2 min-w-fit text-wrap'>{email || 'Not given'}</p>
                            </div>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Mobile</b>
                                <p className='w-1/2'>{phone || 'Not found'}</p>
                            </div>
                        </div>

                        <div className='flex min-w-fit gap-2 w-full  p-4 bg-gray-200'>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Pin-code</b>
                                <p className='w-1/2'>{pinCode}</p>
                            </div>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>state</b>
                                <p className='w-1/2'>{state}</p>
                            </div>
                        </div>

                        <div className='flex min-w-fit gap-2 w-full  p-4'>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Franchise Type</b>
                                <p className='w-1/2'>{fType}</p>
                            </div>
                            <div className='flex w-[50%]'>
                                <b className='w-1/2'>Refund Amount</b>
                                <p className='w-1/2'>{refundAmount || '0.00'}</p>
                            </div>
                        </div>

                        <div className='flex min-w-fit gap-2 w-full  p-4 border-t-[1px] border-gray-500'>
                            <b className='w-1/2'>Approved location: {address}</b>
                        </div>
                    </div>
                </div>

                 <div className='overflow-x-auto w-full'>
                    <div className='flex min-w-[600px] flex-col w-full bg-gray-50 mt-4'>
                        <div className='flex justify-between bg-gray-200 font-semibold text-center'>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>Account Number</p>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>IFSC</p>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>Bank Name</p>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>Branch Name</p>
                        </div>
                        <div className='flex justify-between items-center text-center'>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>{accountInfo?.accountNumber || accountInfo2?.accountNumber || ''}</p>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>{accountInfo?.ifc || accountInfo2?.ifc || ''}</p>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>{accountInfo?.bankName || accountInfo2?.bankName || ''}</p>
                            <p className='py-3 px-6 w-full border-r min-w-fit'>{accountInfo?.branchName || accountInfo2?.branchName  || ''}</p>
                        </div>
                    </div>
                </div>
                

                <div className='flex p-2 px-4 rounded-sm m-2 my-4 bg-gray-600 text-white items-center justify-between'>
                    <b>Approval Letter</b>
                    <a href={pdf} download={'Approval-letter.pdf'} target='_blank'>
                        <Button className='bg-[#092d5e]'>Download</Button>
                    </a>
                </div>

                <MapSelector pincode={pinCode} />
                
            </div>
        </div>
    )
}


export default page








