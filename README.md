# 📋 Panduan Pembuatan NPWP untuk Warga Jepara

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Tentang Proyek

Website panduan pembuatan NPWP (Nomor Pokok Wajib Pajak) yang dirancang khusus untuk membantu warga Jepara dalam memahami proses pendaftaran NPWP secara online maupun offline. Website ini dibuat dengan antarmuka yang user-friendly dan mudah dipahami, terutama untuk pengguna yang baru mengenal teknologi web.

## ✨ Fitur Utama

### 📱 **Tutorial Online**
- **12 Langkah Detail** pendaftaran NPWP melalui ereg.pajak.go.id
- **Visualisasi Interaktif** untuk setiap langkah
- **Screenshot Mockup** yang sesuai dengan tampilan asli
- **Troubleshooting** untuk masalah umum

### 🏢 **Tutorial Offline**
- **Prosedur Lengkap** pendaftaran di kantor pajak
- **Daftar Dokumen** yang perlu disiapkan
- **Tips & Trik** untuk mempermudah proses

### 📄 **Persiapan Dokumen**
- **Dokumen Wajib**: KTP, KK
- **Dokumen Tambahan**: Surat kerja, surat keterangan usaha
- **Tips Upload**: Format file, ukuran maksimal, kualitas foto

### 🔧 **Troubleshooting**
- **Solusi Masalah Umum**: Login gagal, upload error, email tidak masuk
- **Kontak Bantuan**: Helpdesk DJP, KPP Pratama Jepara
- **FAQ**: Pertanyaan yang sering diajukan

### 📞 **Kontak & Info KPP**
- **Informasi Lengkap** KPP Pratama Jepara
- **Alamat & Jam Operasional**
- **Media Sosial** resmi

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Instalasi

1. **Clone repository**
```bash
git clone https://github.com/username/panduan-npwp-jepara.git
cd panduan-npwp-jepara
```

2. **Install dependencies**
```bash
npm install
# atau
yarn install
```

3. **Jalankan development server**
```bash
npm run dev
# atau
yarn dev
```

4. **Buka browser**
```
http://localhost:5173
```

### Build untuk Production

```bash
npm run build
# atau
yarn build
```

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen reusable
│   ├── Header.tsx      # Header dengan navigasi
│   ├── Button.tsx      # Komponen button
│   ├── Card.tsx        # Komponen card
│   └── Badge.tsx       # Komponen badge
├── pages/              # Halaman utama
│   ├── Beranda.tsx     # Halaman beranda
│   ├── TutorialOnline.tsx    # Tutorial online
│   ├── TutorialOffline.tsx   # Tutorial offline
│   ├── PersiapanDokumen.tsx  # Persiapan dokumen
│   └── Troubleshooting.tsx   # Troubleshooting
├── types/              # Type definitions
└── App.tsx            # Root component
```

## 🎨 Design System

### Color Palette
- **Primary**: Navy Blue (#1E3A8A)
- **Secondary**: Golden Yellow (#F59E0B)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter, sans-serif
- **Heading**: Font weight 700-800
- **Body**: Font weight 400-500

## 📱 Responsive Design

Website ini dirancang dengan **mobile-first approach** dan mendukung:
- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px+)

## 🌟 Screenshots

### Halaman Beranda
![Beranda](https://via.placeholder.com/800x400/1E3A8A/FFFFFF?text=Halaman+Beranda)

### Tutorial Online
![Tutorial Online](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Tutorial+Online)

### Tutorial Offline
![Tutorial Offline](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Tutorial+Offline)

## 🤝 Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 👥 Tim Pengembang

- **Developer**: [Nama Anda]
- **Institution**: KPP Pratama Jepara
- **Project**: Magang Kemenkeu

## 📞 Kontak

- **Email**: [email@example.com]
- **LinkedIn**: [LinkedIn Profile]
- **GitHub**: [GitHub Profile]

## 🙏 Ucapan Terima Kasih

Terima kasih kepada:
- KPP Pratama Jepara atas bimbingan dan dukungan
- Direktorat Jenderal Pajak atas informasi dan referensi
- Komunitas React dan Tailwind CSS atas dokumentasi yang lengkap

## 📊 Statistik Proyek

![GitHub stars](https://img.shields.io/github/stars/username/panduan-npwp-jepara?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/panduan-npwp-jepara?style=social)
![GitHub issues](https://img.shields.io/github/issues/username/panduan-npwp-jepara)
![GitHub pull requests](https://img.shields.io/github/issues-pr/username/panduan-npwp-jepara)

---

⭐ **Jika proyek ini membantu Anda, jangan lupa berikan star!** ⭐

## 🔗 Link Terkait

- [Website Resmi DJP](https://www.pajak.go.id/)
- [E-Registration DJP](https://ereg.pajak.go.id/)
- [KPP Pratama Jepara](https://www.pajak.go.id/kpp-pratama-jepara)
