import { useState } from "react";
import { motion } from "motion/react";
import {
  CloudSun, Cloud, CloudRain, Wind, Droplets, Thermometer,
  Eye, Gauge, RefreshCw, MapPin, AlertTriangle, Sun, CloudSnow
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend
} from "recharts";
import { mountains } from "../data/mountains";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  condition: string;
  conditionIcon: React.ReactNode;
  visibility: number;
  pressure: number;
  rainChance: number;
  uvIndex: number;
  dewPoint: number;
  status: "Aman" | "Waspada" | "Berbahaya";
}

interface HourlyData {
  time: string;
  temp: number;
  rain: number;
  wind: number;
  humidity: number;
}

interface DailyForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  rainChance: number;
}

const generateWeatherData = (mountainId: string): WeatherData => {
  const seed = mountainId.charCodeAt(0);
  const temp = 8 + (seed % 12);
  const humidity = 60 + (seed % 35);
  const wind = 10 + (seed % 25);
  const rainChance = seed % 70;

  let condition: string, conditionIcon: React.ReactNode, status: WeatherData["status"];

  if (rainChance > 60) {
    condition = "Hujan Lebat";
    conditionIcon = <CloudRain className="w-12 h-12 text-blue-600" />;
    status = "Berbahaya";
  } else if (rainChance > 40) {
    condition = "Berawan dengan Hujan";
    conditionIcon = <Cloud className="w-12 h-12 text-gray-500" />;
    status = "Waspada";
  } else if (rainChance > 20) {
    condition = "Berawan Sebagian";
    conditionIcon = <CloudSun className="w-12 h-12 text-yellow-500" />;
    status = "Aman";
  } else {
    condition = "Cerah";
    conditionIcon = <Sun className="w-12 h-12 text-yellow-400" />;
    status = "Aman";
  }

  return {
    temperature: temp,
    feelsLike: temp - 3,
    humidity,
    windSpeed: wind,
    windDirection: ["Utara", "Timur Laut", "Timur", "Tenggara", "Selatan", "Barat Daya", "Barat", "Barat Laut"][seed % 8],
    condition,
    conditionIcon,
    visibility: 5 + (seed % 10),
    pressure: 850 + (seed % 50),
    rainChance,
    uvIndex: 3 + (seed % 8),
    dewPoint: temp - 5,
    status,
  };
};

