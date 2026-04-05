import React from "react";
import { useWallet } from "../../context/WalletContext";
import { useTransactions } from "../../context/TransactionContext";
import { Link } from "react-router";
import { useRole } from "../../context/RoleContext";

const Wallets = () => {
    const { wallets } = useWallet();
    const { transactions } = useTransactions();
    const { role } = useRole();

    // Calculate balance for each wallet dynamically
    const walletsWithBalance = wallets.map((wallet) => {
        const walletTx = transactions.filter((t) => t.walletId === wallet.id);
        const balance = walletTx.reduce((sum, t) => {
            return t.type === "income" ? sum + t.amount : sum - t.amount;
        }, 0);
        return { ...wallet, balance, history: walletTx };
    });

    return (
        <div className="p-4">
            {/* Wallet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {walletsWithBalance.map((wallet) => (
                    <div
                        key={wallet.id}
                        className="p-4 rounded-xl shadow-md flex flex-col justify-between"
                        style={{ backgroundColor: wallet.color }}
                    >
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white">{wallet.name}</h3>
                            <p className="text-white mb-2">{wallet.number}</p>
                            <p className="text-white font-bold text-2xl">
                                Balance: {wallet.balance} BDT
                            </p>
                        </div>
                        {role === "Admin" && (
                            <div className="flex justify-center gap-4 mt-4">
                                <Link to="/transactions">
                                    <button
                                        className="btn btn-xs bg-base-content shadow-none border-0 text-base-300"
                                    >
                                        Withdraw
                                    </button>
                                </Link>
                                <Link to="/transactions">
                                    <button
                                        className="btn btn-xs bg-base-content shadow-none border-0 text-base-300"
                                    >
                                        Add Money
                                    </button>
                                </Link>

                            </div>
                        )}
                    </div>
                ))}
            </div>


            {walletsWithBalance.map((wallet) => (
                <div key={wallet.id} className="mb-6">
                    <h4 className="font-bold mb-2 bg-primary text-lg text-base-300 py-5 text-center uppercase">{wallet.name} History:</h4>
                    <div className="overflow-x-auto max-h-96 w-full border rounded-lg">
                        <table className="table-auto w-full text-sm text-left">
                            <thead className="bg-base-300 sticky top-0">
                                <tr>
                                    <th className="px-2 py-1">#</th>
                                    <th className="px-2 py-1">Category</th>
                                    <th className="px-2 py-1">Type</th>
                                    <th className="px-2 py-1">Amount (BDT)</th>
                                    <th className="px-2 py-1">Month</th>
                                    <th className="px-2 py-1">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wallet.history.length > 0 ? (
                                    wallet.history.map((t, idx) => (
                                        <tr key={t.id} className="border-b">
                                            <td className="px-2 py-1">{idx + 1}</td>
                                            <td className="px-2 py-1">{t.category}</td>
                                            <td className="px-2 py-1">
                                                <span className={t.type === "income" ? "text-green-500" : "text-red-500"}>
                                                    {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-2 py-1">{t.amount}</td>
                                            <td className="px-2 py-1">{t.month}</td>
                                            <td className="px-2 py-1">{t.year}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-gray-500">
                                            No transactions yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Wallets;