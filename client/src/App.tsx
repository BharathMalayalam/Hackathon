import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProblemsPage from './pages/ProblemsPage';
import GitGuidePage from './pages/GitGuidePage';
import RegisterFormPage from './pages/RegisterFormPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-brand-500/30">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/git-guide" element={<GitGuidePage />} />
          <Route path="/register" element={<RegisterFormPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
