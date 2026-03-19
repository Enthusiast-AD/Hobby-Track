import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Plus, Minus, Music } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SOUNDS = {
    'Light Rain': "/sounds/light-rain.mp3",
    'Rain on Leaves': "/sounds/rain-on-leaves.mp3", 
    'Rain on Window': "/sounds/rain-on-window.mp3",
    'River': "/sounds/river.mp3"
};

const FocusMode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Core Timer State
    const [initialTime, setInitialTime] = useState(25 * 60); // Default 25m
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    
    // Habit State
    const [habits, setHabits] = useState([]);
    const [selectedHabitId, setSelectedHabitId] = useState('');
    
    // Sound State
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [selectedSound, setSelectedSound] = useState('Light Rain');
    
    // Audio ref
    const audioRef = useRef(null);

    // Initialize Audio
    useEffect(() => {
        audioRef.current = new Audio(SOUNDS[selectedSound]);
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Change Audio Source when selection changes
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = !audioRef.current.paused;
            audioRef.current.src = SOUNDS[selectedSound];
            if (wasPlaying && isActive && isSoundOn) {
                audioRef.current.play().catch(e => console.log("Audio play failed", e));
            }
        }
    }, [selectedSound]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            // Timer ran out naturally
            finishSession();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Audio Play/Pause Logic
    useEffect(() => {
        if (!audioRef.current) return;
        
        if (isSoundOn && isActive && timeLeft > 0) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    // Auto-play policy might block this if no interaction
                    console.log("Audio play prevented:", e);
                });
            }
        } else {
            audioRef.current.pause();
        }
    }, [isSoundOn, isActive, timeLeft]);

    // Fetch Habits & Handle Pre-selection
    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/habits?archived=false`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const result = await response.json();
                
                // Filter out habits that are already completed for the day
                const activeHabits = result.data.filter(h => {
                    const isDailyOrTodo = h.type === 'daily' || h.type === 'todo';
                    const isNotCompleted = !h.completedToday;
                    // If we navigated here with a specific ID, let it pass even if completed, 
                    // otherwise filter it out.
                    const isCurrentSelection = location.state?.habitId === h._id;
                    
                    return isDailyOrTodo && (isNotCompleted || isCurrentSelection);
                });

                setHabits(activeHabits);
                
                // Pre-select from navigation state or default to first
                if (location.state?.habitId) {
                    setSelectedHabitId(location.state.habitId);
                } else if (activeHabits.length > 0) {
                    setSelectedHabitId(activeHabits[0]._id);
                }
            }
        } catch (error) {
            console.error("Error fetching habits", error);
        }
    };

    const finishSession = async () => {
        setIsActive(false);
        if (audioRef.current) audioRef.current.pause();
        
        // Play success sound
        const ding = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        ding.volume = 0.5;
        ding.play().catch(e => {}); 

        // Automatically log the session
        await handleLogSession();
    };

    const toggleTimer = () => {
        if (!selectedHabitId) {
            toast.error("Please select a habit first");
            return;
        }
        if (timeLeft === 0) {
            setTimeLeft(initialTime);
        }
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(initialTime);
    };

    const adjustTime = (minutes) => {
        if (isActive) return; // Don't adjust while running
        const newTime = Math.max(60, Math.min(180 * 60, initialTime + minutes * 60));
        setInitialTime(newTime);
        setTimeLeft(newTime);
    };

    const handleLogSession = async () => {
        const token = localStorage.getItem('token');
        try {
            const durationMins = Math.round(initialTime / 60); 
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activity/log`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    userId: JSON.parse(localStorage.getItem('user'))._id,
                    habitId: selectedHabitId,
                    duration: durationMins, 
                    note: "Focus Session"
                })
            });

            if (response.ok) {
                toast.success(`Logged ${durationMins}m focus session! 🔥`);
                if (audioRef.current) audioRef.current.pause();
                navigate('/dashboard');
            } else {
                const err = await response.json();
                toast.error(err.message || "Failed to log session");
            }
        } catch (error) {
            console.error("Error logging session", error);
            toast.error("Network error");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-[#fff8e1] text-[#002a20] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff8e1] via-[#f0fdf4] to-[#fff8e1] z-0" />
            
            {/* Content */}
            <div className="z-10 w-full max-w-md flex flex-col items-center space-y-8">
                
                {/* Header */}
                <div className="w-full flex justify-between items-center px-4">
                    <button onClick={() => navigate('/dashboard')} className="text-[#002a20]/40 hover:text-[#002a20] transition p-2 hover:bg-[#002a20]/5 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold tracking-widest text-[#002a20]/40 uppercase">Focus Mode</h1>
                    <div className="w-10"></div> {/* Spacer */}
                </div>

                {/* Habit Selector & Sound */}
                <div className="w-full space-y-4 px-4">
                    <div className="bg-white/80 backdrop-blur-md border border-[#002a20]/10 rounded-2xl p-2 relative shadow-sm">
                        <label className="absolute -top-2 left-4 px-2 bg-[#fff8e1] text-[10px] text-[#002a20]/60 font-bold uppercase tracking-wider">
                            Focus Target
                        </label>
                        <select 
                            value={selectedHabitId}
                            onChange={(e) => setSelectedHabitId(e.target.value)}
                            className="w-full bg-transparent text-[#002a20] p-2 focus:outline-none text-center font-medium appearance-none cursor-pointer hover:text-green-700 transition"
                            disabled={isActive}
                        >
                            <option value="" disabled>Select a habit...</option>
                            {habits.map(habit => (
                                <option key={habit._id} value={habit._id} className="bg-white text-[#002a20]">
                                    {habit.title}
                                </option>
                            ))}
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#002a20]/40">
                             <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    {/* Sound Selector */}
                    <div className={`flex items-center justify-between bg-white/60 border border-[#002a20]/5 rounded-xl p-3 transition-all ${isSoundOn ? 'border-blue-500/30 bg-blue-50' : ''}`}>
             
                        <div className="flex items-center gap-3 w-full">
                             <button 
                                onClick={() => setIsSoundOn(!isSoundOn)}
                                className={`p-2 rounded-full transition shrink-0 ${isSoundOn ? 'bg-[#002a20] text-white shadow-lg shadow-[#002a20]/20' : 'bg-[#002a20]/5 text-[#002a20]/40 hover:text-[#002a20]'}`}
                            >
                                {isSoundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                            </button>
                            
                            <div className="flex flex-col w-full relative group">
                                <span className="text-[10px] text-[#002a20]/40 font-bold uppercase tracking-wider mb-0.5 group-hover:text-blue-600 transition-colors">
                                    Soundscape
                                </span>
                                <select 
                                    value={selectedSound} 
                                    onChange={(e) => setSelectedSound(e.target.value)}
                                    className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer appearance-none w-full text-[#002a20]/80 hover:text-[#002a20] transition"
                                >
                                    {Object.keys(SOUNDS).map(sound => (
                                        <option key={sound} value={sound} className="bg-white">{sound}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="text-[#002a20]/40 pl-2 border-l border-[#002a20]/10">
                             <Music size={16} />
                        </div>
                    </div>
                </div>

                {/* Timer Display */}
                <div className="relative group cursor-default py-8">
                    {/* Time Controls */}
                    {!isActive && (
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => adjustTime(5)} className="p-2 bg-[#002a20]/5 hover:bg-[#002a20]/10 rounded-full text-green-600">
                                <Plus size={20} />
                            </button>
                            <button onClick={() => adjustTime(-5)} className="p-2 bg-[#002a20]/5 hover:bg-[#002a20]/10 rounded-full text-red-600">
                                <Minus size={20} />
                            </button>
                        </div>
                    )}
                    
                    <div className="text-[7rem] font-mono leading-none font-bold text-[#002a20] select-none tracking-tighter">
                        {formatTime(timeLeft)}
                    </div>
                    
                    {!isActive && (
                         <div className="text-center text-[#002a20]/40 text-sm font-medium mt-2">
                            {initialTime / 60} Minutes
                         </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-8">
                    <button 
                        onClick={resetTimer}
                        className="p-4 rounded-full bg-[#002a20]/5 text-[#002a20]/40 hover:text-[#002a20] hover:bg-[#002a20]/10 transition backdrop-blur-sm"
                        title="Reset Timer"
                    >
                        <RotateCcw size={24} />
                    </button>

                    <button 
                        onClick={toggleTimer}
                        className={`p-8 rounded-[2rem] transition-all transform hover:scale-105 hover:shadow-xl ${isActive ? 'bg-[#c5a065] hover:bg-[#b8955e] shadow-[#c5a065]/20 text-white' : 'bg-[#002a20] hover:bg-[#002a20]/90 shadow-[#002a20]/20 text-white'}`}
                    >
                        {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1" />}
                    </button>
                </div>

                {/* Status Text of Focus Mode */}
                <p className="text-[#002a20]/40 text-sm mt-8 text-center max-w-xs h-6">
                    {isActive 
                        ? <span className="animate-pulse text-[#002a20]">Time to focus...</span> 
                        : "Ready when you are."}
                </p>
            </div>
        </div>
    );
};

export default FocusMode;
