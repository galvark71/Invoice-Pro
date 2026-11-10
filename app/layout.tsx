export const metadata = { title: 'Invoice Pro - by Dustin Carl Umfress', description: 'Create, save, and download invoices' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{ fontFamily: 'system-ui, sans-serif', background: '#F8F6EF', margin: 0 }}>{children}</body></html>);
}
