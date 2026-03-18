import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Zap, Heart, Shield } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#fff8e1] text-[#002a20] font-sans selection:bg-[#d4f5dd] selection:text-[#002a20]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fff8e1]/80 backdrop-blur-md border-b border-[#002a20]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <div className="w-8 h-8 bg-[#002a20] rounded-lg flex items-center justify-center text-[#d4f5dd]">
              <img src="favicon.svg" alt="" />
            </div>
            Commit
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:text-[#002a20]/70 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Consistency is <span className="text-[#002a20]/40">hard.</span> <br/>
              We make it <span className="underline decoration-[#d4f5dd] decoration-4 underline-offset-4">visual.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#002a20]/70 max-w-2xl mx-auto leading-relaxed">
              We believe that small, daily actions compound into massive results. Commit is built to help you visualize that journey.
            </p>
          </section>

          {/* Mission Grid */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#002a20]/10 hover:shadow-xl hover:shadow-[#002a20]/5 transition-all duration-300">
               <div className="w-12 h-12 bg-[#d4f5dd] rounded-xl flex items-center justify-center text-[#002a20] mb-6">
                 <Zap size={24} />
               </div>
               <h3 className="text-2xl font-bold mb-4">The Problem</h3>
               <p className="text-[#002a20]/70 leading-relaxed">
                 Most habit trackers are just lists. They feel like chores. They don't give you that dopamine hit of seeing your progress build up over time like a GitHub contribution graph does for code.
               </p>
            </div>
            
            <div className="bg-[#002a20] text-white p-8 rounded-3xl border border-[#002a20]/10 hover:shadow-xl hover:shadow-[#002a20]/20 transition-all duration-300">
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#d4f5dd] mb-6">
                 <Target size={24} />
               </div>
               <h3 className="text-2xl font-bold mb-4">Our Solution</h3>
               <p className="text-white/70 leading-relaxed">
                 We took the best part of developer tools - the contribution heat map - and applied it to personal growth. Whether it's reading, running, or meditating, every day you show up paints a green square on your story.
               </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="space-y-12">
            <h2 className="text-4xl font-bold text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
               <div className="space-y-4 p-6 rounded-2xl bg-[#d4f5dd]/30">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Shield size={28} className="text-[#002a20]" />
                  </div>
                  <h4 className="text-xl font-bold">Privacy First</h4>
                  <p className="text-sm text-[#002a20]/70">Your data is yours. We don't sell it, and we keep it secure.</p>
               </div>
               
               <div className="space-y-4 p-6 rounded-2xl bg-[#d4f5dd]/30">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Users size={28} className="text-[#002a20]" />
                  </div>
                  <h4 className="text-xl font-bold">Community Driven</h4>
                  <p className="text-sm text-[#002a20]/70">Built by builders, for builders. We listen to every piece of feedback.</p>
               </div>

               <div className="space-y-4 p-6 rounded-2xl bg-[#d4f5dd]/30">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart size={28} className="text-[#002a20]" />
                  </div>
                  <h4 className="text-xl font-bold">Simplicity</h4>
                  <p className="text-sm text-[#002a20]/70">No bells and whistles. Just the tools you need to stay consistent.</p>
               </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[#002a20]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="font-bold text-2xl mb-4">Commit</p>
            <p className="text-[#002a20]/50 text-sm">© {new Date().getFullYear()} Hobby Track Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;