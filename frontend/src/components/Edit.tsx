import React, { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isExpense?: boolean;
}

const Edit: React.FC<EditProps> = ({ isOpen, onClose, data, isExpense }) => {
  if (!isOpen) return null
  const [name, setName] = useState(data.name || "");
  const [amount, setAmount] = useState(data.amount || 0);
    const [description, setDescription] = useState(data?.description || "");
    const [category, setCategory] = useState(data?.category || "");
    const [date, setDate] = useState(data.date || new Date());
    const [apiEndpoint, setApiEndpoint] = useState(isExpense ? "expense/edit" : "income/edit");
    const [ismass, setIsmass] = useState(isExpense ? "Expense" : "Income");

    const options = useMemo(() => {
        return isExpense === true
          ? ["Entertainment", "Food", "Bills", "Transport"]
          : ["Salary", "Farm", "Business", "Others"];
      }, [isExpense]);

    const handelEdit = async() => {
        try{
            console.log("api res", apiEndpoint);
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/v1/${apiEndpoint}`, {
                user:"68de052b7d805221c95e7bc3",
                name,
                amount,
                description,
                category,
                date,
                id: data._id
            });
            setDate(data.date);
            if(!res.data.success){
                throw new Error(res.data.message);

            }
            if(isExpense){
               setApiEndpoint("expense/edit");
               setIsmass("Expense")
            }else{
              setApiEndpoint("income/edit");
               setIsmass("Income")
            }
            toast.success(`${ismass} Edit successfully`);
            onClose();
            
        }catch(err){
            toast.error("Failed to Edit expense");
            console.error(err);
        }
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit</h2>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Expense Name"
            value={name}
            className="border px-3 py-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            className="border px-3 py-2 rounded"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            className="border px-3 py-2 rounded"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Select value={category} onValueChange={(val) => setCategory(val)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="category" />
            </SelectTrigger>
            <SelectContent> {options.map((opt) => ( <SelectItem key={opt} value={opt}> {opt} </SelectItem> ))} </SelectContent>
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
              onClick={handelEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
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

export default Edit;
