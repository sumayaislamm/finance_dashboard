import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");

    if (stored) {

      // Load whatever is in localStorage, even if it's []
      setTransactions(JSON.parse(stored));
      setLoading(false);
    } else {

      // First time load from mockdata.json
      fetch("/mockdata.json")
        .then(res => res.json())
        .then(data => {
          const initialData = data.transactions || [];
          setTransactions(initialData);
          localStorage.setItem("transactions", JSON.stringify(initialData)); // save first load
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    // Only write to localStorage if not loading
    if (!loading) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);