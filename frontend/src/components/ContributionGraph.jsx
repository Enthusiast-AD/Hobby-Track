import { useEffect,useState } from "react";
import { generateYearlyData } from "../utils/dateHelpers.js";


const ContributionGraph = ({userId, refreshKey}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + `/api/v1/activity/stats/${userId}/`);
                const result = await response.json();
                setData(generateYearlyData(result.data));
            } catch (error) {
                console.error("Error fetching contribution data:", error);
            }
        }
        fetchData();
    }, [userId, refreshKey]);

    const colorMap = {
        0: "bg-gray-800",
        1: "bg-green-900",
        2: "bg-green-700",
        3: "bg-green-500",
        4: "bg-green-300",
    };

    return (
        <div className="w-full p-4 border border-gray-700 rounded-xl bg-gray-900">
            <h2 className="text-white mb-4">Contribution Graph</h2>
            <div className="overflow-x-auto pb-2">
                <div className="grid grid-rows-7 grid-flow-col gap-1">
                    {data.map((day, index) => (
                        <div 
                            key={index}
                            title={`${day.date}: ${day.count} tasks`} // Simple tooltip
                            className={`w-3 h-3 rounded-sm ${colorMap[day.level]}`}
                        >
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContributionGraph;