import { Link } from 'react-router-dom';
import { BarChart2, Target, Globe, Rocket, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            HobbyTrack
          </h1>
          <Link 
            to="/login" 
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-4 animate-fade-in">
            <Sparkles size={16} /> The best way to track your habits
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight animate-fade-in-up">
            Master your <br/>
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">Consistency.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100">
            Visualize your daily progress with GitHub-style contribution graphs. 
            Build habits that stick and share your journey.
          </p>

          <div className="pt-8 animate-fade-in-up delay-200">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-lg font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-green-900/20"
            >
              Get Started for Free <Rocket size={20} />
            </Link>
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/30 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 size={32} />} 
              title="Visual Progress" 
              desc="See your hard work pay off with beautiful contribution graphs that motivate you to keep going."
            />
            <FeatureCard 
              icon={<Target size={32} />} 
              title="Goal Tracking" 
              desc="Set daily or one-time goals. Track everything from reading to coding to working out."
            />
            <FeatureCard 
              icon={<Globe size={32} />} 
              title="Public Profile" 
              desc="Share your profile with friends or on social media. Let your consistency speak for itself."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} HobbyTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-gray-900/50 border border-gray-800 p-8 rounded-3xl hover:border-green-500/30 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-900/10">
    <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 w-20 h-20 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform text-green-400 border border-gray-700 shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-lg">{desc}</p>
  </div>
);

export default LandingPage;