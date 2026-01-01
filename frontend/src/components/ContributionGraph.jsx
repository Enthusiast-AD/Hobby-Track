import { useEffect, useState, useRef } from "react";
import { generateYearlyData } from "../utils/dateHelpers.js";


const ContributionGraph = ({userId, refreshKey}) => {
    const [data, setData] = useState([]);
<<<<<<< Updated upstream
=======
    const [streaks, setStreaks] = useState({ current: 0, max: 0 });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);
    const [hoveredCell, setHoveredCell] = useState(null);
>>>>>>> Stashed changes
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!userId) return; 

        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/activity/stats/${userId}`);
                
                if (!response.ok) return;

                const result = await response.json();
                setData(generateYearlyData(result.data));
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

    const colorMap = {
        0: "bg-gray-800",
        1: "bg-green-900",
        2: "bg-green-700",
        3: "bg-green-500",
        4: "bg-green-300",
    };

    const getMotivationalMessage = (streak) => {
        if (streak >= 30) return "🔥 Unstoppable! You're on fire!";
        if (streak >= 7) return "🚀 You're building serious momentum!";
        if (streak >= 3) return "⚡ Great start! Keep it up!";
        return "🌱 Every day counts. Start your streak today!";
    };

    const renderMonthLabels = () => {
        const months = [];
        let currentMonth = -1;

        data.forEach((day, index) => {
            const date = new Date(day.date);
            const month = date.getMonth();
            
            if (month !== currentMonth) {
                const colIndex = Math.floor(index / 7);
                months.push({ month: date.toLocaleString('default', { month: 'short' }), col: colIndex });
                currentMonth = month;
            }
        });

        return (
            <div className="flex relative h-6 mb-2 text-xs text-gray-500 font-medium select-none">
                {months.map((m, i) => (
                    <span key={i} style={{ position: 'absolute', left: `${m.col * 20}px` }}>{m.month}</span>
                ))}
            </div>
        );
    };

    return (
<<<<<<< Updated upstream
        <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                {data.map((day, index) => (
                    <div 
                        key={index}
                        title={`${day.date}: ${day.count} tasks`}
                        className={`w-3 h-3 rounded-sm transition-all hover:scale-125 hover:z-10 ${colorMap[day.level]}`}
                    >
                    </div>
                ))}
            </div>
=======
        <div className="space-y-6">
            {/* Stats Header */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300 bg-white/5 px-5 py-3 rounded-2xl border border-white/10 min-w-[160px]">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Flame className="text-orange-500" size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Current Streak</p>
                        <p className="text-2xl font-bold text-white">{streaks.current} <span className="text-sm font-normal text-gray-500">days</span></p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-gray-300 bg-white/5 px-5 py-3 rounded-2xl border border-white/10 min-w-[160px]">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Trophy className="text-yellow-500" size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Longest Streak</p>
                        <p className="text-2xl font-bold text-white">{streaks.max} <span className="text-sm font-normal text-gray-500">days</span></p>
                    </div>
                </div>
                
                {/* Motivational Message */}
                <div className="flex-1 flex items-center justify-center md:justify-end">
                    <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <p className="text-sm font-medium text-green-400">
                            {getMotivationalMessage(streaks.current)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Graph */}
            <div className="relative group">
                <div ref={scrollRef} className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <div className="min-w-max">
                        {renderMonthLabels()}
                        <div className="grid grid-rows-7 grid-flow-col gap-1.5 w-max">
                            {data.map((day, index) => (
                                <div 
                                    key={index}
                                    onClick={() => handleDateClick(day.date, day.count)}
                                    onMouseEnter={(e) => {
                                        const rect = e.target.getBoundingClientRect();
                                        setHoveredCell({
                                            x: rect.left + rect.width / 2,
                                            y: rect.top - 10,
                                            date: day.date,
                                            count: day.count
                                        });
                                    }}
                                    onMouseLeave={() => setHoveredCell(null)}
                                    className={`w-3.5 h-3.5 rounded-[2px] transition-all hover:scale-125 hover:z-10 cursor-pointer border border-transparent hover:border-white/50 ${colorMap[day.level]} ${selectedDate === day.date ? 'ring-2 ring-white scale-110 z-20' : ''}`}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Custom Tooltip */}
                {hoveredCell && (
                    <div 
                        className="fixed z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-700 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-opacity duration-200"
                        style={{ left: hoveredCell.x, top: hoveredCell.y }}
                    >
                        <p className="font-bold text-gray-300">{hoveredCell.count} activities</p>
                        <p className="text-gray-500">{new Date(hoveredCell.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 text-xs text-gray-500 font-medium">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-gray-800"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-green-900"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-green-700"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-green-500"></div>
                    <div className="w-3.5 h-3.5 rounded-[2px] bg-green-300"></div>
                </div>
                <span>More</span>
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
>>>>>>> Stashed changes
        </div>
    );
}

export default ContributionGraph;