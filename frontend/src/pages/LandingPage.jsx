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
      <section className="py-32 bg-black relative overflow-hidden">
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
                <div className="md:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="max-w-md space-y-4">
                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/20">
                                <BarChart2 size={24} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">GitHub-style Contribution Graph</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Visualize your consistency with our signature heat map. Every green square is a victory.
                            </p>
                        </div>
                        
                        {/* 3D Graph Visual */}
                        <div className="mt-12 flex items-center justify-center perspective-[1000px] h-48 w-full">
                            <div className="grid grid-cols-12 gap-1.5 transform rotate-x-12 rotate-y-12 rotate-z-6 scale-110 group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:rotate-z-0 transition-all duration-700 ease-out">
                                {[...Array(48)].map((_, i) => {
                                    const opacity = Math.random();
                                    return (
                                        <div 
                                            key={i} 
                                            className={`
                                                w-8 h-8 rounded-sm
                                                ${opacity > 0.7 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
                                                  opacity > 0.4 ? 'bg-green-800/40' : 
                                                  'bg-zinc-900 border border-white/5'}
                                                transition-all duration-500 hover:scale-110
                                            `}
                                        ></div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tall Card 2: Advanced Analytics / Profile */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 mb-8 space-y-4">
                         <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white border border-white/10">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Public Profile</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Share your journey. Your profile showcases your streaks and dedication.
                        </p>
                    </div>

                     {/* Visual */}
                    <div className="relative flex-1 min-h-[200px] flex items-end justify-center perspective-[1000px]">
                        <div className="w-48 bg-zinc-900 border border-white/10 rounded-xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-600"></div>
                                <div className="space-y-1">
                                    <div className="h-2 w-20 bg-white/20 rounded-full"></div>
                                    <div className="h-2 w-12 bg-white/10 rounded-full"></div>
                                </div>
                             </div>
                             <div className="flex items-end justify-between gap-1 h-20">
                                {[40, 70, 45, 90, 60].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className="w-6 bg-green-500/20 rounded-t-sm relative group-hover:bg-green-500/40 transition-colors">
                                        <div className="absolute top-0 w-full h-1 bg-green-500"></div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Marketplace Synergy style / Flexible Goals */}
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group flex flex-col justify-between">
                    <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors"></div>
                    
                    <div className="relative z-10 space-y-4">
                        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold border border-orange-500/20 mb-2">
                           Feature
                        </div> */}
                        <h3 className="text-2xl font-bold text-white">Flexible Goals</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Track daily habits or one-off tasks. "Read 30 mins" or "Run a Marathon".
                        </p>
                    </div>

                    <div className="mt-8 relative h-40 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                            {/* Orbiting Elements */}
                            <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_8s_linear_infinite]"></div>
                            <div className="absolute inset-4 border border-white/5 rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
                            
                            {/* Center Target */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform duration-500">
                                    <Target className="text-white -rotate-45" size={32} />
                                </div>
                            </div>

                             {/* Floating particles */}
                            <div className="absolute -top-4 right-0 w-3 h-3 bg-orange-500 rounded-full blur-[1px]"></div>
                        </div>
                    </div>
                </div>

                {/* Card 4: Integrated Management Tools style / Gamified Streaks */}
                <div className="md:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col md:flex-row items-center gap-12">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.05),transparent_50%)]"></div>

                    <div className="flex-1 relative z-10 space-y-6">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/20">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-3">Gamified Streaks</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Earn streaks for consecutive days. Watch your fire grow and challenge yourself to beat your personal best.
                            </p>
                        </div>
                         <div className="flex gap-4">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-white">12</span>
                                <span className="text-sm text-gray-500">Current</span>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-green-400">45</span>
                                <span className="text-sm text-gray-500">Best</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Visual */}
                    <div className="flex-1 flex justify-center scale-125">
                         <div className="relative group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
                             <svg viewBox="0 0 24 24" fill="none" className="w-48 h-48 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
                                <path
                                d="M14.9918 2.60742C15.011 2.36531 15.3409 2.29656 15.466 2.50198C18.667 6.30902 21.054 11.2368 18.062 16.5826C16.8906 18.6756 14.6738 20.9026 12.0163 20.9995C9.28189 21.0991 6.96574 18.2327 5.76088 16.2736C4.46077 14.1593 4.29699 9.87081 7.20337 6.13846C7.32236 5.98565 7.56149 6.02701 7.62061 6.21142C8.20459 8.03262 9.7042 10.9576 11.2372 10.9984C11.5365 11.0064 11.6961 10.6483 11.4883 10.4354C10.0381 8.94939 9.80931 6.58611 10.2241 4.54271C10.2792 4.27137 10.6397 4.19537 10.8033 4.42111C11.8384 5.84883 13.0453 7.82098 12.9696 9.87569C12.963 10.0538 13.1873 10.1382 13.2981 10.0028C14.0729 9.0559 14.9209 5.8959 14.9918 2.60742Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0"
                                />
                            </svg>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-gray-600 text-sm bg-black">
        <p>© {new Date().getFullYear()} Commit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;