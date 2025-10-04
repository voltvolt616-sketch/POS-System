
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import Card from './ui/Card';
import { Sale, Expense, Product, Page, Currency } from '../types';
import { CURRENCY_SYMBOLS } from '../constants';
import Button from './ui/Button';

interface DashboardProps {
  sales: Sale[];
  expenses: Expense[];
  products: Product[];
  setPage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ sales, expenses, products, setPage }) => {
  const todaySales = sales
    .filter(s => new Date(s.date).toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.total, 0);

  const todayExpenses = expenses
    .filter(e => new Date(e.date).toDateString() === new Date().toDateString())
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

  const salesData = [
    { name: 'السبت', sales: 4000 },
    { name: 'الأحد', sales: 3000 },
    { name: 'الاثنين', sales: 2000 },
    { name: 'الثلاثاء', sales: 2780 },
    { name: 'الأربعاء', sales: 1890 },
    { name: 'الخميس', sales: 2390 },
    { name: 'الجمعة', sales: 3490 },
  ];
  salesData[new Date().getDay()].sales = todaySales;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">اللوحة الرئيسية</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="مبيعات اليوم" value={`${todaySales.toLocaleString()} ${CURRENCY_SYMBOLS[Currency.EGP]}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} color="green" />
        <Card title="مصروفات اليوم" value={`${todayExpenses.toLocaleString()} ${CURRENCY_SYMBOLS[Currency.EGP]}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>} color="yellow" />
        <Card title="حالة المخزون" value={`${totalStock} قطعة`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-xl font-bold text-green-400 mb-4">أداء المبيعات الأسبوعي</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                    <Legend wrapperStyle={{ color: '#9ca3af' }} />
                    <Bar dataKey="sales" fill="#10b981" name="المبيعات" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-green-400 mb-4">الوصول السريع</h2>
            <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => setPage('sales')} className="w-full">المبيعات</Button>
                <Button onClick={() => setPage('inventory')} className="w-full" variant="secondary">الجرد</Button>
                <Button onClick={() => setPage('expenses')} className="w-full" variant="secondary">المصروفات</Button>
                <Button onClick={() => setPage('reports')} className="w-full">التقارير</Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
