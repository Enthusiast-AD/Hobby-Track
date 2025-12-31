import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import ContributionGraph from '../components/ContributionGraph';

const PublicProfile = () => {
    const { username } = useParams();
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPublicUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/u/${username}`);
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

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading profile...</div>;
    if (!profileUser) return <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <p className="text-red-400 text-xl">User not found.</p>
        <Link to="/" className="text-green-500 hover:underline">Go Home</Link>
    </div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans">
             <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Commit
                    </Link>
                    <Link to="/login" className="text-sm bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors">
                        Join Now
                    </Link>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                    <img 
                        src={profileUser.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-green-500 shadow-2xl shadow-green-900/20" 
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-white mb-2">{profileUser.fullName}</h1>
                        <p className="text-xl text-gray-400">@{profileUser.username}</p>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <span className="text-green-500"><BarChart2 size={24} /></span> Consistency Graph
                    </h2>
                    <ContributionGraph userId={profileUser._id} />
                </div>
            </main>
        </div>
    );
};

export default PublicProfile;