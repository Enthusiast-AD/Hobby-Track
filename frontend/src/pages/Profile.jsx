import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, Activity, Calendar, Award } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ContributionGraph from '../components/ContributionGraph';

const Profile = ({ user }) => {
    const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Link to="/dashboard" className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Commit
                    </Link>
                    <Link 
                        to="/dashboard" 
                        className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm font-medium transition-all border border-white/5 flex items-center gap-2"
                    >
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative group">
                        <img 
                            src={user.avatar} 
                            alt="Profile" 
                            className="relative w-32 h-32 rounded-full border-4 border-gray-800 object-cover shadow-2xl" 
                        />
                    </div>
                    
                    <div className="text-center md:text-left space-y-3">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-1">{user.fullName}</h1>
                            <p className="text-lg text-gray-400 font-medium">@{user.username}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-400">
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                <Calendar size={14} className="text-green-500" /> Joined {joinDate}
                            </span>
                            {/* Placeholder for total commits if available later */}
                            {/* <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                <Award size={14} className="text-yellow-500" /> Pro Member
                            </span> */}
                        </div>

                        <div className="pt-2 flex gap-3 justify-center md:justify-start">
                            <button
                                onClick={() => {
                                    const url = `${window.location.origin}/u/${user.username}`;
                                    navigator.clipboard.writeText(url);
                                    toast.success("Link copied! 📋");
                                }}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold text-white transition-all border border-white/10 flex items-center gap-2"
                            >
                                Share Profile <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                    
                    <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                            <Activity size={24} className="text-green-500" />
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
