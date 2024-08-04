"use server"
import { SendCard } from "../../../components/SendCard";
import { P2pTransactions } from "../../../components/p2pTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

import prisma from "@repo/db/client";
 
async function p2p() {
    const session = await getServerSession(authOptions)
    const userId = session.user.id as number
    if (!userId) {
        return {
            message: "user not logged in"
        }
    }
    const transaction = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                {
                    fromUserId: Number(userId),
                    

                },
                {
                    toUserId: Number(userId)
                }
            ]
        },
        include: {
            fromUser: true,
            toUser: true
        }
    })

    return transaction;


}

export default async function () {
    
    const transactions = await p2p();
    console.log( `565656565`);

    console.log(transactions);
    console.log( `565656565`);
    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
            <div >
                <SendCard />
            </div>
            <div>

                <div className="pt-4">

                    <P2pTransactions transactions={transactions} />

                </div>
            </div>
        </div>
    </div>
}