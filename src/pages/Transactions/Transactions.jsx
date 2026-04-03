import React, { useEffect, useState } from "react";

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [role, setRole] = useState("Viewer");

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const [form, setForm] = useState({
        id: null,
        date: "",
        amount: "",
        category: "",
        type: "expense"
    });

    const [isEditing, setIsEditing] = useState(false);

    // ✅ Load data from public
    useEffect(() => {
        fetch("/mockdata.json")
            .then(res => res.json())
            .then(data => setTransactions(data.transactions));
    }, []);

    // 🔍 Filter
    const filteredTransactions = transactions.filter((t) => {
        const matchSearch = t.category
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchType =
            typeFilter === "all" ? true : t.type === typeFilter;

        return matchSearch && matchType;
    });

    // ➕ Add
    const handleAdd = () => {
        const newData = {
            ...form,
            id: Date.now(),
            amount: Number(form.amount)
        };

        setTransactions([...transactions, newData]);
        resetForm();
    };

    // ✏️ Edit
    const handleEdit = (t) => {
        setForm(t);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        const updated = transactions.map((t) =>
            t.id === form.id ? form : t
        );
        setTransactions(updated);
        resetForm();
    };

    // ❌ Delete
    const handleDelete = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const resetForm = () => {
        setForm({
            id: null,
            date: "",
            amount: "",
            category: "",
            type: "expense"
        });
        setIsEditing(false);
    };

    return (
        <div className="p-6">

            {/* Role Switch */}
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 mb-4"
            >
                <option>Viewer</option>
                <option>Admin</option>
            </select>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <input
                    placeholder="Search"
                    className="border p-2"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border p-2"
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            {/* Admin Form */}
            {role === "Admin" && (
                <div className="mb-4 border p-4">
                    <input type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="border p-2 mr-2" />

                    <input type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="border p-2 mr-2" />

                    <input type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="border p-2 mr-2" />

                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="border p-2 mr-2"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <button
                        onClick={isEditing ? handleUpdate : handleAdd}
                        className="bg-blue-500 text-white px-3 py-2"
                    >
                        {isEditing ? "Update" : "Add"}
                    </button>
                </div>
            )}

            {/* Table */}
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Type</th>
                        {role === "Admin" && <th>Action</th>}
                    </tr>
                </thead>

                <tbody>
                    {filteredTransactions.map((t) => (
                        <tr key={t.id}>
                            <td>{t.date}</td>
                            <td>{t.category}</td>
                            <td>{t.amount}</td>
                            <td>{t.type}</td>

                            {role === "Admin" && (
                                <td>
                                    <button onClick={() => handleEdit(t)}>Edit</button>
                                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Transactions;