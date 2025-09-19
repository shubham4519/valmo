'use client'
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
    UploadIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import axios from "axios"
import { Label } from "@/components/ui/label"


export default function Products() {
    const [data, setData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    useEffect(() => {
        let user = { data: { role: 'User' } };
        let Lusr = localStorage.getItem('user')
        // console.log(Lusr)
        if (Lusr && Lusr != 'undefined') {
            user = JSON.parse(localStorage.getItem('user'));
        }
        if (user.data.role !== 'Admin') {
            return window.location.href = '/login'
        }
        axios.get('/api/allApplications').then(res => {
            setData(res.data.data)
        }).catch(err => {
            console.log(err);
            toast({
                title: 'Please refreach page !',
                variant: 'destructive'
            })
        })
        axios.get('/api/applications').then(res => {
            setPendingData(res.data.data)
        }).catch(err => {
            console.log(err);
            toast({
                title: 'Please refreach page !',
                variant: 'destructive'
            })
        })
    }, [])
    return (
        <>
            <Tabs defaultValue="pending" className="w-full">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all" onClick={()=>{location.href='/admin'}}>All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="saved">Saved</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="all">
                   
                </TabsContent>
                <TabsContent value="pending">
                    <ProductsContainer products={pendingData} />
                </TabsContent>
            </Tabs>
        </>
    )
}



function ProductsContainer({ products }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription className="flex justify-between">
                    Manage your User and Save their Data.
                <Create ct ={'New'} />
                </CardDescription>

            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="md:table-cell">
                                Pin Code
                            </TableHead>
                            <TableHead className="md:table-cell">City</TableHead>
                            <TableHead className="md:table-cell">State</TableHead>
                            <TableHead className="md:table-cell">Franchise Type</TableHead>
                            <TableHead>
                                <span >Actions</span>
                            </TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            (products && products.length > 0) ? (
                                products.map(product => (
                                    <ProductCard key={product._id} formId={product._id} city={product.city} state={product.state} name={product.name} email={product.email} phone={product.phone} fType={product.fType} pinCode={product.pinCode} />
                                ))
                            ) : <TableRow><TableCell span='5'>No list</TableCell></TableRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </CardFooter>
        </Card>
    )
}


