import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { LogOut, User, Plus, X, Check, Trash2 } from 'lucide-react';
import HabitForm from '../components/HabitForm';
import ContributionGraph from '../components/ContributionGraph';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = ({ user, logout }) => {
    const [habits, setHabits] = useState([]);
    const [showHabitForm, setShowHabitForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHabitId, setSelectedHabitId] = useState(null);
    
    // New state for Profile Dropdown
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        fetchHabits();
        
        // Close profile when clicking outside
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchHabits = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 401) {
                logout();
                return;
            }

            const result = await response.json();
            if (response.ok) {
                setHabits(result.data);
            }
        } catch (error) {
            console.error("Error fetching habits:", error);
        }
    };

    const openArchiveModal = (habitId) => {
        setSelectedHabitId(habitId);
        setIsModalOpen(true);
    };

    const confirmArchive = async () => {
        if (!selectedHabitId) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits/${selectedHabitId}/archive`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success("Habit archived");
                fetchHabits();
            } else {
                toast.error("Failed to archive");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMarkDone = async (habitId) => {
        const habit = habits.find(h => h._id === habitId);
        if (habit && habit.completedToday) {
            toast.success("Already done today! Great job! 🎉");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login first");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activity/log`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: user._id, habitId })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Done! 🔥");
                fetchHabits(); // Refresh to get updated status and graph
                setRefreshKey(prev => prev + 1);
            } else {
                toast.error(data.message || "Could not log activity");
            }

        } catch (error) {
            console.error("Log error:", error);
            toast.error("Network connection failed");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        HobbyTrack
                    </h1>
                    
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 hover:bg-gray-900 p-1.5 rounded-full transition-colors border border-transparent hover:border-gray-700"
                        >
                            <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-600" />
                        </button>

                        {/* Profile Dropdown */}
                        {showProfile && (
                            <div className="absolute right-0 top-12 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-4 flex flex-col gap-4 animate-fade-in z-50">
                                <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                                    <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-green-500" />
                                    <div>
                                        <h2 className="font-bold text-white">{user.fullName}</h2>
                                        <p className="text-gray-400 text-xs">@{user.username || "user"}</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Link
                                        to="/profile"
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 text-sm text-gray-300 transition-colors flex items-center gap-2"
                                    >
                                        <User size={16} /> My Profile
                                    </Link>
                                    <button 
                                        onClick={logout} 
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-900/20 text-sm text-red-400 transition-colors flex items-center gap-2"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
                
                {/* Habits Section */}
                <section>
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Your Habits</h2>
                            <p className="text-gray-400 mt-1">Track your daily goals and build consistency.</p>
                        </div>
                        <button
                            onClick={() => setShowHabitForm(!showHabitForm)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${showHabitForm ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10'}`}
                        >
                            {showHabitForm ? <><X size={18} /> Close</> : <><Plus size={18} /> New Habit</>}
                        </button>
                    </div>

                    {/* Form */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showHabitForm ? 'max-h-[500px] opacity-100 mb-10' : 'max-h-0 opacity-0'}`}>
                        <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
                            <HabitForm onHabitCreated={() => { fetchHabits(); setShowHabitForm(false); }} />
                        </div>
                    </div>

                    {/* Habits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {habits.filter(h => !h.isArchived).map((habit) => {
                            const isDone = habit.completedToday;
                            return (
                                <div key={habit._id} className={`group bg-gray-900 border p-6 rounded-3xl transition-all duration-300 relative hover:-translate-y-1 hover:shadow-xl ${isDone ? 'border-green-500/30 bg-green-900/10 shadow-green-900/10' : 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/80'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="pr-8">
                                            <h3 className={`font-bold text-xl mb-2 ${isDone ? 'text-green-400 line-through decoration-green-500/50' : 'text-white'}`}>{habit.title}</h3>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase ${habit.type === 'todo' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                                {habit.type}
                                            </span>
                                        </div>
                                        
                                        <button
                                            onClick={() => openArchiveModal(habit._id)}
                                            className="absolute top-5 right-5 text-gray-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                            title="Archive"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            onClick={() => handleMarkDone(habit._id)}
                                            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${isDone ? 'bg-green-500 text-white shadow-lg shadow-green-900/20' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                                        >
                                            {isDone ? <><Check size={20} /> Completed</> : <><div className="w-5 h-5 rounded-full border-2 border-current" /> Mark Done</>}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {habits.filter(h => !h.isArchived).length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-2xl">
                            <p className="text-gray-500 text-lg">No active habits.</p>
                            <p className="text-gray-600 text-sm mt-2">Start by creating one above!</p>
                        </div>
                    )}
                </section>
            </main>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmArchive}
                title="Archive Habit?"
                message="This will hide the habit from your dashboard. Your history will remain saved."
            />
        </div>
    );
};

export default Dashboard;