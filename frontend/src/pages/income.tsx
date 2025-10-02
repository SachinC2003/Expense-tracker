import AddIncome from "@/components/AddIncome";
import Charts from "@/components/Chart";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface IIncome {
  name: string;
  amount: number;
  date: string;
} 
function Income() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [Incomes, setIncomes] = useState([]);
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

      {/* Bottom row: Recent Expenses */}
      <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Recent Incomes</h2>
        
        {/* Example expense items */}
        {Incomes?.map((incomes: IIncome, index) => (
          <div key={index} className="flex justify-between p-3 bg-white rounded shadow">
            <span>{incomes.name}</span>
            <span>${incomes.amount}</span>
          </div>
        ))}
      </div>
      {isOpen && (
        <AddIncome isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default Income;
