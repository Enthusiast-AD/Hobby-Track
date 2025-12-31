import GoogleLoginButton from "../components/GoogleLoginButton";

const LandingPage = ({ onLoginSuccess }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
          HobbyTrack
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Don't just break the chain. <span className="text-white font-semibold">Visualize it.</span> <br/>
          Track your daily habits and build a contribution graph for your life.
        </p>
      </div>

      <div className="mt-12 scale-125 transform transition-transform hover:scale-130">
        <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-500 text-sm">
        <div className="p-4 border border-gray-800 rounded-lg">
          <span className="text-2xl block mb-2">📊</span>
          GitHub-style Contribution Graphs
        </div>
        <div className="p-4 border border-gray-800 rounded-lg">
          <span className="text-2xl block mb-2">🔥</span>
          Track Streaks & Consistency
        </div>
        <div className="p-4 border border-gray-800 rounded-lg">
          <span className="text-2xl block mb-2">🌍</span>
          Share your Public Profile
        </div>
      </div>
    </div>
  );
};

export default LandingPage;