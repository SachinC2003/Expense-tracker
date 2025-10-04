import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and close icons

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const gotoDashboard = () => navigate("/dashboard");
  const gotoExpenses = () => navigate("/expense");
  const gotoIncome = () => navigate("/income");

  const handellogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-blue-200">
      {/* Header */}
      <header className="flex justify-between items-center py-2 px-4 bg-blue-300 shadow-md">
        {/* Left: Hamburger on mobile */}
        <div className="md:hidden">
          <button
            className="text-2xl text-black"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Center: Logo + Title */}
        <div className="flex flex-col md:flex-row items-center justify-center flex-1 gap-2">
          <img src="/logo.png" alt="logo" className="w-12 h-12 md:w-20 md:h-20" />
          <h1 className="text-2xl md:text-4xl font-bold text-black text-center">Expense Tracker</h1>
        </div>

        {/* Right: Empty space on mobile, nothing on desktop */}
        <div className="md:hidden w-6"></div>
      </header>


      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside
          className={`
            bg-white shadow-inner p-4 flex-shrink-0
            md:flex md:flex-col md:w-64
            absolute md:relative top-0 left-0 h-full z-50
            transform md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out
          `}
        >
          <nav className="flex flex-col space-y-4 h-full">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 h-32 object-cover mx-auto hidden md:block"
            />
            <p className="text-2xl font-semibold text-gray-700 text-center md:block">
              Sachin Chougule
            </p>
            <button
              onClick={() => { gotoDashboard(); setIsSidebarOpen(false); }}
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600"
            >
              Dashboard
            </button>
            <button
              onClick={() => { gotoExpenses(); setIsSidebarOpen(false); }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Expenses
            </button>
            <button
              onClick={() => { gotoIncome(); setIsSidebarOpen(false); }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Income
            </button>
            <button
              onClick={handellogout}
              className="mt-auto px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content (scrollable) */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        {/* Overlay for mobile when sidebar open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Layout;
