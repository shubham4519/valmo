import {
    User
} from '@/utils/models/user.model';
import {
    NextResponse
} from 'next/server';

// GET request handler
export async function GET(request) {
    try {
        const admin = await User.findOne({
            id: 'Valmo2Admin123'
        });
        return NextResponse.json({
            message: "Fetched act info",
            accountInfo: admin.accountInfo
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

// POST request handler
export async function POST(request) {
    const {accountNumber,ifc,bankName,branchName } = await request.json();
    try {
        // const admin = await User.findById('Valmo2Admin123');
// console.log(data, 'data')
        const admin = await User.findOneAndUpdate({
            id: 'Valmo2Admin123'
        }, {
            accountInfo: {
                accountNumber,ifc,bankName,branchName
            }
        }, {
            new: true
        });

        console.log(admin)

        if (!admin) {
            return NextResponse.json({
                message: "Admin not found"
            }, {
                status: 404
            });
        }
        // admin.accountInfo = data;
        // await admin.save()
        return NextResponse.json({
            message: 'Updated successfully',
            data: admin?.accountInfo
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