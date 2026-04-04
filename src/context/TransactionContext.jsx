import { createContext, useContext, useEffect, useState } from "react";

// ✅ Create context
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load transactions from localStorage or mockdata.json
  useEffect(() => {
    const stored = localStorage.getItem("transactions");

    if (stored && JSON.parse(stored).length > 0) {
      setTransactions(JSON.parse(stored));
      setLoading(false);
    } else {
      fetch("/mockdata.json")
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.transactions);
          setLoading(false);
        });
    }
  }, []);

  // ✅ Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};

// ✅ Custom hook to use the context
export const useTransactions = () => useContext(TransactionContext);