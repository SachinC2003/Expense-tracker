import AddIncome from "@/components/AddIncome";
import Charts from "@/components/Chart";
import Edit from "@/components/Edit";
import { Button } from "@/components/ui/button";
import Delete from "@/components/ui/Delete";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { data } from "react-router";
interface IIncome {
  name: string;
  amount: number;
  date: string;
  description: string;
  category: string;
} 

function Income() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [Incomes, setIncomes] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState<IIncome | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const fetchIncomes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/income");      
      console.log('Fetched incomes:', response.data);
      setIncomes(response.data.income || []);
    }catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  useEffect(()=>{
    fetchIncomes();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-blue-200 p-1 space-y-4">
      <div className="flex justify-end items-center">
          <Button onClick={()=> setIsOpen(true)}
          className="w-32 bg-green-400 mt-1">Add Income</Button>
      </div>
      {/* Top row: Graphs */}
        <Charts />

      {/* Bottom row: Recent Income */}
      <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Recent Incomes</h2>
        
        {/* Example expense items */}
        {Incomes?.map((income: IIncome, index) => (
          <div key={index} className="flex flex-row justify-between p-3 bg-white rounded shadow pr-10 pl-10">
            <div className="flex flex-col gap-1 w-[80%]">
                <div className="flex justify-between">
                  <span className="font-bold size-15">{income.name} - {income?.category}</span>
                  <span className="font-medium">{new Date(income.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>{income.description}</span>
                    <span>Rs {income.amount}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <Button onClick={()=>{
                  setIsEditOpen(true);
                  setSelectedIncome(income);
                }} className="bg-orange-500 hover:bg-orange-600 text-white">Edit</Button>
                <Button
                onClick={()=>{
                  setIsDeleteOpen(true);
                  setSelectedIncome(income);
                }}
                 className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <AddIncome isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
      {isEditOpen && (
        <Edit
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
          data={selectedIncome} 
          isExpense={false}
        />
      )}
      {isDeleteOpen && (
        <Delete
          isOpen={isDeleteOpen} 
          onClose={() => setIsDeleteOpen(false)} 
          data={selectedIncome} 
          isExpense={false}
        />
      )}
    </div>
  );
}

export default Income;
