import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import ContributionGraph from '../components/ContributionGraph';
import HabitForm from '../components/HabitForm';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = ({ user, logout }) => {
    const [habits, setHabits] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [showHabitForm, setShowHabitForm] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHabitId, setSelectedHabitId] = useState(null);

    useEffect(() => {
        fetchHabits();
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


            const responseText = await response.text();

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (jsonError) {
                console.error("Server sent HTML:", responseText);
                toast.error("Server Error. Check console.");
                return;
            }

            if (response.ok) {
                setRefreshKey(prev => prev + 1);
                toast.success("Done! 🔥");
            } else {
                toast.error(data.message || "Could not log activity");
            }

        } catch (error) {
            console.error("Log error:", error);
            toast.error("Network connection failed");
        }
    };

    return (
        <div className="w-full max-w-4xl flex flex-col gap-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-green-500" />
                    <div>
                        <h2 className="text-2xl font-bold">{user.fullName}</h2>
                        <p className="text-gray-400 text-sm">@{user.username || "user"}</p>
                    </div>
                </div>
                <button onClick={logout} className="text-red-400 hover:text-red-300">Logout</button>
            </div>

            {/* Public Profile Link */}
            <div className="bg-gradient-to-r from-green-900/30 to-black p-4 rounded-xl border border-green-900/50 flex justify-between items-center">
                <div>
                    <h3 className="text-green-400 font-bold text-sm uppercase tracking-wider">Public Profile</h3>
                    <p className="text-gray-400 text-xs">Share your consistency with the world.</p>
                </div>
                <button
                    onClick={() => {
                        const url = `${window.location.origin}/u/${user.username}`;
                        navigator.clipboard.writeText(url);
                        toast.success("Link copied to clipboard! 📋");
                    }}
                    className="text-sm bg-gray-800 hover:bg-gray-700 border border-gray-600 px-3 py-1 rounded-md transition"
                >
                    Copy Link 🔗
                </button>
            </div>

            <ContributionGraph userId={user._id} refreshKey={refreshKey} />

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmArchive}
                title="Archive Habit?"
                message="This will hide the habit from your dashboard. Your history will remain saved."
            />

            {/* Habit Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">My Habits</h3>
                    <button
                        onClick={() => setShowHabitForm(!showHabitForm)}
                        className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-500 transition"
                    >
                        {showHabitForm ? "Close Form" : "+ New Habit"}
                    </button>
                </div>

                {/* Collapsible Form */}
                {showHabitForm && (
                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                        <HabitForm onHabitCreated={() => { fetchHabits(); setShowHabitForm(false); }} />
                    </div>
                )}

                {/* Habit List - Filter out Archived */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {habits.filter(h => !h.isArchived).map((habit) => (
                        <div key={habit._id} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex justify-between items-center group hover:border-gray-600 transition-all">

                            {/* Left Side: Title + Archive Button */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="font-bold text-lg">{habit.title}</h4>

                                    <button
                                        onClick={() => openArchiveModal(habit._id)} // <--- CHANGED THIS
                                        className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Archive Habit"
                                    >
                                        🗑️
                                    </button>
                                </div>

                                <span className={`text-xs px-2 py-0.5 w-fit rounded-full ${habit.type === 'todo' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
                                    {habit.type.toUpperCase()}
                                </span>
                            </div>

                            {/* Right Side: Check Button */}
                            <button
                                onClick={() => handleMarkDone(habit._id)}
                                className="bg-green-600/20 text-green-500 hover:bg-green-600 hover:text-white border border-green-600/50 p-2 rounded-lg transition-all"
                                title="Mark as Done"
                            >
                                ✅
                            </button>
                        </div>
                    ))}
                </div>

                {/* Empty State Message */}
                {habits.filter(h => !h.isArchived).length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p>No active habits found.</p>
                        <p className="text-sm">Click "+ New Habit" to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;