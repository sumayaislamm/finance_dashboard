import React, { useState, useEffect } from "react";

// Load initial transactions
const initialTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

const Wallet = () => {
    const [wallets, setWallets] = useState([]);
    const [walletName, setWalletName] = useState("");
    const [transactions, setTransactions] = useState(initialTransactions);

    // Load wallets from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("wallets");
        if (saved) setWallets(JSON.parse(saved));
    }, []);

    // Persist wallets to localStorage
    useEffect(() => {
        localStorage.setItem("wallets", JSON.stringify(wallets));
    }, [wallets]);

    // Persist transactions to localStorage
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // Add a new wallet
    const handleAddWallet = () => {
        if (!walletName.trim()) return alert("Enter wallet name");

        const newWallet = {
            id: Date.now(),
            name: walletName.trim(),
            color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`, // random color for card
        };

        setWallets([...wallets, newWallet]);
        setWalletName("");
    };

    // Delete a wallet
    const handleDeleteWallet = (id) => {
        if (!confirm("Are you sure?")) return;
        setWallets(wallets.filter((w) => w.id !== id));
        setTransactions(transactions.filter((t) => t.walletId !== id));
    };

    // Calculate balance and total income/expense
    const getWalletSummary = (wallet) => {
        const walletTx = transactions.filter((t) => t.walletId === wallet.id);
        const income = walletTx
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = walletTx
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = income - expense;

        return { balance, income, expense };
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Wallets Dashboard</h2>

            {/* Add Wallet */}
            <div className="mb-6 flex gap-3">
                <input
                    type="text"
                    placeholder="New wallet name"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    className="flex-1 p-2 rounded border border-gray-300"
                />
                <button
                    onClick={handleAddWallet}
                    className="bg-blue-600 text-white px-4 rounded font-semibold"
                >
                    Add Wallet
                </button>
            </div>

            {/* Wallet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wallets.length === 0 && (
                    <p className="text-gray-500 col-span-full">
                        No wallets yet. Add one to get started.
                    </p>
                )}

                {wallets.map((w) => {
                    const { balance, income, expense } = getWalletSummary(w);

                    return (
                        <div
                            key={w.id}
                            className="relative p-5 rounded-xl shadow-lg text-white"
                            style={{ backgroundColor: w.color }}
                        >
                            <h3 className="text-xl font-semibold mb-3">{w.name}</h3>
                            <p className="text-lg mb-1">Balance: <span className="font-bold">{balance} BDT</span></p>
                            <p className="text-sm">Income: {income} BDT</p>
                            <p className="text-sm mb-3">Expense: {expense} BDT</p>

                            <button
                                onClick={() => handleDeleteWallet(w.id)}
                                className="absolute top-3 right-3 bg-white text-red-600 px-2 rounded font-bold text-sm"
                            >
                                Delete
                            </button>

                            {/* Optional: add quick action buttons */}
                            <div className="flex gap-2 mt-3">
                                <button className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
                                    Add Transaction
                                </button>
                                <button className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
                                    View Transactions
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Wallet;