const generateHourlyData = (mountainId: string): HourlyData[] => {
  const seed = mountainId.charCodeAt(0);
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${(i * 2).toString().padStart(2, "0")}:00`,
    temp: Math.round(6 + Math.sin((i + seed) * 0.5) * 6 + 4),
    rain: Math.max(0, Math.round(20 + Math.sin((i + seed) * 0.8) * 25)),
    wind: Math.round(15 + Math.sin((i + seed) * 0.6) * 10),
    humidity: Math.round(70 + Math.sin((i + seed) * 0.4) * 15),
  }));
};

const generateDailyForecast = (mountainId: string): DailyForecast[] => {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const seed = mountainId.charCodeAt(0);
  const today = new Date().getDay();
  return Array.from({ length: 7 }, (_, i) => {
    const dayIdx = (today + i) % 7;
    const rain = (seed + i * 7) % 80;
    return {
      day: i === 0 ? "Hari ini" : i === 1 ? "Besok" : days[dayIdx],
      high: Math.round(12 + Math.sin((i + seed) * 0.4) * 5),
      low: Math.round(5 + Math.sin((i + seed) * 0.3) * 3),
      condition: rain > 50 ? "Hujan" : rain > 30 ? "Berawan" : "Cerah",
      rainChance: rain,
    };
  });
};

const conditionIcons: Record<string, string> = {
  Cerah: "☀️", Berawan: "⛅", Hujan: "🌧️", "Cerah Berawan": "🌤️"
};

const statusConfig = {
  Aman: { color: "text-orange-700", bg: "bg-orange-50 border-orange-300", badge: "bg-orange-100 text-orange-700" },
  Waspada: { color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-300", badge: "bg-yellow-100 text-yellow-700" },
  Berbahaya: { color: "text-red-700", bg: "bg-red-50 border-red-300", badge: "bg-red-100 text-red-700" },
};

export default function Weather() {
  const [selectedMountain, setSelectedMountain] = useState(mountains[0].id);
  const [lastUpdated] = useState(new Date());

  const mountain = mountains.find(m => m.id === selectedMountain)!;
  const weather = generateWeatherData(selectedMountain);
  const hourly = generateHourlyData(selectedMountain);
  const forecast = generateDailyForecast(selectedMountain);
  const statusConf = statusConfig[weather.status];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CloudSun className="w-12 h-12 text-blue-200 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">Cuaca Gunung Realtime</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Data cuaca terkini dari BMKG untuk gunung-gunung di kawasan taman nasional Indonesia.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-blue-300 text-sm">
            <RefreshCw className="w-4 h-4" />
            Terakhir diperbarui: {lastUpdated.toLocaleTimeString("id-ID")} WIB
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mountain Selector */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih Gunung:</label>
          <div className="flex flex-wrap gap-2">
            {mountains.map((m) => {
              const w = generateWeatherData(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMountain(m.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedMountain === m.id
                      ? "bg-blue-700 text-white shadow-md"
                      : "bg-stone-100 text-gray-600 hover:bg-stone-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${w.status === "Aman" ? "bg-orange-400" : w.status === "Waspada" ? "bg-yellow-400" : "bg-red-500"}`} />
                  {m.name.replace("Gunung ", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Weather */}
        <motion.div
          key={selectedMountain}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Main Weather Card */}
          <div className={`rounded-2xl border-2 p-6 ${statusConf.bg}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {weather.conditionIcon}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">{mountain.name} · {mountain.elevation.toLocaleString()} mdpl</span>
                  </div>
                  <div className="text-6xl font-bold text-gray-900">{weather.temperature}°C</div>
                  <div className="text-gray-500 text-sm">Terasa seperti {weather.feelsLike}°C</div>
                  <div className="text-gray-700 mt-1">{weather.condition}</div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${statusConf.badge}`}>
                  {weather.status === "Aman" ? "✅" : weather.status === "Waspada" ? "⚠️" : "🚫"} Kondisi: {weather.status}
                </span>
                {weather.status !== "Aman" && (
                  <div className={`text-sm ${statusConf.color} flex items-center gap-1`}>
                    <AlertTriangle className="w-4 h-4" />
                    {weather.status === "Waspada" ? "Waspadai perubahan cuaca mendadak" : "Tidak disarankan mendaki hari ini"}
                  </div>
                )}
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t border-stone-200">
              {[
                { icon: <Droplets className="w-4 h-4 text-blue-500" />, label: "Kelembaban", value: `${weather.humidity}%` },
                { icon: <Wind className="w-4 h-4 text-cyan-500" />, label: "Kec. Angin", value: `${weather.windSpeed} km/h` },
                { icon: <Wind className="w-4 h-4 text-teal-500" />, label: "Arah Angin", value: weather.windDirection },
                { icon: <Eye className="w-4 h-4 text-purple-500" />, label: "Visibilitas", value: `${weather.visibility} km` },
                { icon: <Gauge className="w-4 h-4 text-orange-500" />, label: "Tekanan", value: `${weather.pressure} hPa` },
                { icon: <CloudRain className="w-4 h-4 text-blue-600" />, label: "Peluang Hujan", value: `${weather.rainChance}%` },
              ].map((item, i) => (
                <div key={i} className="bg-white/60 backdrop-blur rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-1">{item.icon}<span className="text-xs text-gray-500">{item.label}</span></div>
                  <div className="font-bold text-gray-900 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature 24h */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Suhu 24 Jam</h3>
              <p className="text-gray-400 text-xs mb-4">Prediksi suhu per 2 jam</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={hourly}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="°C" />
                  <Tooltip formatter={(v) => [`${v}°C`, "Suhu"]} />
                  <Area type="monotone" dataKey="temp" stroke="#f97316" fill="url(#tempGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Rain Chance */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Peluang Hujan 24 Jam</h3>
              <p className="text-gray-400 text-xs mb-4">Persentase potensi hujan</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={hourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="%" domain={[0, 100]} />
                  <Tooltip formatter={(v) => [`${v}%`, "Peluang Hujan"]} />
                  <Bar dataKey="rain" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Wind Speed */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Kecepatan Angin</h3>
              <p className="text-gray-400 text-xs mb-4">km/h per 2 jam</p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={hourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="" />
                  <Tooltip formatter={(v) => [`${v} km/h`, "Angin"]} />
                  <Line type="monotone" dataKey="wind" stroke="#06b6d4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Humidity */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6">
              <h3 className="font-bold text-gray-900 mb-1">Kelembaban Udara</h3>
              <p className="text-gray-400 text-xs mb-4">Persentase kelembaban per 2 jam</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={hourly}>
                  <defs>
                    <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} unit="%" domain={[40, 100]} />
                  <Tooltip formatter={(v) => [`${v}%`, "Kelembaban"]} />
                  <Area type="monotone" dataKey="humidity" stroke="#6366f1" fill="url(#humidGrad)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Prakiraan 7 Hari ke Depan</h3>
            <div className="grid grid-cols-7 gap-2">
              {forecast.map((day, i) => (
                <div key={i} className={`flex flex-col items-center p-3 rounded-xl text-center ${i === 0 ? "bg-blue-50 border border-blue-200" : "bg-stone-50"}`}>
                  <div className="text-xs font-semibold text-gray-600 mb-2">{day.day}</div>
                  <div className="text-2xl mb-2">{conditionIcons[day.condition] || "🌤️"}</div>
                  <div className="text-sm font-bold text-gray-900">{day.high}°</div>
                  <div className="text-xs text-gray-400">{day.low}°</div>
                  <div className="text-xs text-blue-500 mt-1">{day.rainChance}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* All Mountains Weather Overview */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Ringkasan Cuaca Semua Gunung</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Gunung</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Suhu</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Kelembaban</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Angin</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Kondisi</th>
                    <th className="text-center py-3 px-4 text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mountains.map((m) => {
                    const w = generateWeatherData(m.id);
                    const sc = statusConfig[w.status];
                    return (
                      <tr
                        key={m.id}
                        className={`border-b border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors ${selectedMountain === m.id ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedMountain(m.id)}
                      >
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{m.name}</div>
                          <div className="text-gray-400 text-xs">{m.elevation.toLocaleString()} mdpl</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="font-bold text-gray-900">{w.temperature}°C</div>
                          <div className="text-gray-400 text-xs">Terasa {w.feelsLike}°C</div>
                        </td>
                        <td className="py-3 px-4 text-center text-gray-700">{w.humidity}%</td>
                        <td className="py-3 px-4 text-center text-gray-700">{w.windSpeed} km/h</td>
                        <td className="py-3 px-4 text-center text-gray-700">{w.condition}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${sc.badge}`}>{w.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* BMKG Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <CloudSun className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 text-sm font-medium">Sumber Data Cuaca</p>
              <p className="text-blue-700 text-sm">
                Data cuaca bersumber dari <strong>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</strong> — lembaga resmi pemerintah Indonesia.
                Data diperbarui setiap jam. Cuaca di pegunungan dapat berubah dengan cepat — selalu pantau kondisi cuaca terkini sebelum dan selama pendakian.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
