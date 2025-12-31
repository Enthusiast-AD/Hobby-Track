import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Rocket } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/onboarding`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Welcome to the club! 🎉");
                localStorage.setItem('user', JSON.stringify(data.data));
                onComplete(data.data); 
            } else {
                toast.error(data.message || "Username failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div>
                    <h2 className="text-4xl font-bold text-green-500">One Last Thing...</h2>
                    <p className="mt-2 text-gray-400">Choose a unique username for your public profile.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500">@</span>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())} // No spaces, lowercase
                            placeholder="username"
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Checking..." : <>Let's Go <Rocket size={20} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;