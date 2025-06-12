import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gray-50">
      {/* Header */}
      <header className="w-full py-6 bg-blue-600 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold tracking-wide">🍴 Cicip.in</h1>
        <p className="text-sm opacity-90">Aplikasi Rekomendasi Kuliner Kota Jogja</p>
      </header>


      {/* Main Content */}
      <main className="flex flex-col items-center px-6 py-10 text-center space-y-8">
        <img
          src="../../kuliner-jogja.png" // Ganti sesuai preferensi
          alt="Kuliner Jogja"
          className="w-full max-w-xl rounded-2xl shadow-lg"
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang di Cicip.in! 🎉</h2>
          <p className="text-gray-600">
            Temukan tempat makan favoritmu di Jogja lewat rekomendasi pintar kami. Yuk mulai pilih berdasarkan preferensimu!
          </p>
        </div>

        {/* Pilihan Navigasi */}
        <div className="space-y-4 w-full max-w-md">
          <Link to="/content" className="block bg-sky-500 text-white py-3 rounded-lg shadow hover:bg-sky-600 transition">
            🍱 Rekomendasi Berdasarkan Toko yang Kamu Sukai
          </Link>
          <Link to="/rule" className="block bg-teal-500 text-white py-3 rounded-lg shadow hover:bg-teal-600 transition">
            🍜 Berdasarkan Jenis Makanan yang Kamu Pilih
          </Link>
          <Link to="/location" className="block bg-emerald-500 text-white py-3 rounded-lg shadow hover:bg-emerald-600 transition">
            📍 Berdasarkan Lokasi Terdekat & Rating
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-white bg-blue-900 mt-12">
        <p className="mb-1">
          👨‍💻 Dibuat oleh <strong>Tim Cicip.in</strong> | 
          <a 
            href="mailto:mc008d5y2338@student.devacademy.id" 
            className="underline hover:text-blue-300 ml-1"
          >
            ✉️ Hubungi Kami
          </a>
        </p>
        <p className="mb-1">
          🛠️ Source code: 
          <a 
            href="https://github.com/cicipin/febe" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:text-purple-300 ml-1"
          >
            GitHub
          </a>
        </p>
        <p className="text-xs mt-2 opacity-80">© 2025 <strong>Cicip.in</strong>. All rights reserved.</p>
      </footer>
    </div>
  );
}
