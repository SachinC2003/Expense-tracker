import Charts from "@/components/Chart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IExpense {
  name: string;
  amount: number;
  date: string;
  description: string;
  category: string;
} 

interface IIncome {
  name: string;
  amount: number;
  date: string;
  description: string;
  category: string;
} 

function Dash() {
  const navigator = useNavigate();
  const [year, setYear] = useState(new Date().getFullYear());

  // Expenses state
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [monthlyExpense, setMonthlyExpense] = useState(Array(12).fill(0));
  const [yearlyExpense, setYearlyExpense] = useState(0);
  const [categoryWiseExpense, setCategoryWiseExpense] = useState(Array(4).fill(0));

  // Income state
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(Array(12).fill(0));
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [categoryWiseIncome, setCategoryWiseIncome] = useState(Array(4).fill(0));

  // Fetch expenses
  const fetchAllExpenses = async () => {
    const totalExpense = Array(12).fill(0);
    const catExpense = Array(4).fill(0);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/expense/${year}`);
      const data = res.data.expense || [];
      setExpenses(data);

      let sum = 0;
      data.forEach((exp: IExpense) => {
        const month = new Date(exp.date).getMonth();
        totalExpense[month] += exp.amount;
        sum += exp.amount;

        const category = exp.category.toLowerCase();
        if (category === "entertanment") catExpense[0] += exp.amount;
        else if (category === "food") catExpense[1] += exp.amount;
        else if (category === "bills") catExpense[2] += exp.amount;
        else if (category === "transport") catExpense[3] += exp.amount;
      });

      setMonthlyExpense(totalExpense);
      setCategoryWiseExpense(catExpense);
      setYearlyExpense(sum);

    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }

  // Fetch incomes
  const fetchAllIncomes = async () => {
    const totalIncome = Array(12).fill(0);
    const catIncome = Array(4).fill(0);
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/income/${year}`);
      const data = res.data.income || [];
      setIncomes(data);

      let sum = 0;
      data.forEach((inc: IIncome) => {
        const month = new Date(inc.date).getMonth();
        totalIncome[month] += inc.amount;
        sum += inc.amount;

        const category = inc.category.toLowerCase();
        if (category === "salary") catIncome[0] += inc.amount;
        else if (category === "farm") catIncome[1] += inc.amount;
        else if (category === "business") catIncome[2] += inc.amount;
        else if (category === "other") catIncome[3] += inc.amount;
      });

      setMonthlyIncome(totalIncome);
      setCategoryWiseIncome(catIncome);
      setYearlyIncome(sum);

    } catch (err) {
      console.error("Error fetching incomes:", err);
    }
  }

  useEffect(() => {
    fetchAllExpenses();
    fetchAllIncomes();
  }, [year]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-200 space-y-2 p-1">
      
      {/* Year selector + Quick actions */}
      <div className="flex justify-between items-center">
        <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
          <SelectTrigger className="w-[180px] bg-green-300 text-1xl font-medium">
              <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
              {[...Array(2099 - 2001 + 1)].map((_, idx) => {
                const y = 2001 + idx;
                return (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ); 
              })}
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          <Button className="bg-green-400" onClick={() => navigator("/expense")}>Add Expense</Button>
          <Button className="bg-green-400" onClick={() => navigator("/income")}>Add Income</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold ">Total Income</h3>
          <p className="text-xl text-green-500">Rs {yearlyIncome}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold ">Total Expense</h3>
          <p className="text-xl text-red-500">Rs {yearlyExpense}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Net Balance</h3>
          <p className="text-xl">Rs {yearlyIncome - yearlyExpense}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
        <Charts data={monthlyExpense} categoryWise={categoryWiseExpense} sector="Expense" />
        <Charts data={monthlyIncome} categoryWise={categoryWiseIncome} sector="Income" />
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Expenses */}
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2 text-xl">Recent Expenses</h3>
          {expenses.slice(-5).reverse().map(exp => (
            <div key={exp.date + exp.name} className="flex justify-between py-2 border-b">
              <span className="font-medium ">{exp.name} ({exp.category})</span>
              <span className="font-bold ">Rs {exp.amount}</span>
            </div>
          ))}
        </div>

        {/* Recent Incomes */}
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2 text-xl">Recent Incomes</h3>
          {incomes.slice(-5).reverse().map(inc => (
            <div key={inc.date + inc.name} className="flex justify-between py-2 border-b">
              <span className="font-medium">{inc.name} ({inc.category})</span>
              <span className="font-bold">Rs {inc.amount}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dash;
