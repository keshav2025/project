import React from 'react';
import { User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import logo from '../assets/logo-american-express-computer-icons-sign-payment-american-express-86dd053d422618121424f442038de874.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { step } = useAppContext();
  const location = useLocation();
  
  const showUserIcon = location.pathname === '/unlock-card' || 
                       location.pathname === '/congratulations' || 
                       location.pathname === '/final-congratulations';

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-[#006FCF] p-2 relative flex justify-center items-center">
        <div className="absolute left-4 flex space-x-1">
         
        </div>

        <div className="flex-1 flex justify-center">
          <img 
            src={logo} 
            alt="American Express" 
            className="h-14 w-12"
          />
        </div>

        

        {showUserIcon && (
          <div className="absolute right-4">
            <User className="text-white" size={24} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;