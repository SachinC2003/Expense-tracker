import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface AddExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(new Date());

    const handelAddExpense = async() => {
        try{
            const res = await axios.post("http://localhost:5000/api/v1/expense", {
                user:"68de052b7d805221c95e7bc3",
                name,
                amount,
                description,
                category,
                date
            });

            if(!res.data.success){
                throw new Error(res.data.message);
            }

            toast.success("Expense added successfully");
            onClose();
            
        }catch(err){
            toast.error("Failed to add expense");
            console.error(err);
        }
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Expense Name"
            className="border px-3 py-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="border px-3 py-2 rounded"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border px-3 py-2 rounded"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Select value={category} onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="entertanment">Entertanment</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
            </SelectContent>
          </Select>
          <input type="date" className="border px-3 py-2 rounded" />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handelAddExpense}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
