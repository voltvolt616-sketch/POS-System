
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Expenses from './components/Expenses';
import ShiftSummary from './components/ShiftSummary';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';
import { Page, Product, Sale, Expense } from './types';
import { MOCK_PRODUCTS, MOCK_SALES, MOCK_EXPENSES } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [sales, setSales] = useState<Sale[]>(MOCK_SALES);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);

  const addSale = (sale: Omit<Sale, 'id' | 'date'>) => {
    const newSale = { ...sale, id: `s${sales.length + 1}`, date: new Date() };
    setSales(prev => [...prev, newSale]);
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense = { ...expense, id: `e${expenses.length + 1}`, date: new Date() };
    setExpenses(prev => [...prev, newExpense]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard sales={sales} expenses={expenses} products={products} setPage={setCurrentPage} />;
      case 'inventory':
        return <Inventory products={products} setProducts={setProducts} />;
      case 'sales':
        return <Sales products={products} addSale={addSale} />;
      case 'expenses':
        return <Expenses expenses={expenses} addExpense={addExpense} />;
      case 'summary':
        return <ShiftSummary sales={sales} expenses={expenses} />;
      case 'reports':
        return <Reports sales={sales} expenses={expenses} products={products} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard sales={sales} expenses={expenses} products={products} setPage={setCurrentPage} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="bg-black text-white min-h-screen flex">
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
    </div>
  );
};

export default App;
