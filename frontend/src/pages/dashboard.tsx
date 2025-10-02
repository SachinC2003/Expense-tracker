import Charts from "@/components/Chart";
import React from "react";

function Dash() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-200 p-6 space-y-6">
      
      {/* Top row: Graphs */}
        <Charts />

      {/* Bottom row: Recent Expenses */}
      <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>
        
        {/* Example expense items */}
        <div className="flex justify-between p-3 bg-white rounded shadow">
          <span>Groceries</span>
          <span>$45</span>
        </div>
        <div className="flex justify-between p-3 bg-white rounded shadow">
          <span>Transport</span>
          <span>$20</span>
        </div>
        <div className="flex justify-between p-3 bg-white rounded shadow">
          <span>Subscription</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between p-3 bg-white rounded shadow">
          <span>Dining</span>
          <span>$30</span>
        </div>
      </div>

    </div>
  );
}

export default Dash;
