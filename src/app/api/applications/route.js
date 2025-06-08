import { Form } from "@/utils/models/forms.model";
import { NextResponse } from "next/server";
import {
    Resend
} from 'resend';


export async function GET() {
    try {
        const applications = await Form.find({active:true});
        return NextResponse.json({message:'Successfully fetched', data:applications}, {status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Something went wrong please try again'},{status:500})
    }
}
export async function POST(req) {
    try {
        const data = await req.json();
        const {
            name,
            email,
            phone,
            city,
            district,
            state,
            pinCode,
            fType
        } = data
        if (!name || !email || !phone) {
            return NextResponse.json({
                message: "Invalid Data Please Fill Form Correctly"
            }, {
                status: 400
            })
        }

        const resend = new Resend('re_cLE8qveK_3KpdMdT6Rem87mL8UVsDCPq8');

        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'hello@registrationmeesho-valmo.in',
            subject: 'New Form Submission',
            html: `
        <h3>New Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>District:</strong> ${district}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Pin Code:</strong> ${pinCode}</p>
        <p><strong>Form Type:</strong> ${fType}</p>
  `
        });

        return NextResponse.json({
            message: "Application submitted Successfully"
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: 'Something went wrong please try again'
        }, {
            status: 500
        })
    }
}
