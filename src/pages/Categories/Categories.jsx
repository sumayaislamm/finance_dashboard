import React from "react";
import { useTransactions } from "../../context/TransactionContext";
import Loading from "../Loading/Loading";

const Categories = () => {
    const { transactions, loading } = useTransactions();

    if (loading) {
        return <Loading />;
    }

    const groupByCategory = (type) => {
        return transactions
            .filter(t => t.type === type)
            .reduce((acc, t) => {
                const existing = acc.find(c => c.category === t.category);

                if (existing) {
                    existing.amount += t.amount;
                } else {
                    acc.push({
                        category: t.category,
                        amount: t.amount,
                    });
                }

                return acc;
            }, []);
    };

    const incomeCategories = groupByCategory("income");
    const expenseCategories = groupByCategory("expense");

    const totalIncome = incomeCategories.reduce((sum, c) => sum + c.amount, 0);
    const totalExpense = expenseCategories.reduce((sum, c) => sum + c.amount, 0);


    const renderBars = (data, total, color) => {
        return data.map((c, index) => {
            const percent = total > 0 ? (c.amount / total) * 100 : 0;

            return (
                <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold">{c.category}</span>
                        <span className="text-sm">
                            ${c.amount}
                        </span>
                    </div>

                    <div className="w-full bg-gray-300 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full`}
                            style={{
                                width: `${percent}%`,
                                backgroundColor: color,
                            }}
                        ></div>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                        {percent.toFixed(1)}% of total
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="p-6 space-y-10">
            <div className="text-center">
                <h2 className="text-2xl text-primary font-bold mb-3 p-4">
                    Income & Expense Breakdown 
                </h2>
                <p className="text-xs text-base-content font-medium p-4 mb-5">This Categories page provides a clear and detailed breakdown of your financial activity by grouping income and expenses into their respective categories. It highlights how your money is distributed, showing both total amounts and percentage contributions for each category in a simple and visual format. By using intuitive progress bars, users can quickly compare different categories and understand where their income comes from and where their expenses are going. This structured view makes it easier to identify spending habits, evaluate income sources, and gain better control over financial decisions with clarity and precision.</p>

            </div>

            <div className="bg-base-200 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-green-500 mb-4">
                    Income — Total: ${totalIncome}
                </h3>

                {renderBars(incomeCategories, totalIncome, "#22c55e")}
            </div>


            <div className="bg-base-200 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-red-500 mb-4">
                    Expenses — Total: ${totalExpense}
                </h3>

                {renderBars(expenseCategories, totalExpense, "#ef4444")}
            </div>

        </div>
    );
};

export default Categories;