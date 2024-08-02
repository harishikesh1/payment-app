"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import jwt from 'jsonwebtoken';
export async function onCreateRamp(amount: number, provider:string){
    const session = await getServerSession(authOptions)
    const userId = session.user.id
    const secret = String(process.env.BANK_SECRET) ;
    const token =  jwt.sign({userId, amount, provider,  status: "Processing", }, secret,{expiresIn: 60*500})
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