const ProductCard = ({ formId, name, email, phone, fType, city, state, pinCode }) => {
     function deleteDoc(){
        console.log(formId)
        axios.put('/api/applications', {no:'no use', formId}).then(res => {
            toast({
                title: res.data.message
            })
            setTimeout(() => {
                const url = new URL(window.location.href);
                url.searchParams.set('deleted', 'true'); // Add or update query parameter
                window.location.href = url.toString();    // Reload the page
            }, 100);
        }).catch(err => {
            console.log(err);
            toast({
                title: err.response?.data?.message || err.message
            })
        })
    }
    return (
        <TableRow>
            <TableCell className="font-medium">
                {name || "No name"}
            </TableCell>
            <TableCell>
                {/* <Badge variant="outline">Draft</Badge> */}
                {email || 'use@mail.co'}
            </TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell className="md:table-cell">{pinCode}</TableCell>
            <TableCell className="md:table-cell">
                {city}
            </TableCell>
            <TableCell>
                {state}
            </TableCell>
            <TableCell>
                {fType}
            </TableCell>
            <TableCell className="flex gap-2">
                 <Create formId={formId} />
                 <Button onClick={deleteDoc} variant='destructive'>Delete</Button>
            </TableCell>
        </TableRow>
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


const Create = ({ formId, ct }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [refundAmount, setRefundAmount] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [fType, setFtype] = useState('Delivery Franchise');
    const [status, setStatus] = useState('InActive');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('');
    const [pdf, setPdf] = useState('');

     // new fields
    const [ifc, setIfc] = useState(pifc);
    const [bankName, setBankName] = useState(pbankName);
    const [accountNumber, setAccountNumber] = useState(paccountNumber);
    const [branchName, setBranchName] = useState(pbranchName);

    const [disable, setDisable] = useState('false')

    function submit() {
        setDisable('true')
        if (!id || !name || !phone || !email || !refundAmount || !state || !address || !pinCode || !fType || !status || !district || !city || !password || !pdf) {
            console.log(id, name, phone, email, refundAmount, state, address, pinCode, fType, status, district, city, password)
            return toast({
                title: 'Invalid Submit! please fill form correctly',
                variant: 'destructive'
            })
        }

        const formData = new FormData();
        formData.append('image', img);
        formData.append('formId', formId);
        formData.append('id', id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('refundAmount', refundAmount);
        formData.append('state', state);
        formData.append('address', address);
        formData.append('pinCode', pinCode);
        formData.append('fType', fType);
        formData.append('status', status);
        formData.append('district', district);
        formData.append('city', city);
        formData.append('password', password);
        formData.append('pdf', pdf)

        formData.append('accountInfo', {ifc, bankName, accountNumber, branchName })
         

        axios.post('/api/user', formData).then(res => {
            toast({
                title: res.data.message
            })
            setDisable('false')
            setTimeout(() => {
                location.reload()
            }, 100);
        }).catch(err => {
            console.log(err);
            toast({
                title: err.response?.data?.message || err.message
            })
            setDisable('false')
        })
    }
    function handleImage(e) {
        setImg(e.target.files[0])
    }

    return (
        <Dialog>
            <DialogTrigger>
                {/* Save */}
                <div className={`border-[1px] p-1 px-3 rounded-md hover:bg-gray-200 border-gray-400 flex items-center h-full ${ct && 'bg-red-600 hover:bg-red-300 text-white'}`}>{ct ? ct : 'Save'}</div>
            </DialogTrigger>
            <DialogContent className='max-h-full overflow-auto'>
                <DialogHeader>
                    <DialogTitle>Save User data !!</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end gap-4">
                    {img && <div className='relative rounded-sm size-24 border-[2px] flex justify-center items-center bg-gray-200'>
                        <img className="max-w-full max-h-full" src={URL.createObjectURL(img)} />
                    </div>}
                    <div className='relative rounded-sm size-24 border-[2px] flex justify-center items-center bg-gray-200'>
                        <Input type='file' placeholder='Select a file' className='w-full h-full opacity-5 absolute z-10 cursor-pointer' onChange={handleImage} />
                        <div className='absolute text-center opacity-40'>
                            <UploadIcon className='size-10 ml-1' />
                            <p className=' opacity-40'>Upload</p>
                        </div>
                    </div>
                </div>

                <div>
                    <Label>Upload Approval Letter:</Label>
                    <Input type="file" accept=".pdf" onChange={e => setPdf(e.target.files[0])} />
                </div>

                <Input value={name} onChange={e => setName(e.target.value)} className='my-0' placeholder='Enter user name' />
                <Input value={email} type='email' onChange={e => setEmail(e.target.value)} className='my-0' placeholder='Enter user Email' />
                <Input value={phone} type='phone' onChange={e => setPhone(e.target.value)} className='my-0' placeholder='Enter user Phone' />
                <Textarea value={address} onChange={e => setAddress(e.target.value)} className='my-0' placeholder='Enter user Address' />

                <Select onValueChange={e => setStatus(e)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose Status" className={`${status == 'Active' && 'placeholder-green-800'} ${status == 'InActive' && 'placeholder-red-800'}`} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active" className='text-green-900'>Active</SelectItem>
                        <SelectItem value="InActive" className='text-red-800'>InActive</SelectItem>
                        {/* <SelectItem value="system">System</SelectItem> */}
                    </SelectContent>
                </Select>

                <Input value={city} onChange={e => setCity(e.target.value)} className='my-0' placeholder='Enter user City' />
                <Input value={pinCode} onChange={e => setPinCode(e.target.value)} className='my-0' placeholder='Enter user pin-code' />

                <Select onValueChange={e => setState(e)}>
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
                <Select onValueChange={e => setDistrict(e)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            state && stateDistricts[state].map(s => {
                                return <SelectItem key={s} value={s}>{s}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
                <Input value={refundAmount} onChange={e => setRefundAmount(e.target.value)} className='my-0' placeholder='Enter Refund Amount' />
                <Select onValueChange={v => setFtype(v)}>
                    <SelectTrigger className='mt-2'>
                        <SelectValue placeholder="Delivery Franchise" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Delivery Franchise">Delivery Franchise</SelectItem>
                        <SelectItem value="Delivery Franchise Hub">Delivery Franchise Hub</SelectItem>
                    </SelectContent>
                </Select>
                <Input value={id} onChange={e => setId(e.target.value)} className='my-0' placeholder='Create user id' />
                <Input value={password} onChange={e => setPassword(e.target.value)} className='my-0' placeholder='Create password' />

                 {/* 🔹 New Fields for Bank Details */}
                <Input value={ifc} onChange={e => setIfc(e.target.value)} placeholder='Enter IFC Code' />
                <Input value={bankName} onChange={e => setBankName(e.target.value)} placeholder='Enter Bank Name' />
                <Input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder='Enter Account Number' />
                <Input value={branchName} onChange={e => setBranchName(e.target.value)} placeholder='Enter Branch Name' />


                <Button disable={disable} onClick={submit} className="bg-green-900 text-white w-full p-2 rounded-md">
                    Save
                </Button>
            
            </DialogContent>
        </Dialog>

    )
}



