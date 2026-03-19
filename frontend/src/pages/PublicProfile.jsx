import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Activity, Moon, Sun } from 'lucide-react';
import ContributionGraph from '../components/ContributionGraph';
import Skeleton from '../components/Skeleton';
import { useTheme } from '../context/ThemeContext';

const PublicProfile = () => {
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme, toggleTheme, isDark } = useTheme();

    useEffect(() => {
        const fetchPublicUser = async () => {
            try {
                // Remove /api/v1 from URL if it's already in vite proxy or environment variable
                const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
                const res = await fetch(`${baseUrl}/api/v1/users/u/${username}`);
                const data = await res.json();
                if (res.ok) setProfileUser(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicUser();
    }, [username]);

    if (loading) return (
        <div className="min-h-screen bg-[#fff8e1] dark:bg-black text-[#002a20] dark:text-white font-sans transition-colors duration-300">
             <nav className="sticky top-0 z-50 border-b border-[#002a20]/10 dark:border-white/10 bg-[#fff8e1]/80 dark:bg-black/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Skeleton className="h-8 w-32 bg-[#002a20]/10 dark:bg-white/10" />
                    <Skeleton className="h-10 w-24 rounded-full bg-[#002a20]/10 dark:bg-white/10" />
                </div>
            </nav>
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <Skeleton className="w-32 h-32 rounded-full bg-[#002a20]/10 dark:bg-white/10" />
                    <div className="text-center md:text-left w-full max-w-md">
                        <Skeleton className="h-10 w-3/4 mb-4 bg-[#002a20]/10 dark:bg-white/10" />
                        <Skeleton className="h-6 w-1/2 bg-[#002a20]/10 dark:bg-white/10" />
                    </div>
                </div>
                <Skeleton className="h-96 w-full rounded-2xl bg-[#002a20]/10 dark:bg-white/10" />
            </main>
        </div>
    );

    if (!profileUser) return (
        <div className="min-h-screen bg-[#fff8e1] dark:bg-black text-[#002a20] dark:text-white flex items-center justify-center flex-col gap-4 transition-colors duration-300">
            <p className="text-red-500 text-xl font-bold">User not found.</p>
            <Link to="/" className="text-[#002a20] dark:text-green-500 hover:underline">Go Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fff8e1] dark:bg-black text-[#002a20] dark:text-white font-sans selection:bg-[#d4f5dd] dark:selection:bg-green-500/30 transition-colors duration-300">
             <nav className="sticky top-0 z-50 border-b border-[#002a20]/10 dark:border-white/10 bg-[#fff8e1]/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-[#002a20] dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent transition-colors">
                        Commit
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                             className="p-2 rounded-full bg-[#002a20]/5 dark:bg-white/10 text-[#002a20] dark:text-white hover:bg-[#002a20]/10 dark:hover:bg-white/20 transition-all"
                             title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link to="/login" className="text-sm bg-[#002a20] dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-bold hover:bg-[#002a20]/90 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-[#002a20]/20 dark:shadow-none">
                            Join Now
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <img 
                        src={profileUser.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-[#002a20]/10 dark:border-gray-800 shadow-2xl shadow-[#002a20]/10 dark:shadow-green-900/20 object-cover transition-all" 
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-[#002a20] dark:text-white mb-2 transition-colors">{profileUser.fullName}</h1>
                        <p className="text-xl text-[#002a20]/60 dark:text-gray-400 font-medium transition-colors">@{profileUser.username}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#0A0A0A] border border-[#002a20]/10 dark:border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-xl shadow-[#002a20]/5 dark:shadow-2xl relative overflow-hidden transition-all duration-300">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4f5dd]/40 dark:bg-green-500/5 rounded-full blur-3xl -z-10 pointer-events-none transition-colors duration-300"></div>
                    
                    <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-[#002a20] dark:text-white flex items-center gap-3 transition-colors">
                        <div className="p-2 bg-[#002a20]/5 dark:bg-green-500/10 rounded-lg border border-[#002a20]/10 dark:border-green-500/20 transition-colors">
                            <Activity size={20} className="text-[#002a20] dark:text-green-500 md:w-6 md:h-6 transition-colors" />
                        </div>
                        Consistency Graph
                    </h2>
                    <ContributionGraph userId={profileUser._id} isPublic={true} />
                </div>
            </main>
        </div>
    );
};

export default PublicProfile;