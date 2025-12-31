import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Share2, BarChart2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ContributionGraph from '../components/ContributionGraph';

const Profile = ({ user }) => {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Link to="/dashboard" className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Commit
                    </Link>
                    <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft size={16} /> Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl shadow-green-900/20" 
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-white mb-2">{user.fullName}</h1>
                        <p className="text-xl text-gray-400 mb-4">@{user.username}</p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <button
                                onClick={() => {
                                    const url = `${window.location.origin}/u/${user.username}`;
                                    navigator.clipboard.writeText(url);
                                    toast.success("Link copied! 📋");
                                }}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-gray-700 flex items-center gap-2"
                            >
                                Share Profile <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <span className="text-green-500"><BarChart2 size={24} /></span> Consistency Graph
                    </h2>
                    <ContributionGraph userId={user._id} />
                </div>
            </main>
        </div>
    );
};

export default Profile;
