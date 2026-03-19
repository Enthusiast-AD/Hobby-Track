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

            const data = await response.json();

            if (response.ok) {
                toast.success("New habit unlocked! 🚀");
                setTitle("");
                setType("daily"); 
                onHabitCreated(data.data); 
            } else {
                toast.error("Could not create habit");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full text-[#002a20] dark:text-white">
            <div className="space-y-3">
                <label className="text-sm font-bold text-[#002a20]/60 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                     Habit Name
                </label>
                <input 
                    type="text" 
                    placeholder="e.g. Read 5 pages, Drink water..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white dark:bg-white/5 border border-[#002a20]/20 dark:border-white/20 rounded-xl px-5 py-4 text-[#002a20] dark:text-white text-lg placeholder-[#002a20]/40 dark:placeholder-gray-600 focus:outline-none focus:border-[#002a20] dark:focus:border-white focus:ring-1 focus:ring-[#002a20] dark:focus:ring-white transition-all"
                />
            </div>
            
            <div className="space-y-3">
                <label className="text-sm font-bold text-[#002a20]/60 dark:text-gray-400 uppercase tracking-wider">Frequency</label>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setType('daily')}
                        className={`flex items-center justify-center gap-3 py-4 px-4 rounded-xl border transition-all duration-200 ${type === 'daily' ? 'bg-[#002a20] dark:bg-white border-[#002a20] dark:border-white text-white dark:text-black shadow-lg shadow-[#002a20]/20 dark:shadow-none scale-[1.02]' : 'bg-white dark:bg-white/5 border-[#002a20]/10 dark:border-white/10 text-[#002a20]/60 dark:text-gray-400 hover:bg-[#002a20]/5 dark:hover:bg-white/10 hover:border-[#002a20]/20 dark:hover:border-white/20'}`}
                    >
                        <Repeat size={20} />
                        <span className="font-semibold">Daily Habit</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('todo')}
                        className={`flex items-center justify-center gap-3 py-4 px-4 rounded-xl border transition-all duration-200 ${type === 'todo' ? 'bg-[#002a20] dark:bg-white border-[#002a20] dark:border-white text-white dark:text-black shadow-lg shadow-[#002a20]/20 dark:shadow-none scale-[1.02]' : 'bg-white dark:bg-white/5 border-[#002a20]/10 dark:border-white/10 text-[#002a20]/60 dark:text-gray-400 hover:bg-[#002a20]/5 dark:hover:bg-white/10 hover:border-[#002a20]/20 dark:hover:border-white/20'}`}
                    >
                        <CheckSquare size={20} />
                        <span className="font-semibold">One-time Task</span>
                    </button>
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full bg-[#002a20] dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:bg-[#002a20]/90 dark:hover:bg-gray-200 transition-all mt-4 flex items-center justify-center gap-2 text-lg shadow-lg shadow-[#002a20]/20 dark:shadow-none"
            >
                <Plus size={24} /> Create Habit
            </button>
        </form>
    );
};

export default HabitForm;