import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from './pages/landing';
import Register from './pages/register';
import Dash from './pages/dashboard';
import Layout from './pages/layout';
import Income from './pages/income';
import Expense from './pages/expense';

function AppContent() {
  return(
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout><Dash /></Layout>} />
          <Route path="/income" element={<Layout><Income /></Layout>} />
          <Route path="/expense" element={<Layout><Expense /></Layout>} />
       </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
      <ToastContainer />
    </RecoilRoot>
  )
}

export default App
