import { useEffect, useState, useRef } from "react";
import { generateYearlyData } from "../utils/dateHelpers.js";
import { Flame, Trophy, Calendar, CheckCircle2, Archive } from 'lucide-react';

const ContributionGraph = ({ userId, refreshKey, isPublic = false }) => {
    const [data, setData] = useState([]); // This will hold the full year array
    const [streaks, setStreaks] = useState({ current: 0, max: 0 }); // Stores streak info
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);
    const [hoveredCell, setHoveredCell] = useState(null);

    // Create a ref for the scrolling container
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
        // Scroll to the end (right side) when data is loaded
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [data]);

    const handleDateClick = async (dateStr, count) => {
        if (count === 0) {
           setSelectedDate(dateStr);
           setSelectedActivities([]);
           return;
        }
        
        setSelectedDate(dateStr);
        setIsLoadingActivities(true);
        try {
            // Using the same endpoint for both public and private as it relies on userId param
            // and seems to be public in the backend (no auth middleware on the route)
            const url = `${import.meta.env.VITE_API_URL}/api/v1/activity/date/${userId}/${dateStr}`;
            
            // If viewing public profile, we don't need to send auth header, but if we are logged in we can.
            // Since the endpoint seems public (based on route definition), we can just fetch.
            // However, to be safe and consistent with previous behavior:
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

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
        0: "bg-[#002a20]/5 dark:bg-white/5",
        1: "bg-[#d4f5dd] dark:bg-green-900/30",
        2: "bg-[#86efac] dark:bg-green-700/60",
        3: "bg-[#22c55e] dark:bg-green-500",
        4: "bg-[#002a20] dark:bg-green-300",
    };

    const getIntensity = (count) => {
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 4) return 2;
        if (count <= 6) return 3;
        return 4;
    };

    // Calculate months for labels
    const months = [];
    if (data.length > 0) {
        let currentMonth = -1;
        data.forEach((day, index) => {
            const date = new Date(day.date);
            const month = date.getMonth();
            // Show label approx every ~30 days or when month changes
            if (month !== currentMonth && index % 7 === 0) { // check every week column
                 // Simple approximation: add label if it's a new month and first week of it
                 months.push({ name: date.toLocaleString('default', { month: 'short' }), index: Math.floor(index / 7) });
                 currentMonth = month;
            }
        });
    }

    return (
        <div className="space-y-6">
            {/* Stats Header */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[140px] flex items-center gap-3 text-[#002a20]/80 dark:text-gray-300 bg-white dark:bg-white/5 px-4 py-3 md:px-5 md:py-3 rounded-2xl border border-[#002a20]/10 dark:border-white/10 shadow-sm transition-colors">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Flame className="text-orange-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[#002a20] dark:text-white leading-none mb-1">{streaks.current}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Current Streak</div>
                    </div>
                </div>
                
                <div className="flex-1 min-w-[140px] flex items-center gap-3 text-[#002a20]/80 dark:text-gray-300 bg-white dark:bg-white/5 px-4 py-3 md:px-5 md:py-3 rounded-2xl border border-[#002a20]/10 dark:border-white/10 shadow-sm transition-colors">
                    <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Trophy className="text-yellow-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[#002a20] dark:text-white leading-none mb-1">{streaks.max}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Best Streak</div>
                    </div>
                </div>

                <div className="flex-1 min-w-[140px] flex items-center gap-3 text-[#002a20]/80 dark:text-gray-300 bg-white dark:bg-white/5 px-4 py-3 md:px-5 md:py-3 rounded-2xl border border-[#002a20]/10 dark:border-white/10 shadow-sm transition-colors">
                    <div className="p-2 bg-[#002a20]/5 dark:bg-green-500/20 rounded-lg">
                        <CheckCircle2 className="text-[#002a20] dark:text-green-500" size={20} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-[#002a20] dark:text-white leading-none mb-1">
                           {data.reduce((acc, curr) => acc + curr.count, 0)}
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Total Contributions</div>
                    </div>
                </div>
            </div>

            {/* Graph Container */}
            <div className="relative border border-[#002a20]/10 dark:border-white/10 rounded-2xl p-4 md:p-6 bg-white dark:bg-white/5 shadow-sm overflow-hidden group transition-colors">
                <div ref={scrollRef} className="overflow-x-auto pb-2 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                     <div className="min-w-max">
                        {/* Month Labels */}
                        <div className="flex text-xs text-[#002a20]/40 dark:text-gray-500 font-medium mb-2 pl-8 h-4 relative">
                            {months.map((m, i) => (
                                <span key={i} style={{ position: 'absolute', left: `${m.index * 16}px` }}>{m.name}</span>
                            ))}
                         </div>
                         
                        <div className="flex gap-1">
                             {/* Day Labels */}
                            <div className="flex flex-col gap-1 pr-2 pt-[0px]">
                                {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                                    <div key={dayIndex} className="h-3 text-[10px] leading-3 text-[#002a20]/30 dark:text-gray-600 font-medium w-6 text-right">
                                        {dayIndex % 2 === 1 ? ['Mon', 'Wed', 'Fri'][Math.floor(dayIndex / 2)] : ''}
                                    </div>
                                ))}
                            </div>

                            {/* Grid */}
                            <div className="grid grid-flow-col grid-rows-7 gap-1">
                                {data.map((day, index) => (
                                    <div
                                        key={day.date}
                                        onClick={() => handleDateClick(day.date, day.count)}
                                        onMouseEnter={(e) => {
                                            const rect = e.target.getBoundingClientRect();
                                            setHoveredCell({
                                                x: rect.left + rect.width / 2,
                                                y: rect.top - 10,
                                                count: day.count,
                                                date: day.date
                                            });
                                        }}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        className={`w-3 h-3 rounded-[2px] transition-all duration-300 cursor-pointer hover:ring-2 hover:ring-[#002a20]/20 dark:hover:ring-white/20 hover:scale-125
                                            ${colorMap[getIntensity(day.count)]}
                                            ${selectedDate === day.date ? 'ring-2 ring-black dark:ring-white scale-110 z-10' : ''}
                                        `}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Legend */}
                <div className="mt-4 flex items-center justify-end gap-2 text-xs text-[#002a20]/50 dark:text-gray-500 font-medium">
                    <span>Less</span>
                    <div className={`w-3 h-3 rounded-[2px] ${colorMap[0]}`}></div>
                    <div className={`w-3 h-3 rounded-[2px] ${colorMap[1]}`}></div>
                    <div className={`w-3 h-3 rounded-[2px] ${colorMap[2]}`}></div>
                    <div className={`w-3 h-3 rounded-[2px] ${colorMap[3]}`}></div>
                    <div className={`w-3 h-3 rounded-[2px] ${colorMap[4]}`}></div>
                    <span>More</span>
                </div>
            </div>

             {/* Selected Date Details */}
             {selectedDate && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-[#002a20]/10 dark:bg-white/10"></div>
                        <span className="text-sm font-semibold text-[#002a20]/50 dark:text-gray-400">
                            Activity for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </span>
                        <div className="h-px flex-1 bg-[#002a20]/10 dark:bg-white/10"></div>
                    </div>

                    {!isPublic ? (
                         isLoadingActivities ? (
                            <div className="flex justify-center p-8">
                                <div className="w-6 h-6 border-2 border-[#002a20]/20 dark:border-white/20 border-t-[#002a20] dark:border-t-white rounded-full animate-spin"></div>
                            </div>
                        ) : selectedActivities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedActivities.map((activity) => (
                                    <div key={activity._id} className="bg-white dark:bg-white/5 border border-[#002a20]/5 dark:border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-[#002a20]/20 dark:hover:border-white/20 transition-all shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#002a20]/5 dark:bg-green-500/20 flex items-center justify-center text-lg">
                                                {/* Use emoji or default icon */}
                                                {activity.habitId?.emoji || "📝"}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-[#002a20] dark:text-white text-sm">{activity.habitId?.title || "Deleted Habit"}</h4>
                                                {activity.note && <p className="text-xs text-[#002a20]/50 dark:text-gray-400 mt-0.5 line-clamp-1">{activity.note}</p>}
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-[#002a20]/40 dark:text-gray-500 bg-[#002a20]/5 dark:bg-white/5 px-2 py-1 rounded-md">
                                            {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-[#002a20]/40 dark:text-gray-500 bg-[#002a20]/5 dark:bg-white/5 rounded-xl border border-dashed border-[#002a20]/10 dark:border-white/10">
                                <Archive className="mx-auto mb-2 opacity-50" size={24} />
                                <p>No specific details available for this day.</p>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-4 text-[#002a20]/40 dark:text-gray-500">
                             <p className="text-sm"> Detailed activity view is private.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Custom Tooltip */}
            {hoveredCell && (
                <div 
                    className="fixed z-50 pointer-events-none bg-[#002a20] dark:bg-neutral-800 text-white dark:text-gray-200 text-xs px-2 py-1.5 rounded-lg shadow-xl translate-x-3 -translate-y-full mb-1 border border-white/10"
                    style={{ 
                        left: hoveredCell.x, 
                        top: hoveredCell.y 
                    }}
                >
                    <div className="font-bold whitespace-nowrap">{hoveredCell.count} activities</div>
                    <div className="opacity-70 text-[10px] whitespace-nowrap">{new Date(hoveredCell.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                </div>
            )}
        </div>
    );
};

export default ContributionGraph;
