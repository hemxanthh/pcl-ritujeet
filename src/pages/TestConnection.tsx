import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const TestConnection = () => {
  const [message, setMessage] = useState('Testing connection...');
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test authentication
        const { error: authError } = await supabase.auth.signInAnonymously();
        
        if (authError) {
          setMessage(`Auth error: ${authError.message}`);
          return;
        }

        // Test database connection
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(5);

        if (error) {
          setMessage(`Database error: ${error.message}`);
          return;
        }

        if (data) {
          setProducts(data);
          setMessage('✅ Connection successful!');
        }
      } catch (error) {
        setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <p className="font-mono">{message}</p>
        </div>
        
        {products.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Sample Products</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {products.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <h2 className="font-semibold mb-2">Connection Details:</h2>
          <p className="text-sm font-mono break-all">
            <strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;
