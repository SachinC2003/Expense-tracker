import React, { useMemo, useState } from "react";
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

interface ChartsProps {
  data: number[];
  categoryWise: number[];
  sector: String
};
const Charts: React.FC<ChartsProps> = ({ data, categoryWise, sector}) => {
  // Dummy data for line chart
  const pieLabel = useMemo(() => {
    return sector.toLowerCase() === "income"
      ? ["salary", "farm", "business", "other"]
      : ["entertainment", "food", "bills", "transport"];
  }, [sector]);
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Expenses (Rs)",
        data: data,
        borderColor: "rgb(34,197,94)", // Tailwind green-500
        backgroundColor: "rgba(34,197,94,0.5)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: pieLabel,
    datasets: [
      {
        label: "Category",
        data: categoryWise,
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
    <div className="flex flex-col md:flex-row gap-6">
      {/* Line Chart */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2 text-center">{sector} Over Time</h2>
        <Line data={lineData} />
      </div>

      {/* Pie Chart */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2 text-center">Category Breakdown</h2>
        <div style={{ width: "50%", margin: "0 auto" }}> {/* Shrinks the chart */}
          <Pie data={pieData} />
        </div>
      </div>

    </div>
  );
}

export default Charts;
