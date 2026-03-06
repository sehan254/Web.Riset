import { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import { motion } from "motion/react";
import {
  Mountain, MapPin, TrendingUp, Clock, CloudSun,
  Droplets, Wind, Thermometer, ChevronRight, Star,
  Droplet, Tent, ArrowLeft, Brain, Map, Info,
  TreePine, Leaf, AlertCircle, Calendar, Navigation
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { mountains, getDifficultyColor } from "../data/mountains";

const weatherData = [
  { time: "00:00", temp: 8, humidity: 85, wind: 15 },
  { time: "03:00", temp: 6, humidity: 90, wind: 18 },
  { time: "06:00", temp: 5, humidity: 92, wind: 12 },
  { time: "09:00", temp: 12, humidity: 78, wind: 20 },
  { time: "12:00", temp: 18, humidity: 65, wind: 25 },
  { time: "15:00", temp: 16, humidity: 70, wind: 22 },
  { time: "18:00", temp: 12, humidity: 80, wind: 18 },
  { time: "21:00", temp: 9, humidity: 88, wind: 14 },
];

type TabType = "info" | "trails" | "weather" | "map";

export default function MountainDetail() {
  const { id } = useParams();
  const mountain = mountains.find((m) => m.id === id);
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [selectedTrail, setSelectedTrail] = useState(0);

  if (!mountain) return <Navigate to="/mountains" />;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "info", label: "Informasi", icon: <Info className="w-4 h-4" /> },
    { id: "trails", label: "Jalur Pendakian", icon: <Navigation className="w-4 h-4" /> },
    { id: "weather", label: "Cuaca", icon: <CloudSun className="w-4 h-4" /> },
    { id: "map", label: "Peta", icon: <Map className="w-4 h-4" /> },
  ];

  const trail = mountain.trails[selectedTrail];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={mountain.image} alt={mountain.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="max-w-7xl mx-auto w-full">
            <Link to="/mountains" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Gunung
            </Link>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getDifficultyColor(mountain.difficulty)}`}>
                    {mountain.difficulty}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill={i < (mountain.difficulty === "Mudah" ? 1 : mountain.difficulty === "Sedang" ? 2 : mountain.difficulty === "Sulit" ? 3 : 4) ? "#fbbf24" : "transparent"} stroke="#fbbf24" />
                    ))}
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{mountain.name}</h1>
                <div className="flex items-center gap-4 text-orange-200 text-sm flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{mountain.province}</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" />{mountain.elevation.toLocaleString()} mdpl</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{mountain.estimatedTime}</span>
                </div>
              </div>
              <Link
                to="/ai-advisor"
                className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-lg"
              >
                <Brain className="w-5 h-5" />
                Analisis Kesiapan AI
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-orange-700">
            {[
              { label: "Ketinggian", value: `${mountain.elevation.toLocaleString()} mdpl`, icon: <TrendingUp className="w-4 h-4" /> },
              { label: "Estimasi Waktu", value: mountain.estimatedTime, icon: <Clock className="w-4 h-4" /> },
              { label: "Musim Terbaik", value: mountain.bestSeason, icon: <Calendar className="w-4 h-4" /> },
              { label: "Jalur Tersedia", value: `${mountain.trails.length} Jalur`, icon: <Navigation className="w-4 h-4" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4">
                <div className="text-orange-400">{item.icon}</div>
                <div>
                  <div className="text-green-300 text-xs">{item.label}</div>
                  <div className="text-white font-semibold text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-orange-600 text-orange-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Info Tab */}
        {activeTab === "info" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang {mountain.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{mountain.longDescription}</p>
                <div className="bg-stone-50 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">
                    Pendakian ke <strong>{mountain.name}</strong> memerlukan izin resmi dari pengelola {mountain.nationalPark}.
                    Pastikan untuk mendaftar di pos registrasi sebelum memulai pendakian.
                  </p>
                </div>
              </div>

              {/* Flora & Fauna */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-5 h-5 text-orange-600" />
                    <h3 className="font-bold text-gray-900">Flora</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mountain.flora.map((f, i) => (
                      <span key={i} className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full border border-orange-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <div className="flex items-center gap-2 mb-4">
                    <TreePine className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-gray-900">Fauna</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mountain.fauna.map((f, i) => (
                      <span key={i} className="bg-amber-50 text-amber-700 text-sm px-3 py-1 rounded-full border border-amber-200">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vegetation Zones */}
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h3 className="font-bold text-gray-900 mb-4">Zona Vegetasi</h3>
                <div className="space-y-3">
                  {mountain.vegetationZones.map((zone, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${i === 0 ? "bg-orange-400" : i === 1 ? "bg-orange-600" : "bg-orange-800"}`} />
                      <span className="text-gray-700 text-sm">{zone}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-4 rounded-full overflow-hidden flex">
                  <div className="flex-1 bg-orange-400" />
                  <div className="flex-1 bg-orange-600" />
                  <div className="flex-1 bg-orange-800" />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Bawah</span>
                  <span>Menengah</span>
                  <span>Puncak</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h3 className="font-bold text-gray-900 mb-4">Informasi Umum</h3>
                <dl className="space-y-3">
                  {[
                    { label: "Lokasi", value: mountain.location },
                    { label: "Provinsi", value: mountain.province },
                    { label: "Taman Nasional", value: mountain.nationalPark },
                    { label: "Ketinggian", value: `${mountain.elevation.toLocaleString()} mdpl` },
                    { label: "Tingkat Kesulitan", value: mountain.difficulty },
                    { label: "Estimasi Waktu", value: mountain.estimatedTime },
                    { label: "Musim Terbaik", value: mountain.bestSeason },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <dt className="text-xs text-gray-400">{item.label}</dt>
                      <dd className="text-gray-800 text-sm font-medium">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="bg-gradient-to-br from-orange-800 to-orange-700 rounded-2xl p-6 text-white">
                <Brain className="w-8 h-8 text-orange-300 mb-3" />
                <h3 className="font-bold text-white mb-2">Cek Kesiapan Anda</h3>
                <p className="text-orange-200 text-sm mb-4">
                  Gunakan AI Advisor untuk mengetahui apakah Anda siap mendaki {mountain.name}.
                </p>
                <Link
                  to="/ai-advisor"
                  className="block bg-white text-orange-800 text-center py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-colors"
                >
                  Mulai Analisis AI
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trails Tab */}
        {activeTab === "trails" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Trail Selector */}
            <div className="flex gap-3 flex-wrap">
              {mountain.trails.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrail(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTrail === i
                      ? "bg-orange-800 text-white"
                      : "bg-white border border-stone-300 text-gray-600 hover:border-orange-500"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Trail Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Trail Stats */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{trail.name}</h2>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                        <MapPin className="w-4 h-4" />{trail.basecamp}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(trail.difficulty)}`}>
                      {trail.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Panjang Jalur", value: `${trail.length} km`, icon: "📏" },
                      { label: "Elevasi", value: `${trail.elevationGain.toLocaleString()} m`, icon: "⛰️" },
                      { label: "Est. Waktu", value: trail.estimatedTime, icon: "⏱️" },
                      { label: "Jumlah Pos", value: `${trail.posts.length} Pos`, icon: "📍" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-stone-50 rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="font-bold text-gray-900 text-sm">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elevation Chart */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200">
                  <h3 className="font-bold text-gray-900 mb-4">Profil Elevasi</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={trail.posts.map((p) => ({ name: p.name.replace("Basecamp ", "").replace("Pos ", "P"), elevation: p.elevation }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} domain={["auto", "auto"]} unit="m" />
                      <Tooltip formatter={(v) => [`${v} mdpl`, "Elevasi"]} />
                      <Area type="monotone" dataKey="elevation" stroke="#16a34a" fill="#bbf7d0" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Pos List */}
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h3 className="font-bold text-gray-900">Rute Pos Pendakian</h3>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {trail.posts.map((post, i) => (
                      <div key={i} className="p-5 flex gap-4">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                            i === 0 ? "bg-orange-100 text-orange-700" :
                            i === trail.posts.length - 1 ? "bg-yellow-100 text-yellow-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>
                            {i === 0 ? "🏕️" : i === trail.posts.length - 1 ? "🏔️" : i}
                          </div>
                          {i < trail.posts.length - 1 && (
                            <div className="w-0.5 h-8 bg-stone-200 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{post.name}</h4>
                              <p className="text-gray-500 text-sm mt-0.5">{post.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-orange-700 font-semibold text-sm">{post.elevation.toLocaleString()} mdpl</div>
                              {i > 0 && (
                                <div className="text-gray-400 text-xs">{post.distanceFromPrev} km · {post.timeFromPrev} jam</div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-3 mt-2">
                            {post.hasWater && (
                              <span className="flex items-center gap-1 text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-full">
                                <Droplet className="w-3 h-3" /> Sumber Air
                              </span>
                            )}
                            {post.hasCamping && (
                              <span className="flex items-center gap-1 text-orange-600 text-xs bg-orange-50 px-2 py-0.5 rounded-full">
                                <Tent className="w-3 h-3" /> Area Berkemah
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trail Sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-stone-200">
                  <h4 className="font-bold text-gray-900 mb-3">Fasilitas Jalur</h4>
                  <div className="space-y-2">
                    {[
                      { label: "Pos dengan Air", count: trail.posts.filter(p => p.hasWater).length, icon: <Droplet className="w-4 h-4 text-blue-500" />, color: "text-blue-600" },
                      { label: "Area Berkemah", count: trail.posts.filter(p => p.hasCamping).length, icon: <Tent className="w-4 h-4 text-orange-500" />, color: "text-orange-600" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                        <div className="flex items-center gap-2">{item.icon}<span className="text-gray-600 text-sm">{item.label}</span></div>
                        <span className={`font-bold ${item.color}`}>{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                  <h4 className="font-bold text-amber-900 mb-2">⚠️ Perhatian</h4>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    Selalu bawa perbekalan air yang cukup. Air dari sumber alami harus dimurnikan terlebih dahulu sebelum diminum.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Weather Tab */}
        {activeTab === "weather" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Current Weather */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Suhu", value: "12°C", sub: "Terasa seperti 9°C", icon: <Thermometer className="w-8 h-8 text-orange-500" />, bg: "bg-orange-50 border-orange-200" },
                { label: "Kelembaban", value: "78%", sub: "Cukup lembab", icon: <Droplets className="w-8 h-8 text-blue-500" />, bg: "bg-blue-50 border-blue-200" },
                { label: "Kec. Angin", value: "22 km/h", sub: "Arah: Barat Daya", icon: <Wind className="w-8 h-8 text-cyan-500" />, bg: "bg-cyan-50 border-cyan-200" },
                { label: "Kondisi", value: "Berawan", sub: "Potensi hujan 40%", icon: <CloudSun className="w-8 h-8 text-gray-500" />, bg: "bg-gray-50 border-gray-200" },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl p-5 border ${item.bg}`}>
                  <div className="mb-2">{item.icon}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.sub}</div>
                </div>
              ))}
            </div>

            {/* Temperature Chart */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <h3 className="font-bold text-gray-900 mb-4">Prediksi Suhu 24 Jam</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="°C" />
                  <Tooltip formatter={(v) => [`${v}°C`, "Suhu"]} />
                  <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Wind & Humidity Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h3 className="font-bold text-gray-900 mb-4">Kelembaban (%)</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} domain={[50, 100]} unit="%" />
                    <Tooltip formatter={(v) => [`${v}%`, "Kelembaban"]} />
                    <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="#bfdbfe" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200">
                <h3 className="font-bold text-gray-900 mb-4">Kecepatan Angin (km/h)</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} unit="" />
                    <Tooltip formatter={(v) => [`${v} km/h`, "Angin"]} />
                    <Line type="monotone" dataKey="wind" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <CloudSun className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 text-sm">
                Data cuaca bersumber dari <strong>BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</strong>. Diperbarui setiap jam. Kondisi cuaca aktual di pegunungan dapat berubah dengan cepat — selalu pantau cuaca sebelum dan selama pendakian.
              </p>
            </div>
          </motion.div>
        )}

        {/* Map Tab */}
        {activeTab === "map" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h2 className="font-bold text-gray-900">Peta Jalur Pendakian {mountain.name}</h2>
                <p className="text-gray-500 text-sm mt-1">Visualisasi jalur dan pos-pos pendakian</p>
              </div>
              {/* Interactive Map Visualization */}
              <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-teal-100 h-96 overflow-hidden">
                {/* Terrain Background */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 400">
                  <path d="M0,300 Q100,200 200,250 Q300,100 400,150 Q500,50 600,80 Q700,20 800,60 L800,400 L0,400Z" fill="#16a34a" />
                  <path d="M0,350 Q150,280 300,320 Q450,200 600,250 Q700,180 800,200 L800,400 L0,400Z" fill="#15803d" opacity="0.5" />
                </svg>

                {/* Trail Path */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
                  {mountain.trails[selectedTrail]?.posts.map((_, i, arr) => {
                    if (i === arr.length - 1) return null;
                    const x1 = 80 + (i / (arr.length - 1)) * 640;
                    const y1 = 330 - (arr[i].elevation / mountain.elevation) * 250;
                    const x2 = 80 + ((i + 1) / (arr.length - 1)) * 640;
                    const y2 = 330 - (arr[i + 1].elevation / mountain.elevation) * 250;
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#fbbf24" strokeWidth="3" strokeDasharray="8,4" />
                    );
                  })}
                </svg>

                {/* Post Markers */}
                <div className="absolute inset-0">
                  {mountain.trails[selectedTrail]?.posts.map((post, i, arr) => {
                    const left = 80 + (i / (arr.length - 1)) * 640;
                    const top = 330 - (post.elevation / mountain.elevation) * 250;
                    return (
                      <div
                        key={i}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${(left / 800) * 100}%`, top: `${(top / 400) * 100}%` }}
                      >
                        <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm cursor-pointer transition-transform group-hover:scale-125 ${
                          i === 0 ? "bg-orange-500" : i === arr.length - 1 ? "bg-yellow-500" : "bg-blue-500"
                        }`}>
                          {i === 0 ? "🏕️" : i === arr.length - 1 ? "🏔️" : "📍"}
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 whitespace-nowrap">
                          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs border border-stone-200">
                            <div className="font-bold text-gray-900">{post.name}</div>
                            <div className="text-gray-500">{post.elevation.toLocaleString()} mdpl</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl p-3 text-xs">
                  <div className="font-bold text-gray-700 mb-2">Legenda</div>
                  {[
                    { color: "bg-orange-500", label: "Basecamp" },
                    { color: "bg-blue-500", label: "Pos Pendakian" },
                    { color: "bg-yellow-500", label: "Puncak" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Coordinates */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-xl p-3 text-xs text-gray-600">
                  <div className="font-bold mb-1">Koordinat</div>
                  <div>Lat: {mountain.coordinates.lat}</div>
                  <div>Lng: {mountain.coordinates.lng}</div>
                </div>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100">
                <p className="text-xs text-gray-400 text-center">
                  Peta visualisasi jalur pendakian {mountain.name} · Bukan untuk navigasi nyata · Gunakan GPS dan peta topografi resmi
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900">Siap mendaki {mountain.name}?</h3>
            <p className="text-gray-500 text-sm">Cek kesiapan Anda dengan AI Advisor kami</p>
          </div>
          <div className="flex gap-3">
            <Link to="/weather" className="flex items-center gap-2 px-5 py-2.5 border border-stone-300 rounded-xl text-sm font-medium text-gray-700 hover:border-orange-500 transition-colors">
              <CloudSun className="w-4 h-4" /> Cek Cuaca
            </Link>
            <Link to="/ai-advisor" className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-medium hover:bg-orange-700 transition-colors">
              <Brain className="w-4 h-4" /> Analisis AI <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
