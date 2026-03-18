import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle2,
    Target,
    BarChart2,
    Users,
    Zap,
    Shield,
    Globe,
    ChevronDown,
    ChevronUp,
    Menu,
    X,
    GitCommit,
    GitBranch,
    GitMerge,
    Terminal,
    Cpu
} from 'lucide-react';

const LandingPage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeTab, setActiveTab] = useState('features');

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="font-sans text-[#002a20] bg-[#d4f5dd] overflow-x-hidden">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-[#d4f5dd]/90 backdrop-blur-md border-b border-[#002a20]/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#002a20] rounded-xl flex items-center justify-center text-[#d4f5dd] shadow-lg shadow-green-900/20">
                            <img src="favicon.svg" alt="" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-[#002a20]">Commit</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 font-medium">
                        <a href="#features" className="hover:text-green-700 transition-colors">Features</a>
                        {/* <Link to="/about" className="hover:text-green-700 transition-colors">About</Link> */}
                        <a href="#solutions" className="hover:text-green-700 transition-colors">Solutions</a>
                        <a href="#faq" className="hover:text-green-700 transition-colors">FAQ</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/login"
                            className="px-6 py-2.5 font-medium border border-[#002a20] rounded-xl hover:bg-[#002a20]/5 transition-all"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-6 py-2.5 font-medium bg-[#002a20] text-white rounded-xl hover:bg-[#064e3b] transition-all shadow-lg shadow-green-900/10 hover:shadow-green-900/20"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 w-full bg-[#d4f5dd] border-b border-[#002a20]/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
                        <a href="#features" className="text-lg font-medium p-2 hover:bg-[#002a20]/5 rounded-lg">Features</a>
                        <Link to="/about" className="text-lg font-medium p-2 hover:bg-[#002a20]/5 rounded-lg">About</Link>
                        <a href="#solutions" className="text-lg font-medium p-2 hover:bg-[#002a20]/5 rounded-lg">Solutions</a>
                        <a href="#faq" className="text-lg font-medium p-2 hover:bg-[#002a20]/5 rounded-lg">FAQ</a>
                        <div className="border-t border-[#002a20]/10 my-2 pt-4 flex flex-col gap-3">
                            <Link to="/login" className="text-center py-3 border border-[#002a20] rounded-xl font-medium">Login</Link>
                            <Link to="/signup" className="text-center py-3 bg-[#002a20] text-white rounded-xl font-medium">Sign Up</Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-12 md:pb-24 px-6 min-h-[90vh] flex items-center relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                    <div className="space-y-8 z-10 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                            The Infrastructure of <br />
                            <span className="text-[#002a20]/80">Personal Growth</span>
                        </h1>
                        <p className="text-xl text-[#002a20]/70 max-w-lg leading-relaxed font-light">
                            Engineering new ways of connecting your daily actions with your long-term goals. Push changes to your real life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/signup" className="group px-8 py-4 bg-[#002a20] text-white rounded-xl font-medium text-lg hover:bg-[#064e3b] transition-all hover:-translate-y-1 shadow-xl shadow-green-900/10 flex items-center justify-center gap-2">
                                Start Tracking <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/login" className="px-8 py-4 bg-transparent border border-[#002a20] text-[#002a20] rounded-xl font-medium text-lg hover:bg-[#002a20]/5 transition-all hover:-translate-y-1 flex items-center justify-center">
                                View Demo
                            </Link>
                        </div>

                    </div>

                    <div className="relative h-[600px] w-[500%] left-[-40%] md:w-auto md:left-0 flex items-center justify-center hidden md:flex">
                        {/* Abstract Wave Art */}
                        <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path fill="#002a20" d="M42.7,-73.2C55.9,-67.1,67.3,-56.9,76,-44.5C84.7,-32.1,90.7,-17.5,88.4,-3.5C86.1,10.5,75.5,23.9,65.8,35.6C56.1,47.3,47.3,57.3,36.7,64.2C26.1,71.1,13.7,74.9,-0.3,75.4C-14.3,75.9,-30,73.1,-43.3,66C-56.6,58.9,-67.5,47.5,-75.4,34.1C-83.3,20.7,-88.2,5.3,-84.8,-8.4C-81.4,-22.1,-69.7,-34.1,-57.8,-43.6C-45.9,-53.1,-33.8,-60.1,-21.3,-66.6C-8.8,-73.1,4.1,-79.1,17.2,-79.8C30.3,-80.5,43.6,-75.9,42.7,-73.2Z" transform="translate(100 100) scale(1.1)" />
                                <path fill="#047857" d="M45.7,-76.3C58.3,-69.3,67.2,-55.6,73.5,-41.8C79.8,-28,83.5,-14,81.4,-1.2C79.3,11.6,71.4,23.1,62.6,33.3C53.8,43.4,44.1,52.1,33.2,58.8C22.3,65.5,10.2,70.1,-1.5,72.7C-13.2,75.3,-24.5,75.8,-35.3,70.3C-46.1,64.8,-56.4,53.2,-64.8,40.7C-73.2,28.2,-79.8,14.8,-80.7,0.9C-81.6,-13,-76.8,-27.4,-67.7,-39.3C-58.6,-51.2,-45.2,-60.7,-31.8,-67.2C-18.4,-73.8,-5,-77.5,7.7,-78.8L20.4,-80.1Z" transform="translate(110 100) scale(1.1)" className="opacity-40 mix-blend-multiply" />
                            </svg>

                            {/* Floating Cards */}
                            <div className="absolute top-[35%] left-[15%] bg-white p-5 rounded-2xl shadow-2xl shadow-green-900/10 border border-[#002a20]/5 w-64 rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-2 w-20 bg-gray-100 rounded-full"></div>
                                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-xs shadow-sm">
                                        <CheckCircle2 size={12} />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-gray-50 rounded-full"></div>
                                    <div className="h-2 w-3/4 bg-gray-50 rounded-full"></div>
                                    <div className="grid grid-cols-7 gap-1 mt-4">
                                        {Array.from({ length: 14 }).map((_, i) => (
                                            <div key={i} className={`aspect-square rounded-sm ${[0, 1, 3, 4, 5, 7, 8, 10, 11, 13].includes(i) ? 'bg-[#002a20]' : 'bg-green-100'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-[55%] right-[20%] bg-white p-5 rounded-2xl shadow-2xl shadow-green-900/10 border border-[#002a20]/5 w-60 rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-default z-10">
                                <div className="flex gap-1 mb-2">
                                    {[1, 1, 1, 1, 0, 1, 1].map((a, i) => (
                                        <div key={i} className={`h-8 w-full rounded-sm ${a ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weekly Streak</div>
                                    <div className="text-lg font-bold text-[#002a20]">6 Days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logos Strip */}
            {/* <div className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-[#002a20]/40 uppercase tracking-[0.2em] mb-8">Trusted by productivity enthusiasts</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-xl font-bold font-serif"><Terminal size={24} /> Termi.nal</div>
                <div className="flex items-center gap-2 text-xl font-bold font-serif"><Cpu size={24} /> ChipSet</div>
                <div className="flex items-center gap-2 text-xl font-bold font-serif"><GitMerge size={24} /> Merge</div>
                <div className="flex items-center gap-2 text-xl font-bold font-serif"><Globe size={24} /> Globals</div>
            </div>
        </div>
      </div> */}

            {/* Intro Section - White */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="absolute inset-0 bg-[#d4f5dd] rounded-full filter blur-3xl opacity-40 scale-150"></div>
                        <div className="relative bg-white border border-gray-100 rounded-[2rem] shadow-2xl shadow-green-900/5 p-10 max-w-md mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#d4f5dd] flex items-center justify-center text-[#002a20]">
                                    <GitCommit size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-[#002a20]">Daily Commits</h3>
                                    <p className="text-sm text-gray-500 font-medium">3,240 contributions in the last year</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {Array.from({ length: 49 }).map((_, i) => {
                                    const intensity = Math.random();
                                    let color = 'bg-gray-100';
                                    if (intensity > 0.8) color = 'bg-[#002a20]';
                                    else if (intensity > 0.6) color = 'bg-[#047857]';
                                    else if (intensity > 0.4) color = 'bg-[#10b981]';
                                    else if (intensity > 0.2) color = 'bg-[#6ee7b7]';

                                    return <div key={i} className={`aspect-square rounded-sm ${color}`} />
                                })}
                            </div>
                            <div className="mt-6 flex items-center justify-between text-xs text-gray-400 font-medium">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                                    <div className="w-3 h-3 bg-[#6ee7b7] rounded-sm"></div>
                                    <div className="w-3 h-3 bg-[#10b981] rounded-sm"></div>
                                    <div className="w-3 h-3 bg-[#047857] rounded-sm"></div>
                                    <div className="w-3 h-3 bg-[#002a20] rounded-sm"></div>
                                </div>
                                <span>More</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#002a20]">
                            A new connection protocol for <span className="text-green-600 relative inline-block">
                                habits
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#d4f5dd] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-lg text-[#002a20]/70 leading-relaxed">
                            Say goodbye to scattered notes and forgotten resolutions. Modern self-improvement demands a reliable system. Commit pioneers this revolutionary transformation of your daily routine.
                        </p>

                        <div className="space-y-6 pt-4">
                            {[
                                { icon: Shield, title: 'Streamlined Logic', desc: 'Stick to your rules with rigid tracking protocols.' },
                                { icon: Zap, title: 'Instant Feedback', desc: 'See your streaks build up in real-time.' },
                                { icon: Globe, title: 'Universal Access', desc: 'Track from anywhere, on any device.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-5 group">
                                    <div className="mt-1 w-12 h-12 rounded-full bg-[#f8fafc] border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#d4f5dd] group-hover:scale-110 transition-all duration-300">
                                        <item.icon size={20} className="text-[#002a20]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-[#002a20]">{item.title}</h4>
                                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark Section - "Tailored for..." */}
            <section className="py-24 bg-[#002a20] text-white overflow-hidden" id="solutions">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16 relative">
                        <div className="absolute -left-10 -top-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
                        <p className="text-[#4ade80] font-bold tracking-wide uppercase text-xs mb-4 pl-1">The New Way of Living</p>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Tailored for the new <br />economy of self.</h2>
                        <p className="text-[#d4f5dd]/70 text-lg max-w-2xl">
                            Commit caters to the unique needs of modern individuals, providing the agility, autonomy, and compliance needed for staying ahead.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#d4f5dd] text-[#002a20] rounded-[2.5rem] p-10 md:p-14 hover:transform hover:-translate-y-2 transition-transform duration-500 group">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-green-900/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                <Users size={32} />
                            </div>
                            <h3 className="text-3xl font-bold mb-2">For Individuals</h3>
                            <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-8">FREE FOREVER</p>

                            <p className="text-xl text-[#002a20]/70 mb-10 leading-relaxed font-light">
                                Empower your independent journey with data autonomy. Visualize changes with GitHub-style graphs daily.
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm font-semibold mb-12">
                                {['Global Tracking', 'Detailed Analytics', 'Focus Mode', 'Private Notes'].map(f => (
                                    <div key={f} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#002a20]"></div> {f}
                                    </div>
                                ))}
                            </div>

                            <Link to="/signup" className="w-full text-center py-4 bg-[#002a20] text-white rounded-xl font-bold hover:bg-[#064e3b] transition-colors flex items-center justify-center gap-2 group-hover:gap-4">
                                Start Your Journey <ArrowRight size={18} />
                            </Link>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#ffedd5] text-[#002a20] rounded-[2.5rem] p-10 md:p-14 hover:transform hover:-translate-y-2 transition-transform duration-500 group">
                            <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-orange-900/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Public Profiles</h3>
                            <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-8">SOCIAL PROOF</p>

                            <p className="text-xl text-[#002a20]/70 mb-10 leading-relaxed font-light">
                                Showcase your consistency to the world. Share your graph as a testament to your discipline.
                            </p>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm font-semibold mb-12">
                                {['Shareable Link', 'Embedded graph', 'Social Badges', 'Export Data'].map(f => (
                                    <div key={f} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></div> {f}
                                    </div>
                                ))}
                            </div>

                            <Link to="/signup" className="w-full text-center py-4 border-2 border-[#002a20] text-[#002a20] rounded-xl font-bold hover:bg-[#002a20] hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:gap-4">
                                Create Public Profile <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beige Section - Features */}
            <section className="py-24 bg-[#fff8e1] text-[#002a20]" id="features">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-widest mb-4 opacity-40">Work Solutions for Today</p>
                            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1]">Remedies for the <br />new life landscape</h2>
                        </div>
                        <div className="bg-[#002a20] p-1.5 rounded-full flex gap-1">
                            <button
                                onClick={() => setActiveTab('features')}
                                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'features' ? 'bg-[#d4f5dd] text-[#002a20] shadow-lg' : 'text-white hover:text-[#d4f5dd]'}`}
                            >
                                Features
                            </button>
                            <button
                                onClick={() => setActiveTab('benefits')}
                                className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'benefits' ? 'bg-[#d4f5dd] text-[#002a20] shadow-lg' : 'text-white hover:text-[#d4f5dd]'}`}
                            >
                                Benefits
                            </button>
                        </div>
                    </div>

                    {activeTab === 'features' ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                            {/* Feature 1 */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm flex flex-col lg:flex-row gap-16 items-center border border-[#002a20]/5 hover:shadow-xl transition-shadow duration-500">
                                <div className="flex-1 space-y-8">
                                    <div className="w-20 h-20 bg-[#d4f5dd] rounded-3xl flex items-center justify-center text-[#002a20]">
                                        <GitBranch size={40} />
                                    </div>
                                    <h3 className="text-4xl font-bold">Contribution Graphs</h3>
                                    <p className="text-[#002a20]/70 text-lg leading-relaxed">
                                        Visualize your habits across 365 days instantly and get motivated without having to set up a complex spreadsheet.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 text-sm font-bold text-[#002a20]/60">
                                        <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600" /> Auto-generated</div>
                                        <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600" /> Color coded</div>
                                        <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600" /> Shareable</div>
                                        <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600" /> Historical data</div>
                                    </div>
                                    <Link to="/signup" className="inline-block px-8 py-4 bg-[#002a20] text-white rounded-xl font-bold hover:bg-[#064e3b] transition-colors">Explore Graphs</Link>
                                </div>
                                {/* <div className="flex-1 bg-[#f8fafc] rounded-2xl p-8 w-full min-h-[300px] flex items-center justify-center relative overflow-hidden group"> */}
                                    {/* <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#002a20_25%,transparent_25%,transparent_75%,#002a20_75%,#002a20),linear-gradient(45deg,#002a20_25%,transparent_25%,transparent_75%,#002a20_75%,#002a20)] [background-size:20px_20px] [background-position:0_0,10px_10px]"></div> */}
                                    <div className="relative z-10 grid gap-2 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                                        <div className="flex gap-2">
                                            {Array.from({ length: 12 }).map((_, i) => <div key={`r1-${i}`} className={`w-6 h-6 rounded-sm ${Math.random() > 0.5 ? 'bg-[#002a20]' : 'bg-gray-200'}`}></div>)}
                                        </div>
                                        <div className="flex gap-2">
                                            {Array.from({ length: 12 }).map((_, i) => <div key={`r2-${i}`} className={`w-6 h-6 rounded-sm ${Math.random() > 0.3 ? 'bg-[#047857]' : 'bg-gray-200'}`}></div>)}
                                        </div>
                                        <div className="flex gap-2">
                                            {Array.from({ length: 12 }).map((_, i) => <div key={`r3-${i}`} className={`w-6 h-6 rounded-sm ${Math.random() > 0.7 ? 'bg-[#10b981]' : 'bg-gray-200'}`}></div>)}
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>

                            {/* Feature 2 (Grid) */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-[#e0f2fe] rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-blue-100 hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
                                    <div className="relative z-10">
                                        {/* <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                <Target size={32} className="text-blue-600" />
                            </div> */}
                                        <h3 className="text-3xl font-bold mb-4">Focus Mode</h3>
                                        <p className="text-[#002a20]/60 mb-8 text-lg">
                                            Enter a distraction-free zone designed to help you execute your habits. Timer, ambient sounds, and zero clutter.
                                        </p>
                                        <Link to="/signup" className="inline-block px-8 py-3 border-2 border-[#002a20] text-[#002a20] rounded-xl font-bold hover:bg-[#002a20] hover:text-white transition-colors">Start Focusing</Link>
                                    </div>
                                    {/* SVG Illustration for Focus */}
                                    <div className="absolute top-1/2 -right-12 -translate-y-1/2 opacity-10 pointer-events-none">
                                        <svg width="300" height="300" viewBox="0 0 100 100" className="animate-pulse-slow">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                                            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
                                            <circle cx="50" cy="50" r="25" fill="currentColor" opacity="0.2" />
                                            <circle cx="50" cy="50" r="15" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="bg-[#f3e8ff] rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-purple-100 hover:shadow-xl transition-shadow duration-500 relative overflow-hidden">
                                    <div className="relative z-10">
                                        {/* <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                <Zap size={32} className="text-purple-600" />
                            </div> */}
                                        <h3 className="text-3xl font-bold mb-4">Streaks & Gamification</h3>
                                        <p className="text-[#002a20]/60 mb-8 text-lg">
                                            Keep the chain alive. Earn badges and watch your consistency score rise as you stick to your plan.
                                        </p>
                                        <Link to="/signup" className="inline-block px-8 py-3 border-2 border-[#002a20] text-[#002a20] rounded-xl font-bold hover:bg-[#002a20] hover:text-white transition-colors">View Rewards</Link>
                                    </div>
                                    {/* SVG Illustration for Streaks */}
                                    <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                                        <svg width="200" height="200" viewBox="0 0 100 100">
                                            <path d="M10 90 L30 70 L50 80 L80 30 L90 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="10" cy="90" r="3" fill="currentColor" />
                                            <circle cx="30" cy="70" r="3" fill="currentColor" />
                                            <circle cx="50" cy="80" r="3" fill="currentColor" />
                                            <circle cx="80" cy="30" r="3" fill="currentColor" />
                                            <path d="M75 10 L80 30 L100 25" fill="none" stroke="currentColor" strokeWidth="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-[#002a20]/5 animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <div className="grid md:grid-cols-3 gap-12">
                                <div className="space-y-6">
                                    <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700">
                                        <Shield size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold">Unbreakable Discipline</h3>
                                    <p className="text-[#002a20]/60 text-lg leading-relaxed">
                                        By visualizing your progress, you create a psychological need to not break the chain, scientifically proving to increase adherence.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700">
                                        <Cpu size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold">Mental Clarity</h3>
                                    <p className="text-[#002a20]/60 text-lg leading-relaxed">
                                        Offload the mental burden of remembering "what do I need to do today?" to our system. Focus on execution, not recall.
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                                        <Users size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold">Social Accountability</h3>
                                    <p className="text-[#002a20]/60 text-lg leading-relaxed">
                                        Sharing your profile creates positive social pressure. Let your friends and colleagues witness your growth journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white" id="faq">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-16">
                    <div className="md:col-span-4 space-y-8">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Here to Help</p>
                        <h2 className="text-5xl font-bold text-[#002a20] leading-tight">Common <br />questions</h2>
                        <p className="text-[#002a20]/60 text-lg">
                            Find the answers to frequently asked questions about tracking your habits.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <span className="text-sm font-bold text-[#002a20]">Need further support?</span>
                            <Link to="/contact" className="px-6 py-3 bg-[#002a20] text-white rounded-lg text-sm font-bold hover:bg-[#064e3b] transition-colors">Get Support</Link>
                        </div>
                    </div>

                    <div className="md:col-span-8 space-y-4">
                        {[
                            { q: "What does Commit do?", a: "Commit helps you track daily habits and visualize your consistency using contribution graphs, similar to GitHub activity charts. It turns self-improvement into a data-driven journey." },
                            { q: "Is it free to use?", a: "Yes! The core tracking features and dashboard are completely free for individuals. We believe self-improvement shouldn't have a paywall." },
                            { q: "Can I use it on mobile?", a: "Absolutely. Commit is fully responsive and works beautifully on any mobile browser, so you can track habits on the go." },
                            { q: "Do I need to be a developer?", a: "Not at all. While our design is inspired by developer tools, the interface is intuitive and simple for everyone." },
                            { q: "Is my data private?", a: "Your data is private by default. You can choose to make your profile public if you want to share your progress, but that's entirely up to you." }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 ${activeFaq === i ? 'bg-[#f8fafc] shadow-md' : 'bg-white hover:border-gray-300'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full text-left p-6 md:p-8 flex justify-between items-center"
                                >
                                    <span className="font-bold text-xl text-[#002a20]">{item.q}</span>
                                    {activeFaq === i ? <ChevronUp className="text-[#002a20]" /> : <ChevronDown className="text-gray-400" />}
                                </button>
                                {activeFaq === i && (
                                    <div className="px-6 md:px-8 pb-8 text-[#002a20]/70 leading-relaxed animate-in fade-in slide-in-from-top-2">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <div className="bg-[#d4f5dd] py-32 text-center text-[#002a20] relative overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-4xl mx-auto px-6 space-y-10 relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-40">Get Started Now</p>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tight">Grow and thrive <br />without limits</h2>
                    <p className="text-xl md:text-2xl opacity-60 font-light max-w-2xl mx-auto">
                        Join thousands of habit builders discovering how effortless consistency can be with the right tools.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                        <Link to="/signup" className="px-10 py-5 bg-[#002a20] text-white rounded-xl font-bold text-lg hover:bg-[#064e3b] transition-transform hover:-translate-y-1 shadow-xl shadow-green-900/10">
                            I'm Ready to Commit
                        </Link>
                        <Link to="/about" className="px-10 py-5 bg-white border border-[#002a20]/10 rounded-xl font-bold text-lg hover:bg-[#f0fdf4] transition-transform hover:-translate-y-1 text-[#002a20]">
                            Tell Me More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <footer className="bg-[#002a20] text-white py-20 border-t border-white/10 font-light">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-16">
                    <div className="col-span-2 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#002a20] rounded-xl flex items-center justify-center text-[#d4f5dd] shadow-lg shadow-green-900/20">
                                <img src="favicon.svg" alt="Commit Logo" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Commit</span>
                        </div>
                        <p className="text-[#d4f5dd]/60 max-w-sm leading-relaxed text-sm">
                            Commit serves as open infrastructure for personal development. We engineering new ways to visualize progress and simplify consistency for everyone.
                        </p>
                        <div className="flex gap-4 pt-4">
                            {[Globe, Users, Terminal].map((Icon, i) => (
                                <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all hover:scale-110">
                                    <Icon size={18} className="text-[#d4f5dd]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Product</h4>
                        <ul className="space-y-4 text-sm text-[#d4f5dd]/60">
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Features</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Integrations</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Resources</h4>
                        <ul className="space-y-4 text-sm text-[#d4f5dd]/60">
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Community</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Documentation</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">API Reference</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-white text-lg">Company</h4>
                        <ul className="space-y-4 text-sm text-[#d4f5dd]/60">
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">About Us</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Careers</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Legal</Link></li>
                            <li><Link to="#" className="hover:text-[#d4f5dd] transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#d4f5dd]/40">
                    <p>Copyright © 2026 Commit Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms Of Use</Link>
                        <Link to="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
