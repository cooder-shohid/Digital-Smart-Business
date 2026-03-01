export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-600 text-white p-6 hidden md:block">
        <p className="font-bold mb-4">Admin Panel</p>
        <p>Dashboard</p>
        <p>Orders</p>
        <p>Products</p>
        <p>Services</p>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">Total Orders</div>
          <div className="card">Total Sales</div>
          <div className="card">Users</div>
        </div>
      </main>
    </div>
  );
}