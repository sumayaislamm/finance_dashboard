import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("transactions");

    if (stored && JSON.parse(stored).length > 0) {
      setTransactions(JSON.parse(stored));
      setLoading(false);
    } else {
      fetch("/mockdata.json")
        .then(res => res.json())
        .then(data => {
          setTransactions(data.transactions);
          setLoading(false);
        });
    }
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, loading }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);