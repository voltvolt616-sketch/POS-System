
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { Currency, Employee } from '../types';

const Settings: React.FC = () => {
    const [branchName, setBranchName] = useState('الفرع الرئيسي');
    const [address, setAddress] = useState('123 شارع التجارة، القاهرة، مصر');
    const [employees, setEmployees] = useState<Employee[]>([
        {id: 'emp1', name: 'أحمد محمود', role: 'مدير'},
        {id: 'emp2', name: 'سارة علي', role: 'كاشير'},
    ]);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-white">الإعدادات</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Branch Information */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-green-400 mb-4">معلومات الفرع</h2>
          <form className="space-y-4">
            <Input label="اسم الفرع" value={branchName} onChange={e => setBranchName(e.target.value)} />
            <Input label="العنوان" value={address} onChange={e => setAddress(e.target.value)} />
            <Button type="submit">حفظ التغييرات</Button>
          </form>
        </div>

        {/* Currency and Tax */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold text-green-400 mb-4">العملة والضرائب</h2>
          <form className="space-y-4">
            <Input label="العملة الأساسية" value={Currency.EGP} disabled />
            <Input label="نسبة ضريبة القيمة المضافة (%)" type="number" defaultValue="14" />
            <Button type="submit">حفظ التغييرات</Button>
          </form>
        </div>
      </div>

      {/* Employee Management */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-400">إدارة الموظفين</h2>
          <Button>إضافة موظف</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-right">
                <thead className="bg-gray-800">
                    <tr>
                    <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">اسم الموظف</th>
                    <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">الدور</th>
                    <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">الإجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                    {employees.map(emp => (
                    <tr key={emp.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="p-4 text-white">{emp.name}</td>
                        <td className="p-4 text-gray-300">{emp.role}</td>
                        <td className="p-4">
                            <button className="text-blue-400 hover:text-blue-300 mx-2">تعديل</button>
                            <button className="text-red-500 hover:text-red-400 mx-2">حذف</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
