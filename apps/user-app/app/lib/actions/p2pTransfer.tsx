"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions)
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "error while sending"
        }
    }

    const toUser = await prisma.user.findUnique({
        where: {
            number: to
        }
    })

    if (!toUser) {
        return {
            message: "error while sending"
        }
    }

    await prisma.$transaction(async (tx) => {
        const fromUser = await tx.user.findUnique({
            where: {
                id: Number(from)
            }, include: {
                Balance: true
            }
        })

        if (fromUser && fromUser.Balance.length > 0) {
            const balance = fromUser.Balance[0]?.amount;
            if (!balance || balance < amount) {
                return {
                    message: "error while sending"
                }
            }


            await tx.balance.update({
                where: {
                    userId: Number(from)
                },
                data: {
                    amount: {
                        decrement: amount
                    }
                }
            })

            await tx.balance.update({
                where: {
                    userId: toUser.id
                },
                data: {
                    amount: {
                        increment: amount
                    }
                }
            })

            await tx.p2pTransfer.create({
                data:{
                    amount,
                    fromUserId: Number(from),
                    toUserId:toUser.id,
                    timestamp: new Date()
                }
            })

        } else {
            return {
                message: "error while sending"
            }
        }



    })


}