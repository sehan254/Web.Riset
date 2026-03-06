import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  Brain, ChevronRight, ChevronLeft, User, Activity, Heart,
  CheckCircle, AlertTriangle, XCircle, Mountain, Thermometer,
  Shield, Clock, Star, Zap, Package, ArrowRight, RotateCcw
} from "lucide-react";
import { mountains } from "../data/mountains";

interface FormData {
  // Personal
  usia: string;
  tinggiBadan: string;
  beratBadan: string;
  // Experience
  jumlahPendakian: string;
  gunungTertinggi: string;
  durasiTerlama: string;
  targetGunung: string;
  // Health
  asma: boolean;
  hipertensi: boolean;
  penyakitJantung: boolean;
  cederaLutut: boolean;
  gangguanPernapasan: boolean;
  alergiDingin: boolean;
  alergiPanas: boolean;
  sensitifSuhu: boolean;
}

interface AIResult {
  score: number;
  level: "Siap" | "Cukup Siap" | "Perlu Persiapan" | "Tidak Disarankan";
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  mountainRecommendations: string[];
  avoidedMountains: string[];
  healthRisks: string[];
  equipmentSuggestions: string[];
  timingAdvice: string;
  generalAdvice: string[];
}

const defaultForm: FormData = {
  usia: "",
  tinggiBadan: "",
  beratBadan: "",
  jumlahPendakian: "",
  gunungTertinggi: "",
  durasiTerlama: "",
  targetGunung: "",
  asma: false,
  hipertensi: false,
  penyakitJantung: false,
  cederaLutut: false,
  gangguanPernapasan: false,
  alergiDingin: false,
  alergiPanas: false,
  sensitifSuhu: false,
};

