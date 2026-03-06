import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router";
import { Mountain, CloudSun, Brain, BookOpen, Menu, X, ChevronRight } from "lucide-react";

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Beranda", icon: <Mountain className="w-4 h-4" /> },
    { to: "/mountains", label: "Gunung", icon: <Mountain className="w-4 h-4" /> },
    { to: "/weather", label: "Cuaca", icon: <CloudSun className="w-4 h-4" /> },
    { to: "/ai-advisor", label: "AI Advisor", icon: <Brain className="w-4 h-4" /> },
    { to: "/education", label: "Edukasi", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Navbar */}
      <nav className="bg-green-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="bg-emerald-500 rounded-lg p-1.5">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg leading-none block">PuncakNusantara</span>
                <span className="text-emerald-300 text-xs leading-none">AI Hiking Advisor</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-1.5 ${
                    isActive(link.to)
                      ? "bg-emerald-600 text-white"
                      : "text-green-200 hover:bg-green-800 hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/ai-advisor"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
              >
                <Brain className="w-4 h-4" />
                Mulai Analisis AI
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-green-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-green-800 border-t border-green-700 px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive(link.to)
                    ? "bg-emerald-600 text-white"
                    : "text-green-200 hover:bg-green-700 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Link>
            ))}
            <Link
              to="/ai-advisor"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm bg-emerald-500 text-white mt-2"
            >
              <Brain className="w-4 h-4" />
              Mulai Analisis AI
            </Link>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-500 rounded-lg p-1.5">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">PuncakNusantara</span>
              </div>
              <p className="text-green-300 text-sm leading-relaxed">
                Platform edukasi dan sistem rekomendasi pendakian gunung berbasis AI dan data cuaca realtime di Indonesia.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-emerald-300">Navigasi</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-green-300 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-emerald-300">Gunung</h4>
              <ul className="space-y-2">
                {["Gede", "Semeru", "Rinjani", "Kerinci", "Merbabu"].map((g) => (
                  <li key={g}>
                    <Link to={`/mountains/${g.toLowerCase()}`} className="text-green-300 hover:text-white text-sm transition-colors">
                      Gunung {g}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-emerald-300">Sumber Data</h4>
              <ul className="space-y-2 text-green-300 text-sm">
                <li>Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)</li>
                <li>Kementerian Lingkungan Hidup dan Kehutanan</li>
                <li>Balai Besar Taman Nasional</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-green-400 text-sm">© 2026 PuncakNusantara. Dibuat untuk keselamatan para pendaki Indonesia.</p>
            <p className="text-green-400 text-sm">Data cuaca bersumber dari BMKG · Pendakian bertanggung jawab</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
