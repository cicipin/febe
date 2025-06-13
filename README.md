# 🌐 Cicip.In - Frontend Aplikasi Rekomendasi Kuliner Jogja

**Cicip.In** adalah aplikasi web interaktif yang memberikan rekomendasi kuliner terbaik di Kota Yogyakarta. Sistem ini mengandalkan 3 pendekatan utama dalam memberikan rekomendasi:
- 🔎 **Content-Based Filtering** (berdasarkan kesamaan toko)
- 📋 **Rule-Based Filtering** (berdasarkan input jenis makanan)
- 📍 **Location-Based Filtering** (berdasarkan jarak pengguna)

Frontend ini dibangun menggunakan **React.js** dengan **Tailwind CSS**, dan terintegrasi dengan backend berbasis Flask & TensorFlow.

---

## 🚀 Fitur Utama

- UI interaktif & ringan
- Peta rekomendasi berdasarkan lokasi pengguna
- Form input sederhana & cepat
- Terhubung langsung ke API rekomendasi
- Navigasi halaman per kategori (content, rule, location)

---

## 📸 Tampilan Aplikasi

Berikut adalah salah satu tampilan dari aplikasi Cicip.In:

![aplikasi1](/public/ss1.png)
![aplikasi2](/public/ss2.png)
![aplikasi3](/public/ss3.png)
![aplikasi4](/public/ss4.png)
![aplikasi5](/public/ss5.png)
![aplikasi6](/public/ss6.png)

---

## 📁 Struktur Folder

```
public/
├── dataset.json
├── index.html
├── kuliner-jogja.png
└── vite.svg

src/
├── assets/
├── components/
│   ├── MapComponent.jsx
│   └── RecommendationList.jsx
├── pages/
│   ├── ContentBased.jsx
│   ├── RuleBased.jsx
│   ├── LocationBased.jsx
│   └── Home.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🛠️ Cara Menjalankan di Lokal

### 1. Clone repositori
```bash
git clone https://github.com/cicipin/febe.git
cd frontend-cicipin
```

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan server
```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:5173](http://localhost:5173)

---

## 🔗 Koneksi ke Backend API

Frontend akan otomatis terhubung ke API publik:

```
http://cicipin-api.duckdns.org/
```

API ini digunakan untuk semua metode rekomendasi:  
`/rekomendasi/content`, `/rekomendasi/rule`, dan `/rekomendasi/location`.

---

## 🧪 Build untuk Produksi

```bash
npm run build
```

---

## 📄 Lisensi & Kontribusi

Proyek ini dikembangkan sebagai bagian dari submission pembelajaran.  
Kontribusi dan feedback dipersilakan melalui issues & pull request.

---

## 📬 Kontak

Untuk pertanyaan atau kolaborasi:
📧 mc008d5y2338@student.devacademy.id

---

Terima kasih telah menggunakan Cicip.In! 🍴
