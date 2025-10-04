
export enum Currency {
  EGP = 'EGP',
  USD = 'USD',
  CNY = 'CNY',
}

export interface Product {
  id: string;
  name: string;
  code: string;
  quantity: number;
  price: number;
  category: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  currency: Currency;
  paymentMethod: 'نقدي' | 'بطاقة';
  date: Date;
}

export enum ExpenseCategory {
  Electricity = 'كهرباء',
  Water = 'مياه',
  Salaries = 'رواتب الموظفين',
  Other = 'مصروفات أخرى',
}

export interface Expense {
  id: string;
  type: ExpenseCategory;
  amount: number;
  currency: Currency;
  date: Date;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
}

export type Page = 'login' | 'dashboard' | 'inventory' | 'sales' | 'expenses' | 'summary' | 'reports' | 'settings';
