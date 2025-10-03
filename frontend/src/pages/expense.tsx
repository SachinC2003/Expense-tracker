import Charts from "@/components/Chart";
import { Button } from "@/components/ui/button";
import AddExpense from "@/components/AddExpense"
import { use, useEffect, useState } from "react";
import axios from "axios";
import Edit from "@/components/Edit";
import Delete from "@/components/ui/Delete";
interface IExpense {
  name: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}
function Expense() {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
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
          <div key={index} className="flex flex-row justify-between p-3 bg-white rounded shadow pr-10 pl-10">
            <div className="flex flex-col gap-1 w-[80%]">
                <div className="flex justify-between">
                  <span className="font-bold size-15">{expenses.name} - {expenses?.category}</span>
                  <span className="font-medium">{new Date(expenses.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>{expenses.description}</span>
                    <span>Rs {expenses.amount}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button
                onClick={()=>{
                    setSelectedExpense(expenses);
                    setIsEditOpen(true);
                }}
                 className="bg-orange-500 hover:bg-red-600 text-white">
                    Edit
                 </Button>
                <Button
                 onClick={()=>{
                    setSelectedExpense(expenses);
                    setIsDeleteOpen(true);
                 }}
                 className="bg-red-500 hover:bg-red-600 text-white">
                   Delete
                 </Button>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <AddExpense isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {isEditOpen && (
        <Edit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} data={selectedExpense} isExpense={true}/>
      )}
      {isDeleteOpen && (
        <Delete isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} data={selectedExpense} isExpense={true}/>
      )}
    </div>
  );
}

export default Expense;
