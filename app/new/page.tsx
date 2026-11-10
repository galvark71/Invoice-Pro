'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
export default function NewInvoice() {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [number, setNumber] = useState('INV-1001');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [due, setDue] = useState('');
  const [items, setItems] = useState([{ description: 'Service', qty: 1, price: 100 }]);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
  const tax = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + tax;
  function updateItem(i: number, key: string, val: any) {
    const copy = [...items]; (copy[i] as any)[key] = key === 'description' ? val : Number(val); setItems(copy);
  }
  async function save() {
    setSaving(true); setMsg('');
    if (!clientName) { setMsg('Enter a client name first.'); setSaving(false); return; }
    const { data: inv, error } = await supabase.from('invoices').insert({
      client_name: clientName, client_email: clientEmail, invoice_number: number,
      invoice_date: date, due_date: due || null, subtotal, discount, tax_rate: taxRate, tax_amount: tax, total, status: 'unpaid'
    }).select().single();
    if (error) { setMsg('Save failed: ' + error.message + ' - Check your Supabase keys and schema.sql'); setSaving(false); return; }
    if (inv) {
      const rows = items.map(it => ({ invoice_id: inv.id, description: it.description, qty: it.qty, price: it.price, line_total: it.qty * it.price }));
      await supabase.from('invoice_items').insert(rows);
    }
    setMsg('Saved! Invoice #' + number + ' total $' + total.toFixed(2) + ' is now in Supabase.');
    setSaving(false);
  }
  return (<main style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}>
    <h1>New Invoice</h1>
    <p>From: Dustin Carl Umfress • This button MUST show feedback - it saves to Supabase and confirms.</p>
    <label>Bill To Name<br/><input value={clientName} onChange={e => setClientName(e.target.value)} style={{ width: '100%', padding: 10 }} /></label><br/><br/>
    <label>Bill To Email<br/><input value={clientEmail} onChange={e => setClientEmail(e.target.value)} style={{ width: '100%', padding: 10 }} /></label><br/><br/>
    <label>Invoice #<br/><input value={number} onChange={e => setNumber(e.target.value)} style={{ width: '100%', padding: 10 }} /></label><br/><br/>
    <label>Date<br/><input type="date" value={date} onChange={e => setDate(e.target.value)} /></label> &nbsp;
    <label>Due Date<br/><input type="date" value={due} onChange={e => setDue(e.target.value)} /></label><br/><br/>
    <h3>Items</h3>
    {items.map((it, i) => (<div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
      <input value={it.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Description" style={{ flex: 2, padding: 8 }} />
      <input type="number" value={it.qty} onChange={e => updateItem(i, 'qty', e.target.value)} style={{ width: 70, padding: 8 }} />
      <input type="number" value={it.price} onChange={e => updateItem(i, 'price', e.target.value)} style={{ width: 100, padding: 8 }} />
      <span style={{ width: 90, padding: 8 }}>${(it.qty * it.price).toFixed(2)}</span>
      <button onClick={() => setItems(items.filter((_, idx) => idx !== i))}>Remove</button>
    </div>))}
    <button onClick={() => setItems([...items, { description: 'New item', qty: 1, price: 0 }])}>+ Add Item</button><br/><br/>
    <label>Discount $<input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} style={{ marginLeft: 8, padding: 8, width: 100 }} /></label> &nbsp;
    <label>Tax %<input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} style={{ marginLeft: 8, padding: 8, width: 80 }} /></label>
    <div style={{ background: 'white', padding: 16, borderRadius: 12, marginTop: 16 }}>
      <div>Subtotal: ${subtotal.toFixed(2)}</div><div>Discount: -${discount.toFixed(2)}</div><div>Tax: ${tax.toFixed(2)}</div><div><b>Total Due: ${total.toFixed(2)}</b></div>
    </div>
    <button onClick={save} disabled={saving} style={{ marginTop: 16, background: '#0F2040', color: 'white', padding: '12px 20px', borderRadius: 8, border: 'none', fontSize: 16 }}>{saving ? 'Saving...' : 'Save Invoice to Supabase'}</button>
    {msg && <p style={{ background: '#EAF6EA', padding: 12, borderRadius: 8, marginTop: 12 }}><b>{msg}</b></p>}
    <p><a href="/">Back to Dashboard</a></p>
  </main>);
}
