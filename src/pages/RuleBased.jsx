import { useState } from 'react';
import RecommendationList from '../components/RecommendationList';
import { useNavigate } from "react-router-dom";

const options = {
  berat: ['gudeg', 'soto', 'nasgor', 'angkringan', 'sate', 'miayambakso', 'naspad'],
  ringan: ['pempek', 'bakpia', 'serabi', 'rotbar', 'martabak', 'dimsum'],
  minuman: ['kopijoss', 'esthesolo', 'jusbuah', 'wronde', 'dawet', 'wuwuh'],
};

export default function RuleBased() {
  const [category, setCategory] = useState(null);
  const [jenis, setJenis] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJenisClick = async (selectedJenis) => {
    setJenis(selectedJenis);
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`http://3.106.215.1:8000/rekomendasi/rule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jenis: selectedJenis })
      });

      const text = await res.text();
      const data = JSON.parse(
        text.replace(/NaN/g, 'null').replace(/Infinity/g, 'null').replace(/-Infinity/g, 'null')
      );
      setResults(data);
    } catch (err) {
      alert('Gagal mengambil rekomendasi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full py-6 bg-green-500 text-white text-center shadow-md">
        <h1 className="text-3xl font-bold">🍴 Cicip.in</h1>
        <p className="text-sm">Aplikasi Rekomendasi Kuliner Kota Jogja</p>
      </header>

      {/* Main */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:underline text-sm"
        >
          ← Kembali ke Beranda
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">🍜 Rekomendasi Berdasarkan Jenis Makanan</h2>

        <div className="mb-10 text-center">
          {!category ? (
            <>
              <p className="font-medium mb-4">Pilih kategori makanan atau minuman:</p>
              <div className="flex justify-center flex-wrap gap-4">
                <button onClick={() => setCategory('berat')} className="bg-red-500 text-white px-4 py-2 rounded shadow">
                  Makanan Berat
                </button>
                <button onClick={() => setCategory('ringan')} className="bg-orange-500 text-white px-4 py-2 rounded shadow">
                  Cemilan
                </button>
                <button onClick={() => setCategory('minuman')} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
                  Minuman
                </button>
              </div>
            </>
          ) : !jenis ? (
            <>
              <p className="font-medium mb-4">Pilih jenis <strong>{category}</strong>:</p>
              <div className="flex justify-center flex-wrap gap-3">
                {options[category].map((j) => (
                  <button
                    key={j}
                    onClick={() => handleJenisClick(j)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition shadow-sm"
                  >
                    {j}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {(category || jenis) && (
            <div className="mt-6">
              <button
                onClick={() => {
                  setCategory(null);
                  setJenis('');
                  setResults([]);
                }}
                className="text-blue-500 hover:underline text-sm"
              >
                ← Ulangi pilihan
              </button>
            </div>
          )}
        </div>

        {/* Hasil Rekomendasi */}
        <div>
          {loading && <p className="text-gray-500 text-center mt-4">Mengambil rekomendasi...</p>}

          {!loading && results.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Hasil Rekomendasi:</h3>
              <RecommendationList items={results} />
            </>
          )}
        </div>
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
