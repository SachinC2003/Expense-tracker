import React from "react";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const gotoDashboard = () => navigate("/dashboard");
  const gotoExpenses = () => navigate("/expense");
  const gotoIncome = () => navigate("/income");

  return (
    <div className="h-screen flex flex-col bg-blue-200">
      {/* Header */}
      <header className="text-center py-6 bg-blue-300 shadow-md">
        <h1 className="text-4xl font-bold text-black">Expense Tracker</h1>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-inner p-4 flex-shrink-0">
          <nav className="flex flex-col space-y-4">
            <div className="flex flex-col items-center justify-center h-48">
              <img
                src="/exp.png"
                alt="Logo"
                className="w-32 h-32 object-cover mx-auto"
              />
              <p className="mt-1 font-semibold text-gray-700 text-center">
                Sachin Chougule
              </p>
            </div>
            <button
              onClick={gotoDashboard}
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
            >
              Dashboard
            </button>
            <button
              onClick={gotoExpenses}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Expenses
            </button>
            <button
              onClick={gotoIncome}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Income
            </button>
            <button className="mt-auto px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content (scrollable) */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