function analyzeHiker(data: FormData): AIResult {
  let score = 100;
  const healthRisks: string[] = [];
  const equipmentSuggestions: string[] = [
    "Sepatu gunung dengan sol grip kuat",
    "Jaket windproof dan waterproof",
    "Headlamp dengan baterai cadangan",
    "P3K lengkap termasuk obat-obatan pribadi",
    "Sleeping bag sesuai suhu gunung yang dituju",
    "Trekking poles untuk mendukung lutut dan keseimbangan",
  ];

  // Age factor
  const age = parseInt(data.usia);
  if (age < 15) score -= 30;
  else if (age < 18) score -= 10;
  else if (age > 55) score -= 15;
  else if (age > 65) score -= 30;

  // BMI
  const height = parseInt(data.tinggiBadan) / 100;
  const weight = parseInt(data.beratBadan);
  const bmi = weight / (height * height);
  if (bmi > 30) { score -= 15; healthRisks.push("BMI di atas normal dapat memperberat pendakian dan berisiko kelelahan lebih cepat"); }
  else if (bmi < 18.5) { score -= 5; healthRisks.push("BMI di bawah normal — pastikan asupan nutrisi dan kalori mencukupi"); }

  // Experience
  const trips = parseInt(data.jumlahPendakian) || 0;
  if (trips === 0) score -= 25;
  else if (trips < 3) score -= 15;
  else if (trips < 5) score -= 5;

  const duration = parseInt(data.durasiTerlama) || 0;
  if (duration < 8) score -= 10;
  else if (duration >= 16) score += 5;

  // Health conditions
  if (data.asma) {
    score -= 20;
    healthRisks.push("Asma: Udara tipis di ketinggian dapat memicu serangan asma. Bawa inhaler dan konsultasikan dengan dokter.");
    equipmentSuggestions.push("Inhaler darurat (wajib)");
  }
  if (data.hipertensi) {
    score -= 15;
    healthRisks.push("Hipertensi: Tekanan darah tinggi meningkatkan risiko di ketinggian. Monitor tekanan darah dan bawa obat.");
    equipmentSuggestions.push("Alat pengukur tekanan darah portabel");
  }
  if (data.penyakitJantung) {
    score -= 40;
    healthRisks.push("Penyakit Jantung: SANGAT BERISIKO. Pendakian ke ketinggian ekstrem sangat tidak disarankan tanpa clearance dokter spesialis jantung.");
  }
  if (data.cederaLutut) {
    score -= 20;
    healthRisks.push("Cedera Lutut: Jalur menurun akan memberikan tekanan besar pada lutut yang cedera. Gunakan trekking pole.");
    equipmentSuggestions.push("Knee brace atau decker lutut (wajib)");
  }
  if (data.gangguanPernapasan) {
    score -= 25;
    healthRisks.push("Gangguan Pernapasan: Udara tipis dan dingin di pegunungan dapat memperburuk kondisi pernapasan.");
  }
  if (data.alergiDingin) {
    score -= 15;
    healthRisks.push("Alergi Dingin: Hindari pendakian malam hari dan gunakan perlengkapan thermal berlapis-lapis.");
    equipmentSuggestions.push("Pakaian thermal anti-dingin berlapis", "Sleeping bag rating suhu rendah (-5°C atau lebih)");
  }
  if (data.alergiPanas) {
    score -= 10;
    healthRisks.push("Alergi Panas: Perhatikan waktu pendakian, hindari paparan sinar matahari langsung pada siang hari.");
    equipmentSuggestions.push("Sunscreen SPF 50+", "Topi lebar pelindung UV");
  }
  if (data.sensitifSuhu) {
    score -= 10;
    healthRisks.push("Sensitif terhadap perubahan suhu: Bersiaplah dengan pakaian layering untuk adaptasi suhu yang cepat berubah.");
  }

  score = Math.max(0, Math.min(100, score));

  // Recommendations based on score and target mountain
  const targetMountain = mountains.find(m => m.id === data.targetGunung);
  const easyMountains = mountains.filter(m => m.difficulty === "Mudah" || m.difficulty === "Sedang");
  const hardMountains = mountains.filter(m => m.difficulty === "Sangat Sulit");

  let level: AIResult["level"];
  let color: string;
  let bgColor: string;
  let icon: React.ReactNode;
  let mountainRecommendations: string[];
  let avoidedMountains: string[];
  let timingAdvice: string;
  let generalAdvice: string[];

  if (score >= 75) {
    level = "Siap";
    color = "text-orange-700";
    bgColor = "bg-orange-50 border-orange-300";
    icon = <CheckCircle className="w-8 h-8 text-orange-600" />;
    mountainRecommendations = mountains.map(m => m.name);
    avoidedMountains = [];
    timingAdvice = "Anda dapat mendaki kapan saja sesuai musim terbaik masing-masing gunung. Pendakian malam hari (summit attack) aman dilakukan dengan perlengkapan yang tepat.";
    generalAdvice = [
      "Tetap patuhi protokol keselamatan standar pendakian",
      "Aklimatisasi minimal 1-2 jam di basecamp sebelum mulai",
      "Atur pace pendakian yang konsisten, hindari terburu-buru",
      "Minum air minimal 2-3 liter per hari selama pendakian",
    ];
  } else if (score >= 55) {
    level = "Cukup Siap";
    color = "text-yellow-700";
    bgColor = "bg-yellow-50 border-yellow-300";
    icon = <AlertTriangle className="w-8 h-8 text-yellow-600" />;
    mountainRecommendations = easyMountains.map(m => m.name);
    avoidedMountains = hardMountains.map(m => m.name);
    timingAdvice = "Pilih musim kemarau (April-Oktober) untuk pendakian lebih aman. Hindari summit attack malam hari jika memiliki kondisi kesehatan tertentu.";
    generalAdvice = [
      "Tingkatkan latihan fisik setidaknya 1 bulan sebelum pendakian",
      "Konsultasikan kondisi kesehatan dengan dokter sebelum berangkat",
      "Pilih jalur dengan tingkat kesulitan sedang atau lebih rendah",
      "Selalu ditemani pendaki berpengalaman",
    ];
  } else if (score >= 35) {
    level = "Perlu Persiapan";
    color = "text-orange-700";
    bgColor = "bg-orange-50 border-orange-300";
    icon = <AlertTriangle className="w-8 h-8 text-orange-600" />;
    mountainRecommendations = [mountains[0].name, mountains[7].name];
    avoidedMountains = mountains.filter(m => m.difficulty === "Sulit" || m.difficulty === "Sangat Sulit").map(m => m.name);
    timingAdvice = "Tunda pendakian hingga kondisi fisik dan kesehatan membaik. Mulai dengan pendakian latihan di gunung-gunung rendah terlebih dahulu.";
    generalAdvice = [
      "Lakukan pemeriksaan kesehatan menyeluruh dengan dokter",
      "Mulai program latihan fisik 2-3 bulan sebelum pendakian",
      "Ikuti kursus atau pelatihan dasar mountaineering",
      "Pelajari teknik dasar pendakian dan navigasi",
    ];
  } else {
    level = "Tidak Disarankan";
    color = "text-red-700";
    bgColor = "bg-red-50 border-red-300";
    icon = <XCircle className="w-8 h-8 text-red-600" />;
    mountainRecommendations = [];
    avoidedMountains = mountains.map(m => m.name);
    timingAdvice = "Tidak disarankan untuk melakukan pendakian gunung dalam kondisi saat ini. Prioritaskan pemulihan kesehatan dan konsultasi medis.";
    generalAdvice = [
      "Konsultasikan kondisi kesehatan dengan dokter spesialis",
      "Fokus pada pemulihan dan peningkatan kondisi fisik",
      "Pertimbangkan aktivitas outdoor yang lebih ringan sebagai alternatif",
      "Kunjungi kembali setelah kondisi kesehatan membaik",
    ];
  }

  return {
    score,
    level,
    color,
    bgColor,
    icon,
    mountainRecommendations,
    avoidedMountains,
    healthRisks,
    equipmentSuggestions: [...new Set(equipmentSuggestions)],
    timingAdvice,
    generalAdvice,
  };
}

