import React, { useState } from "react";
import { useRole } from "../../context/RoleContext";
import { useTransactions } from "../../context/TransactionContext";
import Loading from "../Loading/Loading";
import { useWallet } from "../../context/WalletContext.jsx";
import { toast } from "react-toastify";

const Transactions = () => {
    const { role } = useRole();
    const { transactions, setTransactions, loading } = useTransactions();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [sort, setSort] = useState("latest");
    const { wallets } = useWallet();

    const [form, setForm] = useState({
        id: null,
        month: "",
        amount: "",
        category: "",
        type: "expense",
        year: "",
        walletId: null,
    });

    const [isEditing, setIsEditing] = useState(false);


    if (loading) {
        return <Loading />;
    }

    const filteredTransactions = transactions.filter((t) => {
        const matchSearch = (t.category || "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchType =
            typeFilter === "all" ? true : t.type === typeFilter;

        return matchSearch && matchType;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sort === "latest") return b.id - a.id;
        if (sort === "oldest") return a.id - b.id;
        if (sort === "amount-high") return b.amount - a.amount;
        if (sort === "amount-low") return a.amount - b.amount;
        return 0;
    });

    const handleAdd = () => {
        if (!form.amount || !form.category || !form.year || !form.month || !form.type) {
            toast.warning("Please fill all fields");
            return;
        }


        const newData = {
            ...form,
            id: Date.now(),
            amount: Number(form.amount),
            year: Number(form.year),
            walletId: form.walletId || null,
        };


        setTransactions(prev => [...prev, newData]);
        toast.success("Transaction Added Successfully! ✅");
        resetForm();
    };




    const handleEdit = (t) => {
        setForm(t);
        setIsEditing(true);
        document.getElementById("transaction-form")?.scrollIntoView({
            behavior: "smooth",
        });
        toast.warning("Transaction Information Set To the Top Field! Check and Edit! ");
    };

    const handleUpdate = () => {
    


        setTransactions(prev =>
            prev.map(t =>
                t.id === form.id
                    ? { ...form, amount: Number(form.amount), year: Number(form.year) }
                    : t
            )
        );

        toast.success("Transaction Updated Successfully! ✅");
        resetForm();
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete?")) {
            setTransactions(prev =>
                prev.filter(t => t.id !== id)
            );
            toast.error("Transaction deleted Successfully!");
        }
    };

    const resetForm = () => {
        setForm({
            id: null,
            month: "",
            amount: "",
            category: "",
            type: "expense",
            year: "",
            walletId: null,
        });
        setIsEditing(false);
    };


    return (
        <div className="p-6 page-slide-in-left">
            <div className="text-center">
                <h1 className="text-2xl text-primary font-bold p-4">
                    Financial Transactions
                </h1>

            </div>
            {/* admin form */}
            {role === "Admin" && (
                <div className="text-center gap-3 mb-4" id="transaction-form">
                    <h1 className="text-xl text-base-300 bg-primary w-full p-3 font-bold my-5">
                        Only Admins Can Manage Transactions
                    </h1>

                    <select
                        value={form.month}
                        onChange={(e) =>
                            setForm({ ...form, month: e.target.value })
                        }
                        className="border p-2 mr-2 gap-3 my-10"
                    >
                        <option value="">Select Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    {/* Wallet Select */}
                    <select
                        value={form.walletId || ""}
                        onChange={(e) =>
                            setForm({ ...form, walletId: Number(e.target.value) })
                        }
                        className="border p-2 mr-2"
                    >
                        <option value="">No Wallet</option>
                        {wallets.map(w => (
                            <option key={w.id} value={w.id}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Year"
                        value={form.year}
                        onChange={(e) =>
                            setForm({ ...form, year: e.target.value })
                        }
                        className="border p-2 mr-2"
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
                        className="border p-2 mr-2"
                    />

                    <select
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="border p-2 mr-2"
                    >
                        <option value="">Select Category</option>
                        <option value="Salary">Salary</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Investment">Investment</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>

                    <select
                        value={form.type}
                        onChange={(e) =>
                            setForm({ ...form, type: e.target.value })
                        }
                        className="border p-2 mr-2"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <button
                        onClick={isEditing ? handleUpdate : handleAdd}
                        className="bg-primary btn text-base-300 px-10 py-2 mb-2 rounded"
                    >
                        {isEditing ? "Update" : "Add"}
                    </button>
                </div>
            )}

            {/* FILTERS */}
            <div className="text-center">
                <p className="text-sm text-primary font-bold">
                    Monitor All Your Income & Expenses in One Place
                </p>
                <p className="text-xs text-base-content font-medium p-4 mb-5">
                    This transactions section provides a detailed and organized view of all your financial activities in one place.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">


                {/* Search By Catagory  */}
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" className="grow text-primary " placeholder="Search by category"
                        onChange={(e) => setSearch(e.target.value)} />
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>


                {/* Sort by expense/ income  */}
                <select
                    className="select select-bordered text-primary"
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                {/* Sort by latest/ oldest/ amount */}
                <select
                    className="select select-bordered text-primary"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="amount-high">Amount High → Low</option>
                    <option value="amount-low">Amount Low → High</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr className="bg-base-300 text-center">
                            <th>Month</th>
                            <th>Year</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                            {role === "Admin" && <th>Action</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {sortedTransactions.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            sortedTransactions.map((t) => (
                                <tr key={t.id} className="text-center">
                                    <td>{t.month}</td>
                                    <td>{t.year}</td>
                                    <td>{t.category}</td>
                                    <td>${t.amount}</td>

                                    <td
                                        className={
                                            t.type === "income"
                                                ? "text-green-500 font-bold"
                                                : "text-red-500 font-bold"
                                        }
                                    >
                                        {t.type}
                                    </td>

                                    {role === "Admin" && (
                                        <td>
                                            <button
                                                onClick={() => handleEdit(t)}
                                                className="btn btn-xs btn-accent mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className="btn btn-xs btn-error"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Transactions;