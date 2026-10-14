import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import KnowledgePage from './pages/KnowledgePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
