import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Mountain,
  CloudSun,
  Brain,
  BookOpen,
  ChevronRight,
  Shield,
  MapPin,
  Clock,
  TrendingUp,
  Star,
  AlertTriangle,
  Users,
  Award,
  Compass,
} from "lucide-react";
import { mountains, getDifficultyColor } from "../data/mountains";

const HERO_IMAGE = "/hero-bg.jpg";
const GEAR_IMAGE =
  "https://images.unsplash.com/photo-1771849316197-2b1f3f49b651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const WEATHER_IMAGE =
  "https://images.unsplash.com/photo-1570634078213-feda324d7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

const featuredMountains = mountains.slice(0, 4);

const stats = [
  {
    label: "Gunung Terdaftar",
    value: "8",
    icon: <Mountain className="w-6 h-6" />,
  },
  {
    label: "Jalur Pendakian",
    value: "16+",
    icon: <Compass className="w-6 h-6" />,
  },
  {
    label: "Data Cuaca Realtime",
    value: "24/7",
    icon: <CloudSun className="w-6 h-6" />,
  },
  {
    label: "Rekomendasi AI",
    value: "Akurat",
    icon: <Brain className="w-6 h-6" />,
  },
];

const features = [
  {
    icon: <Mountain className="w-8 h-8 text-orange-600" />,
    title: "Informasi Gunung Lengkap",
    description:
      "Data detail 8 gunung di kawasan taman nasional Indonesia, termasuk ekosistem, flora, fauna, dan karakteristik masing-masing gunung.",
    link: "/mountains",
    linkText: "Lihat Semua Gunung",
  },
  {
    icon: <CloudSun className="w-8 h-8 text-blue-500" />,
    title: "Cuaca Realtime BMKG",
    description:
      "Pantau kondisi cuaca gunung secara realtime berdasarkan data resmi BMKG. Suhu, kelembaban, angin, dan prediksi cuaca beberapa jam ke depan.",
    link: "/weather",
    linkText: "Cek Cuaca Sekarang",
  },
  {
    icon: <Brain className="w-8 h-8 text-purple-600" />,
    title: "AI Hiking Advisor",
    description:
      "Sistem kecerdasan buatan yang menganalisis kondisi fisik, riwayat kesehatan, dan kondisi cuaca untuk memberikan rekomendasi pendakian yang dipersonalisasi.",
    link: "/ai-advisor",
    linkText: "Mulai Analisis AI",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-amber-600" />,
    title: "Edukasi Pendakian",
    description:
      "Pelajari teknik pendakian yang aman, manajemen logistik, navigasi alam bebas, penanganan darurat, dan etika pendakian yang bertanggung jawab.",
    link: "/education",
    linkText: "Belajar Sekarang",
  },
];

