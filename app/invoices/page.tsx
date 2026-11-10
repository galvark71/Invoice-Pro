'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  useEffect(() => { load(); }, []);
  async function load() { const { data } = await supabase.from('invoices').select('*').order('created_at', { ascending: false }); setInvoices(data || []); }
  async function markPaid(id: string) { await supabase.from('invoices').update({ status: 'paid' }).eq('id', id); load(); }
  async function del(id: string) { if (!confirm('Delete this invoice?')) return; await supabase.from('invoices').delete().eq('id', id); load(); }
  return (<main style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}><h1>All Invoices</h1>
    {invoices.map((inv: any) => (<div key={inv.id} style={{ background: 'white', padding: 12, borderRadius: 8, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
      <span>#{inv.invoice_number} • {inv.client_name} • ${Number(inv.total).toFixed(2)} • {inv.status}</span>
      <span><button onClick={() => markPaid(inv.id)} style={{ marginRight: 8 }}>Mark Paid</button><button onClick={() => del(inv.id)}>Delete</button></span>
    </div>))}
    <p><a href="/">Back</a></p></main>);
}
