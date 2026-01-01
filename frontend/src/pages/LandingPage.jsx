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
                <div className="group perspective-[2000px]">
                    <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-2 backdrop-blur-xl shadow-2xl shadow-green-500/10 transition-all duration-700 transform group-hover:[transform:rotateX(2deg)_rotateY(-2deg)_scale(1.02)] group-hover:shadow-green-500/30">
                        <img 
                            src="/dashboard-preview.png" 
                            alt="App Dashboard" 
                            className="w-full rounded-xl border border-white/5 shadow-2xl"
                        />
                    </div>
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
                <div className="group perspective-[2000px]">
                    <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-2 backdrop-blur-xl shadow-2xl shadow-blue-500/10 transition-all duration-700 transform group-hover:[transform:rotateX(2deg)_rotateY(2deg)_scale(1.02)] group-hover:shadow-blue-500/30">
                        <img 
                            src="/profile-preview.png" 
                            alt="Public Profile" 
                            className="w-full rounded-xl border border-white/5 shadow-2xl"
                        />
                    </div>
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
                {/* Large Card 1: Contribution Graph */}
                <div className="md:col-span-2 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-green-500/30 transition-all duration-500 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-green-900/20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity opacity-30 group-hover:opacity-60"></div>
                    
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                        <div className="max-w-md">
                            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                                <BarChart2 size={28} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">GitHub-style Contribution Graph</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Visualize your consistency with our signature heat map. Every green square is a victory.
                            </p>
                        </div>
                        
                        {/* 3D Graph Visual */}
                        <div className="flex-1 w-full flex items-center justify-center perspective-[1000px]">
                            <div className="grid grid-cols-7 gap-2 transform rotate-6 skew-y-3 group-hover:rotate-3 group-hover:skew-y-1 transition-all duration-700 ease-out opacity-80 group-hover:opacity-100">
                                {[...Array(28)].map((_, i) => (
                                    <div key={i} className={`w-6 h-6 rounded-md ${Math.random() > 0.3 ? 'bg-green-500' : 'bg-green-900/30'} ${Math.random() > 0.7 ? 'opacity-100' : 'opacity-40'} shadow-lg border border-white/5`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tall Card 2: Public Profile */}
                <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-indigo-900/20">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-30 group-hover:opacity-60 transition-opacity"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(129,140,248,0.1)]">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Public Profile</h3>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Share your journey. Your profile showcases your streaks and dedication to the world.
                        </p>
                        
                        {/* 3D Profile Card Visual */}
                        <div className="mt-auto perspective-[1000px]">
                            <div className="bg-black/60 border border-white/10 p-4 rounded-xl transform rotate-x-12 group-hover:rotate-x-0 transition-all duration-500 shadow-2xl backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                                    <div className="h-2 w-20 bg-white/20 rounded-full"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-white/10 rounded-full"></div>
                                    <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Flexible Goals */}
                <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-rose-500/30 transition-all duration-500 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-rose-900/20">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-30 group-hover:opacity-60"></div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-8 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(251,113,133,0.1)]">
                            <Target size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Flexible Goals</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Track daily habits or one-off tasks. "Read 30 mins" or "Run a Marathon", we've got you.
                        </p>
                        
                         {/* 3D Target Visual */}
                         <div className="flex justify-center perspective-[1000px]">
                            <div className="relative w-24 h-24 transform group-hover:rotate-y-12 transition-transform duration-500">
                                <div className="absolute inset-0 border-4 border-rose-500/20 rounded-full"></div>
                                <div className="absolute inset-4 border-4 border-rose-500/40 rounded-full"></div>
                                <div className="absolute inset-8 bg-rose-500/60 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.4)]"></div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Card 4: Gamified Streaks */}
                <div className="md:col-span-2 bg-neutral-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500 hover:bg-neutral-900/80 hover:shadow-2xl hover:shadow-amber-900/20 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 relative z-10">
                        <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                            <Sparkles size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">Gamified Streaks</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Earn streaks for consecutive days. Watch your fire grow and challenge yourself to beat your personal best.
                        </p>
                    </div>
                    {/* Decorative Element */}
                    <div className="flex-1 flex justify-center items-center perspective-[1000px]">
                         <div className="relative transform-style-3d group-hover:rotate-y-6 transition-transform duration-700">
                            <div className="bg-black/60 p-5 rounded-2xl border border-white/10 backdrop-blur-md transform -rotate-6 translate-z-20 shadow-2xl group-hover:-translate-y-4 transition-transform duration-500">
                                <div className="text-amber-500 font-bold text-2xl mb-1 flex items-center gap-2">
                                    <span className="text-3xl">🔥</span> 12 Days
                                </div>
                                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">Current Streak</div>
                            </div>
                            <div className="absolute top-12 left-12 bg-black/60 p-5 rounded-2xl border border-white/10 backdrop-blur-md transform rotate-6 translate-z-0 shadow-xl opacity-80 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500">
                                <div className="text-yellow-500 font-bold text-2xl mb-1 flex items-center gap-2">
                                    <span className="text-3xl">🏆</span> 45 Days
                                </div>
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