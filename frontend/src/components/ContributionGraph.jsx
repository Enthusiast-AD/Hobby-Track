import { useEffect, useState, useRef } from "react";
import { generateYearlyData } from "../utils/dateHelpers.js";


const ContributionGraph = ({userId, refreshKey}) => {
    const [data, setData] = useState([]);
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

    return (
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
        </div>
    );
}

export default ContributionGraph;