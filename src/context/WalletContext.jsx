import { createContext, useContext, useEffect, useState } from "react";
import { useTransactions } from "./TransactionContext";
import mockdata from "../../public/mockdata.json"; 

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { transactions } = useTransactions();
  const [wallets, setWallets] = useState([]);

  // Load wallets from localStorage or mockdata
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wallets"));
    if (saved && saved.length > 0) {
      setWallets(saved);
    } else {
      setWallets(mockdata.wallets || []);
      localStorage.setItem(
        "wallets",
        JSON.stringify(mockdata.wallets || [])
      );
    }
  }, []);

  // Save wallets to localStorage whenever they change
  useEffect(() => {
    if (wallets.length > 0) {
      localStorage.setItem("wallets", JSON.stringify(wallets));
    }
  }, [wallets]);

  // Add wallet
  const addWallet = (name) => {
    if (!name.trim()) return;
    const newWallet = {
      id: Date.now(),
      name,
      number: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    };
    setWallets((prev) => [...prev, newWallet]);
  };

  // Delete wallet
  const deleteWallet = (id) => {
    setWallets((prev) => prev.filter((w) => w.id !== id));

    const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
    const updatedTx = savedTx.filter((t) => t.walletId !== id);
    localStorage.setItem("transactions", JSON.stringify(updatedTx));
  };

  // Calculate real-time balance for each wallet
  const walletsWithBalance = wallets.map((wallet) => {
    const walletTx = transactions.filter((t) => t.walletId === wallet.id);
    const balance = walletTx.reduce(
      (sum, t) => (t.type === "income" ? sum + t.amount : sum - t.amount),
      0
    );
    return { ...wallet, balance, history: walletTx };
  });

  return (
    <WalletContext.Provider
      value={{ wallets: walletsWithBalance, addWallet, deleteWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook
export const useWallet = () => useContext(WalletContext);