import { Card } from "@repo/ui/card";

// Define types for transactions and possible error message
type Transaction = {
    timestamp: Date;
    amount: number;
    fromUserId: number;
    toUserId: number;
};

type TransactionsProps = {
    transactions: Transaction[] | { message: string };
};

export const P2pTransactions = ({
    transactions
}: TransactionsProps) => {
    if (Array.isArray(transactions)) {
        if (transactions.length === 0) {
            return (
                <Card title="Recent Transactions">
                    <div className="text-center pb-8 pt-8">
                        No Recent Transactions
                    </div>
                </Card>
            );
        }
        return (
            <Card title="Recent Transactions">
                <div className="pt-2">
                    {transactions.map((t, index) => (
                        <div key={index} className="flex justify-between">
                            <div>
                                <div className="text-sm">
                                    Received INR
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timestamp.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                + Rs {t.amount / 100}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        );
    } else {
        // Handle error message case
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    Error: {transactions.message}
                </div>
            </Card>
        );
    }
};
