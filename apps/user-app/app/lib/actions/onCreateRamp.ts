"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onCreateRamp(amount: number, provider:string){
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    const token = Math.random().toString()
    if(!userId){
        return {
            message: "user not logged in"
        }
    }
    
    

  const transaction=  await prisma.onRampTransaction.create({
        data:{
            userId : Number(userId),
            amount,
            status: "Processing",
            startTime: new Date(),
            provider,
            token
        }
    })
    console.log(transaction);
    

    return {
        message: "on ramped transaction added"

    }
}