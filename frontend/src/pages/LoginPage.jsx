import GoogleLoginButton from "../components/GoogleLoginButton";
import { BarChart2, Flame, Globe } from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white overflow-hidden">
      {/* Left Side - Auth & Branding */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16 relative z-10">
        <div className="max-w-md w-full space-y-8 animate-fade-in-up">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              HobbyTrack
            </h1>
            <p className="text-xl text-gray-400">
              Login to continue your journey.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
            <div className="flex justify-center">
                <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              Join thousands of users tracking their life.
            </p>
          </div>
        </div>
        
        {/* Background Elements for Left Side */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Right Side - Features */}
      <div className="w-full md:w-1/2 bg-gray-900 relative flex flex-col justify-center p-8 md:p-16 overflow-hidden border-l border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/50 via-gray-900 to-black opacity-50"></div>
        
        <div className="relative z-10 space-y-12 max-w-lg mx-auto">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">Why HobbyTrack?</h2>
                <p className="text-gray-400">Everything you need to stay consistent and motivated.</p>
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
    <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-800 group">
        <div className="bg-gray-800/80 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg shrink-0 text-green-400 group-hover:scale-110 transition-transform border border-gray-700">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default LoginPage;
