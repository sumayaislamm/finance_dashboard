import React  from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

import { useRole } from "../../context/RoleContext";
import { useTransactions } from "../../context/TransactionContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router";

const Dashboard = () => {
    const { role } = useRole();
    const { transactions, loading } = useTransactions();

    // loading 
    if (loading) {
        return <Loading />;
    }
    if (transactions.length === 0) {
        return (
            <div className="text-center p-10">
                <h2>No data yet</h2>
                <p>Add transactions to see dashboard!</p>
            </div>
        );
    }

    // Total calculations
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    // Pie Chart data
    const pieData = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
            const existing = acc.find((e) => e.category === t.category);
            if (existing) existing.amount += t.amount;
            else acc.push({ category: t.category, amount: t.amount });
            return acc;
        }, []);

    // Line Chart data

    const monthOrder = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    // Group by Month + Year
    const groupedData = transactions.reduce((acc, t) => {
        const key = `${t.year}-${t.month}`;

        if (!acc[key]) {
            acc[key] = {
                month: t.month,
                year: t.year,
                income: 0,
                expense: 0,
            };
        }

        if (t.type === "income") {
            acc[key].income += t.amount;
        } else {
            acc[key].expense += t.amount;
        }

        return acc;
    }, {});

    // Convert to array + sort
    const sortedData = Object.values(groupedData).sort((a, b) => {
        if (a.year === b.year) {
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        }
        return a.year - b.year;
    });

    // Final line data
    const lineData = sortedData.map((m) => ({
        month: `${m.month.slice(0, 3)} ${m.year}`, // 👉 Jan 2025
        income: m.income,
        expense: m.expense,
        balance: m.income - m.expense,
    }));

    const colors = ["#60a5fa", "#facc15", "#f87171", "#34d399"];

    const highestExpenseCategory = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const topCategory = Object.entries(highestExpenseCategory).sort(
        (a, b) => b[1] - a[1]
    )[0];
    return (
        <div className="p-3 md:p-6 bg-base-100 min-h-screen page-slide-in-left">
            <div className="text-center">
                <h1 className="text-2xl text-primary font-bold mb-3 p-4 ">
                    Dashboard Overview
                </h1>

                <p className="text-xs text-base-content font-medium p-4 mb-5">
                    This dashboard provides a clear and concise overview of your financial
                    activity through interactive summary cards and visual charts. It
                    highlights key metrics such as total balance, income, and expenses,
                    allowing users to quickly understand their financial status. The
                    balance trend chart offers a time-based view of financial growth,
                    while the categorical visualization breaks down spending patterns
                    across different categories. Together, these elements help users track
                    performance, identify trends, and make informed financial decisions
                    with ease.
                </p>
                <div className="text-center my-4">
                    {totalExpense > totalIncome ? (
                        <p className="text-red-500 font-semibold">
                            You are spending more than earning ⚠️
                        </p>
                    ) : (
                        <p className="text-green-500 font-semibold">
                            Your finances are healthy 👍
                        </p>
                    )}
                </div>
                <div className="grid md:grid-cols-3 gap-4 my-6 ">

                    <div className="bg-base-200 p-4 rounded-xl text-center">
                        <h3 className="font-semibold">Top Spending Category</h3>
                        <p className="text-lg font-bold text-red-500">
                            {topCategory ? topCategory[0] : "N/A"}
                        </p>
                    </div>

                    <div className="bg-base-200 p-4 rounded-xl text-center">
                        <h3 className="font-semibold">Financial Health</h3>
                        <p className={`font-bold ${totalBalance >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {totalBalance >= 0 ? "Healthy ✅" : "Overspending ⚠️"}
                        </p>
                    </div>

                    <div className="bg-base-200 p-4 rounded-xl text-center">
                        <h3 className="font-semibold">Savings Rate</h3>
                        <p className="font-bold text-primary">
                            {totalIncome > 0
                                ? ((totalBalance / totalIncome) * 100).toFixed(1)
                                : 0}%
                        </p>
                    </div>

                </div>
           
            
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* LEFT */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">

                    {/* Summary */}
               
                    <div>
                        <h2 className="text-center text-lg font-semibold pb-2">
                            Financial Summary
                        </h2>

                        <div className="stats bg-base-100 flex justify-center border-base-300 border">
                            <div className="stat">
                                <div className="stat-title font-bold">Account balance</div>
                                <div className="stat-value">${totalBalance}</div>

                                {role === "Admin" && (
                                    <Link to="/transactions">
                                        <button className="btn btn-xs bg-primary text-base-300">
                                            Add Balance
                                        </button>
                                    </Link>
                                )}
                            </div>

                            <div className="stat">
                                <div className="stat-title font-bold">Income</div>
                                <div className="stat-value">${totalIncome}</div>

                                {role === "Admin" && (
                                    <Link to="/transactions">
                                        <button className="btn btn-xs bg-primary text-base-300">
                                            Add Income
                                        </button>
                                    </Link>
                                )}
                            </div>

                            <div className="stat">
                                <div className="stat-title font-bold">Expenses</div>
                                <div className="stat-value">${totalExpense}</div>

                                {role === "Admin" && (
                                    <Link to="/transactions">
                                        <button className="btn btn-xs bg-primary text-base-300">
                                            Add Expenses
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="card bg-base-200 p-3 md:p-4 shadow rounded-xl">
                        <h2 className="text-center text-lg font-semibold mb-3">
                            Expenses by Category
                        </h2>

                        <div className="w-full h-80 md:h-96">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="amount"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={colors[index % colors.length]} />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="card bg-base-200 p-3 md:p-4 shadow rounded-xl">
                        <h2 className="text-center text-lg font-semibold mb-3">
                            Balance Trend
                        </h2>

                        <div className="w-full h-80 md:h-96">
                            <ResponsiveContainer>
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />

                                    <Line type="monotone" dataKey="balance" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="income" stroke="#34d399" />
                                    <Line type="monotone" dataKey="expense" stroke="#f87171" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Explanation Section */}
                    <div className="card bg-base-100 p-3 md:p-4 shadow rounded-xl">
                        <h3 className="text-md font-semibold mb-2">How to read this Line chart:</h3>
                        <ul className="list-disc list-inside text-sm text-base-content">
                            <li><span className="font-semibold text-blue-600">Balance:</span> Shows your account balance over time.</li>
                            <li><span className="font-semibold text-green-600">Income:</span> Represents all incoming money (salary, freelance, investments) each month.</li>
                            <li><span className="font-semibold text-red-600">Expense:</span> Represents money spent each month.</li>
                            <li>Compare these lines to understand which days you earned more or spent more, and how your balance changed accordingly.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;