const SimpleHome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Simple Home</h1>
      </header>
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Welcome to our store!</h2>
        <p className="text-lg text-gray-700">This is a simple home page to test the layout.</p>
      </main>
    </div>
  );
};

export default SimpleHome;
