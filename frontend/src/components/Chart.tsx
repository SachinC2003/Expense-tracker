import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Charts() {
  // Dummy data for line chart
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Expenses ($)",
        data: [120, 200, 150, 300, 250, 400],
        borderColor: "rgb(34,197,94)", // Tailwind green-500
        backgroundColor: "rgba(34,197,94,0.5)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: ["Food", "Transport", "Bills", "Entertainment"],
    datasets: [
      {
        label: "Category",
        data: [40, 20, 25, 15],
        backgroundColor: [
          "rgb(251,191,36)", // yellow-400
          "rgb(34,197,94)",  // green-500
          "rgb(59,130,246)", // blue-500
          "rgb(239,68,68)",  // red-500
        ],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-90">
      {/* Line Chart */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2 text-center">Expenses Over Time</h2>
        <Line data={lineData} />
      </div>

      {/* Pie Chart */}
      <div className="flex-1 bg-white p-4 rounded shadow" style={{height: '400px'}}>
        <h2 className="text-xl font-semibold mb-2 text-center">Category Breakdown</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Charts;
