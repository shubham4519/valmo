// pages/contact.js
import { Input } from '@/components/ui/input';
import { Mail, MapPin } from 'lucide-react';
import Head from 'next/head';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const statesAndUTs = [
  // States
  "AndhraPradesh",
  "ArunachalPradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "HimachalPradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "MadhyaPradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "TamilNadu",
  "Telangana",
  "Tripura",
  "UttarPradesh",
  "Uttarakhand",
  "WestBengal",

  // Union Territories
  "AndamanAndNicobarIslands",
  "Chandigarh",
  "DadraAndNagarHaveliAndDamanAndDiu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
  "JammuAndKashmir",
  "Ladakh",
];
const Contact = () => {
  return (
    <div className="bg-cover pt-24 bg-center] h-scree bg-green-100">
      <Head>
        <title>Contact Us - Valmo</title>
        <meta name="description" content="Contact Valmo for the most reliable logistics service partner." />
      </Head>

      <div className="container gap-4 flex flex-col md:flex-row mx-auto px-4 py-8">

        <div className='w-full md:w-1/2 flex justify-center flex-col p-4 md:p-8'>
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

          <p className='flex gap-2 text-[18px] font-serif mt-2 mb-4'>
            <MapPin className=' size-14 -mt-4' />
            3rd Floor, Wing-E, Helios Business Park,Kadubeesanahalli Village, Varthur Hobli, Outer Ring Road Bellandur, Bangalore, Bangalore South, Karnataka, India, 560103
          </p>

          <a className='flex gap-1 text-lg font-semibold'><Mail />support@valmodeliverys.in</a>
        </div>

        <form className="max-w-lg mx-auto flex flex-col gap-2 w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <Input placeholder='Name' />
          <Input placeholder='Contact number' />
          <div className='flex gap-2'>
            <Input placeholder='Pin Code' />
            <Input placeholder='City' />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {
                statesAndUTs.map(s => {
                  return <SelectItem key={s} value={s}>{s}</SelectItem>
                })
              }
            </SelectContent>
          </Select>
          <Textarea placeholder='Message' />

          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
