import { useEffect, useState, useRef } from "react";
import { generateYearlyData } from "../utils/dateHelpers.js";
import { Flame, Trophy, Calendar, CheckCircle2 } from 'lucide-react';

const ContributionGraph = ({userId, refreshKey}) => {
    const [data, setData] = useState([]);
    const [streaks, setStreaks] = useState({ current: 0, max: 0 });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!userId) return; 

        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activity/stats/${userId}`);
                
                if (!response.ok) return;

                const result = await response.json();
                // Handle new response structure
                const statsData = result.data.stats || result.data; 
                const streaksData = result.data.streaks || { current: 0, max: 0 };
                
                setData(generateYearlyData(statsData));
                setStreaks(streaksData);
            } catch (error) {
                console.error("Error fetching graph:", error);
            }
        }
        fetchData();
    }, [userId, refreshKey]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [data]);

    const handleDateClick = async (date, count) => {
        setSelectedDate(date);
        if (count === 0) {
            setSelectedActivities([]);
            return;
        }
        
        setIsLoadingActivities(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activity/date/${userId}/${date}`);
            if (response.ok) {
                const result = await response.json();
                setSelectedActivities(result.data);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setIsLoadingActivities(false);
        }
    };

    const colorMap = {
        0: "bg-gray-800",
        1: "bg-green-900",
        2: "bg-green-700",
        3: "bg-green-500",
        4: "bg-green-300",
    };

    return (
        <div className="space-y-4">
            {/* Stats Header */}
            <div className="flex gap-6 mb-4">
                <div className="flex items-center gap-2 text-gray-300 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800">
                    <Flame className="text-orange-500" size={20} />
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Current Streak</p>
                        <p className="text-xl font-bold text-white">{streaks.current} <span className="text-sm font-normal text-gray-500">days</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-gray-900/50 px-4 py-2 rounded-xl border border-gray-800">
                    <Trophy className="text-yellow-500" size={20} />
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Longest Streak</p>
                        <p className="text-xl font-bold text-white">{streaks.max} <span className="text-sm font-normal text-gray-500">days</span></p>
                    </div>
                </div>
            </div>

            {/* Graph */}
            <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                    {data.map((day, index) => (
                        <div 
                            key={index}
                            onClick={() => handleDateClick(day.date, day.count)}
                            title={`${day.date}: ${day.count === 0 ? "No activity" : `${day.count} tasks completed`}`}
                            className={`w-3 h-3 rounded-sm transition-all hover:scale-125 hover:z-10 cursor-pointer ${colorMap[day.level]} ${selectedDate === day.date ? 'ring-2 ring-white' : ''}`}
                        >
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Selected Date Details */}
            {selectedDate && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-gray-900/30 border border-gray-800 rounded-xl p-4 mt-4">
                    <h3 className="text-gray-400 text-sm font-bold uppercase mb-3 flex items-center gap-2">
                        <Calendar size={14} /> Activity on {selectedDate}
                    </h3>
                    
                    {isLoadingActivities ? (
                        <div className="text-gray-500 text-sm italic">Loading...</div>
                    ) : selectedActivities.length > 0 ? (
                        <div className="space-y-2">
                            {selectedActivities.map((activity, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-gray-200 bg-black/40 p-2 rounded-lg border border-gray-800/50">
                                    <CheckCircle2 size={16} className="text-green-500" />
                                    <span>{activity.habitId?.title || "Unknown Habit"}</span>
                                    <span className="text-xs text-gray-600 ml-auto">
                                        {new Date(activity.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No activity recorded for this day.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ContributionGraph;