import React from 'react';
import { User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
// Ensure this path is correct relative to the build output
import logo from '../assets/WhatsApp Image 2025-06-06 at 18.10.54 (1).png';

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

        <div className="flex-1 flex justify-center items-center">
          <img 
            src={logo} 
            alt="American Express" 
            className="h-16 w-auto object-contain p-1" 
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