export interface TrailPost {
  name: string;
  elevation: number;
  distanceFromPrev: number; // km
  timeFromPrev: number; // hours
  hasWater: boolean;
  hasCamping: boolean;
  description: string;
}

export interface Trail {
  id: string;
  name: string;
  basecamp: string;
  location: string;
  length: number; // km
  elevationGain: number; // meter
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  estimatedTime: string;
  posts: TrailPost[];
}

export interface Mountain {
  id: string;
  name: string;
  province: string;
  location: string;
  elevation: number;
  nationalPark: string;
  description: string;
  longDescription: string;
  difficulty: "Mudah" | "Sedang" | "Sulit" | "Sangat Sulit";
  estimatedTime: string;
  bestSeason: string;
  flora: string[];
  fauna: string[];
  vegetationZones: string[];
  image: string;
  coordinates: { lat: number; lng: number };
  trails: Trail[];
}

export const mountains: Mountain[] = [
  {
    id: "gede",
    name: "Gunung Gede",
    province: "Jawa Barat",
    location: "Cianjur / Bogor / Sukabumi",
    elevation: 2958,
    nationalPark: "Taman Nasional Gunung Gede Pangrango",
    description: "Gunung berapi yang populer dengan pemandangan kawah dan padang edelweiss yang indah.",
    longDescription:
      "Gunung Gede merupakan salah satu gunung berapi aktif yang berada di Jawa Barat dan menjadi destinasi pendakian paling populer di Indonesia. Terletak di kawasan Taman Nasional Gunung Gede Pangrango, gunung ini menawarkan panorama kawah yang megah dan padang edelweiss yang luas di sekitar puncaknya. Ekosistemnya yang kaya mencakup hutan hujan tropis montane yang masih terjaga kelestariannya. Gunung Gede sering menjadi pilihan utama pendaki pemula karena aksesibilitasnya yang mudah dari ibu kota Jakarta.",
    difficulty: "Sedang",
    estimatedTime: "8-10 jam",
    bestSeason: "April - Oktober",
    flora: ["Edelweiss Jawa", "Cantigi", "Pasang", "Jamuju", "Anggrek"],
    fauna: ["Elang Jawa", "Macan Tutul", "Lutung Jawa", "Surili"],
    vegetationZones: ["Hutan Hujan Tropis (800-1500m)", "Hutan Montane (1500-2400m)", "Sub-Alpin (2400-2958m)"],
    image: "https://images.unsplash.com/photo-1755210345881-d907d014d306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -6.7788, lng: 107.0157 },
    trails: [
      {
        id: "cibodas",
        name: "Jalur Cibodas",
        basecamp: "Cibodas, Cianjur",
        location: "Cianjur, Jawa Barat",
        length: 9.7,
        elevationGain: 1958,
        difficulty: "Sedang",
        estimatedTime: "8-10 jam",
        posts: [
          { name: "Basecamp Cibodas", elevation: 1100, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Pintu masuk utama jalur Cibodas dengan fasilitas lengkap." },
          { name: "Pos Kandang Batu", elevation: 1500, distanceFromPrev: 2.1, timeFromPrev: 1.5, hasWater: true, hasCamping: true, description: "Pos peristirahatan dengan area camping yang cukup luas." },
          { name: "Pos Kandang Badak", elevation: 2200, distanceFromPrev: 3.4, timeFromPrev: 2.5, hasWater: true, hasCamping: true, description: "Pos terbesar dengan toilet dan shelter." },
          { name: "Kawah Ratu", elevation: 2700, distanceFromPrev: 2.8, timeFromPrev: 2.0, hasWater: false, hasCamping: false, description: "Kawah aktif dengan pemandangan yang spektakuler." },
          { name: "Puncak Gede", elevation: 2958, distanceFromPrev: 1.4, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Puncak tertinggi dengan panorama 360 derajat." },
        ],
      },
      {
        id: "gunung-putri",
        name: "Jalur Gunung Putri",
        basecamp: "Gunung Putri, Bogor",
        location: "Bogor, Jawa Barat",
        length: 8.2,
        elevationGain: 1858,
        difficulty: "Sulit",
        estimatedTime: "7-9 jam",
        posts: [
          { name: "Basecamp Gunung Putri", elevation: 1100, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp dengan fasilitas parkir dan warung." },
          { name: "Pos 1 Legok Leunca", elevation: 1600, distanceFromPrev: 2.5, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Pos pertama dengan area istirahat." },
          { name: "Pos 2 Lempeng", elevation: 2100, distanceFromPrev: 2.8, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Jalur datar dengan pemandangan hutan indah." },
          { name: "Simpang Maleber", elevation: 2500, distanceFromPrev: 2.0, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Persimpangan menuju puncak." },
          { name: "Puncak Gede", elevation: 2958, distanceFromPrev: 0.9, timeFromPrev: 1.0, hasWater: false, hasCamping: false, description: "Puncak Gunung Gede." },
        ],
      },
    ],
  },
  {
    id: "pangrango",
    name: "Gunung Pangrango",
    province: "Jawa Barat",
    location: "Cianjur / Bogor",
    elevation: 3019,
    nationalPark: "Taman Nasional Gunung Gede Pangrango",
    description: "Puncak tertinggi TNGGP dengan hutan lumut yang memukau dan padang edelweiss di Mandalawangi.",
    longDescription:
      "Gunung Pangrango adalah gunung tertinggi kedua di Jawa Barat dengan ketinggian 3.019 mdpl. Berbeda dengan Gunung Gede yang lebih populer, Pangrango menawarkan pengalaman pendakian yang lebih sepi dan alami. Daya tarik utama Pangrango adalah Lembah Mandalawangi yang dipenuhi bunga edelweiss dan hutan lumut yang mistis. Jalur pendakiannya terkenal cukup menantang dengan medan yang terjal. Gunung ini memiliki nilai historis dan sastra yang tinggi, diabadikan dalam puisi Chairil Anwar.",
    difficulty: "Sulit",
    estimatedTime: "10-12 jam",
    bestSeason: "April - Oktober",
    flora: ["Edelweiss Jawa", "Hutan Lumut", "Anggrek", "Cantigi", "Rhododendron"],
    fauna: ["Elang Jawa", "Lutung Jawa", "Macan Tutul", "Babi Hutan"],
    vegetationZones: ["Hutan Tropis Bawah (1100-1800m)", "Hutan Tropis Atas (1800-2400m)", "Hutan Lumut (2400-3019m)"],
    image: "https://images.unsplash.com/photo-1558520845-e80332dda30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -6.7716, lng: 107.0285 },
    trails: [
      {
        id: "cibodas-pangrango",
        name: "Jalur Cibodas - Pangrango",
        basecamp: "Cibodas, Cianjur",
        location: "Cianjur, Jawa Barat",
        length: 10.5,
        elevationGain: 1919,
        difficulty: "Sulit",
        estimatedTime: "10-12 jam",
        posts: [
          { name: "Basecamp Cibodas", elevation: 1100, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp bersama jalur Gede." },
          { name: "Pos Kandang Badak", elevation: 2200, distanceFromPrev: 5.5, timeFromPrev: 4.0, hasWater: true, hasCamping: true, description: "Persimpangan menuju Pangrango." },
          { name: "Shelter Mandalawangi", elevation: 2700, distanceFromPrev: 2.8, timeFromPrev: 2.5, hasWater: false, hasCamping: true, description: "Lembah indah dengan padang edelweiss." },
          { name: "Puncak Pangrango", elevation: 3019, distanceFromPrev: 2.2, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Puncak tertinggi dengan pemandangan luar biasa." },
        ],
      },
    ],
  },
  {
    id: "semeru",
    name: "Gunung Semeru",
    province: "Jawa Timur",
    location: "Lumajang / Malang",
    elevation: 3676,
    nationalPark: "Taman Nasional Bromo Tengger Semeru",
    description: "Puncak tertinggi di Pulau Jawa dengan kawah aktif Jonggring Saloko yang mendebarkan.",
    longDescription:
      "Gunung Semeru adalah gunung berapi tertinggi di Pulau Jawa dan menjadi salah satu destinasi pendakian paling ikonik di Indonesia. Puncaknya yang disebut Mahameru dianggap sakral oleh masyarakat setempat. Kawah aktifnya, Jonggring Saloko, mengeluarkan letusan kecil setiap 15-30 menit sekali. Danau Ranu Kumbolo yang biru jernih di ketinggian 2.390 mdpl menjadi daya tarik tersendiri dan tempat favorit berkemah para pendaki. Pendakian ke Semeru memerlukan izin khusus dan kondisi fisik yang sangat prima.",
    difficulty: "Sangat Sulit",
    estimatedTime: "2-3 hari",
    bestSeason: "April - Oktober",
    flora: ["Cemara Gunung", "Edelweiss Jawa", "Rumput Alpine", "Akasia"],
    fauna: ["Macan Tutul", "Elang Jawa", "Rusa Timor", "Kijang"],
    vegetationZones: ["Hutan Tropis (1000-2000m)", "Hutan Montane (2000-2800m)", "Sub-Alpin (2800-3676m)"],
    image: "https://images.unsplash.com/photo-1751643274240-91affce4d875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -8.1077, lng: 112.9229 },
    trails: [
      {
        id: "ranupani",
        name: "Jalur Ranupani",
        basecamp: "Ranupani, Lumajang",
        location: "Lumajang, Jawa Timur",
        length: 17.5,
        elevationGain: 2286,
        difficulty: "Sangat Sulit",
        estimatedTime: "2-3 hari",
        posts: [
          { name: "Basecamp Ranupani", elevation: 2100, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp utama dengan fasilitas lengkap dan pos registrasi." },
          { name: "Ranu Kumbolo", elevation: 2390, distanceFromPrev: 7.5, timeFromPrev: 4.0, hasWater: true, hasCamping: true, description: "Danau cantik dengan area camping ideal, sumber air bersih." },
          { name: "Kalimati", elevation: 2700, distanceFromPrev: 4.5, timeFromPrev: 2.5, hasWater: true, hasCamping: true, description: "Pos terakhir sebelum summit attack, area camping luas." },
          { name: "Arcopodo", elevation: 2900, distanceFromPrev: 1.5, timeFromPrev: 1.0, hasWater: false, hasCamping: true, description: "Pos berbatu dengan vegetasi cemara." },
          { name: "Puncak Mahameru", elevation: 3676, distanceFromPrev: 4.0, timeFromPrev: 4.0, hasWater: false, hasCamping: false, description: "Puncak tertinggi Jawa dengan pemandangan kawah aktif." },
        ],
      },
    ],
  },
  {
    id: "rinjani",
    name: "Gunung Rinjani",
    province: "Nusa Tenggara Barat",
    location: "Lombok",
    elevation: 3726,
    nationalPark: "Taman Nasional Gunung Rinjani",
    description: "Gunung berapi tertinggi kedua di Indonesia dengan danau kawah Segara Anak yang memesona.",
    longDescription:
      "Gunung Rinjani adalah gunung berapi aktif tertinggi kedua di Indonesia setelah Kerinci. Terletak di Pulau Lombok, gunung ini memiliki daya tarik istimewa berupa Danau Segara Anak yang berwarna biru kehijauan di dalam kawahnya pada ketinggian 2.008 mdpl. Rinjani menjadi tujuan wisata pendakian bertaraf internasional dengan panorama yang tidak tertandingi. Gunung ini dianggap sakral oleh masyarakat Lombok dan menjadi warisan budaya yang penting.",
    difficulty: "Sangat Sulit",
    estimatedTime: "3-4 hari",
    bestSeason: "April - November",
    flora: ["Cemara Gunung", "Edelweiss", "Beluntas", "Bayur", "Casuarina"],
    fauna: ["Rusa", "Kera Abu-abu", "Elang", "Babi Hutan"],
    vegetationZones: ["Hutan Tropis Basah (0-1000m)", "Hutan Montane (1000-2000m)", "Sub-Alpin (2000-3726m)"],
    image: "https://images.unsplash.com/photo-1710168833758-3cdceee3b8b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -8.4150, lng: 116.4650 },
    trails: [
      {
        id: "sembalun",
        name: "Jalur Sembalun",
        basecamp: "Sembalun, Lombok Timur",
        location: "Lombok Timur, NTB",
        length: 22.0,
        elevationGain: 2326,
        difficulty: "Sangat Sulit",
        estimatedTime: "3-4 hari",
        posts: [
          { name: "Basecamp Sembalun", elevation: 1400, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp dengan pemandangan padang savana." },
          { name: "Pos 1 Padabalong", elevation: 1600, distanceFromPrev: 2.5, timeFromPrev: 1.5, hasWater: true, hasCamping: true, description: "Pos pertama dengan shelter dan sumber air." },
          { name: "Pos 2 Tengengean", elevation: 2000, distanceFromPrev: 3.0, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Melewati savana yang luas." },
          { name: "Pos 3 Plawangan Sembalun", elevation: 2639, distanceFromPrev: 4.5, timeFromPrev: 3.0, hasWater: false, hasCamping: true, description: "Rim kawah dengan pemandangan Segara Anak." },
          { name: "Puncak Rinjani", elevation: 3726, distanceFromPrev: 5.0, timeFromPrev: 4.0, hasWater: false, hasCamping: false, description: "Puncak tertinggi dengan panorama spektakuler." },
        ],
      },
      {
        id: "senaru",
        name: "Jalur Senaru",
        basecamp: "Senaru, Lombok Utara",
        location: "Lombok Utara, NTB",
        length: 19.5,
        elevationGain: 2326,
        difficulty: "Sulit",
        estimatedTime: "3 hari",
        posts: [
          { name: "Basecamp Senaru", elevation: 601, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp dengan fasilitas lengkap dekat Desa Senaru." },
          { name: "Pos 1 Mumbulsari", elevation: 1000, distanceFromPrev: 3.0, timeFromPrev: 2.0, hasWater: true, hasCamping: true, description: "Hutan tropis lebat dengan sumber air." },
          { name: "Pos 2 Tengkak", elevation: 1500, distanceFromPrev: 3.5, timeFromPrev: 2.5, hasWater: false, hasCamping: true, description: "Melewati hutan yang rapat." },
          { name: "Pos 3 Plawangan Senaru", elevation: 2641, distanceFromPrev: 5.0, timeFromPrev: 4.0, hasWater: false, hasCamping: true, description: "Pemandangan danau Segara Anak yang memukau." },
          { name: "Segara Anak", elevation: 2008, distanceFromPrev: 4.0, timeFromPrev: 2.5, hasWater: true, hasCamping: true, description: "Danau kawah berwarna biru kehijauan yang ikonik." },
        ],
      },
    ],
  },
  {
    id: "kerinci",
    name: "Gunung Kerinci",
    province: "Jambi / Sumatera Barat",
    location: "Sungaipenuh, Kerinci",
    elevation: 3805,
    nationalPark: "Taman Nasional Kerinci Seblat",
    description: "Gunung berapi tertinggi di Indonesia dan puncak tertinggi di luar Papua.",
    longDescription:
      "Gunung Kerinci adalah gunung berapi tertinggi di Indonesia dengan ketinggian 3.805 mdpl dan merupakan puncak tertinggi di luar Papua. Terletak di Taman Nasional Kerinci Seblat yang merupakan warisan hutan hujan tropis terluas di Sumatera. Pendakian ke Kerinci menawarkan pengalaman melewati hutan hujan tropis yang kaya biodiversitas. Gunung ini dikelilingi perkebunan teh yang indah dan kawasan konservasi Harimau Sumatera.",
    difficulty: "Sangat Sulit",
    estimatedTime: "2-3 hari",
    bestSeason: "Maret - Agustus",
    flora: ["Rafflesia", "Hutan Hujan Tropis", "Pakis Raksasa", "Anggrek Sumatra"],
    fauna: ["Harimau Sumatera", "Gajah Sumatera", "Tapir", "Siamang", "Beruang Madu"],
    vegetationZones: ["Hutan Tropis Dataran Rendah (800-1500m)", "Hutan Montane (1500-2800m)", "Hutan Ericaceous (2800-3805m)"],
    image: "https://images.unsplash.com/photo-1763380265398-ded34d778f79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -1.6966, lng: 101.2641 },
    trails: [
      {
        id: "kersik-tuo",
        name: "Jalur Kersik Tuo",
        basecamp: "Kersik Tuo, Kerinci",
        location: "Kerinci, Jambi",
        length: 13.4,
        elevationGain: 2405,
        difficulty: "Sangat Sulit",
        estimatedTime: "2-3 hari",
        posts: [
          { name: "Basecamp Kersik Tuo", elevation: 1400, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp di tepi perkebunan teh yang indah." },
          { name: "Pintu Rimba", elevation: 1800, distanceFromPrev: 2.5, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Masuk ke kawasan hutan rimba." },
          { name: "Pos 1 Bangku Panjang", elevation: 2200, distanceFromPrev: 3.0, timeFromPrev: 2.5, hasWater: true, hasCamping: true, description: "Pos pertama dengan shelter dan area camping." },
          { name: "Pos 2 Batas Hutan", elevation: 2800, distanceFromPrev: 3.5, timeFromPrev: 3.0, hasWater: false, hasCamping: true, description: "Batas antara hutan dan medan berbatu." },
          { name: "Puncak Kerinci", elevation: 3805, distanceFromPrev: 4.4, timeFromPrev: 4.0, hasWater: false, hasCamping: false, description: "Puncak tertinggi Indonesia di luar Papua." },
        ],
      },
    ],
  },
  {
    id: "tambora",
    name: "Gunung Tambora",
    province: "Nusa Tenggara Barat",
    location: "Kabupaten Dompu / Bima",
    elevation: 2851,
    nationalPark: "Taman Nasional Tambora",
    description: "Gunung dengan kaldera terbesar di dunia, saksi letusan dahsyat 1815 yang mengubah iklim global.",
    longDescription:
      "Gunung Tambora terkenal karena letusan dahsyatnya pada tahun 1815 yang merupakan letusan gunung berapi terbesar dalam sejarah modern dan menyebabkan 'Tahun Tanpa Musim Panas' di seluruh dunia. Kalderanya yang luas dengan diameter 7 km dan kedalaman 1 km menjadi daya tarik utama pendakian. Tambora menawarkan pemandangan yang dramatis dengan padang sabana, danau kawah berwarna hijau tosca, dan ekosistem yang unik. Taman Nasional Tambora yang baru ditetapkan pada 2015 menjadikan kawasan ini semakin terlindungi.",
    difficulty: "Sulit",
    estimatedTime: "2-3 hari",
    bestSeason: "April - Oktober",
    flora: ["Rumput Sabana", "Cemara", "Akasia", "Beringin"],
    fauna: ["Rusa Timor", "Sapi Liar", "Elang", "Monyet"],
    vegetationZones: ["Sabana Kering (0-1500m)", "Hutan Tropis (1500-2200m)", "Sub-Alpin (2200-2851m)"],
    image: "https://images.unsplash.com/photo-1768245075094-86ac5e6ebcca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -8.2508, lng: 117.9960 },
    trails: [
      {
        id: "doro-ncanga",
        name: "Jalur Doro Ncanga",
        basecamp: "Doro Ncanga, Dompu",
        location: "Dompu, NTB",
        length: 14.0,
        elevationGain: 1851,
        difficulty: "Sulit",
        estimatedTime: "2-3 hari",
        posts: [
          { name: "Basecamp Doro Ncanga", elevation: 1000, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp di tepi sabana luas." },
          { name: "Pos 1 Savana", elevation: 1400, distanceFromPrev: 3.0, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Melewati padang sabana yang menakjubkan." },
          { name: "Pos 2 Kawasan Hutan", elevation: 2000, distanceFromPrev: 3.5, timeFromPrev: 2.5, hasWater: true, hasCamping: true, description: "Masuk zona hutan tropis pegunungan." },
          { name: "Rim Kaldera", elevation: 2700, distanceFromPrev: 4.5, timeFromPrev: 3.5, hasWater: false, hasCamping: true, description: "Tepi kaldera dengan pemandangan dalam kawah." },
          { name: "Puncak Tambora", elevation: 2851, distanceFromPrev: 3.0, timeFromPrev: 2.0, hasWater: false, hasCamping: false, description: "Puncak dengan pemandangan kaldera terbesar di dunia." },
        ],
      },
    ],
  },
  {
    id: "ciremai",
    name: "Gunung Ciremai",
    province: "Jawa Barat",
    location: "Kuningan / Majalengka",
    elevation: 3078,
    nationalPark: "Taman Nasional Gunung Ciremai",
    description: "Puncak tertinggi di Jawa Barat dengan pemandangan kawah ganda yang menakjubkan.",
    longDescription:
      "Gunung Ciremai adalah gunung berapi tertinggi di Jawa Barat dengan ketinggian 3.078 mdpl, bahkan lebih tinggi dari Gunung Gede dan Pangrango. Gunung ini memiliki dua kawah yang dikenal sebagai kawah Guntur dan kawah Pelangi. Ekosistem hutannya masih sangat terjaga dengan keanekaragaman hayati yang tinggi. Ciremai menjadi sumber air bagi masyarakat Kuningan, Majalengka, dan Cirebon. Pendakiannya cukup menantang dengan jalur yang terjal dan berbatu.",
    difficulty: "Sulit",
    estimatedTime: "10-12 jam",
    bestSeason: "April - Oktober",
    flora: ["Edelweiss Jawa", "Cantigi", "Pinus", "Akasia Gunung"],
    fauna: ["Elang Jawa", "Kijang", "Babi Hutan", "Lutung"],
    vegetationZones: ["Hutan Tropis (800-1500m)", "Hutan Montane (1500-2400m)", "Sub-Alpin (2400-3078m)"],
    image: "https://images.unsplash.com/photo-1570634078213-feda324d7ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -6.8908, lng: 108.4042 },
    trails: [
      {
        id: "palutungan",
        name: "Jalur Palutungan",
        basecamp: "Palutungan, Kuningan",
        location: "Kuningan, Jawa Barat",
        length: 12.5,
        elevationGain: 1978,
        difficulty: "Sulit",
        estimatedTime: "10-12 jam",
        posts: [
          { name: "Basecamp Palutungan", elevation: 1100, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp dengan air bersih melimpah." },
          { name: "Pos 1 Cibunar", elevation: 1400, distanceFromPrev: 2.0, timeFromPrev: 1.5, hasWater: true, hasCamping: true, description: "Pos pertama dengan sungai kecil." },
          { name: "Pos 2 Arban", elevation: 1800, distanceFromPrev: 2.5, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Hutan pinus yang menyejukkan." },
          { name: "Pos 3 Gua Walet", elevation: 2400, distanceFromPrev: 3.0, timeFromPrev: 2.5, hasWater: false, hasCamping: true, description: "Jalur mulai menanjak curam." },
          { name: "Puncak Ciremai", elevation: 3078, distanceFromPrev: 5.0, timeFromPrev: 4.0, hasWater: false, hasCamping: false, description: "Puncak dengan kawah ganda yang menakjubkan." },
        ],
      },
      {
        id: "linggarjati",
        name: "Jalur Linggarjati",
        basecamp: "Linggarjati, Kuningan",
        location: "Kuningan, Jawa Barat",
        length: 11.2,
        elevationGain: 1978,
        difficulty: "Sangat Sulit",
        estimatedTime: "9-11 jam",
        posts: [
          { name: "Basecamp Linggarjati", elevation: 1100, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp bersejarah dengan bangunan kolonial." },
          { name: "Pos 1 Kondang Jaya", elevation: 1500, distanceFromPrev: 2.0, timeFromPrev: 1.5, hasWater: false, hasCamping: true, description: "Jalur mulai memasuki hutan lebat." },
          { name: "Pos 2 Sangga Buana 1", elevation: 2100, distanceFromPrev: 3.0, timeFromPrev: 2.5, hasWater: false, hasCamping: true, description: "Jalur berbatu dan curam." },
          { name: "Pos 3 Sangga Buana 2", elevation: 2600, distanceFromPrev: 2.7, timeFromPrev: 2.0, hasWater: false, hasCamping: false, description: "Mendekati batas vegetasi." },
          { name: "Puncak Ciremai", elevation: 3078, distanceFromPrev: 3.5, timeFromPrev: 2.5, hasWater: false, hasCamping: false, description: "Puncak gunung tertinggi Jawa Barat." },
        ],
      },
    ],
  },
  {
    id: "merbabu",
    name: "Gunung Merbabu",
    province: "Jawa Tengah",
    location: "Boyolali / Magelang / Semarang",
    elevation: 3145,
    nationalPark: "Taman Nasional Gunung Merbabu",
    description: "Gunung tidur dengan padang sabana berwarna-warni dan pemandangan Gunung Merapi yang menakjubkan.",
    longDescription:
      "Gunung Merbabu adalah gunung berapi tidak aktif yang berada di Jawa Tengah dengan ketinggian 3.145 mdpl. Berbeda dengan gunung-gunung lainnya, Merbabu terkenal dengan padang sabana yang luas dan berwarna-warni, terutama saat musim kering. Dari puncaknya, pendaki dapat menikmati pemandangan Gunung Merapi yang megah di sebelah selatan. Jalur pendakiannya beragam dan cocok untuk berbagai tingkat kemampuan pendaki. Merbabu memiliki beberapa puncak yaitu Puncak Kenteng Songo, Puncak Triangulasi, dan Puncak Syarif.",
    difficulty: "Sedang",
    estimatedTime: "8-10 jam",
    bestSeason: "Maret - Oktober",
    flora: ["Edelweiss", "Rumput Sabana", "Anggrek", "Cantigi", "Pinus"],
    fauna: ["Elang", "Kijang", "Ayam Hutan", "Babi Hutan"],
    vegetationZones: ["Hutan Pinus (1000-1700m)", "Hutan Montane (1700-2400m)", "Sabana (2400-3145m)"],
    image: "https://images.unsplash.com/photo-1672384946806-cd7f2fa4b543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    coordinates: { lat: -7.4547, lng: 110.4416 },
    trails: [
      {
        id: "selo",
        name: "Jalur Selo",
        basecamp: "Selo, Boyolali",
        location: "Boyolali, Jawa Tengah",
        length: 10.2,
        elevationGain: 1745,
        difficulty: "Sedang",
        estimatedTime: "8-10 jam",
        posts: [
          { name: "Basecamp Selo", elevation: 1400, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp populer dengan fasilitas lengkap dan pemandangan Merapi-Merbabu." },
          { name: "Pos 1 Dok-dok", elevation: 1700, distanceFromPrev: 1.8, timeFromPrev: 1.0, hasWater: false, hasCamping: true, description: "Pos pertama dengan area camping kecil." },
          { name: "Pos 2 Watu Tulis", elevation: 2200, distanceFromPrev: 2.5, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Batu besar bertulis dengan pemandangan terbuka." },
          { name: "Pos 3 Sabana 1", elevation: 2700, distanceFromPrev: 3.0, timeFromPrev: 2.5, hasWater: false, hasCamping: true, description: "Masuk zona sabana yang indah." },
          { name: "Sabana 2 / Helipad", elevation: 2900, distanceFromPrev: 1.2, timeFromPrev: 1.0, hasWater: false, hasCamping: true, description: "Sabana luas dengan panorama 360 derajat." },
          { name: "Puncak Kenteng Songo", elevation: 3145, distanceFromPrev: 1.7, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Puncak tertinggi dengan pemandangan Merapi yang memukau." },
        ],
      },
      {
        id: "wekas",
        name: "Jalur Wekas",
        basecamp: "Wekas, Magelang",
        location: "Magelang, Jawa Tengah",
        length: 8.5,
        elevationGain: 1745,
        difficulty: "Sulit",
        estimatedTime: "7-9 jam",
        posts: [
          { name: "Basecamp Wekas", elevation: 1400, distanceFromPrev: 0, timeFromPrev: 0, hasWater: true, hasCamping: false, description: "Basecamp dengan akses mudah dari Magelang." },
          { name: "Pos 1 Watu Gubug", elevation: 1800, distanceFromPrev: 2.0, timeFromPrev: 1.5, hasWater: false, hasCamping: true, description: "Melewati hutan pinus yang rindang." },
          { name: "Pos 2 Pelataran", elevation: 2400, distanceFromPrev: 2.5, timeFromPrev: 2.0, hasWater: false, hasCamping: true, description: "Medan terjal menuju sabana." },
          { name: "Pertigaan Puncak", elevation: 2800, distanceFromPrev: 2.0, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Persimpangan menuju puncak-puncak Merbabu." },
          { name: "Puncak Triangulasi", elevation: 3145, distanceFromPrev: 2.0, timeFromPrev: 1.5, hasWater: false, hasCamping: false, description: "Salah satu puncak Merbabu dengan pemandangan indah." },
        ],
      },
    ],
  },
];

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "Mudah": return "text-green-600 bg-green-100";
    case "Sedang": return "text-yellow-600 bg-yellow-100";
    case "Sulit": return "text-orange-600 bg-orange-100";
    case "Sangat Sulit": return "text-red-600 bg-red-100";
    default: return "text-gray-600 bg-gray-100";
  }
};

export const getDifficultyStars = (difficulty: string): number => {
  switch (difficulty) {
    case "Mudah": return 1;
    case "Sedang": return 2;
    case "Sulit": return 3;
    case "Sangat Sulit": return 4;
    default: return 0;
  }
};
