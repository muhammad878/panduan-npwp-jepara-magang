import { useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ChevronLeft, ExternalLink, Search } from 'lucide-react';

interface TroubleshootingProps {
  onNavigate: (page: string) => void;
}

type Category = 'website' | 'akun' | 'upload' | 'verifikasi' | 'faq';

interface Problem {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  solutions: string[];
}

const problems: Problem[] = [
  {
    id: 'otp-tidak-masuk',
    title: 'OTP Tidak Masuk',
    description: 'Kode OTP tidak diterima via email atau SMS saat verifikasi',
    category: 'akun',
    tags: ['OTP', 'Verifikasi', 'Email'],
    solutions: [
      'Cek folder Spam/Junk di email Anda',
      'Tunggu hingga 5-10 menit, kadang ada delay pengiriman',
      'Gunakan fitur "Kirim Ulang OTP" jika sudah lebih dari 10 menit',
      'Pastikan email dan nomor HP yang didaftarkan benar',
      'Coba gunakan email alternatif jika terus gagal',
      'Hubungi helpdesk DJP jika masih tidak masuk setelah beberapa kali percobaan'
    ]
  },
  {
    id: 'gagal-upload-file',
    title: 'Gagal Upload Dokumen',
    description: 'File dokumen tidak bisa diupload atau selalu gagal',
    category: 'upload',
    tags: ['Upload', 'Dokumen', 'File'],
    solutions: [
      'Cek ukuran file (maksimal 2MB per file)',
      'Kompres file jika terlalu besar menggunakan tools online gratis',
      'Pastikan format file sesuai: JPG, PNG, atau PDF',
      'Coba ganti format file (JPG ke PNG atau sebaliknya)',
      'Hapus cache browser atau gunakan mode incognito',
      'Ganti browser (Chrome, Firefox, atau Edge)',
      'Pastikan koneksi internet stabil',
      'Coba upload di waktu berbeda (hindari jam sibuk 12:00-14:00)'
    ]
  },
  {
    id: 'halaman-tidak-bisa-dibuka',
    title: 'Halaman Tidak Bisa Dibuka',
    description: 'Website pendaftaran NPWP error atau tidak bisa diakses',
    category: 'website',
    tags: ['Website', 'Error', 'Koneksi'],
    solutions: [
      'Cek koneksi internet Anda',
      'Refresh halaman dengan tekan Ctrl+F5 (Windows) atau Cmd+Shift+R (Mac)',
      'Hapus cache dan cookies browser',
      'Coba gunakan mode incognito/private browsing',
      'Ganti browser (Chrome, Firefox, Edge)',
      'Coba akses di waktu berbeda (hindari jam sibuk pagi dan siang)',
      'Gunakan jaringan internet berbeda (WiFi ke mobile data atau sebaliknya)',
      'Pastikan tidak ada pemblokiran dari antivirus/firewall'
    ]
  },
  {
    id: 'nik-tidak-valid',
    title: 'NIK Tidak Valid atau Tidak Ditemukan',
    description: 'Sistem menolak NIK yang diinput saat pendaftaran',
    category: 'verifikasi',
    tags: ['NIK', 'KTP', 'Validasi'],
    solutions: [
      'Pastikan NIK terdiri dari 16 digit angka',
      'Cek ulang NIK di KTP fisik Anda (tidak ada yang terlewat)',
      'Jangan tambahkan spasi, tanda baca, atau karakter lain',
      'Pastikan KTP masih berlaku (tidak kadaluarsa)',
      'Jika KTP baru, tunggu beberapa hari agar data terintegrasi di sistem nasional',
      'Hubungi Dukcapil setempat untuk memastikan NIK sudah terdaftar di sistem',
      'Jika KTP baru cetak ulang, beri jeda 7-14 hari sebelum daftar NPWP'
    ]
  },
  {
    id: 'password-tidak-bisa-dibuat',
    title: 'Password Tidak Memenuhi Syarat',
    description: 'Sistem menolak password yang dibuat saat registrasi',
    category: 'akun',
    tags: ['Password', 'Akun', 'Registrasi'],
    solutions: [
      'Pastikan password minimal 8 karakter',
      'Gunakan kombinasi huruf besar (A-Z)',
      'Gunakan kombinasi huruf kecil (a-z)',
      'Tambahkan angka (0-9)',
      'Tambahkan simbol/karakter khusus (!@#$%^&*)',
      'Jangan gunakan spasi di password',
      'Contoh password kuat: Pajak2024!@'
    ]
  },
  {
    id: 'email-verifikasi-tidak-masuk',
    title: 'Email Verifikasi Tidak Masuk',
    description: 'Link verifikasi akun tidak diterima di email',
    category: 'akun',
    tags: ['Email', 'Verifikasi', 'Aktivasi'],
    solutions: [
      'Cek folder Spam, Junk, atau Promosi di email',
      'Tunggu hingga 10-15 menit',
      'Gunakan fitur "Kirim Ulang Email Verifikasi"',
      'Pastikan email yang didaftarkan benar dan aktif',
      'Coba gunakan email dari provider berbeda (Gmail, Yahoo, Outlook)',
      'Whitelist alamat email dari domain pajak.go.id',
      'Hubungi helpdesk jika setelah 1 jam belum masuk'
    ]
  },
  {
    id: 'data-sudah-terdaftar',
    title: 'Data Sudah Terdaftar',
    description: 'Sistem menunjukkan NIK/data sudah pernah didaftarkan',
    category: 'verifikasi',
    tags: ['Duplikat', 'NIK', 'Terdaftar'],
    solutions: [
      'Cek apakah Anda sudah pernah membuat NPWP sebelumnya',
      'Gunakan fitur "Cek NPWP" dengan NIK untuk melihat status',
      'Jika lupa pernah daftar, gunakan fitur "Lupa NPWP"',
      'Jika yakin belum pernah daftar, hubungi KPP terdekat',
      'Bawa KTP asli ke KPP untuk pengecekan dan klarifikasi',
      'Mungkin ada kesalahan sistem, petugas KPP bisa membantu reset'
    ]
  },
  {
    id: 'status-tidak-berubah',
    title: 'Status Pengajuan Tidak Berubah Lama',
    description: 'Status masih "Diproses" lebih dari 5 hari kerja',
    category: 'verifikasi',
    tags: ['Status', 'Proses', 'Menunggu'],
    solutions: [
      'Proses normal memakan waktu 1-5 hari kerja',
      'Cek apakah ada hari libur nasional/cuti bersama',
      'Login dan cek apakah ada notifikasi/catatan dari petugas',
      'Cek email apakah ada permintaan perbaikan dokumen',
      'Jika lebih dari 7 hari kerja, hubungi KPP via telepon',
      'Siapkan nomor registrasi saat menghubungi KPP',
      'Jika urgent, datang langsung ke KPP dengan bukti pendaftaran'
    ]
  },
  {
    id: 'dokumen-ditolak',
    title: 'Dokumen Ditolak atau Tidak Jelas',
    description: 'Petugas meminta upload ulang dokumen',
    category: 'upload',
    tags: ['Dokumen', 'Ditolak', 'Upload Ulang'],
    solutions: [
      'Baca catatan dari petugas dengan teliti',
      'Pastikan foto/scan dokumen tidak blur',
      'Pastikan semua bagian dokumen terlihat (tidak terpotong)',
      'Gunakan pencahayaan yang cukup saat foto',
      'Hindari bayangan atau pantulan cahaya',
      'Gunakan scanner jika memungkinkan (lebih jelas dari foto)',
      'Format file PNG biasanya lebih jelas dari JPG',
      'Upload ulang dengan kualitas lebih baik'
    ]
  },
  {
    id: 'lupa-nomor-npwp',
    title: 'Lupa Nomor NPWP',
    description: 'Sudah punya NPWP tapi lupa nomornya',
    category: 'faq',
    tags: ['NPWP', 'Lupa', 'Nomor'],
    solutions: [
      'Cari email konfirmasi saat pertama kali mendaftar',
      'Gunakan fitur "Cek NPWP" di website DJP dengan input NIK',
      'Login ke akun DJP Online, nomor NPWP ada di profil',
      'Cek dokumen lama yang pernah pakai NPWP (SPT, slip gaji, dll)',
      'Hubungi KPP tempat Anda terdaftar dengan membawa KTP',
      'Datang langsung ke KPP terdekat untuk cetak ulang kartu'
    ]
  },
  {
    id: 'tidak-dapat-kartu-fisik',
    title: 'Tidak Dapat Kartu NPWP Fisik',
    description: 'Sudah disetujui tapi kartu fisik belum diterima',
    category: 'faq',
    tags: ['Kartu', 'Fisik', 'Cetak'],
    solutions: [
      'Kartu fisik tidak otomatis dikirim, harus diambil sendiri',
      'Download kartu NPWP digital dari website DJP (format PDF)',
      'Kartu digital sama sahnya dengan kartu fisik',
      'Jika butuh kartu fisik, datang ke KPP dengan KTP dan kartu digital',
      'KPP akan cetak kartu fisik saat itu juga (gratis)',
      'Nomor NPWP bisa langsung digunakan meski belum ada kartu'
    ]
  },
  {
    id: 'error-500-503',
    title: 'Error 500 atau 503',
    description: 'Muncul pesan error server saat mengakses website',
    category: 'website',
    tags: ['Error', 'Server', '500', '503'],
    solutions: [
      'Error 500/503 artinya server sedang sibuk atau maintenance',
      'Tunggu 15-30 menit dan coba lagi',
      'Hindari akses di jam sibuk (pagi 08:00-10:00, siang 12:00-14:00)',
      'Coba akses di malam hari (19:00-22:00) untuk server lebih kosong',
      'Cek sosial media resmi DJP untuk info maintenance',
      'Jika urgent, pertimbangkan daftar offline ke KPP'
    ]
  }
];

