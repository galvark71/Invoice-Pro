import { createClient } from '@supabase/supabase-js';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(url, anon);
export type ClientRow = { id?: string; name: string; email?: string; phone?: string; notes?: string };
export type InvoiceItem = { description: string; qty: number; price: number; line_total: number };
export type InvoiceRow = {
  id?: string; client_name: string; client_email?: string; invoice_number: string;
  invoice_date: string; due_date?: string; subtotal: number; discount: number;
  tax_rate: number; tax_amount: number; total: number; status: 'paid'|'unpaid'|'overdue'; notes?: string;
  items?: InvoiceItem[];
};
