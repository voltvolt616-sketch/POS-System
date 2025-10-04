
import React, { useState } from 'react';
import { Product, Currency } from '../types';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Input from './ui/Input';
import { CURRENCY_SYMBOLS } from '../constants';

interface InventoryProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Inventory: React.FC<InventoryProps> = ({ products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', code: '', quantity: 0, price: 0, category: '' });

  const handleAddProduct = () => {
    if(newProduct.name && newProduct.code && newProduct.quantity > 0 && newProduct.price > 0) {
        setProducts(prev => [...prev, { ...newProduct, id: `p${prev.length + 1}` }]);
        setIsModalOpen(false);
        setNewProduct({ name: '', code: '', quantity: 0, price: 0, category: '' });
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">إدارة المخزون</h1>
        <div className="flex gap-4">
            <Button onClick={() => setIsModalOpen(true)}>إضافة صنف جديد</Button>
            <Button variant="secondary">تصنيف الأصناف</Button>
            <Button variant="secondary">توليد باركود</Button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">اسم الصنف</th>
              <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">الكود</th>
              <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">الكمية</th>
              <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">السعر</th>
              <th className="p-4 text-sm font-semibold text-green-400 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="p-4 text-white">{product.name}</td>
                <td className="p-4 text-gray-300">{product.code}</td>
                <td className="p-4 text-gray-300">{product.quantity}</td>
                <td className="p-4 text-gray-300">{product.price.toLocaleString()} {CURRENCY_SYMBOLS[Currency.EGP]}</td>
                <td className="p-4">
                    <button className="text-blue-400 hover:text-blue-300 mx-2">تعديل</button>
                    <button className="text-red-500 hover:text-red-400 mx-2">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="إضافة صنف جديد">
            <div className="space-y-4">
                <Input label="اسم الصنف" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                <Input label="الكود (الباركود)" value={newProduct.code} onChange={e => setNewProduct({...newProduct, code: e.target.value})} />
                <Input label="الفئة" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="الكمية" type="number" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: parseInt(e.target.value) || 0})} />
                    <Input label="السعر" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>إلغاء</Button>
                    <Button onClick={handleAddProduct}>إضافة</Button>
                </div>
            </div>
       </Modal>
    </div>
  );
};

export default Inventory;