const safetyTips = [
  {
    icon: <Shield />,
    text: "Selalu daftarkan diri di pos registrasi basecamp",
  },
  {
    icon: <CloudSun />,
    text: "Periksa kondisi cuaca sebelum memulai pendakian",
  },
  {
    icon: <AlertTriangle />,
    text: "Jangan mendaki sendirian, selalu bawa tim",
  },
  { icon: <Award />, text: "Bawa perlengkapan P3K dan survival yang lengkap" },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-orange-300" />
              <span className="text-orange-200 text-sm">
                Didukung Artificial Intelligence & Data BMKG
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Daki Lebih Aman
              <br />
              <span className="text-orange-400">Dengan Teknologi AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Platform edukasi dan sistem rekomendasi pendakian gunung berbasis
              kecerdasan buatan dan data cuaca realtime BMKG untuk pendaki
              Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-advisor"
                className="bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-900/40"
              >
                <Brain className="w-5 h-5" />
                Mulai Analisis AI Saya
              </Link>
              <Link
                to="/mountains"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <Mountain className="w-5 h-5" />
                Jelajahi Gunung
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
              >
                <div className="text-orange-300 flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-orange-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-orange-900 mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk merencanakan pendakian yang aman
              dan berkesan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Link
                  to={feature.link}
                  className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium group-hover:gap-2 transition-all"
                >
                  {feature.linkText}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mountains */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-orange-900 mb-2">
                Gunung Pilihan
              </h2>
              <p className="text-gray-600">
                Destinasi pendakian populer di Indonesia
              </p>
            </div>
            <Link
              to="/mountains"
              className="hidden sm:flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMountains.map((mountain, i) => (
              <motion.div
                key={mountain.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/mountains/${mountain.id}`}
                  className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group bg-white"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={mountain.image}
                      alt={mountain.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(mountain.difficulty)}`}
                      >
                        {mountain.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">
                      {mountain.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {mountain.province}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-orange-600 font-semibold text-sm">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {mountain.elevation.toLocaleString()} mdpl
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {mountain.estimatedTime}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/mountains"
              className="inline-flex items-center gap-1 text-orange-600 font-medium"
            >
              Lihat Semua Gunung <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Advisor CTA */}
      <section className="py-24 bg-gradient-to-br from-orange-800 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Brain className="w-4 h-4 text-orange-300" />
                <span className="text-orange-200 text-sm">
                  AI Hiking Advisor
                </span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Apakah Anda Siap
                <br />
                Mendaki Gunung?
              </h2>
              <p className="text-orange-100 text-lg mb-8 leading-relaxed">
                Sistem AI kami akan menganalisis kondisi fisik, riwayat
                kesehatan, dan pengalaman Anda, kemudian mencocokkannya dengan
                kondisi cuaca dan tingkat kesulitan jalur untuk memberikan
                rekomendasi yang tepat.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Analisis tingkat kesiapan fisik pendaki",
                  "Rekomendasi jalur berdasarkan kemampuan",
                  "Evaluasi risiko kesehatan personal",
                  "Saran perlengkapan yang diperlukan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-3 h-3 text-white" fill="white" />
                    </div>
                    <span className="text-orange-100">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/ai-advisor"
                className="inline-flex items-center gap-2 bg-white text-orange-800 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors"
              >
                <Brain className="w-5 h-5" />
                Mulai Analisis Gratis
              </Link>
            </div>
            <div className="relative">
              <img
                src={GEAR_IMAGE}
                alt="Hiking gear"
                className="rounded-2xl shadow-2xl w-full object-cover h-80 lg:h-96"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      Analisis Aman & Akurat
                    </div>
                    <div className="text-gray-500 text-xs">
                      Berbasis data BMKG + AI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src={WEATHER_IMAGE}
                alt="Mountain weather"
                className="rounded-2xl shadow-xl w-full object-cover h-72 lg:h-96"
              />
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-xl p-4 shadow-lg">
                <CloudSun className="w-8 h-8 mb-1" />
                <div className="text-sm font-bold">Data BMKG</div>
                <div className="text-xs opacity-80">Diperbarui setiap jam</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
                <CloudSun className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 text-sm">Cuaca Realtime</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pantau Cuaca Gunung
                <br />
                Sebelum Mendaki
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Data cuaca realtime dari BMKG (Badan Meteorologi, Klimatologi,
                dan Geofisika) memastikan Anda mendapatkan informasi cuaca yang
                akurat dan terpercaya sebelum memulai pendakian.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Suhu Udara", icon: "🌡️" },
                  { label: "Kelembaban", icon: "💧" },
                  { label: "Kecepatan Angin", icon: "💨" },
                  { label: "Prediksi Hujan", icon: "🌧️" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-stone-50 rounded-xl p-3 flex items-center gap-3"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to="/weather"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                <CloudSun className="w-5 h-5" />
                Cek Cuaca Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-amber-100 rounded-lg p-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900">
              Tips Keselamatan Pendakian
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {safetyTips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-4 border border-amber-100"
              >
                <div className="text-amber-500 mt-0.5 flex-shrink-0">
                  {tip.icon}
                </div>
                <p className="text-gray-700 text-sm">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Preview */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-orange-900 mb-4">
            Tingkatkan Pengetahuan Pendakian
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Pelajari teknik pendakian yang aman dan bertanggung jawab melalui
            materi edukasi lengkap kami.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
            {[
              { emoji: "🏋️", label: "Persiapan Fisik" },
              { emoji: "🎒", label: "Manajemen Logistik" },
              { emoji: "🧭", label: "Navigasi Alam" },
              { emoji: "🚨", label: "Penanganan Darurat" },
              { emoji: "🩺", label: "Pertolongan Pertama" },
              { emoji: "🌿", label: "Etika Konservasi" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 border border-stone-200 flex items-center gap-3"
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-gray-700 font-medium text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/education"
            className="inline-flex items-center gap-2 bg-orange-800 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            Mulai Belajar
          </Link>
        </div>
      </section>

      {/* Users CTA */}
      <section className="py-16 bg-orange-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Bergabung dengan Komunitas Pendaki Indonesia
          </h2>
          <p className="text-orange-200 text-lg mb-8">
            Rencanakan pendakian Anda dengan lebih aman, terstruktur, dan
            berbasis data. Gunakan AI Advisor kami sekarang!
          </p>
          <Link
            to="/ai-advisor"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            <Brain className="w-6 h-6" />
            Cek Kesiapan Saya
          </Link>
        </div>
      </section>
    </div>
  );
}
