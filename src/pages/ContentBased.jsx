import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendationList from "../components/RecommendationList";

export default function ContentBased() {
  const [allStores, setAllStores] = useState([]);
  const [randomStores, setRandomStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dataset.json
  useEffect(() => {
    fetch("/dataset.json")
      .then((res) => res.json())
      .then((data) => {
        setAllStores(data);
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setRandomStores(shuffled.slice(0, 20));
      });
  }, []);

  const handleSelect = async (tokoId) => {
    setSelectedStoreId(tokoId);
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch("https://3.106.215.1:8000/rekomendasi/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toko_id: tokoId }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(
          text
            .replace(/NaN/g, "null")
            .replace(/Infinity/g, "null")
            .replace(/-Infinity/g, "null")
        );
        setResults(data);
      } catch (err) {
        alert("Respons dari server tidak valid.");
        console.error("JSON parse error:", err);
      }
    } catch (err) {
      alert("Gagal mengambil rekomendasi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full py-6 bg-blue-500 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">🍴 Cicip.in</h1>
        <p className="text-sm">Aplikasi Rekomendasi Kuliner Kota Jogja</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:underline text-sm"
        >
          ← Kembali ke Beranda
        </button>

        <h2 className="text-2xl font-bold mb-2">Rekomendasi Berdasarkan Toko Favorit</h2>
        <p className="text-sm text-gray-600 mb-6">
          Pilih salah satu toko di bawah yang paling sesuai dengan seleramu. Jika belum cocok, refresh halaman untuk melihat toko lainnya.
        </p>

        {/* Daftar toko acak - scroll horizontal */}
        <div className="overflow-x-auto pb-2 mb-4">
          <div className="flex gap-4">
            {randomStores.map((toko) => (
              <div
                key={toko.toko_id}
                onClick={() => handleSelect(toko.toko_id)}
                className={`min-w-[240px] max-w-[240px] border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-blue-50 transition-all ${
                  selectedStoreId === toko.toko_id ? "border-blue-500 bg-blue-100 shadow-md" : ""
                }`}
              >
                <h3 className="font-semibold text-lg mb-1">{toko.Title}</h3>
                <p className="text-xs text-gray-600 mb-1">{toko.Alamat}</p>
                <p className="text-sm mb-1">⭐ {toko.Rating} | 💬 {toko.Review} ulasan</p>
                <p className="text-sm text-gray-500">{toko.Harga}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500 mt-4 animate-pulse">Mengambil rekomendasi...</p>
        )}

        {/* Rekomendasi */}
        {!loading && results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Toko yang Mungkin Kamu Suka:</h3>
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
