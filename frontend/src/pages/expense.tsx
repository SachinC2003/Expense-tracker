import React, { useEffect, useState } from "react";
import Charts from "@/components/Chart";
import { Button } from "@/components/ui/button";
import AddExpense from "@/components/AddExpense";
import Edit from "@/components/Edit";
import Delete from "@/components/ui/Delete";
import axios from "axios";

interface IExpense {
  name: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

function Expense() {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Stats
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [topCategory, setTopCategory] = useState("");

  // Chart data
  const [monthlyExpense, setMonthlyExpense] = useState<number[]>(new Array(12).fill(0));
  const [categoryExpense, setCategoryExpense] = useState<number[]>([0, 0, 0, 0]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/expense");
      const data: IExpense[] = response.data.expenses || [];
      setExpenses(data);
      console.log(expenses);

      // ----- Compute stats -----
      const totalAmount = data.reduce((sum, e) => sum + e.amount, 0);
      setTotal(totalAmount);
      setAvg(data.length > 0 ? totalAmount / data.length : 0);

      // Group by category
      const categories = ["food", "transport", "bills", "entertainment"];
      const categoryTotals: Record<string, number> = {};
      data.forEach((e) => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
      });

      let topCat = "";
      let topVal = 0;
      categories.forEach((cat, idx) => {
        const val = categoryTotals[cat] || 0;
        if (val > topVal) {
          topVal = val;
          topCat = cat;
        }
      });
      setTopCategory(topCat || "N/A");

      // ----- Chart data -----
      const monthData = new Array(12).fill(0);
      data.forEach((e) => {
        const month = new Date(e.date).getMonth();
        monthData[month] += e.amount;
      });
      setMonthlyExpense(monthData);

      setCategoryExpense(categories.map((c) => categoryTotals[c] || 0));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-blue-200 space-y-2">
      {/* Add button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-32 bg-green-400"
        >
          Add Expense
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-bold text-lg">Total Expenses</h3>
          <p className="text-xl text-red-600">₹{total}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-bold text-lg">Average Expense</h3>
          <p className="text-xl text-blue-600">₹{avg.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-bold text-lg">Top Category</h3>
          <p className="text-xl text-green-600">{topCategory}</p>
        </div>
      </div>

      {/* Charts */}
      <Charts data={monthlyExpense} categoryWise={categoryExpense} sector="expense" />

      {/* Recent Expenses */}
      <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>

        {expenses?.map((expense, index) => (
          <div
            key={index}
            className="flex flex-row justify-between p-3 bg-white rounded shadow"
          >
            <div className="flex flex-col gap-1 w-[80%]">
              <div className="flex justify-between">
                <span className="font-bold">{expense.name} - {expense.category}</span>
                <span className="font-medium">
                  {new Date(expense.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{expense.description}</span>
                <span className="font-semibold">₹{expense.amount}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setSelectedExpense(expense);
                  setIsEditOpen(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setSelectedExpense(expense);
                  setIsDeleteOpen(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isOpen && (
        <AddExpense isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {isEditOpen && (
        <Edit
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          data={selectedExpense}
          isExpense={true}
        />
      )}
      {isDeleteOpen && (
        <Delete
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          data={selectedExpense}
          isExpense={true}
        />
      )}
    </div>
  );
}

export default Expense;
