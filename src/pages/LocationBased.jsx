import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendationList from "../components/RecommendationList";

export default function LocationBased() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocationAndRecommend = () => {
      if (!navigator.geolocation) {
        alert("Geolocation tidak didukung browser ini.");
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const res = await fetch("https://3.106.215.1:8000/rekomendasi/location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lat: latitude, lon: longitude }),
            });

            let data = [];
            try {
              const text = await res.text();
              const parsed = JSON.parse(
                text
                  .replace(/NaN/g, "null")
                  .replace(/Infinity/g, "null")
                  .replace(/-Infinity/g, "null")
              );

              data = Array.isArray(parsed) ? parsed : [];
            } catch (err) {
              console.error("Gagal parse JSON:", err);
              data = [];
            }

            setResults(data);
          } catch (err) {
            alert("Gagal mengambil rekomendasi.");
            console.error(err);
            setResults([]);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          alert("Gagal mendapatkan lokasi.");
          console.error(error);
          setLoading(false);
        }
      );
    };

    fetchLocationAndRecommend();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full py-6 bg-yellow-500 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">🍴 Cicip.in</h1>
        <p className="text-sm">Aplikasi Rekomendasi Kuliner Kota Jogja</p>
      </header>

      {/* Main */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:underline text-sm"
        >
          ← Kembali ke Beranda
        </button>

        <h2 className="text-2xl font-bold mb-4">📍 Rekomendasi Berdasarkan Lokasi Anda</h2>
        <p className="text-sm text-gray-600 mb-4">
          Sistem kami akan mendeteksi lokasi kamu saat ini dan menampilkan rekomendasi tempat makan terdekat dengan rating tinggi.
        </p>

        {loading ? (
          <p className="text-gray-600 animate-pulse">Mengambil rekomendasi berdasarkan lokasi Anda...</p>
        ) : results.length === 0 ? (
          <p className="text-red-600">
            Lokasi terlalu jauh untuk dijangkau. Sistem ini dikhususkan untuk pengguna di Kota Jogja.
          </p>
        ) : (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Tempat yang Direkomendasikan:</h3>
            <RecommendationList items={results} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-sm text-gray-600 border-t bg-white">
        <p className="mb-1">
          👨‍💻 Dibuat oleh <strong>Tim Cicip.in</strong> |{" "}
          <a
            href="mailto:mc008d5y2338@student.devacademy.id"
            className="text-blue-600 hover:underline"
          >
            ✉️ Hubungi Kami
          </a>
        </p>
        <p className="mb-1">
          🛠️ Source code:{" "}
          <a
            href="https://github.com/cicipin/febe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            GitHub
          </a>
        </p>
        <p className="text-xs mt-2">© 2025 <strong>Cicip.in</strong>. All rights reserved.</p>
      </footer>
    </div>
  );
}
