"use client"
import { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("api");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium inline-block mb-6"
          >
            Back to Weather App
          </Link>
          <h1 className="text-3xl font-bold mb-6">About WeatherWise</h1>
          
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab("api")}
              className={`px-4 py-2 font-medium ${activeTab === "api" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
            >
              API Information
            </button>
            <button
              onClick={() => setActiveTab("app")}
              className={`px-4 py-2 font-medium ${activeTab === "app" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
            >
              Application Details
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`px-4 py-2 font-medium ${activeTab === "data" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
            >
              Data Flow
            </button>
          </div>
        </div>

        {activeTab === "api" && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Weather API Information</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">API Used</h3>
              <p className="mb-4">
                This application uses the <span className="text-blue-400">Open-Meteo Weather API</span>, 
                a free and open-source weather API that provides global weather data.
              </p>
              <a 
                href="https://open-meteo.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Open-Meteo Official Website
              </a>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">API Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Global weather data coverage</li>
                <li>Real-time and forecast data</li>
                <li>15+ weather variables including temperature, precipitation, wind, etc.</li>
                <li>High-resolution (1-11 km) weather models</li>
                <li>Historical data available</li>
                <li>No API key required for basic usage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Sample API Request</h3>
              <div className="bg-gray-700 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm">
                  {`GET https://api.open-meteo.com/v1/forecast?
  latitude=52.52&longitude=13.41&
  current=temperature_2m,wind_speed_10m&
  hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`}
                </code>
              </div>
            </div>
          </div>
        )}

        {activeTab === "app" && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Application Details</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Frontend</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Next.js (React Framework)</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>React Hooks</li>
                  </ul>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Backend</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Express js</li>
                    <li>Node.js</li>
                    <li>Open-Meteo API</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Real-time weather data for any location</li>
                
                <li>Detailed weather parameters (temperature, humidity, wind, etc.)</li>
               
                <li>Dark mode interface</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Source Code</h3>
              <p className="mb-4">
                The complete source code for this application is available on GitHub:
              </p>
              <a 
                href="https://github.com/yourusername/weatherwise" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                GitHub Repository
              </a>
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How Weather Data is Fetched</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Data Flow Diagram</h3>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4">1</div>
                    <div>
                      <p className="font-medium">User enters location</p>
                      <p className="text-sm text-gray-400">Search form submission</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4">2</div>
                    <div>
                      <p className="font-medium">Next.js API route processes request</p>
                      <p className="text-sm text-gray-400">Server-side geocoding if needed</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4">3</div>
                    <div>
                      <p className="font-medium">Open-Meteo API call</p>
                      <p className="text-sm text-gray-400">Fetching weather data</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4">4</div>
                    <div>
                      <p className="font-medium">Data processing</p>
                      <p className="text-sm text-gray-400">Formatting and filtering</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4">5</div>
                    <div>
                      <p className="font-medium">Response to client</p>
                      <p className="text-sm text-gray-400">Displaying weather information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Code Implementation</h3>
              <div className="bg-gray-700 rounded-lg p-4 mb-4 overflow-x-auto">
                <code className="text-sm">
                  {`// API Route Example (pages/api/weatherdaily/[city].ts)
export default async function handler(req, res) {
  try {
    // 1. Get city from request
    const { city } = req.query;
    
    // 2. Fetch coordinates (if needed)
    const geoResponse = await fetch(\`https://geocoding-api?city=\${city}\`);
    const geoData = await geoResponse.json();
    
    // 3. Fetch weather data
    const weatherResponse = await fetch(
      \`https://api.open-meteo.com/v1/forecast?latitude=\${geoData.lat}&longitude=\${geoData.lng}&current=temperature_2m,...\`
    );
    
    // 4. Process and return data
    const weatherData = await weatherResponse.json();
    res.status(200).json(weatherData);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}`}
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Data Caching</h3>
              <p className="mb-2">
                To improve performance and reduce API calls:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Client-side caching using localStorage</li>
                <li>Server-side caching with Next.js</li>
                <li>Search history implementation</li>
                <li>Rate limiting consideration</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}