const steps = [
  { id: 1, label: "Data Pribadi", icon: <User className="w-4 h-4" /> },
  { id: 2, label: "Pengalaman", icon: <Activity className="w-4 h-4" /> },
  { id: 3, label: "Kesehatan", icon: <Heart className="w-4 h-4" /> },
  { id: 4, label: "Hasil AI", icon: <Brain className="w-4 h-4" /> },
];

export default function AIAdvisor() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [result, setResult] = useState<AIResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const updateForm = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(analyzeHiker(form));
      setIsAnalyzing(false);
      setCurrentStep(4);
    }, 2000);
  };

  const reset = () => {
    setForm(defaultForm);
    setResult(null);
    setCurrentStep(1);
  };

  const HealthCheckbox = ({ field, label, description }: { field: keyof FormData; label: string; description?: string }) => (
    <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form[field] ? "border-red-300 bg-red-50" : "border-stone-200 bg-white hover:border-stone-300"}`}>
      <input
        type="checkbox"
        checked={form[field] as boolean}
        onChange={(e) => updateForm(field, e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-red-500"
      />
      <div>
        <div className="font-medium text-gray-800 text-sm">{label}</div>
        {description && <div className="text-gray-500 text-xs mt-0.5">{description}</div>}
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-stone-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900 to-orange-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/30 rounded-2xl mb-4">
            <Brain className="w-8 h-8 text-orange-300" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">AI Hiking Advisor</h1>
          <p className="text-orange-200 text-lg max-w-2xl mx-auto">
            Sistem kecerdasan buatan yang menganalisis kesiapan Anda untuk mendaki gunung berdasarkan kondisi fisik, riwayat kesehatan, dan pengalaman pendakian.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentStep === step.id
                  ? "bg-orange-800 text-white shadow-lg"
                  : currentStep > step.id
                  ? "bg-orange-100 text-orange-700"
                  : "bg-stone-200 text-gray-500"
              }`}>
                {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.icon}
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 ${currentStep > step.id ? "bg-orange-400" : "bg-stone-300"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Personal Data */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 rounded-xl p-2.5"><User className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Data Pribadi</h2>
                  <p className="text-gray-500 text-sm">Informasi dasar untuk kalkulasi BMI dan profil pendaki</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Usia (tahun) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={form.usia}
                    onChange={(e) => updateForm("usia", e.target.value)}
                    placeholder="Contoh: 25"
                    min="10" max="80"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tinggi Badan (cm) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      value={form.tinggiBadan}
                      onChange={(e) => updateForm("tinggiBadan", e.target.value)}
                      placeholder="Contoh: 170"
                      min="140" max="220"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Berat Badan (kg) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      value={form.beratBadan}
                      onChange={(e) => updateForm("beratBadan", e.target.value)}
                      placeholder="Contoh: 65"
                      min="30" max="150"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                    />
                  </div>
                </div>

                {form.tinggiBadan && form.beratBadan && (
                  <div className="bg-stone-50 rounded-xl p-4 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-gray-600 text-sm">BMI Anda: </span>
                      <span className="font-bold text-gray-900">
                        {(parseInt(form.beratBadan) / Math.pow(parseInt(form.tinggiBadan) / 100, 2)).toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        {(() => {
                          const bmi = parseInt(form.beratBadan) / Math.pow(parseInt(form.tinggiBadan) / 100, 2);
                          if (bmi < 18.5) return "(Berat Badan Kurang)";
                          if (bmi < 25) return "(Normal - Ideal untuk pendakian)";
                          if (bmi < 30) return "(Berat Badan Berlebih)";
                          return "(Obesitas)";
                        })()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!form.usia || !form.tinggiBadan || !form.beratBadan}
                  className="flex items-center gap-2 bg-orange-800 hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 rounded-xl p-2.5"><Activity className="w-5 h-5 text-orange-600" /></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pengalaman Pendakian</h2>
                  <p className="text-gray-500 text-sm">Riwayat pengalaman mendaki gunung Anda</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah Pendakian (kali) <span className="text-red-500">*</span></label>
                  <select
                    value={form.jumlahPendakian}
                    onChange={(e) => updateForm("jumlahPendakian", e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                  >
                    <option value="">Pilih jumlah pendakian</option>
                    <option value="0">Belum pernah (Pemula)</option>
                    <option value="1">1-2 kali</option>
                    <option value="3">3-5 kali</option>
                    <option value="6">6-10 kali</option>
                    <option value="11">Lebih dari 10 kali</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gunung Tertinggi yang Pernah Didaki</label>
                  <input
                    type="text"
                    value={form.gunungTertinggi}
                    onChange={(e) => updateForm("gunungTertinggi", e.target.value)}
                    placeholder="Contoh: Gunung Gede (2.958 mdpl) atau belum pernah"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Durasi Pendakian Terlama (jam) <span className="text-red-500">*</span></label>
                  <select
                    value={form.durasiTerlama}
                    onChange={(e) => updateForm("durasiTerlama", e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                  >
                    <option value="">Pilih durasi</option>
                    <option value="0">Belum pernah</option>
                    <option value="4">Kurang dari 4 jam</option>
                    <option value="8">4-8 jam</option>
                    <option value="12">8-12 jam</option>
                    <option value="16">12-16 jam</option>
                    <option value="24">Lebih dari 16 jam (multi-day)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gunung yang Ingin Didaki <span className="text-red-500">*</span></label>
                  <select
                    value={form.targetGunung}
                    onChange={(e) => updateForm("targetGunung", e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 bg-stone-50"
                  >
                    <option value="">Pilih gunung tujuan</option>
                    {mountains.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.elevation.toLocaleString()} mdpl - {m.difficulty})</option>
                    ))}
                  </select>
                </div>

                {form.targetGunung && (
                  <div className="bg-stone-50 rounded-xl p-4">
                    {(() => {
                      const m = mountains.find(x => x.id === form.targetGunung);
                      return m ? (
                        <div className="flex items-center gap-3">
                          <Mountain className="w-5 h-5 text-orange-600" />
                          <div>
                            <div className="font-medium text-gray-900">{m.name}</div>
                            <div className="text-gray-500 text-sm">{m.elevation.toLocaleString()} mdpl · {m.difficulty} · {m.estimatedTime}</div>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-3 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!form.jumlahPendakian || !form.durasiTerlama || !form.targetGunung}
                  className="flex items-center gap-2 bg-orange-800 hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Health */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 rounded-xl p-2.5"><Heart className="w-5 h-5 text-red-600" /></div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Riwayat Kesehatan</h2>
                  <p className="text-gray-500 text-sm">Centang kondisi yang berlaku untuk Anda</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Kondisi Medis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <HealthCheckbox field="asma" label="Asma" description="Penyakit saluran napas kronis" />
                  <HealthCheckbox field="hipertensi" label="Hipertensi" description="Tekanan darah tinggi" />
                  <HealthCheckbox field="penyakitJantung" label="Penyakit Jantung" description="Gangguan fungsi jantung" />
                  <HealthCheckbox field="cederaLutut" label="Cedera Lutut" description="Cedera atau nyeri lutut kronis" />
                  <HealthCheckbox field="gangguanPernapasan" label="Gangguan Pernapasan" description="Selain asma" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Sensitivitas Suhu</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <HealthCheckbox field="alergiDingin" label="Alergi Dingin" description="Reaksi kulit/tubuh terhadap suhu dingin" />
                  <HealthCheckbox field="alergiPanas" label="Alergi Panas" description="Reaksi berlebih terhadap panas matahari" />
                  <HealthCheckbox
                    field="sensitifSuhu"
                    label="Sensitif Perubahan Suhu"
                    description="Tubuh sulit beradaptasi dengan perubahan suhu ekstrem"
                  />
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                🔒 Data kesehatan Anda bersifat rahasia dan hanya digunakan untuk analisis kesiapan pendakian. Tidak disimpan di server manapun.
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-3 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={handleAnalyze}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-800 to-orange-700 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Analisis dengan AI
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && result && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className={`rounded-2xl border-2 p-8 text-center ${result.bgColor}`}>
                <div className="flex justify-center mb-4">{result.icon}</div>
                <h2 className={`text-3xl font-bold mb-2 ${result.color}`}>{result.level}</h2>
                <div className="text-gray-600 mb-6">Skor Kesiapan Pendakian Anda</div>

                {/* Score Bar */}
                <div className="max-w-xs mx-auto mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>0</span>
                    <span className={`font-bold text-lg ${result.color}`}>{result.score}/100</span>
                    <span>100</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full ${result.score >= 75 ? "bg-orange-500" : result.score >= 55 ? "bg-yellow-500" : result.score >= 35 ? "bg-orange-500" : "bg-red-500"}`}
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-4 text-sm">
                  {[{ range: "75-100", label: "Siap", color: "bg-orange-500" }, { range: "55-74", label: "Cukup Siap", color: "bg-yellow-500" }, { range: "35-54", label: "Perlu Persiapan", color: "bg-orange-500" }, { range: "0-34", label: "Tidak Disarankan", color: "bg-red-500" }].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span className="text-gray-500 text-xs">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Mountain Analysis */}
              {form.targetGunung && (() => {
                const m = mountains.find(x => x.id === form.targetGunung);
                const isRecommended = result.mountainRecommendations.includes(m?.name || "");
                return m ? (
                  <div className={`rounded-2xl border-2 p-6 ${isRecommended ? "bg-orange-50 border-orange-300" : "bg-red-50 border-red-300"}`}>
                    <h3 className="font-bold text-gray-900 mb-3">Analisis Gunung Tujuan</h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      <img src={m.image} alt={m.name} className="w-20 h-16 object-cover rounded-xl" />
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{m.name}</div>
                        <div className="text-gray-500 text-sm">{m.elevation.toLocaleString()} mdpl · {m.difficulty}</div>
                        <div className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${isRecommended ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`}>
                          {isRecommended ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isRecommended ? "Direkomendasikan untuk Anda" : "Belum Direkomendasikan"}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Health Risks */}
              {result.healthRisks.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-gray-900">Potensi Risiko Kesehatan</h3>
                  </div>
                  <div className="space-y-3">
                    {result.healthRisks.map((risk, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-red-800 text-sm">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mountain Recommendations */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mountain className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Rekomendasi Jalur & Gunung</h3>
                </div>
                {result.mountainRecommendations.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {result.mountainRecommendations.map((m, i) => (
                      <span key={i} className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {m}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mb-4">Tidak ada rekomendasi pendakian saat ini.</p>
                )}
                {result.avoidedMountains.length > 0 && (
                  <>
                    <div className="text-sm font-medium text-gray-600 mb-2">Hindari untuk sementara:</div>
                    <div className="flex flex-wrap gap-2">
                      {result.avoidedMountains.map((m, i) => (
                        <span key={i} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> {m}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Timing Advice */}
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">Saran Waktu Pendakian</h3>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed">{result.timingAdvice}</p>
              </div>

              {/* Equipment */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-gray-900">Perlengkapan yang Disarankan</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.equipmentSuggestions.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="#fbbf24" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* General Advice */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Saran Umum</h3>
                </div>
                <div className="space-y-2">
                  {result.generalAdvice.map((advice, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-orange-600 text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{advice}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-2 flex-1 border-2 border-stone-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-orange-500 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Analisis Ulang
                </button>
                <Link
                  to="/mountains"
                  className="flex items-center justify-center gap-2 flex-1 bg-orange-800 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Mountain className="w-4 h-4" /> Jelajahi Gunung <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <p className="text-center text-xs text-gray-400 mt-2">
                ⚠️ Hasil analisis AI bersifat referensi. Selalu konsultasikan dengan dokter dan pemandu pendakian profesional sebelum mendaki.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
