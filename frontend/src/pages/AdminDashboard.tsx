import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back. What would you like to manage today?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* OPTION 1: Manage Pages */}
          <Link to="/admin/pages" className="group block">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-black transition cursor-pointer h-full">
              <div className="text-4xl mb-4">📄</div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">Manage Pages</h2>
              <p className="text-gray-500">Create and edit content for About Us, Privacy Policy, and other static pages.</p>
            </div>
          </Link>

          {/* OPTION 2: Manage Products */}
          <Link to="/admin/products" className="group block">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-black transition cursor-pointer h-full">
              <div className="text-4xl mb-4">📦</div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600">Manage Products</h2>
              <p className="text-gray-500">Add new jewelry items, update prices, and manage inventory.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};