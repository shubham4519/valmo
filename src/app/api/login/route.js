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
        const user = new User({
            name: "Valmo Admin",
            phone: '1111111111',
            email: 'valmoadmin2@gmail.co',
            id: 'Valmo2Admin123',
            password: 'Valmo/@123?Admin*2',
            role: 'Admin'
        })

        const result = await Form.deleteMany({
            phone: 9431636036
        });
        // const aura = await User.find({})


        // await user.save();
        return NextResponse.json({
            message: "Login Successful !",
            data: {
                userId: user._id,
                docs: `${result.deletedCount} dlted`,
                // aura,
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