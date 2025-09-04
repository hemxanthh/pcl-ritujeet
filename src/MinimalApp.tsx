const MinimalApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Our Store</h1>
        <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
          <p className="text-xl">Tailwind CSS is working!</p>
        </div>
        <div className="space-y-4">
          <button className="btn btn-primary">
            Primary Button
          </button>
          <button className="btn btn-secondary ml-4">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimalApp;
