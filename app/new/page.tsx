'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
export default function Dashboard() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  useEffect(() => { load(); }, []);
  async function load() {
    const { data: inv } = await supabase.from('invoices').select('*').order('created_at', { ascending: false });
    const { data: cli } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    setInvoices(inv || []); setClients(cli || []);
  }
  const billed = invoices.reduce((s, i) => s + Number(i.total || 0), 0);
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.total || 0), 0);
  const outstanding = billed - paid;
  return (<main style={{ maxWidth: 980, margin: '0 auto', padding: 24 }}>
    <h1 style={{ color: '#0F2040' }}>Invoice Pro</h1>
    <p>© Dustin Carl Umfress • Data in Supabase • System 2</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
      <div style={{ background: 'white', padding: 16, borderRadius: 12 }}><b>Total Invoices</b><div style={{ fontSize: 28 }}>{invoices.length}</div></div>
      <div style={{ background: 'white', padding: 16, borderRadius: 12 }}><b>Total Billed</b><div style={{ fontSize: 28 }}>${billed.toFixed(2)}</div></div>
      <div style={{ background: 'white', padding: 16, borderRadius: 12 }}><b>Paid</b><div style={{ fontSize: 28 }}>${paid.toFixed(2)}</div></div>
      <div style={{ background: 'white', padding: 16, borderRadius: 12 }}><b>Outstanding</b><div style={{ fontSize: 28 }}>${outstanding.toFixed(2)}</div></div>
    </div>
    <h2>Recent Invoices</h2>
    {invoices.length === 0 ? <p>No invoices yet. Create your first invoice from the New Invoice page.</p> : invoices.slice(0, 10).map((inv: any) => (
      <div key={inv.id} style={{ background: 'white', padding: 12, borderRadius: 8, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
        <span>#{inv.invoice_number} • {inv.client_name} • ${Number(inv.total).toFixed(2)}</span><span>{inv.status}</span>
      </div>
    ))}
    <p><a href="/new">New Invoice →</a> • <a href="/clients">Clients →</a> • <a href="/invoices">All Invoices →</a></p>
    <p style={{ fontSize: 13, color: '#666' }}>This is the real Next.js + Supabase version. Deploy steps are in README.md. Until you add your Supabase keys and run schema.sql, this page will show empty data.</p>
  </main>);
}
