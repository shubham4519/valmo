'use client'
import { Button } from '@/components/ui/button'
import React, { use, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import { set } from 'mongoose'



function Home() {
    const [l1, setL1] = useState(0);
    const [l2, setL2] = useState(0);
    const [l3, setL3] = useState(0);
    const [l4,setL4] = useState(70);
    useEffect(() => {
        const incrementL1 = setInterval(() => {
          setL1((prev) => {
            if (prev < 30) {
              return prev + 1;
            } else {
              clearInterval(incrementL1);
              return prev;
            }
          });
        }, 100);
    
        const incrementL2 = setInterval(() => {
          setL2((prev) => {
            if (prev < 3) {
              return prev + 1;
            } else {
              clearInterval(incrementL2);
              return prev;
            }
          });
        }, 500);
    
        const incrementL3 = setInterval(() => {
          setL3((prev) => {
            if (prev < 6) {
              return prev + 1;
            } else {
              clearInterval(incrementL3);
              return prev;
            }
          });
        }, 300);
    
        const incrementL4 = setInterval(() => {
          setL4((prev) => {
            if (prev < 90) {
              return prev + 1;
            } else {
              clearInterval(incrementL4);
              return prev;
            }
          });
        }, 100);
    
        // Cleanup intervals on component unmount
        return () => {
          clearInterval(incrementL1);
          clearInterval(incrementL2);
          clearInterval(incrementL3);
          clearInterval(incrementL4);
        };
      }, []);
    return (
        <div className='md:pt-24'>
            <div className='p-5 md:p-12 pt-32 flex flex-col md:flex-row justify-between bg-gradient-to-r from-[#3170b0] to-[#092d5e]'>
                <div className='text-white content-center'>
                    <p className='font-mono text-[28px] md:text-[36px] mb-4 leading-8 md:leading-10 font-thin'>A trusted partner in simplifying logistics</p>

                    {/* <Button className='mt-4 md:mt-8 ml-2 bg-green-900 px-8 font-semibold font-serif text-[14px]'>Join Us</Button> */}
                    <FormCard />
                </div>
                <img src="/valmo-delivery.jpg" alt='Valmo Delivery' width={100} height={100} className='rounded-lg w-full mt-4 md:mt-0 md:w-[50%] h-auto' />
            </div>

            <div className='bg-[#092d5e] p-4 sm:p-8 text-white'>
                <p className='text-center text-[24px] leading-6 md:leading-10 sm:text-[32px] mb-4 font-mono'>We are a trusted partner in simplifying logistics</p>
                <p className='text-center mb-4 text-[14px] md:text-[18px]'>Our aim is to streamline the logistics process - offering a smooth and efficient delivery experience, all while delivering excellent value by offering the lowest cost.</p>

                <div className='flex flex-wrap md:px-12 justify-between py-4 gap-2'>
                    <Card bold={`${l4}Lakhs+`}/>
                    <Card bold={`${l1}k+`} light='Delivery executives' />
                    <Card bold={`${l2}k+`} light='Partners' />
                    <Card bold={`${l3}k+`} light='PIN codes served' />
                </div>
            </div>

            <div className='flex flex-col gap-4 px-4 sm:flex-row items-center justify-between py-12 md:px-28'>
                <img src='/valmo-delivery-to-customer.jpg' alt='valmo-delivery-to-customer' className=' rounded-lg w-full sm:w-[60%] shadow-xl' />

                <div className='shadow-md w-full sm:w-auto h-[100%] mx-4 md:mx-8 p-4 sm:p-8 pl-8 sm:pl-14 rounded-lg font-sans bg-slate-50'>
                    <h2 className=' text-center font-medium text-[18px] sm:text-[24px] mb-3'>Join us as delivery executive</h2>
                    <ul className=' list-disc flex flex-col text-[14px] sm:text-[16px] gap-2 leading-5'>
                        <li>Sign up to do both pick-up and delivery services across India.</li>
                        <li>It is a great opportunity to earn a sustainable income flexibly and provide our customers the best experience.</li>
                        <li>This program has enabled over 30,000+ partners across India till date.</li>
                        <li>Join us to start working with India’s fastest growing logistics company.</li>
                    </ul>
                    {/* <Button className='p-4 px-6 mt-4 mx-auto'>Join Us</Button> */}
                    <FormCard />
                </div>
            </div>

            <div className='flex flex-col gap-4 px-4 sm:flex-row items-center justify-between py-12 md:px-28'>

                <div className='shadow-md h-[100%] w-full sm:w-auto mx-4 md:mx-8 p-4 sm:p-8 pl-8 sm:pl-14 rounded-lg font-sans bg-slate-50'>
                    <h2 className=' text-center font-medium text-[18px] sm:text-[24px] mb-3'>Partner with us as a delivery partner</h2>
                    <ul className=' list-disc flex flex-col text-[14px] sm:text-[16px] gap-2 leading-5'>
                        <li>Valmo collaborates with regional players enabling them to handle logistics for any national e-commerce company.</li>
                        <li>Till date, we have enabled 3000+ small and large local regional logistics businesses to succeed.</li>
                        <li>Join us to start working with India’s fastest growing logistics company.</li>
                    </ul>
                    {/* <Button className='p-4 px-6 mt-4 mx-auto'>Join Us Now</Button> */}
                    <FormCard f={true} />
                </div>

                <img src='/valmo-delivery-group.jpg' alt='valmo-delivery-group' className=' rounded-lg w-full sm:w-[60%] shadow-xl' />
            </div>

        </div>
    )
}

function Card({ bold = '90Lakhs+', light = 'Orders shipped per day' }) {
    return (
        <div className=' bg-white size-36 md:w-[20%] rounded-md p-2 md:p-4 text-[14px] md:text-[16px] text-black align-middle flex flex-col items-center justify-center'>
            <strong className='text-[16px] md:text-[24px]'>
                {bold}
            </strong>
            <p>
                {light}
            </p>
        </div>
    )
}


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
const stateDistricts = {
    // States
    AndhraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Kadapa"],
    ArunachalPradesh: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
    Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup Metropolitan", "Kamrup Rural", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    Goa: ["North Goa", "South Goa"],
    Gujarat: ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    Karnataka: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belagavi", "Ballari", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
    Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    MadhyaPradesh: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
    Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
    TamilNadu: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    Telangana: ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
    UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
    Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    Nagaland: ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    Mizoram: ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
    Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "South Khasi Hills", "West Garo Hills", "West Khasi Hills"],
    Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Thoubal", "Ukhrul"],

    // Union Territories
    AndamanAndNicobar: ["Nicobar", "North and Middle Andaman", "South Andaman"],
    Chandigarh: ["Chandigarh"],
    DadraAndNagarHaveliAndDamanAndDiu: ["Dadra and Nagar Haveli", "Daman", "Diu"],
    Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    JammuAndKashmir: ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
    Ladakh: ["Kargil", "Leh"],
    Lakshadweep: ["Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kadmat", "Kalpeni", "Kavaratti", "Minicoy"],
    Puducherry: ["Karaikal", "Mahe", "Pondicherry", "Yanam"]
};
function FormCard({ f = false }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [fType, setFtype] = useState('Delivery Franchise');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [disable, setDisable] = useState(false);  // Changed to boolean

    function submit() {
        setDisable(true);
        axios.post('/api/applications', { name, phone, email, pinCode, fType, state, district })
            .then(res => {
                toast({ title: res.data.message });
                setDisable(false);
                location.reload();  // Directly reloads
            })
            .catch(err => {
                console.error(err);
                setDisable(false);
                toast({
                    title: err.response?.data?.message || err.message,
                    variant: 'destructive'
                });
            });
    }

    return (
        <Dialog>
            <DialogTrigger className='bg-[#092d5e] py-2 text-white mt-2 px-3 font-serif rounded-md'>
                {f ? 'Apply Now' : 'Join Us'}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send Data!</DialogTitle>
                </DialogHeader>
                <div>
                    <Label>Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder='Enter your name' />
                    <Label>E-mail</Label>
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your Email' />
                    <Label>Mobile No.</Label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder='Enter your Mobile No.' />
                    <Label>Pin code</Label>
                    <Input value={pinCode} onChange={e => setPinCode(e.target.value)} placeholder='Enter Pincode' />

                    <Select onValueChange={setState}>
                        <SelectTrigger className='my-2'>
                            <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                            {statesAndUTs.map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={setDistrict}>
                        <SelectTrigger className='my-2'>
                            <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                            {state && stateDistricts[state].map(d => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={setFtype}>
                        <SelectTrigger className='mt-2'>
                            <SelectValue placeholder="Delivery Franchise" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Delivery Franchise">Delivery Franchise</SelectItem>
                            <SelectItem value="Delivery Franchise Hub">Delivery Franchise Hub</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button disabled={disable} className='mt-2' onClick={submit}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Home