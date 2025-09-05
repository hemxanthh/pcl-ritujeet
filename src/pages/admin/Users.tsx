import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  created_at: string;
}

export default function Users() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      (u.email || '').toLowerCase().includes(q) || (u.full_name || '').toLowerCase().includes(q)
    );
  }, [users, query]);

  useEffect(() => {
    let mounted = true;
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, email, full_name, role, created_at')
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (mounted) setUsers(data || []);
      } catch (err: any) {
        console.error('Failed to fetch users', err);
        setError(err.message || 'Failed to fetch users');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchUsers();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('users-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_profiles' },
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <Link to="/admin" className="text-indigo-600 hover:text-indigo-800 text-sm">
          Back to Dashboard
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full sm:w-80 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-6 bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-red-600">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
            {!loading && !error &&
              filtered.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{u.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{u.full_name || '-'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(u.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
