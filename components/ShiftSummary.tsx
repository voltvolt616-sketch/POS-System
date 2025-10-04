
import React, { useState, useMemo } from 'react';
import { Sale, Expense, Currency } from '../types';
import Button from './ui/Button';
import Select from './ui/Select';
import { CURRENCY_SYMBOLS } from '../constants';

interface ShiftSummaryProps {
  sales: Sale[];
  expenses: Expense[];
}

const ShiftSummary: React.FC<ShiftSummaryProps> = ({ sales, expenses }) => {
  const [currency, setCurrency] = useState<Currency>(Currency.EGP);

  // Note: In a real app, currency conversion rates would be fetched from an API.
  // Using mock rates for demonstration.
  const conversionRates = {
    [Currency.EGP]: 1,
    [Currency.USD]: 47.5,
    [Currency.CNY]: 6.5,
  };

  const convertToSelectedCurrency = (amount: number, fromCurrency: Currency) => {
    const amountInEGP = amount * (conversionRates[fromCurrency] || 1);
    return amountInEGP / conversionRates[currency];
  };

  const summary = useMemo(() => {
    const today = new Date().toDateString();
    const shiftSales = sales.filter(s => new Date(s.date).toDateString() === today);
    const shiftExpenses = expenses.filter(e => new Date(e.date).toDateString() === today);

    const totalSales = shiftSales.reduce((sum, s) => sum + convertToSelectedCurrency(s.total, s.currency), 0);
    const totalExpenses = shiftExpenses.reduce((sum, e) => sum + convertToSelectedCurrency(e.amount, e.currency), 0);
    const withdrawals = 0; // Placeholder for withdrawals feature
    const netProfit = totalSales - totalExpenses - withdrawals;

    return { totalSales, totalExpenses, withdrawals, netProfit };
  }, [sales, expenses, currency]);

  const SummaryItem: React.FC<{ label: string; value: number; colorClass: string }> = ({ label, value, colorClass }) => (
    <div className="bg-gray-800 p-6 rounded-lg flex justify-between items-center">
      <span className="text-lg text-gray-300">{label}:</span>
      <span className={`text-2xl font-bold ${colorClass}`}>{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {CURRENCY_SYMBOLS[currency]}</span>
    </div>
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">ملخص الشيفت</h1>
        <div className="flex gap-4 items-center">
            <div className="w-48">
              <Select label="عرض بـ" value={currency} onChange={e => setCurrency(e.target.value as Currency)}>
                  {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
            </div>
          <Button variant="secondary">طباعة</Button>
          <Button>تصدير PDF</Button>
        </div>
      </div>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-700 space-y-4">
        <SummaryItem label="إجمالي المبيعات" value={summary.totalSales} colorClass="text-green-400" />
        <SummaryItem label="إجمالي المصروفات" value={summary.totalExpenses} colorClass="text-yellow-400" />
        <SummaryItem label="السحوبات" value={summary.withdrawals} colorClass="text-yellow-400" />
        <hr className="border-gray-700" />
        <SummaryItem 
            label={summary.netProfit >= 0 ? "صافي الربح" : "صافي الخسارة"}
            value={summary.netProfit} 
            colorClass={summary.netProfit >= 0 ? "text-green-400 neon-text" : "text-red-500"}
        />
      </div>
    </div>
  );
};

export default ShiftSummary;
