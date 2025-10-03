import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  isExpense?: boolean;
}

const Delete: React.FC<DeleteProps> = ({ isOpen, onClose, data, isExpense }) => {
  if (!isOpen) return null;
  const navigator = useNavigate();
  const [name, setName] = useState(data.name || "");
  const [amount, setAmount] = useState(data.amount || 0);
    const [description, setDescription] = useState(data?.description || "");
    const [category, setCategory] = useState(data?.category || "");
    const [date, setDate] = useState(data.date || new Date());
    const [apiEndpoint, setApiEndpoint] = useState(isExpense ? "expense/delete" : "income/delete");
    const [ismass, setIsmass] = useState(isExpense ? "Expense" : "Income");

    const handelDelete = async() => {
        try{
            console.log("api res", apiEndpoint);
        const res = await axios.delete(`http://localhost:5000/api/v1/${apiEndpoint}/${data._id}`);
            
            if(!res.data.success){
                throw new Error(res.data.message);
            }
            toast.success(`${ismass} Delete successfully`);
            onClose();
            
        }catch(err){
            toast.error("Failed to Delete expense");
            console.error(err);
        }
    }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">

        <div className="flex flex-col">
          <div className="flex flex-row justify-start pr-4 pl-4">
            <p className="font-bold">{data.name}</p>
          </div>
          <div className="flex flex-row justify-between p-5">
                <p className="">{data.description}</p>
                <p>Rs {data.amount}</p>
          </div>
      
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
              onClick={handelDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Conform Delete
            </button>
          </div>
        </div>

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

export default Delete;
