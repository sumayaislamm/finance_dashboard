import React from "react";
import { useTransactions } from "../../context/TransactionContext";
import Loading from "../Loading/Loading";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
} from "recharts";

const Analytics = () => {
    const { transactions, loading } = useTransactions();

    if (loading) {
        return <Loading />;
    }

    //    Category analysis: Calculate total spending per category and identify the highest one
    const spendingByCategory = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => {
            const existing = acc.find(c => c.category === t.category);
            if (existing) {
                existing.amount += t.amount;
            } else {
                acc.push({ category: t.category, amount: t.amount });
            }
            return acc;
        }, []);

    // Higest spending category and its percentage of total expenses

    const highestCategory = spendingByCategory.length
        ? spendingByCategory.reduce((max, curr) =>
            curr.amount > max.amount ? curr : max
        )
        : { category: "N/A", amount: 0 };

    const totalExpense = spendingByCategory.reduce(
        (sum, c) => sum + c.amount,
        0
    );

    const percent =
        totalExpense > 0
            ? ((highestCategory.amount / totalExpense) * 100).toFixed(1)
            : 0;

    // Differnt by month: Group transactions by month and year, then calculate total income and expenses for each month. Sort them chronologically for charting.
    const monthOrder = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

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

    const monthlyComparison = Object.values(groupedData).sort((a, b) => {
        if (a.year === b.year) {
            return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        }
        return a.year - b.year;
    });

    // Compare by month 
    const currentMonth = monthlyComparison[monthlyComparison.length - 1];
    const prevMonth = monthlyComparison[monthlyComparison.length - 2];

    let change = 0;


    if (prevMonth && prevMonth.expense !== 0) {
        // Positive change = expenses decreased (good), negative = expenses increased (bad)
        change = ((prevMonth.expense - currentMonth.expense) / prevMonth.expense) * 100;
        change = change.toFixed(1); // optional: round to 1 decimal
    }

    // sepending catagory top 3 
    const topCategories = [...spendingByCategory]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    //    Message based on current month performance
    const insightMessage =
        currentMonth?.expense > currentMonth?.income
            ? "⚠️ You are spending more than you earn this month"
            : "👍 Good job! Your finances are under control";

    // Chart Data 
    const chartData = monthlyComparison.map((m) => ({
        month: `${m.month.slice(0, 3)} ${m.year}`,
        income: m.income,
        expense: m.expense,
    }));

    return (
        <>
            <div className="text-center">
                <h2 className="text-2xl text-primary font-bold mb-3 p-4">
                    Deep Financial Analysis
                </h2>
                <p className="text-xs text-base-content font-medium p-4 mb-5">This analytics page provides an in-depth and intelligent overview
                    of your financial performance through advanced insights and dynamic visualizations. It highlights key metrics such as your highest
                    spending category, top categories, and month-to-month changes, helping you quickly understand your financial behavior. The interactive
                    area chart presents a clear comparison of income and expenses over time, allowing you to track trends and fluctuations across months and years.
                    Additionally, smart insights and performance indicators guide you in evaluating your financial health, identifying spending patterns, and making
                    data-driven decisions with confidence and clarity.</p>

            </div>
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-2 gap-4">

                {/* Highest Spending */}
                <div className="bg-base-200 p-4 text-center rounded-xl shadow">
                    <h3 className=" mb-2 text-sm font-bold text-center text-base-content ">Where Your Money Goes Most</h3>
                    <p className="text-lg font-bold text-primary">{highestCategory.category}</p>
                    <p className="text-lg font-bold text-green-800">${highestCategory.amount}</p>
                    <p className="text-sm text-gray-500">

                        You’ve spent <span className="font-bold text-primary">{percent}%</span> of your total expenses on {highestCategory.category}.
                    </p>
                </div>
                {/* Insight */}
                <div className="bg-base-200 p-4 rounded-xl text-center shadow">
                    <h3 className=" mb-2 text-sm font-bold  text-base-content ">Insight</h3>
                    <p className="text-green-800 font-semibold">{insightMessage}</p>
                    <p className="text-xs text-gray-400 mt-2">
                        Based on your recent financial activity
                    </p>
                </div>

                {/* Monthly Change */}
                <div className="bg-base-200 p-4 rounded-xl text-center shadow">
                    <h3 className="mb-2 text-sm font-bold text-base-content">Month-to-Month Overview</h3>

                    <p className="text-lg text-primary font-bold">
                        {change > 0 ? "↑ " : change < 0 ? "↓ " : ""}{Math.abs(change)}%
                    </p>

                    <p className="text-sm text-gray-500">
                        {prevMonth?.month} → {currentMonth?.month}
                    </p>

                    {/* Dynamic message based on performance */}
                    <p className={`mt-2 text-sm font-medium ${change < 0 ? "text-green-600" : change > 0 ? "text-red-600" : "text-gray-600"
                        }`}>
                        {change < 0
                            ? "Great! Your expenses decreased this month."
                            : change > 0
                                ? "Caution! Expenses increased this month."
                                : "No significant change compared to last month."}
                    </p>
                </div>



                {/* Top Categories */}
                <div className="bg-base-200 p-4 text-center rounded-xl shadow">
                    <h3 className="font-semibold mb-2">Top Categories of Expenses</h3>

                    {topCategories.map((c, i) => (
                        <p key={i} className="flex justify-between items-center px-30">
                            <span className="font-bold text-sm text-primary">
                                {c.category}
                            </span>
                            <span className={`font-bold ${i === 0 ? "text-red-500" : "text-base-content"}`}>
                                ${c.amount}
                            </span>
                        </p>
                    ))}

                </div>

                {/*  Chart */}
                <div className="bg-base-200 p-4 rounded-xl shadow col-span-2">
                    <h3 className="font-semibold mb-4">Monthly Overview</h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={chartData}>

                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

                            <defs>
                                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>

                                <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <XAxis dataKey="month" />
                            <YAxis />

                            <Tooltip
                                contentStyle={{
                                    borderRadius: "10px",
                                    border: "none",
                                }}
                                formatter={(value, name) => [
                                    `${value}`,
                                    name === "income" ? "Income" : "Expense",
                                ]}
                            />

                            <Legend
                                verticalAlign="top"
                                height={36}
                                formatter={(value) =>
                                    value === "income" ? "Income" : "Expense"
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="income"
                                stroke="#22c55e"
                                fill="url(#income)"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 6 }}
                            />

                            <Area
                                type="monotone"
                                dataKey="expense"
                                stroke="#ef4444"
                                fill="url(#expense)"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                                activeDot={{ r: 6 }}
                            />

                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </>
    );
};

export default Analytics;