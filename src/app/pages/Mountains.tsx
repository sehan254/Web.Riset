import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Mountain, MapPin, TrendingUp, Clock, Filter, Search, ChevronRight, Star } from "lucide-react";
import { mountains, getDifficultyColor, getDifficultyStars } from "../data/mountains";

const difficulties = ["Semua", "Mudah", "Sedang", "Sulit", "Sangat Sulit"];
const provinces = ["Semua Provinsi", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Nusa Tenggara Barat", "Jambi / Sumatera Barat"];

export default function Mountains() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Semua");
  const [selectedProvince, setSelectedProvince] = useState("Semua Provinsi");

  const filtered = mountains.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.province.toLowerCase().includes(search.toLowerCase()) ||
      m.nationalPark.toLowerCase().includes(search.toLowerCase());
    const matchDiff = selectedDifficulty === "Semua" || m.difficulty === selectedDifficulty;
    const matchProv = selectedProvince === "Semua Provinsi" || m.province.includes(selectedProvince.replace(" / Sumatera Barat", ""));
    return matchSearch && matchDiff && matchProv;
  });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-orange-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Mountain className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h1 className="text-5xl font-bold text-white mb-4">Gunung di Indonesia</h1>
            <p className="text-orange-200 text-xl max-w-2xl mx-auto">
              Jelajahi 8 gunung pilihan di kawasan taman nasional Indonesia dengan informasi lengkap dan detail.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari gunung, provinsi, taman nasional..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-stone-50"
              />
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500" />
              {/* Difficulty Filter */}
              <div className="flex flex-wrap gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedDifficulty === d
                        ? "bg-orange-800 text-white"
                        : "bg-stone-100 text-gray-600 hover:bg-stone-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mountain Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-orange-800">{filtered.length}</span> gunung
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Gunung tidak ditemukan</h3>
            <p className="text-gray-400">Coba ubah filter pencarian Anda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((mountain, i) => (
              <motion.div
                key={mountain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/mountains/${mountain.id}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300 group h-full"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={mountain.image}
                      alt={mountain.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getDifficultyColor(mountain.difficulty)}`}>
                          {mountain.difficulty}
                        </span>
                        <div className="flex">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <Star
                              key={j}
                              className="w-3.5 h-3.5"
                              fill={j < getDifficultyStars(mountain.difficulty) ? "#fbbf24" : "transparent"}
                              stroke={j < getDifficultyStars(mountain.difficulty) ? "#fbbf24" : "#fff"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-700 transition-colors">
                      {mountain.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" />
                      {mountain.province}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mountain.description}</p>

                    <div className="border-t border-stone-100 pt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-orange-700 font-semibold">
                          <TrendingUp className="w-4 h-4" />
                          {mountain.elevation.toLocaleString()} mdpl
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          {mountain.estimatedTime}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{mountain.nationalPark}</div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{mountain.trails.length} jalur pendakian</span>
                      <span className="text-orange-600 text-sm flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                        Detail <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
