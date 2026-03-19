import React, { useState } from 'react';
import GoogleLoginButton from "../components/GoogleLoginButton";
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft, Github } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if (response.ok) {
                onLoginSuccess(data.data);
                toast.success("Login Successful");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fff8e1] text-[#002a20] overflow-hidden">
      
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 relative z-10 bg-white">
        <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 text-[#002a20]/60 hover:text-[#002a20] transition-colors flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back
        </Link>
        
        <div className="max-w-md w-full space-y-8 mt-12 md:mt-0">
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#002a20]">
              Sign in to Commit
            </h1>
            <p className="text-[#002a20]/60">
              Welcome back.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
                <label className="text-sm font-bold text-[#002a20] ml-1">Email address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002a20]/20 focus:border-[#002a20] transition-all font-medium placeholder:text-gray-400 text-base"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-bold text-[#002a20] ml-1">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002a20]/20 focus:border-[#002a20] transition-all font-medium placeholder:text-gray-400 text-base"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="round text-[#002a20] focus:ring-[#002a20]" />
                    <span className="text-[#002a20]/70 font-medium">Remember me</span>
                </label>
                <a href="#" className="font-bold text-[#002a20] hover:underline">Forgot password?</a>
            </div>

            <button 
                type="submit" 
                className="w-full bg-[#002a20] text-white font-bold py-3.5 rounded-xl hover:bg-[#064e3b] transition-all hover:shadow-lg shadow-[#002a20]/20 active:scale-[0.98]"
            >
                Sign in
            </button>
          </form>

          <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                </div>
           </div>

           <div className="w-full mt-3">
                <div className="w-full [&>div]:w-full">
                    <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
                </div>
           </div>

           <p className="text-center text-sm text-gray-500 font-medium">
               Don't have an account? <Link to="/signup" className="text-[#002a20] font-bold hover:underline">Create a free account</Link>
           </p>
        </div>
      </div>

      {/* Right Side - Testimonial/Branding */}
      <div className="hidden md:flex w-1/2 bg-[#d4f5dd] relative flex-col justify-center items-center p-12 overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 bg-[#d4f5dd] bg-[radial-gradient(#002a20_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
         
         <div className="max-w-lg relative z-10 space-y-12">
             <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 rotate-[2deg]">
                 {/* Quote mark */}
                 <div className="absolute -top-6 -left-4 text-6xl text-[#002a20] font-serif opacity-20">“</div>
                 
                 <h3 className="text-2xl font-medium leading-relaxed text-[#002a20]">
                    Commit simplified my life. No more complex spreadsheets or forgotten journals. Just <span className="text-green-600 font-bold">pure focus</span> and visual progress.
                 </h3>
             </div>

             <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-[#002a20] flex items-center justify-center text-white font-bold text-xl">
                    MC
                 </div>
                 <div>
                     <p className="font-bold text-[#002a20]">Michael Chen</p>
                     <p className="text-sm text-gray-600">Software Engineer</p>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default LoginPage;