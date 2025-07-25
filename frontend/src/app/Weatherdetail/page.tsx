"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HistoryPage() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
   
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
    }
  }, []);

  const handleSearch = (city: string) => {
    window.location.href = `/Homes?search=${encodeURIComponent(city)}`;
  };

  const handleClear = () => {
    localStorage.removeItem('SearchHistory');
    setSearchHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Search History</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home page
          </Link>
        </div>

        {searchHistory.length === 0 ? (
          <p className="text-gray-400">No search history yet</p>
        ) : (
          <>
            <button 
              onClick={handleClear}
              className="mb-4 text-sm text-red-400 hover:text-red-300"
            >
              Clear All History
            </button>
            <ul className="space-y-2">
              {searchHistory.map((city, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-200">{city}</span>
                  <button
                    onClick={() => handleSearch(city)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Search Again
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
