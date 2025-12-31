import GoogleLoginButton from "../components/GoogleLoginButton";
import { Link } from 'react-router-dom';
import { BarChart2, Flame, Globe, ArrowLeft } from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white overflow-hidden">
      
      {/* Left Side - Auth & Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative z-10">
        <Link to="/" className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft size={20} /> Back
        </Link>

        <div className="max-w-md w-full space-y-10">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Commit
            </h1>
            <p className="text-lg text-gray-400">
              Login to continue your journey.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
            <div className="flex justify-center w-full">
                <div className="w-full">
                   <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
                </div>
            </div>
            <p className="mt-6 text-xs text-gray-500 text-center uppercase tracking-widest">
              Track • Build • Grow
            </p>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden md:flex w-1/2 bg-gray-900 relative flex-col justify-center p-16 overflow-hidden border-l border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>

        <div className="relative z-10 space-y-12 max-w-lg mx-auto">
            <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">Why HobbyTrack?</h2>
                <p className="text-gray-400 text-lg">Everything you need to stay consistent and motivated in one place.</p>
            </div>

            <div className="space-y-6">
                <FeatureItem 
                    icon={<BarChart2 size={24} />} 
                    title="Contribution Graphs" 
                    desc="Visualize your daily efforts just like GitHub contributions."
                />
                <FeatureItem 
                    icon={<Flame size={24} />} 
                    title="Streak Tracking" 
                    desc="Keep the momentum going. Don't break the chain."
                />
                <FeatureItem 
                    icon={<Globe size={24} />} 
                    title="Public Profile" 
                    desc="Showcase your discipline to the world with a unique link."
                />
            </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
    <div className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10 group cursor-default">
        <div className="bg-gray-800 w-12 h-12 flex items-center justify-center rounded-xl shadow-lg shrink-0 text-green-400 group-hover:scale-110 transition-transform border border-gray-700">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default LoginPage;