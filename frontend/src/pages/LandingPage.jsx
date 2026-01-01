import { Link } from 'react-router-dom';
import { BarChart2, Target, Globe, Rocket, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                Commit
            </h1>
          </div>
          <Link 
            to="/login" 
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-4 animate-fade-in">
            <Sparkles size={14} /> The best way to track your habits
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
            Push changes to <br/>
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">your real life.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Visualize your daily progress with GitHub-style contribution graphs. 
            Build habits that stick and share your journey.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-lg font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)]"
            >
              Get Started for Free <Rocket size={20} />
            </Link>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto px-4 mt-24 relative z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 space-y-24">
            
            {/* Dashboard Image */}
            <div className="space-y-8 text-center">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Your Personal Command Center</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Track your daily habits, monitor your streaks, and stay focused with a clean, distraction-free dashboard designed for peak performance.
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-2 backdrop-blur-xl shadow-2xl shadow-green-500/10 transform hover:scale-[1.01] transition-transform duration-500">
                     <img 
                        src="/dashboard-preview.png" 
                        alt="App Dashboard" 
                        className="w-full rounded-xl border border-white/5 shadow-2xl"
                    />
                </div>
            </div>

            {/* Profile Image */}
            <div className="space-y-8 text-center">
                <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Share Your Journey</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Showcase your consistency with a beautiful public profile. Let your contribution graph tell the story of your dedication.
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-2 backdrop-blur-xl shadow-2xl shadow-blue-500/10 transform hover:scale-[1.01] transition-transform duration-500">
                     <img 
                        src="/profile-preview.png" 
                        alt="Public Profile" 
                        className="w-full rounded-xl border border-white/5 shadow-2xl"
                    />
                </div>
            </div>

        </div>

        {/* Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-green-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-black relative overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Everything you need to stay consistent.
                </h2>
                <p className="text-xl text-gray-400">
                    Powerful features designed to help you build habits that last a lifetime.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Large Card 1 */}
                <div className="md:col-span-2 bg-gray-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-green-500/30 transition-all duration-500 hover:bg-gray-900/80">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 text-green-400 border border-green-500/20">
                            <BarChart2 size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">GitHub-style Contribution Graph</h3>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            Visualize your consistency with our signature heat map. Every green square is a victory, motivating you to never break the chain.
                        </p>
                    </div>
                </div>

                {/* Tall Card 2 */}
                <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 hover:bg-gray-900/80">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 text-blue-400 border border-blue-500/20">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Public Profile</h3>
                        <p className="text-gray-400 leading-relaxed mb-8 flex-grow">
                            Share your journey with the world. Your public profile showcases your streaks and dedication.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-gray-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-500 hover:bg-gray-900/80">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-50 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 text-purple-400 border border-purple-500/20">
                            <Target size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Flexible Goals</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Track daily habits or one-off tasks. Whether it's "Read 30 mins" or "Run a Marathon", we've got you covered.
                        </p>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="md:col-span-2 bg-gray-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500 hover:bg-gray-900/80 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 relative z-10">
                        <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 text-orange-400 border border-orange-500/20">
                            <Sparkles size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Gamified Streaks</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Earn streaks for consecutive days. Watch your fire grow and challenge yourself to beat your personal best.
                        </p>
                    </div>
                    {/* Decorative Element */}
                    <div className="flex-1 flex justify-center items-center opacity-90">
                         <div className="flex gap-6">
                            <div className="bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md transform -rotate-6 shadow-2xl">
                                <div className="text-orange-500 font-bold text-2xl mb-1">🔥 12 Days</div>
                                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Current Streak</div>
                            </div>
                            <div className="bg-black/40 p-5 rounded-2xl border border-white/10 backdrop-blur-md transform rotate-6 mt-12 shadow-2xl">
                                <div className="text-yellow-500 font-bold text-2xl mb-1">🏆 45 Days</div>
                                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Best Streak</div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-600 text-sm bg-black">
        <p>© {new Date().getFullYear()} HobbyTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;