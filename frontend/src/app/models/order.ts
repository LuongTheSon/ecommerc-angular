import { cartItem } from './cart';

export type order = {
  id: string;
  userId: string;
  total: number;
  items: cartItem[];
  paymentStatus: 'success' | 'failed';
};
