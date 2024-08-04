import express, { urlencoded } from "express";
import db from "@repo/db/client";
import jwt from "jsonwebtoken";
import z from "zod"
import 'dotenv/config'
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/hdfcwebhook", async (req, res) => {




    const secret = process.env.BANK_SECRET;
    if (!secret) {
        return res.status(500).send({ message: 'BANK_SECRET environment variable is not defined' });
    }
    const data = z.object({
        token: z.string(),
        userId: z.string(),
        amount: z.string()
    })

    const body: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    };

    try {


        data.parse(body)
        // console.log(`this is sbody`, body);

        const token = jwt.verify(body.token, secret)
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(body.userId)
                },
                data: {
                    amount: {

                        increment: Number(body.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: body.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);
        const decoded = jwt.decode(body.token, { complete: true }) as jwt.JwtPayload;
        
        
        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);