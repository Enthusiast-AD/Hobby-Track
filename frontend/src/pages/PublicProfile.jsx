import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

    if (loading) return <div className="text-white text-center mt-20">Loading profile...</div>;
    if (!profileUser) return <div className="text-red-400 text-center mt-20">User not found.</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="flex items-center gap-6 mb-8">
                <img src={profileUser.avatar} className="w-20 h-20 rounded-full border-4 border-green-500" />
                <div>
                    <h1 className="text-4xl font-bold text-white">{profileUser.fullName}</h1>
                    <p className="text-gray-400">@{profileUser.username}</p>
                </div>
            </div>

            <ContributionGraph userId={profileUser._id} />
        </div>
    );
};

export default PublicProfile;