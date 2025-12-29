import { useState } from 'react';
import ContributionGraph from './components/ContributionGraph';

function App() {
  // 1. The "Trigger" State
  const [refreshKey, setRefreshKey] = useState(0);

  // HARDCODED FOR TESTING (Use the ID from your Seed Script)
  const TEST_USER_ID = "69510c7ef6e65018f531e0c8"; 
  const TEST_HABIT_ID = "REPLACE_WITH_ACTUAL_HABIT_ID"; 

  const handleMarkDone = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/v1/activity/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: "69510c7ef6e65018f531e0c8",
          habitId: "69510c7ebe7869aac9027c04"
        })
      });

      if (response.ok) {
        // 2. SUCCESS! Flip the switch.
        // This increments the number, causing the Graph child to re-fetch.
        setRefreshKey(oldKey => oldKey + 1);
        alert("Good job! Graph updated.");
      } else {
        alert("Failed to log activity");
      }
    } catch (error) {
      console.error("Error logging:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black p-10 flex flex-col items-center gap-8">
       {/* Pass the signal down to the child */}
       <ContributionGraph userId={TEST_USER_ID} refreshKey={refreshKey} />

       <button 
         onClick={handleMarkDone}
         className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-all"
       >
         ✅ I did it today!
       </button>
    </div>
  );
}

export default App;