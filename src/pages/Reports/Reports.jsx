import React from "react";
import { useTransactions } from "../../context/TransactionContext";
import Loading from "../Loading/Loading";
import { useRole } from "../../context/RoleContext";

const Reports = () => {
    const { transactions, loading } = useTransactions();
    const { role } = useRole();

    if (loading) {
        return <Loading />;
    }

    // ================= SUMMARY =================
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // ================= GROUP BY MONTH =================
    const monthlyData = transactions.reduce((acc, t) => {
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

    const monthlyReports = Object.values(monthlyData);

    // ================= GROUP BY WEEK =================
    const getWeekNumber = (date) => {
        const d = new Date(date);
        const oneJan = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(((d - oneJan) / 86400000 + oneJan.getDay() + 1) / 7);
    };

    const weeklyData = transactions.reduce((acc, t) => {
        const week = getWeekNumber(t.date || new Date());

        if (!acc[week]) {
            acc[week] = {
                week,
                income: 0,
                expense: 0,
            };
        }

        if (t.type === "income") {
            acc[week].income += t.amount;
        } else {
            acc[week].expense += t.amount;
        }

        return acc;
    }, {});

    const weeklyReports = Object.values(weeklyData);

    // ================= EXPORT CSV =================
    const exportCSV = () => {
        const headers = ["Type", "Amount", "Category", "Month", "Year"];

        const rows = transactions.map(t => [
            t.type,
            t.amount,
            t.category,
            t.month,
            t.year
        ]);

        let csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reports.csv");
        document.body.appendChild(link);
        link.click();
    };

    // ================= EXPORT JSON =================
    const exportJSON = () => {
        const json = JSON.stringify(transactions, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "reports.json";
        link.click();
    };

    return (
        <div className="p-6 space-y-6">

            <h2 className="text-2xl font-bold text-center">
                Financial Reports
            </h2>

            {/* ================= SUMMARY ================= */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-base-200 p-4 rounded-xl shadow text-center">
                    <h3 className="text-green-500 font-semibold">Income</h3>
                    <p className="text-xl font-bold">${totalIncome}</p>
                </div>

                <div className="bg-base-200 p-4 rounded-xl shadow text-center">
                    <h3 className="text-red-500 font-semibold">Expense</h3>
                    <p className="text-xl font-bold">${totalExpense}</p>
                </div>

                <div className="bg-base-200 p-4 rounded-xl shadow text-center">
                    <h3 className="text-primary font-semibold">Balance</h3>
                    <p className="text-xl font-bold">${balance}</p>
                </div>
            </div>

            {/* ================= EXPORT BUTTONS ================= */}
            {role === "Admin" && (
                <div className="flex gap-4 justify-center">
                    <button onClick={exportCSV} className="btn btn-primary">
                        Export CSV
                    </button>

                    <button onClick={exportJSON} className="btn btn-secondary">
                        Export JSON
                    </button>
                </div>
            )}

            {/* ================= MONTHLY REPORT ================= */}
            <div className="bg-base-200 p-4 rounded-xl shadow">
                <h3 className="font-semibold mb-3">Monthly Report</h3>

                {monthlyReports.map((m, i) => (
                    <div key={i} className="py-2 border-b">

                        {/* Header Row */}
                        <div className="flex justify-between font-semibold text-sm text-gray-500">
                            <span>Month</span>
                            <span>Income</span>
                            <span>Expense</span>
                        </div>

                        {/* Data Row */}
                        <div className="flex justify-between mt-1">
                            <span>{m.month} {m.year}</span>
                            <span className="text-green-500">+${m.income}</span>
                            <span className="text-red-500">-${m.expense}</span>
                        </div>

                    </div>
                ))}
            </div>

            {/* ================= WEEKLY REPORT ================= */}
            <div className="bg-base-200 p-4 rounded-xl shadow">
                <h3 className="font-semibold mb-3">Weekly Report</h3>

                {weeklyReports.map((w, i) => (
                    <div key={i} className="flex justify-between py-2 border-b">
                        <span>Week {w.week}</span>
                        <span className="text-green-500">+${w.income}</span>
                        <span className="text-red-500">-${w.expense}</span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Reports;