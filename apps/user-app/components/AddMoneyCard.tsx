"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import jwt from "jsonwebtoken"
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@repo/db/client";


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [bank, setBank] = useState(SUPPORTED_BANKS[0]?.name);
    const [amount, Setamount] = useState("")

    function handleChange(value: string) {
        Setamount(value);
        
        
    }

   async function handleSubmit() {
       
        const session = await getServerSession(authOptions);

        // const ramp = prisma.onRampTransaction.create({
        //     data:{

        //     }
        // })

        window.location.href = redirectUrl || "";
    }



    return <Card title="Add Money">
        <div className="w-full">

            <TextInput label={"Amount"} placeholder={"Amount"} onChange={handleChange} />

            <div className="py-4 text-left">
                Bank
            </div>
            <Select
                onSelect={(key: string, value: string) => {
                    setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                    setBank(SUPPORTED_BANKS.find(x => x.name === key)?.name || "");
                }}
                options={SUPPORTED_BANKS.map(x => ({
                    key: x.name,
                    value: x.name
                }))}
            />

            <div className="flex justify-center pt-4">
                <Button onClick={handleSubmit}>
                    Add Money
                </Button>
            </div>
        </div>
    </Card>
}