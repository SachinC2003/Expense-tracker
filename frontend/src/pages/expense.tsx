import Charts from "@/components/Chart";
import { Button } from "@/components/ui/button";
import AddExpense from "@/components/AddExpense"
import { use, useEffect, useState } from "react";
import axios from "axios";
interface IExpense {
  name: string;
  amount: number;
  date: string;
}
function Expense() {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/expense");
      console.log('Fetched expenses:', response.data);
      setExpenses(response.data.expenses || []);
    }catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(()=>{
    fetchExpenses();
  }, [])
  return (
    <div className="min-h-screen flex flex-col bg-blue-200 p-1 space-y-4">
      <div className="flex justify-end items-center">
          <Button onClick={()=> setIsOpen(true)}
          className="w-32 bg-green-400 mt-1">Add Expense</Button>
      </div>
      {/* Top row: Graphs */}
        <Charts />

      {/* Bottom row: Recent Expenses */}
      <div className="p-1 bg-gray-100 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>
        
        {/* Example expense items */}
        {expenses?.map((expenses: IExpense, index) => (
          <div key={index} className="flex justify-between p-3 bg-white rounded shadow">
            <span>{expenses.name}</span>
            <span>${expenses.amount}</span>
          </div>
        ))}
        <div className="flex justify-between p-3 bg-white rounded shadow">
          <span>Electricity Bill</span>
          <span>$120</span>
        </div>
      </div>
      {isOpen && (
        <AddExpense isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default Expense;
