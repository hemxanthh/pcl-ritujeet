import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  products?: { id: string; name: string };
}

interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  created_at: string;
  user_profiles?: { email: string | null };
  order_items: OrderItem[];
}

const statusOptions = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] as const;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'' | Order['status']>('');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = (statusFilter || '').toLowerCase();
    const query = q.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = !s || o.status === s;
      const matchesQuery =
        !query ||
        o.id.toLowerCase().includes(query) ||
        (o.user_profiles?.email || '').toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [orders, statusFilter, q]);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('orders')
          .select('id, user_id, status, total, created_at, user_profiles(email), order_items(id, quantity, price, products(id, name))')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (mounted) setOrders(data as unknown as Order[] || []);
      } catch (err: any) {
        console.error('Failed to fetch orders', err);
        setError(err.message || 'Failed to fetch orders');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrders();

    const channel = supabase
      .channel('orders-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchOrders())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'order_items' }, () => fetchOrders())
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: Order['status']) => {
    const prev = orders;
    setOrders((os) => os.map((o) => (o.id === id ? { ...o, status } : o)));
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) {
      console.error('Failed to update status', error);
      setOrders(prev);
      alert('Failed to update order status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <Link to="/admin" className="text-indigo-600 hover:text-indigo-800 text-sm">
          Back to Dashboard
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by order ID or user email"
          className="w-full sm:w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="w-full sm:w-56 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Loading orders...
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-red-600">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
            {!loading && !error &&
              filtered.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{o.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{o.user_profiles?.email || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value as Order['status'])}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">${'{'}o.total.toFixed(2){'}'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(o.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <details>
                      <summary className="cursor-pointer text-indigo-600 hover:text-indigo-800">Items</summary>
                      <ul className="mt-2 text-gray-700 list-disc list-inside">
                        {o.order_items?.map((it) => (
                          <li key={it.id}>
                            {it.products?.name || it.product_id} × {it.quantity} — ${'{'}(it.price * it.quantity).toFixed(2){'}'}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
