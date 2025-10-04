
import { Product, Sale, Expense, Currency, ExpenseCategory } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'تيشيرت قطن أسود', code: '1001', quantity: 50, price: 350, category: 'ملابس رجالي' },
  { id: 'p2', name: 'بنطلون جينز أزرق', code: '1002', quantity: 30, price: 700, category: 'ملابس رجالي' },
  { id: 'p3', name: 'فستان صيفي مورد', code: '2001', quantity: 25, price: 950, category: 'ملابس حريمي' },
  { id: 'p4', name: 'حذاء رياضي أبيض', code: '3001', quantity: 40, price: 1200, category: 'أحذية' },
  { id: 'p5', name: 'حقيبة يد جلدية', code: '4001', quantity: 15, price: 800, category: 'إكسسوارات' },
];

export const MOCK_SALES: Sale[] = [
    { id: 's1', items: [{...MOCK_PRODUCTS[0], cartQuantity: 1}, {...MOCK_PRODUCTS[2], cartQuantity: 1}], total: 1300, currency: Currency.EGP, paymentMethod: 'بطاقة', date: new Date(new Date().setDate(new Date().getDate() - 1)) },
    { id: 's2', items: [{...MOCK_PRODUCTS[1], cartQuantity: 2}], total: 1400, currency: Currency.EGP, paymentMethod: 'نقدي', date: new Date() },
    { id: 's3', items: [{...MOCK_PRODUCTS[3], cartQuantity: 1}], total: 65, currency: Currency.USD, paymentMethod: 'بطاقة', date: new Date() },
];

export const MOCK_EXPENSES: Expense[] = [
    { id: 'e1', type: ExpenseCategory.Electricity, amount: 1500, currency: Currency.EGP, date: new Date(new Date().setDate(1)) },
    { id: 'e2', type: ExpenseCategory.Salaries, amount: 25000, currency: Currency.EGP, date: new Date(new Date().setDate(2)) },
    { id: 'e3', type: ExpenseCategory.Other, amount: 100, currency: Currency.USD, date: new Date(new Date().setDate(3)) },
];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  [Currency.EGP]: 'ج.م',
  [Currency.USD]: '$',
  [Currency.CNY]: '¥',
};
