"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
 

export async function p2p (){
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    if(!userId){
        return {
            message: "user not logged in"
        }
    }
    const transaction = prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {
                    fromUserId: userId

                }, 
                {
                    toUserId: userId
                }
            ] 
        }
    })
    

}