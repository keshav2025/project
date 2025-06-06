import React from 'react';
import { useNavigate } from 'react-router-dom';
import AmexCard from '../components/AmexCard';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const UnlockCard: React.FC = () => {
  const { userData } = useAppContext();
  const navigate = useNavigate();
  
  const handleApply = () => {
    navigate('/congratulations');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="mb-4 w-full">
        <AmexCard name={userData.name} />
      </div>
      
      <h1 className="text-3xl font-bold mb-2 text-center">Unlock Card</h1>
      
      <div className="flex justify-between w-full mb-4">
        <div className="text-lg">₹0 Annual Fee</div>
        <div className="text-lg">₹50,000 worth of benefits annualy</div>
      </div>
      
      <button 
        onClick={handleApply}
        className="primary-button w-full mb-8"
      >
        Card to Card Apply
      </button>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-100 p-4 rounded-lg w-full flex items-center mb-4"
      >
        <Gift className="text-blue-500 mr-3" size={24} />
        <div className="flex-1">
          <div className="font-medium">Get 10% off on your next purchase</div>
          <div className="text-sm text-gray-600">Valid till 10th Oct 2024</div>
        </div>
        <div className="text-gray-400 text-xl">›</div>
      </motion.div>
      
      <div className="text-gray-500 text-center mt-4">
        Swipe up to see more offers
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-around max-w-md mx-auto">
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" stroke="#666" strokeWidth="2"/>
            <path d="M10 16V8L16 12L10 16Z" fill="#666"/>
          </svg>
        </button>
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="#666" strokeWidth="2"/>
            <path d="M16 12H12M8 12H12M12 12V8M12 12V16" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="5" r="3" stroke="#666" strokeWidth="2"/>
            <circle cx="5" cy="19" r="3" stroke="#666" strokeWidth="2"/>
            <circle cx="19" cy="19" r="3" stroke="#666" strokeWidth="2"/>
            <path d="M12 8V14M5 16L10 14M14 14L19 16" stroke="#666" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default UnlockCard;