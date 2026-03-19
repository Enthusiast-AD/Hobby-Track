import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { LogOut, User, Plus, Check, Trash2, X, Flame, Trophy, Archive, RotateCcw, Play, Sun, Moon, Monitor } from 'lucide-react';
import HabitForm from '../components/HabitForm';
import ConfirmModal from '../components/ConfirmModal';
import ReflectionModal from '../components/ReflectionModal';
import Skeleton from '../components/Skeleton';
import { useTheme } from '../context/ThemeContext';

const Dashboard = ({ user, onLogout }) => {
    const { theme, setTheme } = useTheme();
    const [habits, setHabits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('active'); // 'active' | 'archived'
    const [exitingHabits, setExitingHabits] = useState(new Set());
    
    // Modal State for "Create Habit"
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    const [refreshKey, setRefreshKey] = useState(0);

    // Archive/Delete Modal State
    const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedHabitId, setSelectedHabitId] = useState(null);

    // Reflection Modal State
    const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
    const [pendingHabitId, setPendingHabitId] = useState(null);
    const [pendingHabitTitle, setPendingHabitTitle] = useState('');
    
    // Profile Dropdown State
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);

    const fetchHabits = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const isArchived = activeTab === 'archived';
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits?archived=${isArchived}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 401) {
                onLogout();
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

    useEffect(() => {
        fetchHabits();
        
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeTab, refreshKey]); // Refetch when tab changes or refresh requested

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
                
                // Animate and remove from list
                setExitingHabits(prev => new Set(prev).add(selectedHabitId));
                setTimeout(() => {
                    setHabits(prev => prev.filter(h => h._id !== selectedHabitId));
                    setExitingHabits(prev => {
                        const next = new Set(prev);
                        next.delete(selectedHabitId);
                        return next;
                    });
                }, 300);
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
                
                // Animate and remove from list
                setExitingHabits(prev => new Set(prev).add(selectedHabitId));
                setTimeout(() => {
                    setHabits(prev => prev.filter(h => h._id !== selectedHabitId));
                    setExitingHabits(prev => {
                        const next = new Set(prev);
                        next.delete(selectedHabitId);
                        return next;
                    });
                }, 300);
            } else {
                toast.error("Failed to delete habit");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMarkDone = (habitId) => {
        const habit = habits.find(h => h._id === habitId);
        if (habit && habit.completedToday) {
            toast.success("Already done today! Great job! 🎉");
            return;
        }

        // Open Reflection Modal
        setPendingHabitId(habitId);
        setPendingHabitTitle(habit ? habit.title : 'this habit');
        setIsReflectionModalOpen(true);
    };

    const handleReflectionSubmit = async ({ mood, note }) => {
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
                body: JSON.stringify({ 
                    userId: user._id, 
                    habitId: pendingHabitId,
                    mood,
                    note
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Done! Logged with " + mood);
                
                // Optimistic update
                setHabits(prev => prev.map(h => {
                    if (h._id === pendingHabitId) {
                        return {
                            ...h,
                            completedToday: true,
                            currentStreak: (h.currentStreak || 0) + 1,
                            maxStreak: Math.max((h.maxStreak || 0), (h.currentStreak || 0) + 1)
                        };
                    }
                    return h;
                }));
                setRefreshKey(prev => prev + 1);
                setIsReflectionModalOpen(false);
            } else {
                toast.error(data.message || "Could not log activity");
            }

        } catch (error) {
            console.error("Log error:", error);
            toast.error("Network connection failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#fff8e1] dark:bg-black text-[#002a20] dark:text-white font-sans selection:bg-[#d4f5dd] dark:selection:bg-green-500/30 transition-colors duration-300">
            {/* Navbar */}
            <nav className="sticky top-0 z-40 border-b border-[#002a20]/10 dark:border-white/10 bg-[#fff8e1]/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-[#002a20] dark:text-white dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent transition-all">
                        Commit
                    </h1>

                    <Link to="/focus" className="ml-8 text-sm font-medium text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-white transition flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                         Focus Mode
                    </Link>
                    
                    <div className="flex-1"></div>
                    
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 hover:bg-[#002a20]/5 dark:hover:bg-white/10 p-1.5 rounded-full transition-colors border border-transparent hover:border-[#002a20]/10 dark:hover:border-white/10"
                        >
                            <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-[#002a20]/20 dark:border-white/20" />
                        </button>

                        {/* Profile Dropdown */}
                        {showProfile && (
                            <div className="absolute right-0 top-12 w-64 bg-white dark:bg-[#111] border border-[#002a20]/10 dark:border-white/10 rounded-xl shadow-xl p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                <div className="px-3 py-3 border-b border-[#002a20]/10 dark:border-white/10 mb-1">
                                    <p className="font-bold text-[#002a20] dark:text-white text-sm">{user.fullName}</p>
                                    <p className="text-[#002a20]/60 dark:text-gray-400 text-xs">@{user.username || "user"}</p>
                                </div>

                                <div className="px-3 py-2">
                                     <p className="text-xs font-semibold text-[#002a20]/40 dark:text-gray-500 uppercase tracking-wider mb-2">Appearance</p>
                                     <div className="flex bg-[#002a20]/5 dark:bg-white/5 p-1 rounded-lg">
                                         {['light', 'dark', 'system'].map((t) => (
                                             <button
                                                 key={t}
                                                 onClick={(e) => {
                                                     e.stopPropagation(); // prevent closing if clicking inside logic is messy
                                                     setTheme(t);
                                                     // Optional: close dropdown if desired, but user might want to see the change first.
                                                     // setShowProfile(false); 
                                                 }}
                                                 className={`flex-1 flex items-center justify-center py-1.5 rounded-md text-xs font-medium transition-all ${theme === t ? 'bg-white dark:bg-[#222] text-[#002a20] dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'}`}
                                                 title={t.charAt(0).toUpperCase() + t.slice(1)}
                                             >
                                                 {t === 'light' && <Sun size={14} />}
                                                 {t === 'dark' && <Moon size={14} />}
                                                 {t === 'system' && <Monitor size={14} />}
                                             </button>
                                         ))}
                                     </div>
                                </div>
                                <div className="h-px bg-[#002a20]/10 dark:bg-white/10 my-1"></div>
                                
                                <Link
                                    to="/profile"
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#002a20]/5 dark:hover:bg-white/5 text-sm text-[#002a20]/80 dark:text-gray-300 transition-colors flex items-center gap-2"
                                >
                                    <User size={16} /> My Profile
                                </Link>
                                <button 
                                    onClick={onLogout} 
                                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-2"
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
                        <h2 className="text-3xl font-bold text-[#002a20] dark:text-white transition-colors">Your Habits</h2>
                        <p className="text-[#002a20]/60 dark:text-gray-400 mt-1 transition-colors">Consistency is the key to success.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* Tab Switcher */}
                        <div className="bg-[#002a20]/5 dark:bg-white/5 p-1 rounded-full flex items-center border border-[#002a20]/10 dark:border-white/10 transition-colors">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-[#002a20] dark:bg-white text-white dark:text-black shadow-lg' : 'text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-white'}`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setActiveTab('archived')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'archived' ? 'bg-[#002a20] dark:bg-white text-white dark:text-black shadow-lg' : 'text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-white'}`}
                            >
                                Archived
                            </button>
                        </div>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 bg-[#002a20] dark:bg-white text-white dark:text-black p-3 sm:px-5 sm:py-2.5 rounded-full font-bold hover:bg-[#002a20]/90 dark:hover:bg-gray-200 hover:scale-105 transition-all shadow-lg shadow-[#002a20]/20 dark:shadow-none"
                        >
                            <Plus size={20} /> <span className="hidden sm:inline">New Habit</span>
                        </button>
                    </div>
                </div>

                {/* Habits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Loading Skeletons
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-[#111] border border-[#002a20]/10 dark:border-white/10 p-6 rounded-3xl transition-colors">
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
                        const isExiting = exitingHabits.has(habit._id);
                        return (
                            <div key={habit._id} className={`group bg-white dark:bg-[#111] border p-6 rounded-3xl transition-all duration-300 relative hover:-translate-y-1 hover:shadow-xl hover:shadow-[#002a20]/5 dark:hover:shadow-black/50 ${isDone ? 'border-[#002a20]/20 dark:border-green-500/30 bg-[#d4f5dd]/30 dark:bg-green-900/10' : 'border-[#002a20]/10 dark:border-white/10 hover:border-[#002a20]/20 dark:hover:border-white/20'} ${isExiting ? 'opacity-0 scale-90' : 'opacity-100 scale-100 animate-in fade-in slide-in-from-bottom-4 duration-500'}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="pr-8 w-full">
                                        <h3 className={`font-bold text-xl mb-3 transition-colors ${isDone ? 'text-[#002a20] dark:text-green-400 line-through decoration-[#002a20]/40 dark:decoration-green-500/40' : 'text-[#002a20] dark:text-white'}`}>{habit.title}</h3>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase ${habit.type === 'todo' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20' : 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20'}`}>
                                                {habit.type}
                                            </span>
                                            
                                            {habit.type === 'daily' && (
                                                <>
                                                    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
                                                        <Flame size={12} /> {habit.currentStreak || 0} Streak
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-500/20">
                                                        <Trophy size={12} /> Max: {habit.maxStreak || 0}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-4 right-4 flex gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        {activeTab === 'active' && !isDone && (
                                            <Link 
                                                to="/focus" 
                                                state={{ habitId: habit._id }}
                                                className="text-[#002a20]/40 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-[#002a20]/5 dark:hover:bg-white/5"
                                                title="Start Focus Session"
                                            >
                                                <Play size={18} />
                                            </Link>
                                        )}
                                        {activeTab === 'active' ? (
                                            <button
                                                onClick={() => openArchiveModal(habit._id)}
                                                className="text-[#002a20]/40 dark:text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-[#002a20]/5 dark:hover:bg-white/5"
                                                title="Archive"
                                            >
                                                <Archive size={18} />
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => openArchiveModal(habit._id)}
                                                    className="text-[#002a20]/40 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-[#002a20]/5 dark:hover:bg-white/5"
                                                    title="Unarchive"
                                                >
                                                    <RotateCcw size={18} />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(habit._id)}
                                                    className="text-[#002a20]/40 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-[#002a20]/5 dark:hover:bg-white/5"
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
                                    className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${isDone ? 'bg-[#002a20] dark:bg-green-600 text-white shadow-lg shadow-[#002a20]/20 dark:shadow-green-900/20' : 'bg-[#002a20]/5 dark:bg-white/5 text-[#002a20]/60 dark:text-gray-400 hover:bg-[#002a20]/10 dark:hover:bg-white/10 hover:text-[#002a20] dark:hover:text-white border border-[#002a20]/5 dark:border-white/5'}`}
                                >
                                    {isDone ? <><Check size={20} /> Completed</> : <><div className="w-5 h-5 rounded-full border-2 border-current" /> Mark Done</>}
                                </button>
                            </div>
                        );
                    })}
                </div>
                
                {!isLoading && habits.length === 0 && (
                    <div className="text-center py-24 border border-dashed border-[#002a20]/20 dark:border-white/20 rounded-3xl bg-[#002a20]/5 dark:bg-white/5 transition-colors">
                        <div className="w-16 h-16 bg-[#002a20]/10 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#002a20]/60 dark:text-gray-400">
                            {activeTab === 'active' ? <Plus size={32} /> : <Archive size={32} />}
                        </div>
                        <p className="text-[#002a20] dark:text-white text-lg font-medium transition-colors">
                            {activeTab === 'active' ? "No active habits found." : "No archived habits found."}
                        </p>
                        {activeTab === 'active' && (
                            <p className="text-[#002a20]/60 dark:text-gray-400 text-sm mt-2 transition-colors">Create one to start your journey!</p>
                        )}
                    </div>
                )}
            </main>

            {/* CREATE HABIT MODAL (New & Improved) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Blurred Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#002a20]/20 dark:bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsCreateModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-lg bg-[#fff8e1] dark:bg-[#111] border border-[#002a20]/10 dark:border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#002a20] dark:text-white">Create New Habit</h2>
                            <button 
                                onClick={() => setIsCreateModalOpen(false)}
                                className="p-2 bg-[#002a20]/5 dark:bg-white/5 rounded-full text-[#002a20]/60 dark:text-gray-400 hover:text-[#002a20] dark:hover:text-white hover:bg-[#002a20]/10 dark:hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        {/* Wrapper for HabitForm */}
                        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar dark:text-white">
                            <HabitForm onHabitCreated={(newHabit) => { 
                                if (newHabit) {
                                    setHabits(prev => [newHabit, ...prev]);
                                } else {
                                    fetchHabits(); // Fallback
                                }
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

            {/* Reflection Modal */}
            <ReflectionModal
                isOpen={isReflectionModalOpen}
                onClose={() => setIsReflectionModalOpen(false)}
                onSave={handleReflectionSubmit}
                habitTitle={pendingHabitTitle}
            />
        </div>
    );
};

export default Dashboard;