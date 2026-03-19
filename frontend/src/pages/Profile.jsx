import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Activity, Calendar, Moon, Sun } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ContributionGraph from '../components/ContributionGraph';
import { useTheme } from '../context/ThemeContext';

const Profile = ({ user }) => {
    const { theme, toggleTheme, isDark } = useTheme();

    // Ensure user exists before trying to access properties
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fff8e1] dark:bg-black text-[#002a20] dark:text-white transition-colors duration-300">
                <div className="animate-pulse">Loading profile...</div>
            </div>
        );
    }

    const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-[#fff8e1] dark:bg-black text-[#002a20] dark:text-white font-sans selection:bg-[#d4f5dd] dark:selection:bg-green-500/30 transition-colors duration-300">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-[#002a20]/10 dark:border-white/10 bg-[#fff8e1]/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Link to="/dashboard" className="text-xl font-bold text-[#002a20] dark:bg-gradient-to-r dark:from-green-400 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent transition-colors">
                        Commit
                    </Link>
                    <Link 
                        to="/dashboard" 
                        className="px-3 py-2 md:px-4 md:py-2 rounded-full bg-[#002a20]/5 dark:bg-white/5 hover:bg-[#002a20]/10 dark:hover:bg-white/10 text-[#002a20]/60 dark:text-gray-300 hover:text-[#002a20] dark:hover:text-white text-sm font-medium transition-all border border-[#002a20]/5 dark:border-white/5 flex items-center gap-2"
                    >
                        <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Dashboard</span><span className="sm:hidden">Back</span>
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                        <img 
                            src={user.avatar} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full border-4 border-[#002a20]/10 dark:border-gray-800 shadow-2xl shadow-[#002a20]/10 dark:shadow-green-900/20 object-cover transition-all" 
                        />
                   
                    
                    <div className="text-center md:text-left space-y-3 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h1 className="text-4xl font-bold text-[#002a20] dark:text-white mb-1 transition-colors">{user.fullName}</h1>
                                <p className="text-lg text-[#002a20]/60 dark:text-gray-400 font-medium transition-colors">@{user.username}</p>
                            </div>

                            { /* Share */ }
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2.5 rounded-full bg-[#002a20]/5 dark:bg-white/10 text-[#002a20] dark:text-white hover:bg-[#002a20]/10 dark:hover:bg-white/20 transition-all border border-transparent hover:border-[#002a20]/10 dark:hover:border-white/10"
                                    title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                                >
                                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                                <button
                                    onClick={() => {
                                        const url = `${window.location.origin}/u/${user.username}`;
                                        navigator.clipboard.writeText(url);
                                        toast.success("Link copied! 📋");
                                    }}
                                    className="px-4 py-2 bg-[#002a20] dark:bg-white/10 hover:bg-[#002a20]/90 dark:hover:bg-white/20 rounded-lg text-sm font-semibold text-white transition-all shadow-md shadow-[#002a20]/20 dark:shadow-none border border-transparent dark:border-white/10 flex items-center gap-2"
                                >
                                    Share Profile <Share2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-[#002a20]/60 dark:text-gray-400 transition-colors">
                            <span className="flex items-center gap-1.5 bg-[#002a20]/5 dark:bg-white/5 px-3 py-1 rounded-full border border-[#002a20]/5 dark:border-white/5 transition-colors">
                                <Calendar size={14} className="text-[#002a20] dark:text-green-500 transition-colors" /> Joined {joinDate}
                            </span>
                        </div>
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
                    <ContributionGraph userId={user._id} />
                </div>
            </main>
        </div>
    );
};

export default Profile;
