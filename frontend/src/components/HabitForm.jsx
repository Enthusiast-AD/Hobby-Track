import { useState } from 'react';
import { toast } from 'react-hot-toast';

const HabitForm = ({ onHabitCreated }) => {
    const [title, setTitle] = useState("");

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
                body: JSON.stringify({ title, description: "Daily Goal" })
            });

            if (response.ok) {
                toast.success("New habit unlocked! 🚀");
                setTitle("");
                
                onHabitCreated(); 
            } else {
                toast.error("Could not create habit");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md mb-8">
            <input 
                type="text" 
                placeholder="Enter a new habit (e.g. Read 5 pages)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors"
            />
            <button 
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-lg transition-all"
            >
                Add
            </button>
        </form>
    );
};

export default HabitForm;