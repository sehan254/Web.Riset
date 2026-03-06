import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen, ChevronRight, Search, Clock, User,
  Activity, Package, Compass, AlertTriangle, Heart,
  Leaf, Shield, Zap, Mountain, CheckCircle, X
} from "lucide-react";

const GEAR_IMAGE = "https://images.unsplash.com/photo-1771849316197-2b1f3f49b651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const FIRST_AID_IMAGE = "https://images.unsplash.com/photo-1740383235295-8c8e1eefe46b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";
const NATURE_IMAGE = "https://images.unsplash.com/photo-1763380265398-ded34d778f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800";

interface Article {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  summary: string;
  readTime: string;
  icon: React.ReactNode;
  image?: string;
  content: {
    heading: string;
    body: string;
    tips?: string[];
  }[];
}

const categories = ["Semua", "Persiapan Fisik", "Logistik", "Navigasi", "Kedaruratan", "Kesehatan", "Etika & Konservasi"];

const articles: Article[] = [
  {
    id: "physical-prep",
    category: "Persiapan Fisik",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Panduan Persiapan Fisik Sebelum Mendaki Gunung",
    summary: "Latihan fisik yang tepat dapat mengurangi risiko kelelahan, cedera, dan altitude sickness selama pendakian. Pelajari program latihan 8 minggu untuk mempersiapkan diri.",
    readTime: "8 menit",
    icon: <Activity className="w-6 h-6 text-emerald-600" />,
    image: GEAR_IMAGE,
    content: [
      {
        heading: "Mengapa Persiapan Fisik Sangat Penting?",
        body: "Pendakian gunung adalah aktivitas fisik intensif yang menggabungkan kardiovaskular, kekuatan otot, dan daya tahan. Tanpa persiapan yang cukup, pendaki berisiko mengalami kelelahan ekstrem, cedera otot, dan bahkan altitude sickness yang berbahaya.",
        tips: ["Mulai latihan minimal 8 minggu sebelum pendakian", "Fokus pada kombinasi cardio, kekuatan, dan fleksibilitas", "Latih tubuh untuk adaptasi beban (carrier berisi beban)"]
      },
      {
        heading: "Program Latihan 8 Minggu",
        body: "Minggu 1-2: Bangun fondasi cardio dengan jogging 30 menit/hari, 4x seminggu. Minggu 3-4: Tambahkan latihan kekuatan kaki — squat, lunges, step-up. Minggu 5-6: Hiking latihan di bukit atau tangga dengan carrier berisi 10-15 kg. Minggu 7-8: Simulasi pendakian sebenarnya, turunkan intensitas di hari-hari terakhir (tapering).",
        tips: ["Jaga konsistensi latihan lebih penting dari intensitas tinggi sesekali", "Istirahat yang cukup sama pentingnya dengan latihan", "Minum 2-3 liter air per hari selama program latihan"]
      },
      {
        heading: "Latihan Spesifik untuk Pendakian",
        body: "Otot utama yang digunakan saat mendaki adalah paha depan (quadriceps), paha belakang (hamstring), betis (gastrocnemius), dan glutes. Latihan step-up, box jump, dan wall sit sangat efektif mempersiapkan otot ini. Jangan lupa latihan core untuk stabilitas tubuh saat membawa carrier.",
        tips: ["Step-up 3 set × 15 repetisi per kaki", "Wall sit 3 set × 60 detik", "Plank core 3 set × 45 detik"]
      }
    ]
  },
  {
    id: "logistics",
    category: "Logistik",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "Manajemen Logistik Pendakian yang Efektif",
    summary: "Perlengkapan dan perbekalan yang tepat adalah kunci keselamatan pendakian. Pelajari cara mengepak carrier dengan benar dan mengatur logistik untuk multi-day trip.",
    readTime: "10 menit",
    icon: <Package className="w-6 h-6 text-blue-600" />,
    image: GEAR_IMAGE,
    content: [
      {
        heading: "Prinsip 10 Essential Items",
        body: "10 perlengkapan esensial yang wajib selalu dibawa setiap kali mendaki: navigasi, perlindungan matahari, insulasi, penerangan, pertolongan pertama, api/pematik, perbaikan darurat, nutrisi ekstra, hidrasi ekstra, dan shelter darurat. Tidak ada yang boleh ditinggal.",
        tips: ["Perlengkapan navigasi: peta topografi + kompas + GPS", "Perlindungan: sunscreen SPF 50+, kacamata UV400, topi", "Insulasi: jaket berlapis, rain jacket, sarung tangan, kupluk"]
      },
      {
        heading: "Cara Mengepak Carrier yang Benar",
        body: "Susun carrier dengan barang berat di bagian tengah dekat punggung, barang sedang di lapisan berikutnya, dan barang ringan di bagian atas. Sleeping bag dan pakaian cadangan bisa di bagian bawah. Barang yang sering dibutuhkan simpan di kantong samping atau pocket atas.",
        tips: ["Berat ideal carrier: 20-25% dari berat badan Anda", "Waterproof cover bag selalu pasang meski cuaca cerah", "Distribusi berat yang merata mencegah cedera punggung"]
      },
      {
        heading: "Perhitungan Kebutuhan Makanan & Air",
        body: "Untuk pendakian sehari, butuhkan 0.5-1 liter air per jam aktivitas. Multi-day trip membutuhkan 3-4 liter/hari. Kalori yang dibutuhkan: 300-500 kalori per jam pendakian aktif. Pilih makanan berkalori tinggi per gram seperti granola bar, kacang-kacangan, dan dark chocolate.",
        tips: ["Bawa filter air atau purification tablets untuk sumber air gunung", "Makanan tinggi karbohidrat untuk energi cepat saat mendaki", "Protein untuk pemulihan otot saat istirahat/berkemah"]
      }
    ]
  },
  {
    id: "navigation",
    category: "Navigasi",
    categoryColor: "bg-purple-100 text-purple-700",
    title: "Teknik Navigasi di Alam Bebas",
    summary: "Navigasi yang baik adalah keterampilan dasar yang wajib dikuasai setiap pendaki. Pelajari cara membaca peta topografi, menggunakan kompas, dan navigasi dengan GPS.",
    readTime: "12 menit",
    icon: <Compass className="w-6 h-6 text-purple-600" />,
    content: [
      {
        heading: "Membaca Peta Topografi",
        body: "Peta topografi adalah representasi 2D dari medan 3D. Garis kontur menunjukkan elevasi — semakin rapat garis kontur, semakin curam medannya. Garis kontur yang membentuk V ke atas adalah lembah/sungai, V ke bawah adalah punggung bukit. Interval kontur standar peta gunung Indonesia adalah 50 meter.",
        tips: ["Selalu orientasikan peta dengan kompas sebelum membaca", "Identifikasi landmarks nyata yang ada di peta", "Perkirakan waktu tempuh: 1 km di jalan datar = 15-20 menit"]
      },
      {
        heading: "Penggunaan Kompas",
        body: "Kompas menunjuk ke utara magnetis, bukan utara sejati. Perbedaan ini disebut deklinasi magnetis. Di Indonesia, deklinasi sekitar 0.5-2 derajat ke timur. Untuk navigasi dasar: tentukan azimuth (arah) ke tujuan, jaga agar jarum kompas dan angka tujuan sejajar saat berjalan.",
        tips: ["Jauhkan kompas dari logam dan perangkat elektronik", "Periksa orientasi peta setiap beberapa pos atau persimpangan", "Catat bearings landmark penting saat mendaki"]
      },
      {
        heading: "GPS & Aplikasi Digital",
        body: "GPS memberikan koordinat akurat bahkan di kondisi kabut/minim visibilitas. Aplikasi populer seperti Maps.me, Wikiloc, dan OSMAnd dapat digunakan offline. Selalu unduh peta offline sebelum berangkat! Namun ingat: GPS hanyalah alat bantu — baterai bisa habis, sinyal bisa hilang. Selalu bawa peta fisik dan kompas.",
        tips: ["Simpan waypoints penting: basecamp, persimpangan, sumber air", "Isi baterai GPS/HP sampai penuh + bawa powerbank", "Rekam track pendakian sebagai referensi pulang"]
      }
    ]
  },
  {
    id: "emergency",
    category: "Kedaruratan",
    categoryColor: "bg-red-100 text-red-700",
    title: "Penanganan Kondisi Darurat di Gunung",
    summary: "Keadaan darurat dapat terjadi kapan saja. Pelajari cara mengenali dan menangani hipotermia, altitude sickness, tersesat, dan situasi darurat lainnya.",
    readTime: "15 menit",
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    image: FIRST_AID_IMAGE,
    content: [
      {
        heading: "Hipotermia: Kenali dan Tangani",
        body: "Hipotermia terjadi ketika suhu tubuh turun di bawah 35°C. Gejala: menggigil hebat, bicara cadel, koordinasi buruk, kebingungan, hingga kehilangan kesadaran. Suhu gunung bisa turun drastis terutama malam hari atau saat hujan. Basah + dingin + angin = kombinasi mematikan.",
        tips: ["Ganti pakaian basah segera dengan yang kering", "Berikan minuman hangat (bukan alkohol)", "Masukkan korban ke sleeping bag dan berikan panas tubuh", "Evakuasi segera ke fasilitas medis"]
      },
      {
        heading: "Altitude Sickness (AMS)",
        body: "Acute Mountain Sickness terjadi ketika tubuh tidak bisa beradaptasi dengan cepat terhadap udara tipis di ketinggian. Gejala: sakit kepala, mual, pusing, kelelahan berlebih, susah tidur. Biasanya muncul di ketinggian di atas 2.500 mdpl. Faktor risiko: naik terlalu cepat, kurang hidrasi, belum pernah ke ketinggian.",
        tips: ["Aturan emas: naik perlahan, tidur di ketinggian lebih rendah", "Minum air 4-6 liter/hari di ketinggian", "Jika gejala berat, turun segera minimal 500m", "Obat Acetazolamide (Diamox) bisa dikonsumsi atas rekomendasi dokter"]
      },
      {
        heading: "Protokol jika Tersesat",
        body: "STOP: Stop (berhenti), Think (berpikir), Observe (amati sekitar), Plan (rencanakan tindakan). Jangan panik — panik membuat keputusan menjadi buruk. Coba ingat kembali rute terakhir yang benar. Naiki titik tinggi untuk orientasi visual. Ikuti aliran air ke bawah — biasanya mengarah ke pemukiman atau basecamp.",
        tips: ["Tiup peluit 3x berulang = sinyal minta tolong standar", "Nyalakan api/asap jika ada tim SAR mencari", "Hemat baterai HP untuk sinyal darurat", "Selalu beritahu orang lain rencana dan estimasi pulang sebelum mendaki"]
      }
    ]
  },
  {
    id: "first-aid",
    category: "Kesehatan",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Pertolongan Pertama di Alam Bebas (PPAB)",
    summary: "Pengetahuan pertolongan pertama bisa menyelamatkan nyawa di lokasi yang jauh dari fasilitas medis. Pelajari teknik PPAB yang harus dikuasai setiap pendaki.",
    readTime: "12 menit",
    icon: <Heart className="w-6 h-6 text-orange-600" />,
    image: FIRST_AID_IMAGE,
    content: [
      {
        heading: "Isi Kotak P3K Standar Pendakian",
        body: "P3K pendakian harus mencakup: plester luka berbagai ukuran, perban elastis dan kasa steril, antiseptik (betadine dan alkohol), obat penghilang rasa sakit (paracetamol, ibuprofen), obat diare (loperamide), antasin (antihistamin), obat maag, gunting medis, pinset, termometer, dan sarung tangan lateks.",
        tips: ["Sesuaikan obat dengan riwayat penyakit anggota tim", "Cek tanggal kadaluarsa semua obat sebelum berangkat", "Simpan P3K di tempat yang mudah dijangkau, bukan di dasar carrier"]
      },
      {
        heading: "Penanganan Luka di Medan",
        body: "Luka lecet: bersihkan dengan air bersih, oleskan antiseptik, tutup dengan kasa steril. Luka dalam/berdarah: tekan langsung dengan kain bersih 15-20 menit, jangan lepas hingga perdarahan berhenti. Luka bakar: siram air dingin mengalir 20 menit, jangan pecah lepuhan, tutup dengan kasa steril. Selalu pantau tanda infeksi: kemerahan, bengkak, panas, nanah.",
        tips: ["Cuci tangan sebelum menangani luka", "Jangan gunakan alkohol langsung pada luka terbuka", "Dokumentasikan kondisi korban untuk laporan medis"]
      },
      {
        heading: "Teknik Evakuasi Darurat",
        body: "Jika korban tidak dapat berjalan, siapkan tandu darurat dari tiang/bambu dan jaket. Panggil bantuan SAR melalui nomor darurat: SAR Nasional 115, Basarnas. Tentukan titik koordinat GPS untuk memudahkan evakuasi. Jika sinyal HP tidak ada, kirim anggota tim tercepat untuk minta bantuan sementara sebagian tim menemani korban.",
        tips: ["Catat nomor SAR dan Rescue sebelum berangkat", "Posisi recovery: korban tidak sadar tapi bernafas → miringkan", "Jangan pindahkan korban patah tulang leher/punggung sembarangan"]
      }
    ]
  },
  {
    id: "ethics",
    category: "Etika & Konservasi",
    categoryColor: "bg-teal-100 text-teal-700",
    title: "Etika Pendakian dan Konservasi Alam",
    summary: "Mendaki gunung bukan hanya tentang mencapai puncak, tapi juga tentang menjaga kelestarian alam untuk generasi mendatang. Pelajari prinsip Leave No Trace.",
    readTime: "7 menit",
    icon: <Leaf className="w-6 h-6 text-teal-600" />,
    image: NATURE_IMAGE,
    content: [
      {
        heading: "Prinsip Leave No Trace (LNT)",
        body: "Leave No Trace adalah filosofi 7 prinsip untuk meminimalkan dampak manusia terhadap alam: (1) Rencanakan dan persiapkan dengan baik, (2) Berkemah di permukaan yang tahan lama, (3) Buang sampah dengan benar, (4) Jangan ambil apapun dari alam, (5) Minimalkan dampak api unggun, (6) Hormati satwa liar, (7) Pertimbangkan orang lain.",
        tips: ["Bawa kantong sampah dan bawa pulang SEMUA sampah", "Pakai prinsip: take nothing but photos, leave nothing but footprints", "Sampah organik pun sebaiknya dibawa turun, bukan dikubur"]
      },
      {
        heading: "Melindungi Flora dan Fauna",
        body: "Taman nasional adalah kawasan konservasi yang dilindungi undang-undang. Dilarang keras: mengambil/merusak flora, mengganggu satwa liar, membawa hewan peliharaan. Edelweiss Jawa (Anaphalis javanica) adalah tanaman dilindungi yang sangat ikonik — JANGAN dipetik. Bunga ini bisa hidup hingga ratusan tahun dan pertumbuhannya sangat lambat.",
        tips: ["Foto, jangan ambil — kenangan lebih berharga dari bunga yang layu", "Jaga jarak aman dari satwa liar minimal 30 meter", "Laporkan perburuan liar kepada petugas taman nasional"]
      },
      {
        heading: "Etika Terhadap Sesama Pendaki",
        body: "Saling menghormati sesama pengguna jalur adalah bagian dari budaya pendakian yang baik. Pendaki yang naik mendapat hak jalan terlebih dahulu. Suara keras dan musik dilarang untuk menghormati ketenangan alam. Bantu pendaki lain yang mengalami kesulitan. Jangan tinggalkan anggota tim yang kelemahan atau terluka.",
        tips: ["Sapa pendaki lain dengan ramah — solidaritas adalah budaya gunung", "Jangan mengklaim terlalu banyak area camping", "Patuhi peraturan dan jam operasional taman nasional"]
      }
    ]
  },
];

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = articles.filter(a => {
    const matchCat = selectedCategory === "Semua" || a.category === selectedCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <X className="w-4 h-4" /> Kembali ke Daftar Artikel
          </button>

          {selectedArticle.image && (
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md"
            />
          )}

          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold mb-4 ${selectedArticle.categoryColor}`}>
              {selectedArticle.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{selectedArticle.title}</h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-8 pb-6 border-b border-stone-100">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{selectedArticle.readTime} baca</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />Edukasi Pendakian</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">{selectedArticle.summary}</p>

            {selectedArticle.content.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 text-sm font-bold flex-shrink-0">{i + 1}</span>
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">{section.body}</p>
                {section.tips && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <div className="text-emerald-700 font-semibold text-sm mb-3">💡 Tips Penting:</div>
                    <ul className="space-y-2">
                      {section.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-emerald-800 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="font-semibold text-amber-800 text-sm">Disclaimer</span>
              </div>
              <p className="text-amber-700 text-sm">
                Informasi dalam artikel ini bersifat edukatif. Untuk kondisi medis darurat di gunung, segera cari bantuan dari tim SAR dan tenaga medis profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-teal-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-12 h-12 text-teal-300 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3">Edukasi Pendakian</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Tingkatkan pengetahuan dan kesiapan Anda dengan materi edukasi lengkap tentang pendakian gunung yang aman dan bertanggung jawab.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari artikel edukasi..."
                className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-stone-50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-green-800 text-white"
                      : "bg-stone-100 text-gray-600 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
          {[
            { emoji: "🏋️", label: "Persiapan Fisik", color: "bg-emerald-50 border-emerald-200" },
            { emoji: "🎒", label: "Logistik", color: "bg-blue-50 border-blue-200" },
            { emoji: "🧭", label: "Navigasi", color: "bg-purple-50 border-purple-200" },
            { emoji: "🚨", label: "Kedaruratan", color: "bg-red-50 border-red-200" },
            { emoji: "🩺", label: "Kesehatan", color: "bg-orange-50 border-orange-200" },
            { emoji: "🌿", label: "Konservasi", color: "bg-teal-50 border-teal-200" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(item.label === "Konservasi" ? "Etika & Konservasi" : item.label)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all hover:shadow-sm ${item.color}`}
            >
              <span className="text-2xl mb-1">{item.emoji}</span>
              <span className="text-xs font-medium text-gray-700 text-center">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              {article.image && (
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${article.categoryColor}`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock className="w-3.5 h-3.5" />{article.readTime}
                  </span>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 mt-0.5">{article.icon}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{article.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{article.summary}</p>
                <div className="flex items-center text-emerald-600 text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                  Baca Artikel <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Artikel tidak ditemukan</h3>
            <p className="text-gray-400">Coba ubah kata kunci pencarian atau kategori</p>
          </div>
        )}

        {/* Safety Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-800 to-emerald-700 rounded-2xl p-8 text-white text-center">
          <Shield className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Keselamatan adalah Prioritas Utama</h3>
          <p className="text-green-200 mb-6 max-w-xl mx-auto">
            Pengetahuan adalah perlengkapan terpenting yang bisa Anda bawa. Pelajari semua materi edukasi ini sebelum memulai pendakian Anda.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Mountain className="w-4 h-4" /> Daki Cerdas
            </span>
            <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" /> Daki Aman
            </span>
            <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Daki Bertanggung Jawab
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
