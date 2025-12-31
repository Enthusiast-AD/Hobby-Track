import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Sparkles, Repeat, CheckSquare, Plus } from 'lucide-react';

const HabitForm = ({ onHabitCreated }) => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("daily"); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!title.trim()) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    title, 
                    type,
                    description: type === 'daily' ? "Repeat every day" : "One-time task"
                })
            });

            if (response.ok) {
                toast.success("New habit unlocked! 🚀");
                setTitle("");
                setType("daily"); 
                onHabitCreated(); 
            } else {
                toast.error("Could not create habit");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={14} className="text-green-400" /> Habit Name
                </label>
                <input 
                    type="text" 
                    placeholder="e.g. Read 5 pages, Drink water..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/50 border border-gray-700 rounded-xl px-5 py-4 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                />
            </div>
            
            <div className="space-y-3">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Frequency</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setType('daily')}
                        className={`flex items-center justify-center gap-3 py-4 px-4 rounded-xl border transition-all duration-200 ${type === 'daily' ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/20 scale-[1.02]' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:border-gray-600'}`}
                    >
                        <Repeat size={20} />
                        <span className="font-semibold">Daily Habit</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('todo')}
                        className={`flex items-center justify-center gap-3 py-4 px-4 rounded-xl border transition-all duration-200 ${type === 'todo' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20 scale-[1.02]' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:border-gray-600'}`}
                    >
                        <CheckSquare size={20} />
                        <span className="font-semibold">One-time Task</span>
                    </button>
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all mt-4 flex items-center justify-center gap-2 text-lg shadow-lg shadow-white/5"
            >
                <Plus size={24} /> Create Habit
            </button>
        </form>
    );
};

export default HabitForm;