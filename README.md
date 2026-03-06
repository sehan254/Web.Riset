# ??? NUSAPALA — AI Hiking Advisor

Platform edukasi dan sistem rekomendasi pendakian gunung berbasis kecerdasan buatan (AI) dan data cuaca realtime BMKG untuk pendaki Indonesia.

---

## ?? Demo

?? [https://web-riset.vercel.app](https://web-riset.vercel.app)

---

## ? Fitur Utama

- **?? AI Hiking Advisor** — Analisis kesiapan fisik, riwayat kesehatan, dan pengalaman pendaki untuk memberikan rekomendasi yang dipersonalisasi.
- **??? Cuaca Realtime BMKG** — Data cuaca gunung secara realtime dari Badan Meteorologi, Klimatologi, dan Geofisika (BMKG).
- **??? Informasi Gunung Lengkap** — Data detail 8 gunung di kawasan taman nasional Indonesia, termasuk jalur pendakian, ekosistem, flora, dan fauna.
- **?? Edukasi Pendakian** — Materi lengkap tentang teknik pendakian, navigasi, pertolongan pertama, dan etika konservasi alam.

---

## ??? Tech Stack

| Teknologi | Deskripsi |
|---|---|
| **React 18** | Library UI utama |
| **TypeScript** | Type safety |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 4** | Styling utility-first |
| **React Router 7** | Client-side routing |
| **Radix UI** | Komponen UI aksesibel |
| **Motion** | Animasi |
| **Recharts** | Visualisasi data cuaca |
| **Lucide React** | Icon library |
| **MUI (Material UI)** | Komponen tambahan |

---

## ?? Struktur Project

```
src/
+-- app/
¦   +-- components/
¦   ¦   +-- Layout.tsx          # Navbar & layout utama
¦   ¦   +-- ui/                 # Komponen UI reusable
¦   +-- data/
¦   ¦   +-- mountains.ts        # Data gunung Indonesia
¦   +-- pages/
¦       +-- Home.tsx            # Halaman beranda
¦       +-- Mountains.tsx       # Daftar gunung
¦       +-- MountainDetail.tsx  # Detail gunung & jalur
¦       +-- Weather.tsx         # Cuaca realtime BMKG
¦       +-- AIAdvisor.tsx       # AI Hiking Advisor
¦       +-- Education.tsx       # Edukasi pendakian
+-- styles/                     # CSS & tema
public/
+-- hero-bg.jpg                 # Foto hero background
```

---

## ?? Cara Menjalankan Lokal

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm

### Langkah-langkah

```bash
# 1. Clone repository
git clone https://github.com/sehan254/Web.Riset.git
cd Web.Riset

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka browser di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

---

## ?? Data Gunung

Platform ini mencakup informasi **8 gunung** di kawasan taman nasional Indonesia, meliputi:

- Tinggi puncak (mdpl)
- Jalur pendakian & pos-pos
- Estimasi waktu tempuh
- Tingkat kesulitan
- Informasi flora & fauna
- Data ekosistem

---

## ?? Kontribusi

Pull request sangat disambut. Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan apa yang ingin diubah.

---

## ?? Lisensi

Proyek ini dibuat untuk keperluan riset dan edukasi.

---

> Dibuat dengan ?? untuk pendaki Indonesia
