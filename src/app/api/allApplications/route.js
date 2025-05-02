
import { User } from "@/utils/models/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const applications = await User.find({role:'User'});
        return NextResponse.json({message:'Successfully fetched', data:applications}, {status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Something went wrong please try again'},{status:500})
    }
}