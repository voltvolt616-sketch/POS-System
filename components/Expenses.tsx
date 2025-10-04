
import React, { useState } from 'react';
import { Expense, ExpenseCategory, Currency } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { CURRENCY_SYMBOLS } from '../constants';

interface ExpensesProps {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
}

const Expenses: React.FC<ExpensesProps> = ({ expenses, addExpense }) => {
  const [newExpense, setNewExpense] = useState({
    type: ExpenseCategory.Other,
    amount: '',
    currency: Currency.EGP,
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newExpense.amount);
    if (newExpense.type && amount > 0) {
      addExpense({
        type: newExpense.type,
        amount,
        currency: newExpense.currency,
      });
      setNewExpense({ type: ExpenseCategory.Other, amount: '', currency: Currency.EGP });
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-white">إدارة المصروفات</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-xl font-bold text-green-400 mb-4">إضافة مصروف جديد</h2>
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <Select
                        label="نوع المصروف"
                        value={newExpense.type}
                        onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value as ExpenseCategory })}
                    >
                        {Object.values(ExpenseCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </Select>
                    <Input
                        label="المبلغ"
                        type="number"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        required
                    />
                    <Select
                        label="العملة"
                        value={newExpense.currency}
                        onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value as Currency })}
                    >
                        {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
                    </Select>
                    <Button type="submit" className="w-full">إضافة</Button>
                </form>
            </div>
        </div>
        <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                <table className="w-full text-right">
                <thead className="bg-gray-800">
                    <tr>
                    <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">نوع المصروف</th>
                    <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">المبلغ</th>
                    <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">التاريخ</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {expenses.map(expense => (
                    <tr key={expense.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="p-4 text-white">{expense.type}</td>
                        <td className="p-4 text-yellow-400">{expense.amount.toLocaleString()} {CURRENCY_SYMBOLS[expense.currency]}</td>
                        <td className="p-4 text-gray-300">{new Date(expense.date).toLocaleDateString('ar-EG')}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
