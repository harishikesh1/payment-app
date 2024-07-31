import express from "express";
import db from "../../../packages/db/src"
const app = express()

app.post("/hdcfWebhook", async (req, res) => {

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount,
    };

    db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount: {
                increment: paymentInformation.amount
            }
        }
    });

    db.onRampTransaction.update({
        where:{
            token: paymentInformation.token
        },
        data:{
            status:"Success"
        }
    })
    res.json({
        message:"captured"
    })



})




app.listen(4000, () => {
    console.log(`server listening on 4000`);

})
