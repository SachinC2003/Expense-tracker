import AddIncome from "@/components/AddIncome";
import Charts from "@/components/Chart";
import Edit from "@/components/Edit";
import { Button } from "@/components/ui/button";
import Delete from "@/components/ui/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

interface IIncome {
  name: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

function Income() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [selectedIncome, setSelectedIncome] = useState<IIncome | null>(null);

  // Stats
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [topCategory, setTopCategory] = useState("");

  // Chart data
  const [monthlyIncome, setMonthlyIncome] = useState<number[]>(new Array(12).fill(0));
  const [categoryIncome, setCategoryIncome] = useState<number[]>([0, 0, 0, 0]);

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/income`);
      const data: IIncome[] = response.data.income || [];
      setIncomes(data);

      // ---- Stats ----
      const totalAmount = data.reduce((sum, i) => sum + i.amount, 0);
      setTotal(totalAmount);
      setAvg(data.length > 0 ? totalAmount / data.length : 0);

      // Categories for Income
      const categories = ["salary", "farm", "business", "other"];
      const categoryTotals: Record<string, number> = {};
      data.forEach((i) => {
        categoryTotals[i.category] = (categoryTotals[i.category] || 0) + i.amount;
      });

      let topCat = "";
      let topVal = 0;
      categories.forEach((cat) => {
        const val = categoryTotals[cat] || 0;
        if (val > topVal) {
          topVal = val;
          topCat = cat;
        }
      });
      setTopCategory(topCat || "N/A");

      // ---- Monthly totals ----
      const monthData = new Array(12).fill(0);
      data.forEach((i) => {
        const month = new Date(i.date).getMonth();
        monthData[month] += i.amount;
      });
      setMonthlyIncome(monthData);

      setCategoryIncome(categories.map((c) => categoryTotals[c] || 0));
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-blue-200 space-y-2">
      {/* Add button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-32 bg-green-400"
        >
          Add Income
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-bold text-lg">Total Income</h3>
          <p className="text-xl text-green-600">₹{total}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-bold text-lg">Average Income</h3>
          <p className="text-xl text-blue-600">₹{avg.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-bold text-lg">Top Source</h3>
          <p className="text-xl text-purple-600">{topCategory}</p>
        </div>
      </div>

      {/* Charts */}
      <Charts data={monthlyIncome} categoryWise={categoryIncome} sector="income" />

      {/* Recent Incomes */}
      <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Recent Incomes</h2>

        {incomes?.map((income, index) => (
          <div
            key={index}
            className="flex flex-row justify-between p-3 bg-white rounded shadow"
          >
            <div className="flex flex-col gap-1 w-[80%]">
              <div className="flex justify-between">
                <span className="font-bold">{income.name} - {income.category}</span>
                <span className="font-medium">
                  {new Date(income.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{income.description}</span>
                <span className="font-semibold">₹{income.amount}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setSelectedIncome(income);
                  setIsEditOpen(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setSelectedIncome(income);
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
