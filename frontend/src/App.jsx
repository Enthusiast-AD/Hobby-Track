import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast'; 
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import PublicProfile from './pages/PublicProfile';
import Onboarding from './pages/Onboarding'; 
import { jwtDecode } from "jwt-decode"; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            console.log("Token expired");
            handleLogout();
          } else {
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.log("Invalid token found");
          handleLogout();
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    toast.success("Logged out");
  };

  if (loading) return <div className="bg-black min-h-screen text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center">
       <Toaster position="bottom-center" />
       
       <BrowserRouter>
          <Routes>
             <Route path="/" element={
                 !user ? (
                    <LandingPage onLoginSuccess={(data) => {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        setUser(data.user);
                        toast.success("Welcome back!");
                    }} />
                 ) : (
                    <Navigate to={user.username ? "/dashboard" : "/onboarding"} />
                 )
             } />
             <Route path="/onboarding" element={
                 user && !user.username ? (
                    <Onboarding onComplete={(updatedUser) => {
                        setUser(updatedUser);
                    }} />
                 ) : (
                    <Navigate to={user ? "/dashboard" : "/"} />
                 )
             } />
             <Route path="/dashboard" element={
                 user && user.username ? (
                    <Dashboard user={user} logout={handleLogout} />
                 ) : (
                    user ? <Navigate to="/onboarding" /> : <Navigate to="/" />
                 )
             } />
             <Route path="/u/:username" element={<PublicProfile />} />
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;