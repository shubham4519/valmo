// import { connectDb } from "@/utils/dbconnect";
import {
    Form
} from "@/utils/models/forms.model";
import {
    User
} from "@/utils/models/user.model";
import {
    cookies
} from "next/headers";
import {
    NextResponse
} from "next/server";

import {
    v2 as cloudinary
} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dj3cuvcul',
    api_key: '732658812763723',
    api_secret: process.env.CLOUDINARY_SECRET || '1_uEyTactU7jySG5Ye0r5TOpGeA'
});

export async function GET() {
    try {
        const cookieStore = await cookies()
        const userId = cookieStore.get('userId');
        console.log('user cookie is', userId)
        const userDetails = await User.findById(userId.value);
        if (!userDetails) {
            return NextResponse.json({
                message: 'Invalid user!'
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            message: 'Successfully fetched !',
            data: userDetails
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        })
    }
}

export async function POST(req) {
    try {
        const data = await req.formData();
        // const {formId, id, name, email, phone, address, status, password, city, district, state, pinCode, fType, refundAmount} = data;

        const formId = data.get('formId');
        const id = data.get('id');
        const name = data.get('name');
        const email = data.get('email');
        const phone = data.get('phone');
        const address = data.get('address');
        const status = data.get('status');
        const password = data.get('password');
        const city = data.get('city');
        const district = data.get('district');
        const state = data.get('state');
        const pinCode = data.get('pinCode');
        const fType = data.get('fType');
        const refundAmount = data.get('refundAmount');
        const image = data.get('image');
        const pdf = data.get('pdf');

         let accountInfo = null;
    const accountInfoStr = data.get("accountInfo");
    if (accountInfoStr) {
      try {
        accountInfo = JSON.parse(accountInfoStr);
      } catch (err) {
        console.error("Invalid accountInfo JSON:", err);
      }
    }


        const buffer = Buffer.from(await image.arrayBuffer());
        const bufferPdf = Buffer.from(await pdf.arrayBuffer());

        // Upload to Cloudinary
        const uploadedImg = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'valmoPics'
            }, (error, result) => {
                if (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    reject(error);
                } else {
                    console.log("File uploaded to Cloudinary:", result.url);
                    resolve(result.url);
                }
            }).end(buffer)
        });

        const uploadedPdf = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                folder: 'valmoPdfs'
            }, (error, result) => {
                if (error) {
                    console.error("Error uploading Pdf to Cloudinary:", error);
                    reject(error);
                } else {
                    console.log("PDF File uploaded to Cloudinary:", result.url);
                    resolve(result.url);
                }
            }).end(bufferPdf)
        });

        console.log(formId, uploadedImg)
        const user = await User.findOne({
            id
        })
        console.log(formId, 'jello js')
        if (formId && formId != 'undefined') {
            console.log(formId)
            const form = await Form.findById(formId);
            form.active = false;
            await form.save();
        }

        if (user) {
            return NextResponse.json({
                message: "Id already used"
            }, {
                status: 400
            })
        }
        const newUser = new User({
            id,
            name,
            email,
            phone,
            address,
            status,
            password,
            city,
            district,
            state,
            pinCode,
            fType,
            refundAmount,
            image: uploadedImg,
            pdf: uploadedPdf,

            accountInfo
        })
        await newUser.save();

        return NextResponse.json({
            message: 'Successfully saved user details'
        }, {
            status: 201
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        })
    }
}

export async function PUT(req) {
    try {
        const rawData = await req.json();
        await User.findByIdAndUpdate(rawData.docid, rawData.data)

        return NextResponse.json({
            message: 'Successfully updated user details'
        }, {
            status: 201
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        })
    }
}

export async function PATCH(req) {
    try {
        // console.log(req)
        const data = await req.json();
        console.log(data)
        await User.findByIdAndDelete(data.docid);
        // console.error(error);
        return NextResponse.json({
            message: "Deleted Successfully !"
        }, {
            status: 200
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        })
    }
}


