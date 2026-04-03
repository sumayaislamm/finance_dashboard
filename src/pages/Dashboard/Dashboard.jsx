import React from "react";
import mockdata from "../../../public/mockdata.json";
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

const Dashboard = () => {
    const pieData = mockdata.spendingByCategory;
    const lineData = mockdata.balanceTrend;

    const colors = ["#60a5fa", "#facc15", "#f87171", "#34d399"];

    return (
        <div className="p-3 md:p-6 bg-base-100 min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl text-primary font-bold mb-3 p-4">
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
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {/* Summary */}
                    <div className="mb-4 ">
                        <h2 className="text-center text-lg font-semibold mb-3">
                            Financial Summary
                        </h2>

                        <div className=" stats bg-base-100 flex justify-center border-base-300 border">
                            <div className="stat">
                                <div className="stat-title font-bold">Account balance</div>
                                <div className="stat-value">${mockdata.summary.totalBalance}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title font-bold">Income</div>
                                <div className="stat-value">${mockdata.summary.totalIncome}</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title font-bold">Expenses</div>
                                <div className="stat-value">${mockdata.summary.totalExpense}</div>
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
                                        fill="#8884d8"
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={colors[index % colors.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                {/* Right Side  */}
                {/* Line Chart */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="card bg-base-200 p-3 md:p-4 shadow rounded-xl">
                        <h2 className="text-center text-lg font-semibold mb-3">
                            Balance Trend
                        </h2>

                        <div className="w-full h-80 md:h-96">
                            <ResponsiveContainer>
                                <LineChart
                                    data={lineData} // balanceTrend with income & expense
                                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    + <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />

                                    <Line
                                        type="monotone"
                                        dataKey="balance"
                                        stroke="#8884d8"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        name="Balance"
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#34d399"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        name="Income"
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="expense"
                                        stroke="#f87171"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        name="Expense"
                                    />
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