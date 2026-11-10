-- Run this in Supabase SQL Editor
-- Invoice Pro - Dustin Carl Umfress
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  business_name text default 'Dustin Carl Umfress',
  email text,
  phone text,
  created_at timestamptz default now()
);
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  name text not null,
  email text,
  phone text,
  notes text,
  created_at timestamptz default now()
);
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  client_id uuid references clients(id) on delete set null,
  client_name text not null,
  client_email text,
  invoice_number text not null,
  invoice_date date default current_date,
  due_date date,
  subtotal numeric default 0,
  discount numeric default 0,
  tax_rate numeric default 0,
  tax_amount numeric default 0,
  total numeric default 0,
  status text default 'unpaid' check (status in ('paid','unpaid','overdue')),
  notes text,
  created_at timestamptz default now()
);
create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete cascade,
  description text not null,
  qty numeric default 1,
  price numeric default 0,
  line_total numeric default 0
);
alter table profiles enable row level security;
alter table clients enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;
-- For MVP with Supabase Auth, add policies after enabling Auth. For local dev without auth, use service role key server-side only.
create index if not exists idx_invoices_user on invoices(user_id);
create index if not exists idx_clients_user on clients(user_id);
