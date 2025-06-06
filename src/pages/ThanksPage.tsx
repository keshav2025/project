import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react'; // Make sure to install lucide-react

const ThanksPage: React.FC = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto redirect after 3 minutes (180 seconds)
  useEffect(() => {
    if (secondsLeft === 0) {
      navigate('/unlock-card');
    }
  }, [secondsLeft, navigate]);

  // Time formatter function
  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <XCircle className="text-red-600 w-16 h-16 mb-4" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">Something Went Wrong</h1>
      <p className="text-lg mb-1 text-gray-700">
        We're sorry, but your request couldn't be processed at the moment.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Please try again after:{' '}
        <span className="font-semibold text-blue-600">{formatTime(secondsLeft)}</span>
      </p>
      <button
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded shadow"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ThanksPage;
