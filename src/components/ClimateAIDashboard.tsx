import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Thermometer,
  Droplets,
  Waves,
  AlertTriangle,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react';
import ClimateGlobe from './ClimateGlobe';

const regions = [
  'Global',
  'North America',
  'Europe',
  'Asia',
  'Africa',
  'South America',
  'Oceania'
] as const;

type Region = typeof regions[number];

// Regional temperature factors
const regionalFactors: Record<Region, {
  temperature: number;
  precipitation: number;
  seaLevel: number;
  extremeEvents: number;
}> = {
  'Global': { temperature: 1, precipitation: 1, seaLevel: 1, extremeEvents: 1 },
  'North America': { temperature: 1.2, precipitation: 1.3, seaLevel: 0.8, extremeEvents: 1.1 },
  'Europe': { temperature: 1.1, precipitation: 1.2, seaLevel: 0.9, extremeEvents: 1.2 },
  'Asia': { temperature: 1.3, precipitation: 1.4, seaLevel: 1.2, extremeEvents: 1.3 },
  'Africa': { temperature: 1.4, precipitation: 0.7, seaLevel: 1.1, extremeEvents: 1.4 },
  'South America': { temperature: 1.1, precipitation: 1.5, seaLevel: 1.0, extremeEvents: 1.2 },
  'Oceania': { temperature: 1.2, precipitation: 0.9, seaLevel: 1.3, extremeEvents: 1.1 }
};

// Generate historical data based on region
const getRegionalHistoricalData = (region: Region) => {
  const factor = regionalFactors[region];
  return [
    { year: 1900, temperature: -0.2 * factor.temperature },
    { year: 1950, temperature: 0 * factor.temperature },
    { year: 2000, temperature: 0.5 * factor.temperature },
    { year: 2023, temperature: 1.1 * factor.temperature },
    { year: 2030, temperature: 1.3 * factor.temperature },
    { year: 2040, temperature: 1.4 * factor.temperature },
    { year: 2050, temperature: 1.6 * factor.temperature }
  ];
};

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}

function MetricCard({ icon: Icon, title, value, description }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function ImpactCard({ level, description, color }: { level: string; description: string; color: string }) {
  return (
    <div className={`p-4 rounded-lg border ${color}`}>
      <h4 className="font-semibold mb-2">{level}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default function ClimateAIDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('Global');
  const [selectedYear, setSelectedYear] = useState(2050);

  // Calculate metrics based on selected year and region
  const metrics = useMemo(() => {
    const baseYear = 2023;
    const yearDiff = selectedYear - baseYear;
    const factors = regionalFactors[selectedRegion];
    
    const baseTempIncrease = 1.1 + (yearDiff * (1.6 - 1.1) / (2050 - 2023));
    const basePrecipChange = (yearDiff * 5.3 / (2050 - 2023));
    const baseSeaLevelRise = (yearDiff * 26.3 / (2050 - 2023));
    const baseExtremeEvents = (yearDiff * 32 / (2050 - 2023));

    return {
      temperature: (baseTempIncrease * factors.temperature).toFixed(1),
      precipitation: (basePrecipChange * factors.precipitation).toFixed(1),
      seaLevel: (baseSeaLevelRise * factors.seaLevel).toFixed(1),
      extremeEvents: (baseExtremeEvents * factors.extremeEvents).toFixed(1)
    };
  }, [selectedYear, selectedRegion]);

  const historicalData = useMemo(
    () => getRegionalHistoricalData(selectedRegion),
    [selectedRegion]
  );

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Climate Change Prediction Dashboard</h1>
        <p className="text-gray-600">
          Advanced AI-powered analysis and predictions for climate change impacts across different regions.
          Our models provide insights with 85% confidence level based on historical data and current trends.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Region Selection</h2>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as Region)}
            className="w-full p-2 border rounded-lg"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Prediction Timeframe</h2>
          <input
            type="range"
            min="2023"
            max="2050"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center mt-2">Year: {selectedYear}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Thermometer}
          title="Temperature"
          value={`+${metrics.temperature}°C`}
          description={`${selectedRegion} increase by ${selectedYear}`}
        />
        <MetricCard
          icon={Droplets}
          title="Precipitation"
          value={`+${metrics.precipitation}%`}
          description={`${selectedRegion} change by ${selectedYear}`}
        />
        <MetricCard
          icon={Waves}
          title="Sea Level Rise"
          value={`+${metrics.seaLevel}cm`}
          description={`${selectedRegion} rise by ${selectedYear}`}
        />
        <MetricCard
          icon={AlertTriangle}
          title="Extreme Events"
          value={`+${metrics.extremeEvents}%`}
          description={`${selectedRegion} increase by ${selectedYear}`}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Historical and Projected Temperature</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Temperature Deviation (°C)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4 }}
                name={`${selectedRegion} Temperature Change`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Global Climate Impact Visualization</h2>
        <p className="text-gray-600 mb-6">
          Interactive 3D globe visualization showing climate impacts for {selectedRegion}. 
          Colors indicate temperature changes: red ({'>'}2°C), orange (1-2°C), and green ({'<'}1°C).
          The highlighted area shows the selected region's boundaries.
        </p>
        <div className="h-[600px] relative">
          <ClimateGlobe selectedRegion={selectedRegion} metrics={metrics} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactCard
          level="Low Impact"
          description="Regions with minimal climate change effects, requiring standard adaptation measures."
          color="border-green-200 bg-green-50"
        />
        <ImpactCard
          level="Moderate Impact"
          description="Areas experiencing notable changes, requiring significant adaptation strategies."
          color="border-yellow-200 bg-yellow-50"
        />
        <ImpactCard
          level="Severe Impact"
          description="Zones facing critical climate challenges, demanding immediate intervention."
          color="border-red-200 bg-red-50"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">AI Prediction Analysis</h2>
          <div className="text-sm text-gray-600">Confidence Level: 85%</div>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Findings for {selectedRegion}</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Temperature rise accelerating in urban areas</li>
              <li>Coastal regions face increased flooding risks</li>
              <li>Shifting precipitation patterns affect agriculture</li>
              <li>Biodiversity impacts in sensitive ecosystems</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>
    </div>
  );
}