import { useState, useEffect } from 'react';
import ContributionGraph from './components/ContributionGraph';
import GoogleLoginButton from './components/GoogleLoginButton';

function App() {
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loginData) => {

    localStorage.setItem('token', loginData.token);
    localStorage.setItem('user', JSON.stringify(loginData.user));
    
    setUser(loginData.user);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const TEST_HABIT_ID = "69510c7ebe7869aac9027c04"; 

  const handleMarkDone = async () => {
    const token = localStorage.getItem('token'); 

    try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/v1/activity/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id, // Use the REAL logged in ID now!
            habitId: TEST_HABIT_ID
          })
        });
        if (response.ok) setRefreshKey(prev => prev + 1);
    } catch(err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center gap-8">
       
       {!user ? (
          <div className="text-center mt-20">
              <h1 className="text-5xl font-bold mb-6 text-green-500">HobbyTrack</h1>
              <p className="text-gray-400 mb-8 text-xl">Visualize your consistency.</p>
              <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
          </div>
       ) : (
          <>
            <div className="flex justify-between w-full max-w-4xl items-center">
                <div className="flex items-center gap-4">
                    {/* Show Google Avatar */}
                    <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-green-500"/>
                    <h2 className="text-2xl font-bold">Welcome, {user.fullName}</h2>
                </div>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
            </div>

            {/* Pass the Real User ID now! */}
            <ContributionGraph userId={user._id} refreshKey={refreshKey} />

            <button 
                onClick={handleMarkDone}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-all"
            >
                ✅ I did it today!
            </button>
          </>
       )}
    </div>
  );
}

export default App;