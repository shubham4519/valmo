import {
    cookies
} from "next/headers";
import {
    NextResponse
} from "next/server";

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('userId')
        return NextResponse.json({
            message: "Log out Successful !",
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong! please try again"
        }, {
            status: 500
        });
    }
}