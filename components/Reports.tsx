
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Sale, Expense, Product, Currency } from '../types';
import { analyzeDataWithGemini } from '../services/geminiService';
import Button from './ui/Button';
import { CURRENCY_SYMBOLS } from '../constants';

interface ReportsProps {
  sales: Sale[];
  expenses: Expense[];
  products: Product[];
}

const Reports: React.FC<ReportsProps> = ({ sales, products, expenses }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAiAnalysis = async () => {
    if (!aiPrompt) return;
    setIsLoading(true);
    setAiResponse('');
    try {
      const response = await analyzeDataWithGemini(aiPrompt, sales, products);
      setAiResponse(response);
    } catch (error) {
      setAiResponse('حدث خطأ أثناء تحليل البيانات.');
    } finally {
      setIsLoading(false);
    }
  };

  const bestSellingProducts = [...products].sort((a,b) => b.quantity - a.quantity).slice(0, 5).map(p => ({name: p.name, value: 50 - p.quantity}));
  const expenseCategories = expenses.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + curr.amount;
      return acc;
  }, {} as Record<string, number>);
  const expenseData = Object.entries(expenseCategories).map(([name, value]) => ({ name, value }));
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">التحليلات والتقارير</h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold text-green-400 mb-4">تحليل ذكي بالـ AI</h2>
        <p className="text-gray-400 mb-4">اطرح سؤالاً حول بياناتك للحصول على رؤى فورية. مثال: "ما هي أفضل المنتجات مبيعًا هذا الشهر؟"</p>
        <div className="flex gap-4">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="اكتب سؤالك هنا..."
            className="flex-grow bg-gray-800 border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button onClick={handleAiAnalysis} disabled={isLoading}>
            {isLoading ? 'جاري التحليل...' : 'تحليل'}
          </Button>
        </div>
        {aiResponse && (
          <div className="mt-6 p-4 bg-gray-800/50 rounded-md border border-green-500/30 prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-green-400">
             <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br />') }} />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold text-green-400 mb-4">المنتجات الأكثر مبيعاً</h2>
              <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bestSellingProducts} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" tick={{ fill: '#9ca3af' }} />
                      <YAxis type="category" dataKey="name" width={120} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                      <Bar dataKey="value" fill="#10b981" name="المبيعات" />
                  </BarChart>
              </ResponsiveContainer>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold text-green-400 mb-4">توزيع المصروفات</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={expenseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                    {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                    <Legend wrapperStyle={{ color: '#9ca3af' }} />
                </PieChart>
              </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

export default Reports;
