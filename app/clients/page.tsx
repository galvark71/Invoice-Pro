'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [phone, setPhone] = useState('');
  useEffect(() => { load(); }, []);
  async function load() { const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false }); setClients(data || []); }
  async function add() { if (!name) return; await supabase.from('clients').insert({ name, email, phone }); setName(''); setEmail(''); setPhone(''); load(); }
  return (<main style={{ maxWidth: 820, margin: '0 auto', padding: 24 }}><h1>Clients</h1>
    <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ padding: 10, marginRight: 8 }} />
    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ padding: 10, marginRight: 8 }} />
    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" style={{ padding: 10, marginRight: 8 }} />
    <button onClick={add} style={{ padding: '10px 16px' }}>Add Client</button>
    <div style={{ marginTop: 16 }}>{clients.map((c: any) => (<div key={c.id} style={{ background: 'white', padding: 12, borderRadius: 8, marginBottom: 8 }}>{c.name} • {c.email || ''} • {c.phone || ''}</div>))}</div>
    <p><a href="/">Back</a></p></main>);
}
