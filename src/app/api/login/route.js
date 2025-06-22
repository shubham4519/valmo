import { Form } from "@/utils/models/forms.model";
import {
    User
} from "@/utils/models/user.model";
import {
    cookies
} from "next/headers";
import {
    NextResponse
} from "next/server";

export async function GET() {
    try {
        // const users = await Form.deleteMany();
        const users = await User.find({})


        // await user.save();
        return NextResponse.json({
            message: "Login Successful !",
            data: users,
            length:users.length
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        });
    }
}
export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const {
            id,
            password
        } = await req.json();
        const user = await User.findOne({
            id
        });

        if (user.password != password) {
            return NextResponse.json({
                message: "Invalid Credentials !"
            }, {
                status: 402
            });
        }

        const days = 30 * 24 * 60 * 60 * 1000;
        cookieStore.set('userId', user._id, {
            expires: Date.now() + days
        });
        console.log('hulu')
        return NextResponse.json({
            message: "Login Successful !",
            data: {
                userId: user._id,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        });
    }
}