import { useState, useEffect } from 'react';
import ContributionGraph from './components/ContributionGraph';
import GoogleLoginButton from './components/GoogleLoginButton';
import HabitForm from './components/HabitForm'; 
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const fetchHabits = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok) {
        setHabits(result.data); 
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  const handleLoginSuccess = (loginData) => {
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('user', JSON.stringify(loginData.user));
    setUser(loginData.user);
    toast.success("Welcome back!");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setHabits([]); 
  };

  
  const handleMarkDone = async (habitId) => {
    const token = localStorage.getItem('token'); 
    if (!token) return;

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/v1/activity/log', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          userId: user._id, 
          habitId: habitId 
        })
      });

      if (response.ok) {
        setRefreshKey(prev => prev + 1); 
        toast.success("Good job! One step closer. 🔥");
      } else {
        toast.error("Failed to log activity");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center gap-8">
      <Toaster position="bottom-center" reverseOrder={false} />
       
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
                    <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-green-500"/>
                    <h2 className="text-2xl font-bold">Welcome, {user.fullName}</h2>
                </div>
                <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">Logout</button>
            </div>

            <ContributionGraph userId={user._id} refreshKey={refreshKey} />

            <div className="w-full max-w-4xl border-t border-gray-800 my-4"></div>

            <HabitForm onHabitCreated={fetchHabits} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                {habits.length === 0 ? (
                    <p className="text-gray-500 col-span-2 text-center">No habits yet. Create one above!</p>
                ) : (
                    habits.map((habit) => (
                        <div key={habit._id} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex justify-between items-center hover:border-gray-600 transition-all">
                            <div>
                                <h3 className="font-bold text-lg">{habit.title}</h3>
                                <p className="text-sm text-gray-400">{habit.description || "Daily Goal"}</p>
                            </div>
                            
                            <button 
                                onClick={() => handleMarkDone(habit._id)}
                                className="bg-green-600/20 text-green-500 hover:bg-green-600 hover:text-white border border-green-600/50 p-2 rounded-lg transition-all"
                                title="Mark as Done"
                            >
                                ✅
                            </button>
                        </div>
                    ))
                )}
            </div>
          </>
       )}
    </div>
  );
}

export default App;