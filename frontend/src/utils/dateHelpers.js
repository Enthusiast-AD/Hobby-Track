export const generateYearlyData = (rawData) => {

    const lookup = new Map();
    
    if (Array.isArray(rawData)) {
        rawData.forEach((item) => {
            lookup.set(item._id, item.count);
        });
    }

    const allDays = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
        // Create a new date based on "i" days ago
        const date = new Date(today);
        date.setDate(date.getDate() - i); 

        const dateKey = date.toISOString().split('T')[0]; // "YYYY-MM-DD" format
        
        const count = lookup.get(dateKey) || 0;

        allDays.push({
            date: dateKey,
            count: count,
            level: getContributionLevel(count) 
        });
    }

    return allDays;
};

const getContributionLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4; 
};