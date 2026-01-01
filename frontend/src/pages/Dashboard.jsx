import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { LogOut, User, Plus, Check, Trash2, X, Flame, Trophy, Archive, RotateCcw } from 'lucide-react';
import HabitForm from '../components/HabitForm';
import ConfirmModal from '../components/ConfirmModal';
import Skeleton from '../components/Skeleton';

const Dashboard = ({ user, logout }) => {
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived'
    
    // Modal State for "Create Habit"
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [refreshKey, setRefreshKey] = useState(0);

    // Archive/Delete Modal State
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedHabitId, setSelectedHabitId] = useState(null);
    
    // Profile Dropdown State
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        fetchHabits();
        
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeTab]); // Refetch when tab changes

    const fetchHabits = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const isArchived = activeTab === 'archived';
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits?archived=${isArchived}`, {
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
        } finally {
            setIsLoading(false);
        }
    };

    const openArchiveModal = (habitId) => {
        setSelectedHabitId(habitId);
        setIsArchiveModalOpen(true);
    };

    const openDeleteModal = (habitId) => {
        setSelectedHabitId(habitId);
        setIsDeleteModalOpen(true);
    };

    const handleArchiveToggle = async () => {
        if (!selectedHabitId) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits/${selectedHabitId}/archive`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success(activeTab === 'active' ? "Habit archived" : "Habit unarchived");
                fetchHabits();
            } else {
                toast.error("Failed to update habit");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!selectedHabitId) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits/${selectedHabitId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success("Habit deleted permanently");
                fetchHabits();
            } else {
                toast.error("Failed to delete habit");
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
                fetchHabits(); 
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
            <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Commit
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
                            <div className="absolute right-0 top-12 w-64 bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                <div className="px-3 py-3 border-b border-gray-800 mb-1">
                                    <p className="font-bold text-white text-sm">{user.fullName}</p>
                                    <p className="text-gray-500 text-xs">@{user.username || "user"}</p>
                                </div>
                                
                                <Link
                                    to="/profile"
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-gray-300 transition-colors flex items-center gap-2"
                                >
                                    <User size={16} /> My Profile
                                </Link>
                                <button 
                                    onClick={logout} 
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-900/10 text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
                
                {/* Header & Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white">Your Habits</h2>
                        <p className="text-gray-400 mt-1">Consistency is the key to success.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* Tab Switcher */}
                        <div className="bg-gray-900 p-1 rounded-full flex items-center border border-white/10">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setActiveTab('archived')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'archived' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Archived
                            </button>
                        </div>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                        >
                            <Plus size={20} /> New Habit
                        </button>
                    </div>
                </div>

                {/* Habits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Loading Skeletons
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-3xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-full">
                                        <Skeleton className="h-8 w-3/4 mb-3" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-6 w-16 rounded-full" />
                                            <Skeleton className="h-6 w-20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                                <Skeleton className="h-12 w-full rounded-2xl" />
                            </div>
                        ))
                    ) : habits.map((habit) => {
                        const isDone = habit.completedToday;
                        return (
                            <div key={habit._id} className={`group bg-[#0a0a0a] border p-6 rounded-3xl transition-all duration-300 relative hover:-translate-y-1 hover:shadow-2xl ${isDone ? 'border-green-500/30 bg-green-900/5 shadow-green-900/10' : 'border-gray-800 hover:border-gray-700'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="pr-8 w-full">
                                        <h3 className={`font-bold text-xl mb-3 ${isDone ? 'text-green-400 line-through decoration-green-500/50' : 'text-white'}`}>{habit.title}</h3>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase ${habit.type === 'todo' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                                                {habit.type}
                                            </span>
                                            
                                            {habit.type === 'daily' && (
                                                <>
                                                    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                                        <Flame size={12} /> {habit.currentStreak || 0} Streak
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                        <Trophy size={12} /> Max: {habit.maxStreak || 0}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {activeTab === 'active' ? (
                                            <button
                                                onClick={() => openArchiveModal(habit._id)}
                                                className="text-gray-600 hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                                                title="Archive"
                                            >
                                                <Archive size={18} />
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => openArchiveModal(habit._id)}
                                                    className="text-gray-600 hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                                                    title="Unarchive"
                                                >
                                                    <RotateCcw size={18} />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(habit._id)}
                                                    className="text-gray-600 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                                                    title="Delete Permanently"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => handleMarkDone(habit._id)}
                                    className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${isDone ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
                                >
                                    {isDone ? <><Check size={20} /> Completed</> : <><div className="w-5 h-5 rounded-full border-2 border-current" /> Mark Done</>}
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                {!isLoading && habits.length === 0 && (
                    <div className="text-center py-24 border border-dashed border-gray-800 rounded-3xl bg-gray-900/20">
                        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                            {activeTab === 'active' ? <Plus size={32} /> : <Archive size={32} />}
                        </div>
                        <p className="text-gray-400 text-lg font-medium">
                            {activeTab === 'active' ? "No active habits found." : "No archived habits found."}
                        </p>
                        {activeTab === 'active' && (
                            <p className="text-gray-600 text-sm mt-2">Create one to start your journey!</p>
                        )}
                    </div>
                )}
            </main>

            {/* CREATE HABIT MODAL (New & Improved) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Blurred Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                        onClick={() => setIsCreateModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-lg bg-[#0f0f0f] border border-gray-800 rounded-3xl shadow-2xl shadow-green-900/20 p-8 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Create New Habit</h2>
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        {/* Wrapper for HabitForm */}
                        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <HabitForm onHabitCreated={() => { 
                                fetchHabits(); 
                                setIsCreateModalOpen(false); 
                            }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Archive Confirmation Modal */}
            <ConfirmModal
                isOpen={isArchiveModalOpen}
                onClose={() => setIsArchiveModalOpen(false)}
                onConfirm={handleArchiveToggle}
                title={activeTab === 'active' ? "Archive Habit?" : "Unarchive Habit?"}
                message={activeTab === 'active' 
                    ? "This will hide the habit from your active list. Your history will remain saved." 
                    : "This will move the habit back to your active list."}
                confirmText={activeTab === 'active' ? "Archive" : "Unarchive"}
                confirmColor={activeTab === 'active' ? "bg-yellow-600 hover:bg-yellow-500" : "bg-green-600 hover:bg-green-500"}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Habit Permanently?"
                message="This action cannot be undone. All history and streaks for this habit will be lost."
                confirmText="Delete"
                confirmColor="bg-red-600 hover:bg-red-500"
            />
        </div>
    );
};

export default Dashboard;