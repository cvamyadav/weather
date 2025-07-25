// 
"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  humidity: number;
  weather_descriptions?: string[];
}

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  timezone: string;
  current_units: CurrentWeather;
  current: {
    time: string,
    interval: number,
    temperature_2m: number,
    wind_speed_10m: number,
  };
}

export default function Homes() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://localhost:3001/api/weatherdaily/${searchQuery}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      
      const data = await response.json();
      setWeather(data);
      
      // Update search history
      setSearchHistory(prev => {
        // Prevent duplicates
        if (!prev.includes(searchQuery.trim())) {
          return [...prev, searchQuery.trim()];
        }
        return prev;
      });
      
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a city..."
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-medium"
            >
              Search
            </button>

            <Link 
              href="/Weatherdetail" 
              className="px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-bold whitespace-nowrap flex items-center justify-center"
            >
              View History
            </Link>
          </div>
        </form>
      </div>

      <main className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Current Weather</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6">
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}
        
        {weather && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-semibold capitalize">
                  {searchQuery}
                </h2>
                <p className="text-gray-400 text-sm">Current conditions</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Temperature</span>
                  <span className="text-xl font-medium">
                    {weather.current.temperature_2m}°C
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Wind Speed</span>
                  <span className="text-lg">
                    {weather.current.wind_speed_10m} km/h
                  </span>
                </div>
                
                {weather.current.time && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-sm">{new Date(weather.current.time).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-500 text-xs">
        <p>Weather data provided API</p>
        <p className="text-2xl text-bold ">Once the page get Mount the local storage get deleted</p>
      </footer>
    </div>
  );
}