const categories = [
  { id: 'website' as Category, label: 'Website/Sistem', color: 'bg-blue-100 text-blue-700' },
  { id: 'akun' as Category, label: 'Akun & OTP', color: 'bg-green-100 text-green-700' },
  { id: 'upload' as Category, label: 'Upload Dokumen', color: 'bg-amber-100 text-amber-700' },
  { id: 'verifikasi' as Category, label: 'Verifikasi/Status', color: 'bg-purple-100 text-purple-700' },
  { id: 'faq' as Category, label: 'FAQ Umum', color: 'bg-gray-100 text-gray-700' }
];

export function Troubleshooting({ onNavigate }: TroubleshootingProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = activeCategory === 'all' || problem.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] rounded-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="secondary"
              onClick={() => onNavigate('beranda')}
              className="bg-white text-[#1E3A8A] hover:bg-[#F59E0B] hover:text-white border-0 text-sm px-3 py-2"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Kembali
            </Button>
            <span className="bg-white text-[#1E3A8A] border-white px-3 py-1.5 text-xs font-semibold rounded-lg border">Bantuan</span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] md:text-[32px] font-bold mb-2 md:mb-3">
            Troubleshooting
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
            Solusi untuk masalah umum yang sering terjadi saat pendaftaran NPWP
          </p>
        </div>

        {/* Search Section */}
        <div className="relative mb-6 md:mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Cari masalah... (contoh: OTP, upload, error)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-[#1E3A8A]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-sm sm:text-base md:text-lg"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-200 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#F59E0B] ${
              activeCategory === 'all'
                ? 'bg-[#1E3A8A] text-white shadow-lg'
                : 'bg-white text-[#6B7280] border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] hover:text-[#1E3A8A]'
            }`}
          >
            Semua
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-200 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#F59E0B] ${
                activeCategory === cat.id
                  ? 'bg-[#1E3A8A] text-white shadow-lg'
                  : 'bg-white text-[#6B7280] border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] hover:text-[#1E3A8A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filteredProblems.length === 0 ? (
          <Card className="text-center py-12 md:py-16 border-2 border-[#1E3A8A]/10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#6B7280] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <p className="text-[#6B7280] mb-4 md:mb-6 text-sm sm:text-base md:text-lg">Tidak ada hasil yang cocok dengan pencarian Anda</p>
            <Button 
              variant="secondary" 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold"
            >
              Reset Filter
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredProblems.map(problem => {
              const category = categories.find(c => c.id === problem.category);
              return (
                <Card key={problem.id} className="hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B]">
                  <div className="mb-4 md:mb-6">
                    {category && (
                      <span className={`${
                        problem.category === 'website' ? 'bg-[#1E3A8A] text-white' :
                        problem.category === 'akun' ? 'bg-[#059669] text-white' :
                        problem.category === 'upload' ? 'bg-[#F59E0B] text-white' :
                        problem.category === 'verifikasi' ? 'bg-[#8B5CF6] text-white' :
                        'bg-[#6B7280] text-white'
                      } border-0 mb-3 md:mb-4 px-3 py-1.5 text-xs font-semibold rounded-lg border`}>
                        {category.label}
                      </span>
                    )}
                    <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[#1E3A8A] mb-2 md:mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-3 md:mb-4">
                      {problem.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 md:mb-6">
                      {problem.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-1 bg-[#F8FAFC] text-[#6B7280] rounded-lg text-xs sm:text-sm border border-[#1E3A8A]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full text-sm sm:text-base font-semibold py-2.5 sm:py-3 md:py-4"
                    onClick={() => setSelectedProblem(problem)}
                  >
                    Lihat Solusi
                  </Button>
                </Card>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 md:mt-12 bg-gradient-to-br from-[#F8FAFC] to-white border-2 border-[#1E3A8A]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F59E0B] rounded-full flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#1E3A8A]">
                  Masih Butuh Bantuan?
                </h2>
              </div>
              <p className="text-[#6B7280] text-sm sm:text-base md:text-lg leading-relaxed">
                Hubungi KPP Pratama Jepara untuk bantuan langsung dari petugas pajak.
              </p>
            </div>
            <Button
              className="bg-[#1E3A8A] hover:bg-[#F59E0B] text-white border-0 flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap"
              onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
            >
              Kontak KPP Jepara
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      {selectedProblem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedProblem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <span className={`${categories.find(c => c.id === selectedProblem.category)?.color} border-0 mb-2 sm:mb-3 px-3 py-1.5 text-xs font-semibold rounded-lg border`}>
                    {categories.find(c => c.id === selectedProblem.category)?.label}
                  </span>
                  <h2 className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-bold text-[#1E293B] mb-1 sm:mb-2">
                    {selectedProblem.title}
                  </h2>
                  <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
                    {selectedProblem.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 ml-3 sm:ml-4 rounded-lg hover:bg-[#F5F7FA] flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066CC] text-lg sm:text-xl"
                >
                  ×
                </button>
              </div>

              <div className="mb-3 sm:mb-4">
                <h3 className="font-semibold text-[#1E293B] text-sm sm:text-base mb-2 sm:mb-3">Solusi:</h3>
                <ol className="space-y-2 sm:space-y-3">
                  {selectedProblem.solutions.map((solution, index) => (
                    <li key={index} className="flex gap-2 sm:gap-3">
                      <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#0066CC] text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-[#334155] text-sm sm:text-base leading-relaxed pt-0.5">{solution}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-[#E2E8F0]">
                <Button variant="secondary" onClick={() => setSelectedProblem(null)} className="flex-1 text-sm sm:text-base py-2.5 sm:py-3">
                  Tutup
                </Button>
                <Button
                  variant="primary"
                  onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
                  className="flex-1 text-sm sm:text-base py-2.5 sm:py-3"
                >
                  Hubungi KPP
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
