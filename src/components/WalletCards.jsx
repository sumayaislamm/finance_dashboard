import React from "react";
import { useWallet } from "../context/WalletContext";

const WalletCards = () => {
    const { wallets } = useWallet();

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {wallets.map(wallet => (
                <div
                    key={wallet.id}
                    className="bg-white dark:bg-base-200 p-4 rounded-xl shadow flex flex-col justify-between"
                    style={{ borderLeft: `6px solid ${wallet.color}` }}
                >
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{wallet.name}</h3>
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">${wallet.balance}</p>
                    </div>
                    <div className="mt-2">
                        <p className="text-xs text-gray-400">
                            {wallet.balance >= 0
                                ? "Positive Balance 👍"
                                : "Negative Balance ⚠️"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WalletCards;