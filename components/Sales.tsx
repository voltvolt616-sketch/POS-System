
import React, { useState, useMemo } from 'react';
import { Product, CartItem, Currency, Sale } from '../types';
import { CURRENCY_SYMBOLS } from '../constants';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Select from './ui/Select';

interface SalesProps {
  products: Product[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
}

const Sales: React.FC<SalesProps> = ({ products, addSale }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState<Currency>(Currency.EGP);
  const [paymentMethod, setPaymentMethod] = useState<'نقدي' | 'بطاقة'>('نقدي');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [lastSale, setLastSale] = useState<Sale | null>(null);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.code.includes(searchTerm)
    );
  }, [products, searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, cartQuantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, cartQuantity: quantity } : item
      );
    });
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const newSale: Omit<Sale, 'id'> = {
        items: cart,
        total,
        currency,
        paymentMethod,
        date: new Date(),
    };
    addSale(newSale as Omit<Sale, 'id' | 'date'>); // type casting to match simplified function signature
    const saleForInvoice = {...newSale, id: `s${Date.now()}`};
    setLastSale(saleForInvoice);
    setIsInvoiceModalOpen(true);
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-theme('spacing.4'))] p-2 gap-2">
      {/* Products List */}
      <div className="lg:col-span-2 bg-gray-900 rounded-lg p-4 flex flex-col h-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">الأصناف</h2>
        <input
          type="text"
          placeholder="بحث بالباركود أو الاسم..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => addToCart(product)} className="bg-gray-800 rounded-lg p-3 text-center cursor-pointer border border-gray-700 hover:border-green-500 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all">
              <p className="font-bold text-white truncate">{product.name}</p>
              <p className="text-sm text-green-400">{product.price.toLocaleString()} {CURRENCY_SYMBOLS[Currency.EGP]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="bg-gray-900 rounded-lg p-4 flex flex-col h-full">
        <h2 className="text-2xl font-bold text-white mb-4">الفاتورة</h2>
        <div className="flex-grow overflow-y-auto bg-gray-800/50 rounded-md p-2 divide-y divide-gray-700">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2">
              <div className="flex-1">
                <p className="text-white font-semibold truncate">{item.name}</p>
                <p className="text-sm text-gray-400">{item.price.toLocaleString()} {CURRENCY_SYMBOLS[currency]}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={item.cartQuantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  className="w-16 bg-gray-700 text-white text-center rounded-md p-1"
                />
                <button onClick={() => updateQuantity(item.id, 0)} className="text-red-500 hover:text-red-400 p-1 rounded-full bg-gray-700">&times;</button>
              </div>
              <p className="w-24 text-left text-white font-bold">{(item.price * item.cartQuantity).toLocaleString()}</p>
            </div>
          ))}
          {cart.length === 0 && <p className="text-gray-500 text-center py-10">السلة فارغة</p>}
        </div>
        <div className="mt-4 border-t-2 border-green-500/50 pt-4 space-y-4">
          <div className="flex justify-between text-2xl font-bold text-white">
            <span>الإجمالي:</span>
            <span className="text-green-400 neon-text">{total.toLocaleString()} {CURRENCY_SYMBOLS[currency]}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select label="العملة" value={currency} onChange={e => setCurrency(e.target.value as Currency)}>
              {Object.values(Currency).map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select label="طريقة الدفع" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as 'نقدي' | 'بطاقة')}>
              <option value="نقدي">نقدي</option>
              <option value="بطاقة">بطاقة</option>
            </Select>
          </div>
          <Button onClick={handleCheckout} disabled={cart.length === 0} className="w-full text-lg">
            إتمام البيع والدفع
          </Button>
        </div>
      </div>
       <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="فاتورة بيع">
            {lastSale && (
                <div className="bg-gray-800 p-6 rounded-lg text-white font-mono">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-green-400 neon-text">فاتورة ضريبية مبسطة</h3>
                        <p>اسم الفرع: الفرع الرئيسي</p>
                        <p>التاريخ: {new Date(lastSale.date).toLocaleString('ar-EG')}</p>
                    </div>
                    <div className="border-t border-b border-dashed border-gray-500 py-2 mb-4">
                        {lastSale.items.map(item => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.name} (x{item.cartQuantity})</span>
                                <span>{(item.price * item.cartQuantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 text-lg">
                       <div className="flex justify-between font-bold">
                           <span>الإجمالي:</span>
                           <span>{lastSale.total.toLocaleString()} {CURRENCY_SYMBOLS[lastSale.currency]}</span>
                       </div>
                       <div className="flex justify-between">
                           <span>طريقة الدفع:</span>
                           <span>{lastSale.paymentMethod}</span>
                       </div>
                    </div>
                    <p className="text-center mt-8 text-sm text-gray-400">شكراً لزيارتكم!</p>
                </div>
            )}
       </Modal>
    </div>
  );
};

export default Sales;
