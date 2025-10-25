import { useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Accordion } from '../components/Accordion';
import { ChevronLeft, ChevronRight, Check, ExternalLink } from 'lucide-react';

interface TutorialOnlineProps {
  onNavigate: (page: string) => void;
}

const steps = [
  {
    id: 1,
    title: 'Aktivasi - Akses Website Pendaftaran',
    description: 'Buka website resmi ereg.pajak.go.id untuk memulai proses pendaftaran NPWP online.',
    instructions: [
      'Buka browser (Chrome, Firefox, atau Edge)',
      'Ketik "ereg.pajak.go.id" pada address bar browser',
      'Tekan Enter atau klik tombol Go',
      'Tunggu halaman login muncul',
      'Pastikan URL yang muncul adalah "ereg.pajak.go.id/login"',
      'Jika belum punya akun, klik tombol daftar (ikon bulat kuning)'
    ],
    notes: {
      type: 'info' as const,
      content: 'Gunakan browser terbaru dan pastikan koneksi internet stabil. Website ini adalah portal resmi DJP untuk pendaftaran NPWP online.'
    },
    troubleshooting: [
      { q: 'Halaman tidak bisa dibuka', a: 'Coba gunakan mode incognito atau hapus cache browser. Jika masih gagal, coba di waktu berbeda atau gunakan jaringan internet lain.' },
      { q: 'Muncul peringatan keamanan', a: 'Pastikan URL benar dan dimulai dengan https://. Jangan lanjutkan jika ada warning SSL/TLS.' },
      { q: 'Tidak muncul halaman login', a: 'Pastikan mengetik URL dengan benar: ereg.pajak.go.id (bukan pajak.go.id). Refresh halaman jika perlu.' }
    ]
  },
  {
    id: 2,
    title: 'Isikan Email dan Captcha',
    description: 'Langkah 2 dari proses aktivasi - isi email aktif dan kode captcha untuk pendaftaran akun.',
    instructions: [
      'Pastikan Anda sudah di halaman "Pendaftaran Akun (Langkah 1 dari 2)"',
      'Isi alamat email aktif yang sering Anda cek',
      'Pastikan email yang dimasukkan adalah email yang masih aktif',
      'Email ini akan digunakan untuk proses pendaftaran NPWP',
      'Lihat gambar captcha yang muncul',
      'Tulis kode captcha yang terlihat di kolom captcha',
      'Klik tombol "Kembali" jika ingin kembali ke halaman sebelumnya',
      'Sistem akan melakukan verifikasi status keaktifan email'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Pastikan email yang dimasukkan adalah email yang masih aktif dan akan digunakan pada proses pendaftaran NPWP. Sistem akan melakukan verifikasi terhadap status keaktifan email Anda.'
    },
    troubleshooting: [
      { q: 'Email tidak valid', a: 'Pastikan format email benar (contoh: nama@email.com). Cek apakah email masih aktif dengan mengirim test email.' },
      { q: 'Captcha tidak terbaca', a: 'Refresh halaman untuk mendapatkan captcha baru. Pastikan koneksi internet stabil.' },
      { q: 'Email sudah terdaftar', a: 'Jika email sudah terdaftar, gunakan fitur "Lupa Password" atau gunakan email alternatif.' }
    ]
  },
  {
    id: 3,
    title: 'Verifikasi Email',
    description: 'Langkah 3 dari proses aktivasi - periksa email dan klik link verifikasi yang dikirim sistem.',
    instructions: [
      'Sistem akan mengirim email verifikasi ke alamat email yang Anda masukkan',
      'Buka aplikasi email atau website email Anda (Gmail, Yahoo, Outlook, dll)',
      'Cari email dari sistem DJP dengan subjek "Verifikasi Email"',
      'Jika tidak ada di inbox, cek folder Spam/Junk',
      'Buka email tersebut dan baca isinya',
      'Klik link verifikasi yang ada di dalam email',
      'Tunggu halaman konfirmasi muncul di browser',
      'Jika link tidak bisa diklik, copy-paste link ke browser'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Email verifikasi biasanya masuk dalam 5-10 menit. Jika lebih dari 15 menit belum masuk, cek folder Spam atau gunakan fitur "Kirim Ulang Email".'
    },
    troubleshooting: [
      { q: 'Email verifikasi tidak masuk', a: 'Cek folder Spam/Junk. Tunggu 5-10 menit. Jika belum masuk, gunakan fitur "Kirim Ulang Email" atau coba email alternatif.' },
      { q: 'Link verifikasi tidak bisa diklik', a: 'Copy-paste link ke browser baru. Pastikan link lengkap dan tidak terpotong.' },
      { q: 'Link verifikasi sudah kadaluarsa', a: 'Minta kirim ulang email verifikasi. Link biasanya berlaku 24 jam.' }
    ]
  },
  {
    id: 4,
    title: 'Isikan Identitas Anda',
    description: 'Langkah 4 dari proses aktivasi - lengkapi formulir pendaftaran akun dengan data identitas yang akurat.',
    instructions: [
      'Pastikan Anda sudah di halaman "Pendaftaran Akun (Langkah 2 dari 2)"',
      'Baca pesan selamat: "Selamat, email anda telah terverifikasi untuk Anda gunakan"',
      'Pilih "Jenis WP": Orang Pribadi (untuk individu)',
      'Isi "Nama Sesuai KTP" dengan nama lengkap tanpa gelar',
      'Email sudah terisi otomatis dari langkah sebelumnya',
      'Buat password yang kuat (minimal 8 karakter)',
      'Ulangi password yang sama di kolom "Ulangi Password"',
      'Isi nomor HP aktif yang bisa dihubungi',
      'Periksa ulang semua data sebelum melanjutkan'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Tuliskan nama anda dengan lengkap dan benar TANPA gelar. Email ini diambilkan dari email yang Anda daftarkan dan adalah email yang masih aktif.'
    },
    troubleshooting: [
      { q: 'Nama tidak bisa diinput', a: 'Jangan pakai gelar (S.T., S.E., dll). Gunakan nama lengkap di KTP tanpa gelar akademik atau keagamaan.' },
      { q: 'Password tidak sesuai', a: 'Pastikan password dan ulangi password sama persis. Password minimal 8 karakter dengan kombinasi huruf dan angka.' },
      { q: 'Nomor HP tidak valid', a: 'Pastikan nomor HP aktif dan bisa dihubungi. Gunakan format 08xx-xxxx-xxxx.' }
    ]
  },
  {
    id: 5,
    title: 'Konfirmasi Pendaftaran Akun',
    description: 'Langkah 5 dari proses aktivasi - konfirmasi bahwa pendaftaran akun telah selesai dan buka email untuk langkah selanjutnya.',
    instructions: [
      'Setelah mengisi semua data, klik tombol "Daftar" atau "Submit"',
      'Tunggu proses pendaftaran selesai (biasanya beberapa detik)',
      'Akan muncul notifikasi bahwa pendaftaran akun telah selesai',
      'Klik "Tutup" pada notifikasi yang muncul',
      'Buka kembali aplikasi email Anda',
      'Cari email konfirmasi dari sistem DJP',
      'Baca email tersebut untuk instruksi selanjutnya',
      'Simpan email konfirmasi sebagai bukti'
    ],
    notes: {
      type: 'success' as const,
      content: 'Selamat! Pendaftaran akun Anda telah berhasil. Email konfirmasi akan dikirim untuk instruksi selanjutnya.'
    },
    troubleshooting: [
      { q: 'Notifikasi tidak muncul', a: 'Tunggu beberapa detik. Jika tidak muncul, refresh halaman atau cek email langsung.' },
      { q: 'Email konfirmasi tidak masuk', a: 'Cek folder Spam/Junk. Tunggu 5-10 menit. Jika belum masuk, gunakan fitur "Kirim Ulang Email".' },
      { q: 'Tidak bisa klik tutup', a: 'Refresh halaman atau tutup tab browser dan buka email langsung.' }
    ]
  },
  {
    id: 6,
    title: 'Buka Email Aktivasi Akun',
    description: 'Langkah 6 dari proses aktivasi - buka email yang berisi link aktivasi dan klik link tersebut untuk mengaktifkan akun Anda.',
    instructions: [
      'Buka aplikasi email Anda (Gmail, Yahoo Mail, dll.)',
      'Cari email dari Direktorat Jenderal Pajak dengan subjek "Aktivasi Akun E-REGISTRATION"',
      'Jika tidak ada di inbox, cek folder Spam atau Junk Mail',
      'Buka email tersebut dan cari "Link Aktivasi"',
      'Klik "Link Aktivasi" untuk mengaktifkan akun Anda'
    ],
    notes: {
      type: 'info' as const,
      content: 'Pastikan Anda memiliki koneksi internet saat mengklik link aktivasi. Link aktivasi biasanya hanya berlaku dalam jangka waktu tertentu.'
    },
    troubleshooting: [
      { q: 'Link aktivasi tidak bisa diklik', a: 'Coba salin link dan tempel di browser. Pastikan browser Anda terbaru dan tidak ada masalah koneksi internet.' },
      { q: 'Email aktivasi tidak masuk', a: 'Tunggu beberapa menit. Cek folder spam/junk. Pastikan email yang didaftarkan benar. Jika masih tidak ada, Anda mungkin perlu mendaftar ulang atau menghubungi helpdesk DJP.' }
    ]
  },
  {
    id: 7,
    title: 'Login ke Akun E-REGISTRATION',
    description: 'Langkah 7 dari proses aktivasi - login ke akun E-REGISTRATION untuk melanjutkan pendaftaran NPWP.',
    instructions: [
      'Setelah mengklik link aktivasi, Anda akan diarahkan ke halaman login E-REGISTRATION',
      'Masukkan email dan password yang telah Anda daftarkan',
      'Isi kode keamanan (captcha) dengan benar',
      'Klik tombol "Login" untuk masuk ke akun',
      'Jika berhasil login, Anda akan masuk ke dashboard E-REGISTRATION'
    ],
    notes: {
      type: 'info' as const,
      content: 'Pastikan email dan password yang Anda masukkan sudah benar. Jika lupa password, gunakan fitur "Lupa Password?".'
    },
    troubleshooting: [
      { q: 'Tidak bisa login', a: 'Pastikan email dan password benar. Cek kembali kode captcha. Jika masih gagal, coba reset password.' },
      { q: 'Captcha tidak terbaca', a: 'Refresh halaman untuk mendapatkan captcha baru. Pastikan koneksi internet stabil.' },
      { q: 'Link aktivasi tidak mengarah ke login', a: 'Coba akses ereg.pajak.go.id/login secara manual dan login dengan email/password yang sudah didaftarkan.' }
    ]
  },
  {
    id: 8,
    title: 'Isikan Pernyataan',
    description: 'Langkah 8 dari proses pendaftaran - beri centang pada kolom pernyataan yang tersedia untuk melanjutkan pendaftaran NPWP.',
    instructions: [
      'Setelah login berhasil, Anda akan masuk ke dashboard E-REGISTRATION',
      'Cari dan klik menu "Pendaftaran NPWP" atau "Registrasi Data WP"',
      'Isi semua data yang diminta pada langkah-langkah sebelumnya',
      'Sampai pada halaman "Pernyataan"',
      'Baca dengan seksama pernyataan yang ada',
      'Beri centang pada kolom "Benar" dan "Lengkap"',
      'Pilih pernyataan tentang hak dan kewajiban perpajakan',
      'Klik tombol "Next →" untuk melanjutkan'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Pernyataan ini bersifat mengikat secara hukum. Pastikan Anda memahami semua konsekuensi sebelum memberikan pernyataan.'
    },
    troubleshooting: [
      { q: 'Tidak bisa centang checkbox', a: 'Pastikan Anda sudah mengisi semua data sebelumnya. Refresh halaman jika checkbox tidak responsif.' },
      { q: 'Tombol Next tidak aktif', a: 'Pastikan semua checkbox yang wajib sudah dicentang. Baca ulang pernyataan dengan seksama.' },
      { q: 'Tidak tahu harus pilih yang mana', a: 'Jika Anda akan aktif sebagai wajib pajak, pilih "Akan melaksanakan hak dan kewajiban". Jika belum, pilih opsi kedua.' }
    ]
  },
  {
    id: 9,
    title: 'Pemberitahuan Mengikuti Tarif Umum/PP23',
    description: 'Langkah 9 dari proses pendaftaran - beri centang pada kolom yang tersedia untuk memilih tarif pajak yang akan diikuti.',
    instructions: [
      'Setelah mengisi pernyataan, Anda akan masuk ke halaman "Pemberitahuan Mengikuti Tarif Umum/PP23"',
      'Baca dengan seksama informasi tentang Peraturan Pemerintah Nomor 23 Tahun 2018',
      'Pahami bahwa tarif pajak penghasilan final sebesar 0,5% dari omzet',
      'Pilih salah satu opsi yang tersedia:',
      '- Opsi 1: Dikenai Pajak Penghasilan sesuai PP23 Tahun 2018 (0,5%)',
      '- Opsi 2: Dikenai Pajak Penghasilan sesuai Undang-undang Pajak Penghasilan',
      'Centang kolom pilihan Anda',
      'Centang pernyataan bahwa Anda telah memahami konsekuensi pilihan',
      'Klik tombol "Simpan" untuk menyimpan pilihan'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Pilihan tarif pajak ini akan menentukan cara perhitungan pajak Anda. PP23 cocok untuk usaha kecil dengan omzet terbatas.'
    },
    troubleshooting: [
      { q: 'Tidak tahu harus pilih yang mana', a: 'Jika usaha Anda kecil dengan omzet terbatas, pilih PP23 (0,5%). Jika usaha besar atau ingin tarif umum, pilih UU Pajak Penghasilan.' },
      { q: 'Tidak bisa centang checkbox', a: 'Pastikan Anda sudah membaca semua informasi. Refresh halaman jika checkbox tidak responsif.' },
      { q: 'Tombol Simpan tidak aktif', a: 'Pastikan Anda sudah memilih salah satu opsi dan mencentang pernyataan pemahaman konsekuensi.' }
    ]
  },
  {
    id: 10,
    title: 'Kirim Permohonan dengan Token',
    description: 'Langkah 10 dari proses pendaftaran - kirim permohonan dengan mengisi token yang dikirim ke email Anda.',
    instructions: [
      'Setelah menyimpan pilihan PP23, sistem akan mengirim kode token ke email Anda',
      'Buka aplikasi email Anda dan cari email dari sistem DJP',
      'Cari kode token dalam email tersebut (contoh: hpi6jgsUS)',
      'Kembali ke halaman pendaftaran NPWP',
      'Isi kode token di kolom "Isi Token *"',
      'Pastikan kode token sesuai dengan yang ada di email (Case Sensitive)',
      'Centang checkbox pernyataan yang tersedia',
      'Klik tombol "Kirim" untuk mengirim permohonan'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Token bersifat Case Sensitive (huruf besar/kecil berpengaruh). Pastikan Anda menyalin token dengan tepat dari email.'
    },
    troubleshooting: [
      { q: 'Token tidak masuk ke email', a: 'Cek folder Spam/Junk. Tunggu 5-10 menit. Jika belum masuk, klik "Minta Token Ulang" di dashboard.' },
      { q: 'Token tidak valid', a: 'Pastikan token sesuai dengan yang ada di email. Token bersifat Case Sensitive, jadi huruf besar/kecil harus sama persis.' },
      { q: 'Tombol Kirim tidak aktif', a: 'Pastikan token sudah diisi dan checkbox pernyataan sudah dicentang. Refresh halaman jika perlu.' }
    ]
  },
  {
    id: 11,
    title: 'Selamat! NPWP Berhasil Dibuat',
    description: 'Langkah 11 dari proses pendaftaran - selamat! NPWP Anda telah berhasil dibuat dan dapat digunakan.',
    instructions: [
      'Setelah mengirim permohonan dengan token, sistem akan memproses pendaftaran Anda',
      'Tunggu beberapa saat untuk proses verifikasi otomatis',
      'Jika berhasil, Anda akan melihat halaman konfirmasi',
      'NPWP Anda akan ditampilkan dengan nomor yang unik',
      'Simpan screenshot NPWP sebagai bukti',
      'NPWP sudah bisa digunakan untuk keperluan perpajakan',
      'Anda akan menerima email konfirmasi dengan detail NPWP',
      'Simpan email konfirmasi tersebut untuk referensi'
    ],
    notes: {
      type: 'success' as const,
      content: 'Selamat! NPWP Anda telah berhasil dibuat. Nomor NPWP ini berlaku seumur hidup dan wajib digunakan untuk semua transaksi perpajakan.'
    },
    troubleshooting: [
      { q: 'NPWP tidak muncul', a: 'Tunggu beberapa menit untuk proses selesai. Refresh halaman atau login ulang. Jika masih tidak muncul, hubungi helpdesk DJP.' },
      { q: 'Nomor NPWP tidak jelas', a: 'Screenshot halaman NPWP sebagai bukti. Nomor NPWP juga akan dikirim melalui email konfirmasi.' },
      { q: 'Email konfirmasi tidak masuk', a: 'Cek folder Spam/Junk. Tunggu 10-15 menit. Jika belum masuk, login ke dashboard dan cek di menu "NPWP Saya".' }
    ]
  },
  {
    id: 12,
    title: 'Simpan dan Download NPWP',
    description: 'Langkah 12 dari proses pendaftaran - simpan dan download kartu NPWP digital untuk keperluan selanjutnya.',
    instructions: [
      'Setelah NPWP berhasil dibuat, Anda akan melihat tombol "Download NPWP"',
      'Klik tombol "Download NPWP" untuk mengunduh kartu NPWP digital',
      'File akan tersimpan dalam format PDF',
      'Simpan file NPWP di folder yang mudah diakses',
      'Beri nama file yang jelas (contoh: NPWP_[Nama]_[Tanggal])',
      'Screenshot halaman NPWP sebagai backup',
      'Simpan email konfirmasi NPWP di folder khusus',
      'NPWP digital ini memiliki kekuatan hukum yang sama dengan kartu fisik'
    ],
    notes: {
      type: 'info' as const,
      content: 'NPWP digital dapat digunakan untuk semua keperluan perpajakan. Simpan dengan aman dan jangan sampai hilang.'
    },
    troubleshooting: [
      { q: 'Tombol Download tidak muncul', a: 'Refresh halaman atau login ulang. Jika masih tidak muncul, hubungi helpdesk DJP untuk mendapatkan NPWP digital.' },
      { q: 'File tidak bisa didownload', a: 'Cek pengaturan browser yang memblokir download. Pastikan koneksi internet stabil. Coba browser lain jika perlu.' },
      { q: 'File PDF rusak', a: 'Download ulang file NPWP. Pastikan download selesai sepenuhnya sebelum membuka file.' }
    ]
  }
];

export function TutorialOnline({ onNavigate }: TutorialOnlineProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20 print:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:py-4">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] rounded-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
          <Button
            variant="secondary"
            onClick={() => onNavigate('beranda')}
              className="bg-white text-[#1E3A8A] hover:bg-[#F59E0B] hover:text-white border-0 print:hidden text-sm px-3 py-2"
          >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Kembali
          </Button>
            <span className="bg-white text-[#1E3A8A] border-white px-3 py-1.5 text-xs font-semibold rounded-lg border">{steps.length} Langkah</span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-bold mb-2 md:mb-3">
            Tutorial Pendaftaran NPWP Online
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">Ikuti setiap langkah dengan teliti untuk proses yang lancar</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8 print:hidden">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#6B7280] mb-2 sm:mb-3">
            <span className="font-medium">Progress: Langkah {currentStep + 1} dari {steps.length}</span>
            <span className="font-bold text-[#1E3A8A]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 sm:h-3 bg-[#F8FAFC] rounded-full overflow-hidden border border-[#1E3A8A]/10">
            <div
              className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          <aside className="lg:col-span-1 print:hidden order-2 lg:order-1">
            <Card className="sticky top-20 lg:top-24 border-2 border-[#1E3A8A]/10">
              <h2 className="font-bold text-[#1E3A8A] mb-4 sm:mb-6 text-base sm:text-lg">Daftar Langkah</h2>
              <div className="space-y-2 sm:space-y-3">
                {steps.map((s, index) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setCurrentStep(index);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-200 flex items-start gap-2 sm:gap-4 min-h-[48px] sm:min-h-[56px] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] ${
                      currentStep === index
                        ? 'bg-[#1E3A8A] text-white shadow-lg'
                        : currentStep > index
                        ? 'bg-[#059669]/10 text-[#059669] border border-[#059669]/20'
                        : 'hover:bg-[#F8FAFC] text-[#6B7280] border border-transparent hover:border-[#1E3A8A]/20'
                    }`}
                  >
                    <span className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                      currentStep === index
                        ? 'bg-[#F59E0B] text-white'
                        : currentStep > index
                        ? 'bg-[#059669] text-white'
                        : 'bg-[#1E3A8A] text-white'
                    }`}>
                      {currentStep > index ? <Check className="w-3 h-3 sm:w-5 sm:h-5" /> : s.id}
                    </span>
                    <span className="text-xs sm:text-sm leading-tight font-medium">{s.title}</span>
                  </button>
                ))}
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-3 order-1 lg:order-2">
            <Card className="mb-8 border-2 border-[#1E3A8A]/10">
              <div className="mb-6 sm:mb-8">
                <span className="bg-[#1E3A8A] text-white border-[#1E3A8A] mb-3 sm:mb-4 px-3 py-1.5 text-xs font-semibold rounded-lg border">Langkah {step.id}</span>
                <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-bold text-[#1E3A8A] mb-3 sm:mb-4">
                  {step.title}
                </h2>
                <p className="text-[#6B7280] text-sm sm:text-base md:text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Screenshot Section */}
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-[#F8FAFC] to-white border-2 border-[#1E3A8A]/10 rounded-xl">
                <p className="text-xs sm:text-sm text-[#1E3A8A] mb-2 sm:mb-3 font-semibold">📸 Screenshot/Ilustrasi:</p>
                {step.id === 1 ? (
                  <div className="space-y-4">
                    {/* Persiapan Dokumen */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Yang harus dipersiapkan:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#F59E0B] rounded border-2 border-[#F59E0B] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-[#1E3A8A] font-medium text-sm sm:text-base">Email</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#F59E0B] rounded border-2 border-[#F59E0B] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-[#1E3A8A] font-medium text-sm sm:text-base">Kartu Tanda Penduduk</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#F59E0B] rounded border-2 border-[#F59E0B] flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-[#1E3A8A] font-medium text-sm sm:text-base">Kartu Keluarga</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Screenshot Halaman Login */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Login ereg.pajak.go.id:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Browser Address Bar */}
                        <div className="bg-gray-200 border border-gray-300 rounded mb-4 p-2 text-left">
                          <div className="flex items-center gap-2">
                            <div className="text-gray-600 text-xs">ereg.pajak.go.id/login;eregs</div>
                            <div className="ml-auto bg-gray-400 text-white text-xs px-2 py-1 rounded">2</div>
                          </div>
                        </div>
                        
                        {/* Logo DJP */}
                        <div className="mb-4">
                          <div className="w-16 h-16 bg-[#1E3A8A] rounded-lg mx-auto flex items-center justify-center">
                            <div className="w-12 h-12 bg-[#F59E0B] rounded flex items-center justify-center">
                              <span className="text-white font-bold text-xs">DJP</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-[#1E3A8A] font-bold text-lg mb-2">Login</div>
                        <div className="space-y-2 text-left max-w-xs mx-auto">
                          <div className="bg-white border rounded p-2 text-xs flex items-center gap-2">
                            <span>👤</span>
                            <span>Email atau NPWP</span>
                          </div>
                          <div className="bg-white border rounded p-2 text-xs flex items-center gap-2">
                            <span>🔒</span>
                            <span>Password</span>
                          </div>
                          <div className="bg-white border rounded p-2 text-xs flex items-center gap-2">
                            <span>❓</span>
                            <span>Captcha</span>
                          </div>
                          <div className="bg-[#1E3A8A] text-white rounded p-2 text-xs text-center flex items-center justify-center gap-2">
                            <span>Login</span>
                            <span>➡️</span>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2 text-xs text-gray-500">
                          <div className="text-left">
                            <div className="font-semibold text-[#1E3A8A]">Lupa Password?</div>
                            <div>Klik <span className="text-[#1E3A8A] font-semibold">lupa password</span> untuk melihat password anda atau <span className="text-[#1E3A8A] font-semibold">reset</span> untuk mereset password Anda.</div>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-[#1E3A8A]">Belum punya Akun?</div>
                            <div className="flex items-center gap-2">
                              <span>Klik</span>
                              <div className="w-4 h-4 bg-[#F59E0B] rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">●</span>
                              </div>
                              <span>untuk wajib pajak baru yang belum punya akun.</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-[#1E3A8A]">Cek NPWP</div>
                            <div>Klik <span className="text-[#1E3A8A] font-semibold">cek NPWP</span> untuk cek apakah NIK sudah ber-NPWP</div>
                          </div>
                        </div>
                        
                        {/* Sidebar Icons */}
                        <div className="mt-4 flex justify-end">
                          <div className="flex flex-col gap-2">
                            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs">🐦</span>
                            </div>
                            <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                              <span className="text-white text-xs">👍</span>
                            </div>
                            <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                              <span className="text-white text-xs">📖</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 2 ? (
                  <div className="space-y-4">
                    {/* Halaman Pendaftaran Akun */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Pendaftaran Akun (Langkah 1 dari 2):</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Browser Address Bar */}
                        <div className="bg-gray-200 border border-gray-300 rounded mb-4 p-2 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-xs">🔒</span>
                            <span className="text-gray-600 text-xs">🏠</span>
                            <span className="text-gray-600 text-xs">ereg.pajak.go.id/daftar</span>
                            <div className="ml-auto flex items-center gap-1">
                              <span className="text-gray-600 text-xs">🔄</span>
                              <span className="text-gray-600 text-xs">2</span>
                              <span className="text-gray-600 text-xs">⋮</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Judul Halaman */}
                        <div className="mb-4">
                          <div className="text-[#1E3A8A] font-bold text-lg mb-2">Pendaftaran Akun</div>
                          <div className="text-[#1E3A8A] font-bold text-lg">
                            (Langkah <span className="text-red-600">1</span> dari <span className="text-red-600">2</span>)
                          </div>
                        </div>
                        
                        {/* Form Email */}
                        <div className="space-y-3 text-left max-w-xs mx-auto">
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Alamat Email<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">Alamat Email</div>
                            <div className="text-red-600 text-xs mt-1">Pastikan email yang anda masukkan adalah email yang masih aktif dan akan digunakan pada proses pendaftaran NPWP.</div>
                          </div>
                          
                          {/* Captcha */}
                          <div>
                            <div className="bg-white border rounded p-2 text-xs mb-2">
                              <div className="text-center text-red-600 font-bold">Nuj X</div>
                            </div>
                            <div className="bg-white border rounded p-2 text-xs">Captcha</div>
                          </div>
                          
                          {/* Tombol Kembali */}
                          <div className="bg-gray-300 text-gray-700 rounded p-2 text-xs text-center flex items-center justify-center gap-2">
                            <span>↻</span>
                            <span>Kembali</span>
                          </div>
                        </div>
                        
                        {/* Informasi Tambahan */}
                        <div className="mt-4 text-xs text-gray-600 text-left">
                          <div>Kami akan melakukan verifikasi terhadap status keaktifan email anda.</div>
                        </div>
                        
                        {/* Footer */}
                        <div className="mt-4 bg-gray-800 text-white text-xs text-center py-2 rounded">
                          Direktorat Jenderal Pajak © 2020
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 3 ? (
                  <div className="space-y-4">
                    {/* Smartphone dengan Notifikasi Email */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Verifikasi Email:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Smartphone */}
                        <div className="relative mx-auto w-32 h-48 bg-black rounded-2xl p-2">
                          {/* Notifikasi Email */}
                          <div className="absolute -top-2 -left-8 bg-[#1E3A8A] text-white rounded-lg p-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[#F59E0B]">📧</span>
                              <span>Email</span>
                            </div>
                          </div>
                          
                          {/* Garis Getaran */}
                          <div className="absolute -top-1 -right-2 w-4 h-1 bg-gray-400 rounded-full"></div>
                          <div className="absolute -bottom-1 -left-2 w-4 h-1 bg-gray-400 rounded-full"></div>
                          
                          {/* Screen */}
                          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-[#1E3A8A] font-bold text-xs">📱</div>
                              <div className="text-gray-600 text-xs">Smartphone</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instruksi Teks */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-bold text-sm">Anda akan menerima</div>
                          <div className="text-[#1E3A8A] font-bold text-sm">
                            Email berisi <span className="text-[#F59E0B] font-bold">link verifikasi</span>
                          </div>
                          <div className="text-[#1E3A8A] font-bold text-sm">Silahkan buka Email Anda</div>
                        </div>
                        
                        {/* Email Preview */}
                        <div className="mt-4 bg-white border rounded-lg p-3 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-semibold text-xs mb-2">📧 Email Verifikasi</div>
                          <div className="text-gray-600 text-xs mb-2">Dari: noreply@pajak.go.id</div>
                          <div className="text-gray-600 text-xs mb-2">Subjek: Verifikasi Email Pendaftaran NPWP</div>
                          <div className="text-gray-600 text-xs mb-2">Isi: Klik link berikut untuk verifikasi:</div>
                          <div className="bg-[#F59E0B]/10 text-[#1E3A8A] text-xs p-2 rounded border">
                            https://ereg.pajak.go.id/verify/...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 4 ? (
                  <div className="space-y-4">
                    {/* Halaman Pendaftaran Akun Langkah 2 dari 2 */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Pendaftaran Akun (Langkah 2 dari 2):</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Browser Address Bar */}
                        <div className="bg-gray-200 border border-gray-300 rounded mb-4 p-2 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-xs">🔒</span>
                            <span className="text-gray-600 text-xs">🏠</span>
                            <span className="text-gray-600 text-xs">ereg.pajak.go.id/pendaftaran</span>
                            <div className="ml-auto flex items-center gap-1">
                              <span className="text-gray-600 text-xs">2</span>
                              <span className="text-gray-600 text-xs">⋮</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Judul Halaman */}
                        <div className="mb-4">
                          <div className="text-[#1E3A8A] font-bold text-lg mb-2">Pendaftaran Akun</div>
                          <div className="text-[#1E3A8A] font-bold text-lg">
                            (Langkah <span className="text-red-600">2</span> dari <span className="text-red-600">2</span>)
                          </div>
                        </div>
                        
                        {/* Pesan Selamat */}
                        <div className="mb-4 bg-green-100 border border-green-300 rounded-lg p-3">
                          <div className="text-green-800 text-xs font-semibold">
                            Selamat, email anda telah terverifikasi untuk Anda gunakan
                          </div>
                        </div>
                        
                        {/* Form Fields */}
                        <div className="space-y-3 text-left max-w-xs mx-auto">
                          {/* Jenis WP */}
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Jenis WP<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">Orang Pribadi</div>
                            <div className="text-gray-600 text-xs mt-1">Jenis WP yang anda pilih disini menentukan jenis WP yang akan dapat mendaftarkan NPWP Badan.</div>
                          </div>
                          
                          {/* Nama Sesuai KTP */}
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Nama Sesuai KTP<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">[Nama Lengkap]</div>
                            <div className="text-gray-600 text-xs mt-1">Tuliskan nama anda dengan lengkap dan benar TANPA gelar</div>
                          </div>
                          
                          {/* Alamat Email */}
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Alamat Email<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">[Email yang sudah terverifikasi]</div>
                            <div className="text-gray-600 text-xs mt-1">Email ini diambilkan dari email yang Anda daftarkan dan adalah email yang masih aktif.</div>
                          </div>
                          
                          {/* Password */}
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Password<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">[Password yang dibuat]</div>
                          </div>
                          
                          {/* Ulangi Password */}
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Ulangi Password<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">[Password yang sama]</div>
                          </div>
                          
                          {/* Nomor HP */}
                          <div>
                            <div className="text-[#1E3A8A] font-semibold text-sm mb-1">Nomor HP<span className="text-red-600">*</span></div>
                            <div className="bg-white border rounded p-2 text-xs">Nomor Telepon / HP</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 5 ? (
                  <div className="space-y-4">
                    {/* Smartphone dengan Notifikasi Pendaftaran Selesai */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Konfirmasi Pendaftaran Akun:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Smartphone */}
                        <div className="relative mx-auto w-32 h-48 bg-black rounded-2xl p-2">
                          {/* Notifikasi Email */}
                          <div className="absolute -top-2 -left-8 bg-[#1E3A8A] text-white rounded-lg p-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[#F59E0B]">📧</span>
                              <span>Email</span>
                            </div>
                          </div>
                          
                          {/* Garis Getaran */}
                          <div className="absolute -top-1 -right-2 w-4 h-1 bg-gray-400 rounded-full"></div>
                          <div className="absolute -bottom-1 -left-2 w-4 h-1 bg-gray-400 rounded-full"></div>
                          
                          {/* Screen */}
                          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-[#1E3A8A] font-bold text-xs">📱</div>
                              <div className="text-gray-600 text-xs">Smartphone</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instruksi Teks */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-bold text-sm">Akan muncul</div>
                          <div className="text-[#1E3A8A] font-bold text-sm">notifikasi telah</div>
                          <div className="text-[#1E3A8A] font-bold text-sm">selesai melakukan</div>
                          <div className="text-[#F59E0B] font-bold text-sm">pendaftaran akun</div>
                        </div>
                        
                        {/* Instruksi Tambahan */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-bold text-sm">Klik tutup dan buka kembali Email</div>
                        </div>
                        
                        {/* Email Preview */}
                        <div className="mt-4 bg-white border rounded-lg p-3 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-semibold text-xs mb-2">📧 Email Konfirmasi</div>
                          <div className="text-gray-600 text-xs mb-2">Dari: noreply@pajak.go.id</div>
                          <div className="text-gray-600 text-xs mb-2">Subjek: Konfirmasi Pendaftaran Akun Berhasil</div>
                          <div className="text-gray-600 text-xs mb-2">Isi: Akun Anda telah berhasil dibuat. Silakan lanjutkan ke langkah berikutnya.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 6 ? (
                  <div className="space-y-4">
                    {/* Smartphone dengan Email Aktivasi */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Buka Email Aktivasi Akun:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Smartphone */}
                        <div className="relative mx-auto w-32 h-48 bg-black rounded-2xl p-2">
                          {/* Screen */}
                          <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                            {/* Email Icon */}
                            <div className="text-center">
                              <div className="text-[#F59E0B] text-4xl mb-2">📧</div>
                              <div className="text-[#1E3A8A] font-bold text-xs">Link Aktivasi</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instruksi Teks */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-bold text-sm">Langkah 6:</div>
                          <div className="text-[#1E3A8A] font-bold text-sm">Buka Email</div>
                          <div className="text-[#1E3A8A] font-bold text-sm">Aktivasi Akun</div>
                        </div>
                        
                        {/* Instruksi Tambahan */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-bold text-sm">Klik link aktivasi</div>
                        </div>
                        
                        {/* Email Preview */}
                        <div className="mt-4 bg-white border rounded-lg p-3 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-semibold text-xs mb-2">📧 Email Aktivasi</div>
                          <div className="text-gray-600 text-xs mb-2">Dari: noreply@pajak.go.id</div>
                          <div className="text-gray-600 text-xs mb-2">Subjek: Aktivasi Akun E-REGISTRATION</div>
                          <div className="text-gray-600 text-xs mb-2">Isi: Klik link berikut untuk mengaktifkan akun Anda:</div>
                          <div className="bg-[#F59E0B]/10 text-[#1E3A8A] text-xs p-2 rounded border">
                            https://ereg.pajak.go.id/activate/...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 7 ? (
                  <div className="space-y-4">
                    {/* Halaman Login E-REGISTRATION */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Login E-REGISTRATION:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Browser Address Bar */}
                        <div className="bg-gray-200 border border-gray-300 rounded mb-4 p-2 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-xs">🔒</span>
                            <span className="text-gray-600 text-xs">🏠</span>
                            <span className="text-gray-600 text-xs">ereg.pajak.go.id/login</span>
                            <div className="ml-auto flex items-center gap-1">
                              <span className="text-gray-600 text-xs">🔄</span>
                              <span className="text-gray-600 text-xs">2</span>
                              <span className="text-gray-600 text-xs">⋮</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* DJP Logo */}
                        <div className="mb-4">
                          <div className="w-16 h-16 mx-auto bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                            <div className="text-white font-bold text-xs">DJP</div>
                          </div>
                        </div>
                        
                        {/* Judul Login */}
                        <div className="mb-4">
                          <div className="text-[#1E3A8A] font-bold text-lg">Login</div>
                        </div>
                        
                        {/* Form Login */}
                        <div className="space-y-3 text-left max-w-xs mx-auto">
                          {/* Email/Username */}
                          <div>
                            <div className="bg-white border rounded p-2 text-xs flex items-center gap-2">
                              <span className="text-gray-600">👤</span>
                              <span className="text-gray-500">Email / NPWP</span>
                            </div>
                          </div>
                          
                          {/* Password */}
                          <div>
                            <div className="bg-white border rounded p-2 text-xs flex items-center gap-2">
                              <span className="text-gray-600">🔒</span>
                              <span className="text-gray-500">Password</span>
                            </div>
                          </div>
                          
                          {/* Captcha */}
                          <div>
                            <div className="bg-white border rounded p-2 text-xs mb-2">
                              <div className="text-center text-red-600 font-bold">v2hLb</div>
                            </div>
                            <div className="bg-white border rounded p-2 text-xs flex items-center gap-2">
                              <span className="text-gray-600">?</span>
                              <span className="text-gray-500">Captcha</span>
                            </div>
                          </div>
                          
                          {/* Login Button */}
                          <div className="bg-[#1E3A8A] text-white rounded p-2 text-xs text-center flex items-center justify-center gap-2">
                            <span>Login</span>
                            <span>⟲</span>
                          </div>
                        </div>
                        
                        {/* Helper Links */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-gray-600 text-xs">
                            <span className="text-[#1E3A8A] font-semibold">Lupa Password?</span>
                          </div>
                          <div className="text-gray-600 text-xs">
                            <span className="text-[#1E3A8A] font-semibold">Belum punya Akun?</span>
                            <span className="text-[#F59E0B] font-semibold"> daftar</span>
                          </div>
                          <div className="text-gray-600 text-xs">
                            <span className="text-[#1E3A8A] font-semibold">Cek NPWP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 8 ? (
                  <div className="space-y-4">
                    {/* Halaman Pernyataan */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Pernyataan:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}}></div>
                          </div>
                        </div>
                        
                        {/* Judul Pernyataan */}
                        <div className="mb-4">
                          <div className="text-[#1E3A8A] font-bold text-lg">Pernyataan</div>
                        </div>
                        
                        {/* Pernyataan Pertama */}
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-4">
                          <div className="text-gray-700 text-xs leading-relaxed">
                            Dengan menyadari sepenuhnya akan segala akibatnya termasuk sanksi-sanksi sesuai dengan ketentuan perundang-undangan yang berlaku saya menyatakan bahwa apa yang telah saya beritahukan di atas adalah:
                          </div>
                          
                          {/* Checkbox Benar */}
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-gray-700 text-xs">Benar</span>
                          </div>
                          
                          {/* Checkbox Lengkap */}
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-gray-700 text-xs">Lengkap</span>
                          </div>
                        </div>
                        
                        {/* Pernyataan Kedua */}
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-4">
                          <div className="text-gray-700 text-xs font-semibold">
                            Dengan terbitnya NPWP, saya menyatakan:
                          </div>
                          
                          {/* Radio Button 1 */}
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-gray-700 text-xs leading-relaxed">
                              Akan melaksanakan hak dan kewajiban sesuai dengan ketentuan peraturan perundang-undangan di bidang perpajakan
                            </span>
                          </div>
                          
                          {/* Radio Button 2 */}
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded"></div>
                            <span className="text-gray-700 text-xs leading-relaxed">
                              Belum akan melaksanakan hak dan kewajiban sesuai dengan ketentuan peraturan perundang-undangan di bidang perpajakan dengan alasan belum terpenuhi syarat objektif sebagai Wajib Pajak
                            </span>
                          </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-2">
                          <div className="bg-[#1E3A8A] text-white rounded p-2 text-xs text-center flex-1">
                            ← Prev
                          </div>
                          <div className="bg-[#1E3A8A] text-white rounded p-2 text-xs text-center flex-1">
                            Next →
                          </div>
                        </div>
                        
                        {/* Success Banner */}
                        <div className="mt-4 bg-green-500 text-white text-xs text-center py-2 rounded">
                          Data Berhasil Disimpan
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 9 ? (
                  <div className="space-y-4">
                    {/* Halaman PP23 */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Pemberitahuan Mengikuti Tarif Umum/PP23:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Judul PP23 */}
                        <div className="mb-4">
                          <div className="text-[#1E3A8A] font-bold text-lg">Pemberitahuan Mengikuti</div>
                          <div className="text-[#F59E0B] font-bold text-lg">Tarif Umum/PP23</div>
                        </div>
                        
                        {/* Informasi PP23 */}
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-4">
                          <div className="text-gray-700 text-xs leading-relaxed">
                            Peraturan Pemerintah Nomor 23 Tahun 2018 menyatakan bahwa Wajib Pajak yang memenuhi kriteria tertentu dikenai Pajak Penghasilan final sebesar 0,5% dari omzet.
                          </div>
                          
                          <div className="text-gray-700 text-xs font-semibold">
                            Setelah membaca dan memahami ketentuan dimaksud, Saya memilih untuk:
                          </div>
                          
                          {/* Opsi 1 */}
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
                            <span className="text-gray-700 text-xs leading-relaxed">
                              Dikenai Pajak Penghasilan sesuai ketentuan dalam Peraturan Pemerintah Nomor 23 Tahun 2018 sebesar 0,5%
                            </span>
                          </div>
                          
                          {/* Opsi 2 */}
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
                            <span className="text-gray-700 text-xs leading-relaxed">
                              Dikenai Pajak Penghasilan sesuai Undang-undang Pajak Penghasilan
                            </span>
                          </div>
                        </div>
                        
                        {/* Pernyataan Pemahaman */}
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-4">
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
                            <span className="text-gray-700 text-xs leading-relaxed">
                              Dengan ini, Saya menyatakan bahwa saya telah mengerti dan memahami konsekuensi atas pilihan saya.
                            </span>
                          </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-2">
                          <div className="bg-green-500 text-white rounded p-2 text-xs text-center flex items-center justify-center gap-1 flex-1">
                            <span>✓</span>
                            <span>Simpan</span>
                          </div>
                          <div className="bg-[#1E3A8A] text-white rounded p-2 text-xs text-center flex items-center justify-center gap-1 flex-1">
                            <span>←</span>
                            <span>Prev</span>
                          </div>
                        </div>
                        
                        {/* Success Banner */}
                        <div className="mt-4 bg-green-500 text-white text-xs text-center py-2 rounded">
                          Data Berhasil Disimpan
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 10 ? (
                  <div className="space-y-4">
                    {/* Smartphone dengan Notifikasi Token */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Kode Token akan dikirimkan ke Email:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Smartphone */}
                        <div className="relative mx-auto w-32 h-48 bg-black rounded-2xl p-2">
                          {/* Notifikasi Email */}
                          <div className="absolute -top-2 -right-8 bg-[#1E3A8A] text-white rounded-lg p-2 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-[#F59E0B]">📧</span>
                              <span>Email</span>
                            </div>
                          </div>
                          
                          {/* Garis Getaran */}
                          <div className="absolute -top-1 -right-2 w-4 h-1 bg-gray-400 rounded-full"></div>
                          <div className="absolute -bottom-1 -left-2 w-4 h-1 bg-gray-400 rounded-full"></div>
                          
                          {/* Screen */}
                          <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-gray-400 font-bold text-xs">📱</div>
                              <div className="text-gray-400 text-xs">Smartphone</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Instruksi Teks */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-bold text-sm">
                            <span className="text-[#F59E0B] font-bold">Kode Token</span> akan dikirimkan ke Email
                          </div>
                          <div className="text-[#1E3A8A] font-bold text-sm">Silahkan buka Email Anda</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Halaman Token */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Halaman Isi Token:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Browser Address Bar */}
                        <div className="bg-gray-200 border border-gray-300 rounded mb-4 p-2 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-xs">🔒</span>
                            <span className="text-gray-600 text-xs">🏠</span>
                            <span className="text-gray-600 text-xs">ereg.pajak.go.id/online/inde</span>
                            <div className="ml-auto flex items-center gap-1">
                              <span className="text-gray-600 text-xs">3</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Pernyataan */}
                        <div className="space-y-3 text-left max-w-xs mx-auto mb-4">
                          <div className="text-gray-700 text-xs leading-relaxed">
                            membayar, dan melaporkan kewajiban perpajakan sesuai dengan peraturan perpajakan;
                          </div>
                          
                          {/* Checkbox */}
                          <div className="flex items-start gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <span className="text-gray-700 text-xs leading-relaxed">
                              Telah menerima penjelasan bahwa Wajib Pajak yang terdaftar mempunyai hak untuk memperoleh layanan informasi perpajakan...
                            </span>
                          </div>
                        </div>
                        
                        {/* Token Input */}
                        <div className="space-y-2 text-left max-w-xs mx-auto mb-4">
                          <div className="text-[#1E3A8A] font-semibold text-sm">Isi Token *</div>
                          <div className="bg-white border rounded p-2 text-xs">
                            hpi6jgsUS
                          </div>
                          <div className="text-red-600 text-xs">
                            * Isi dengan token yang anda dapat di email, setelah anda meminta token di dashboard. Token adalah Case Sensitive.
                          </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-2">
                          <div className="bg-gray-300 text-gray-700 rounded p-2 text-xs text-center flex-1">
                            Tutup
                          </div>
                          <div className="bg-green-500 text-white rounded p-2 text-xs text-center flex-1">
                            Kirim
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 11 ? (
                  <div className="space-y-4">
                    {/* Smartphone dengan Kartu NPWP */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Selamat! NPWP Berhasil Dibuat:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {/* Kartu NPWP Preview */}
                        <div className="bg-[#1E3A8A] rounded-lg p-4 mb-4 text-white max-w-xs mx-auto">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm">
                              <span className="text-white">npwp.</span>
                              <span className="text-[#F59E0B]">.</span>
                            </div>
                            <div className="text-sm">KPP TERDAFTAR</div>
                          </div>
                          <div className="text-center mb-2">
                            <div className="text-lg font-bold">12.345.789.9-999.000</div>
                            <div className="text-sm">RAKA **********</div>
                          </div>
                          <div className="text-xs">
                            <div>JALAN GATOT SUBROTO KAV. 40-42</div>
                            <div>KEBAYORAN BARU JAKARTA SELATAN 12190</div>
                            <div>11-01-2021</div>
                          </div>
                        </div>
                        
                        {/* Pesan Selamat */}
                        <div className="space-y-2 text-center">
                          <div className="text-[#1E3A8A] font-bold text-xl">Selamat!!</div>
                          <div className="text-[#1E3A8A] font-bold text-lg">Kawan Pajak sudah</div>
                          <div className="text-[#1E3A8A] font-bold text-lg">
                            memiliki <span className="text-[#F59E0B] font-bold">NPWP</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : step.id === 12 ? (
                  <div className="space-y-4">
                    {/* Halaman Download NPWP */}
                    <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-xl p-4">
                      <h4 className="font-bold text-[#1E3A8A] mb-3 text-sm sm:text-base">Download Kartu NPWP Digital:</h4>
                      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        {/* Browser Address Bar */}
                        <div className="bg-gray-200 border border-gray-300 rounded mb-4 p-2 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-xs">🔒</span>
                            <span className="text-gray-600 text-xs">🏠</span>
                            <span className="text-gray-600 text-xs">ereg.pajak.go.id/npwp-saya</span>
                            <div className="ml-auto flex items-center gap-1">
                              <span className="text-gray-600 text-xs">📱</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Judul Halaman */}
                        <div className="mb-4">
                          <div className="text-[#1E3A8A] font-bold text-lg">NPWP Saya</div>
                        </div>
                        
                        {/* Kartu NPWP Preview */}
                        <div className="bg-[#1E3A8A] rounded-lg p-4 mb-4 text-white max-w-xs mx-auto">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-sm">
                              <span className="text-white">npwp.</span>
                              <span className="text-[#F59E0B]">.</span>
                            </div>
                            <div className="text-sm">KPP TERDAFTAR</div>
                          </div>
                          <div className="text-center mb-2">
                            <div className="text-lg font-bold">12.345.789.9-999.000</div>
                            <div className="text-sm">RAKA **********</div>
                          </div>
                          <div className="text-xs">
                            <div>JALAN GATOT SUBROTO KAV. 40-42</div>
                            <div>KEBAYORAN BARU JAKARTA SELATAN 12190</div>
                            <div>11-01-2021</div>
                          </div>
                        </div>
                        
                        {/* Tombol Download */}
                        <div className="space-y-3">
                          <div className="bg-green-500 text-white rounded-lg p-3 text-center flex items-center justify-center gap-2">
                            <span>📥</span>
                            <span className="font-bold">Download NPWP</span>
                          </div>
                          <div className="text-gray-600 text-xs">
                            Format: PDF | Ukuran: ~500KB
                          </div>
                        </div>
                        
                        {/* Instruksi */}
                        <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                          <div className="text-[#1E3A8A] font-semibold text-sm">Instruksi:</div>
                          <div className="text-gray-700 text-xs">1. Klik tombol "Download NPWP"</div>
                          <div className="text-gray-700 text-xs">2. Simpan file di folder yang mudah diakses</div>
                          <div className="text-gray-700 text-xs">3. Beri nama file yang jelas</div>
                          <div className="text-gray-700 text-xs">4. Simpan sebagai backup</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-white border-2 border-dashed border-[#1E3A8A]/20 rounded-xl flex items-center justify-center text-[#6B7280]">
                    <div className="text-center px-2">
                      <p className="font-semibold mb-1 sm:mb-2 text-[#1E3A8A] text-sm sm:text-base">Screenshot Asli Akan Ditampilkan Di Sini</p>
                      <p className="text-xs sm:text-sm">Gambar nyata dari sistem pendaftaran DJP</p>
                  </div>
                </div>
                )}
              </div>

              {/* Instructions */}
              {/* Step Counter untuk Langkah 1 */}
              {step.id === 1 && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#1E3A8A]/10 border-2 border-[#F59E0B]/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">2</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">3</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">4</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">5</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">6</span>
                    </div>
                  </div>
                  <p className="text-center text-[#1E3A8A] font-semibold text-sm sm:text-base">Langkah 1: Aktivasi</p>
                  
                  {/* Instruksi Khusus untuk Langkah 1 */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#1E3A8A]/20">
                    <div className="text-center space-y-2">
                      <p className="text-[#1E3A8A] font-bold text-lg">Ketik</p>
                      <p className="text-[#1E3A8A] font-bold text-xl bg-[#F59E0B]/10 px-4 py-2 rounded">ereg.pajak.go.id</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">pada browser</p>
                      <div className="mt-3">
                        <p className="text-[#1E3A8A] font-bold text-lg">Klik</p>
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <div className="w-6 h-6 bg-white rounded-full"></div>
                          <span className="font-bold">daftar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Counter untuk Langkah 2 */}
              {step.id === 2 && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#1E3A8A]/10 border-2 border-[#F59E0B]/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">3</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">4</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">5</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">6</span>
                    </div>
                  </div>
                  <p className="text-center text-[#1E3A8A] font-semibold text-sm sm:text-base">Langkah 2: Aktivasi</p>
                  
                  {/* Instruksi Khusus untuk Langkah 2 */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#1E3A8A]/20">
                    <div className="text-center space-y-2">
                      <p className="text-[#1E3A8A] font-bold text-lg">Langkah 2:</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">Isikan</p>
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Email</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Kode Captcha</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Counter untuk Langkah 3 */}
              {step.id === 3 && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#1E3A8A]/10 border-2 border-[#F59E0B]/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">4</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">5</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">6</span>
                    </div>
                  </div>
                  <p className="text-center text-[#1E3A8A] font-semibold text-sm sm:text-base">Langkah 3: Aktivasi</p>
                  
                  {/* Instruksi Khusus untuk Langkah 3 */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#1E3A8A]/20">
                    <div className="text-center space-y-2">
                      <p className="text-[#1E3A8A] font-bold text-lg">Langkah 3:</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">Verifikasi Email</p>
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Buka Email</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Klik Link Verifikasi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Counter untuk Langkah 4 */}
              {step.id === 4 && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#1E3A8A]/10 border-2 border-[#F59E0B]/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">2</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">3</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">4</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">5</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">6</span>
                    </div>
                  </div>
                  <p className="text-center text-[#1E3A8A] font-semibold text-sm sm:text-base">Langkah 4: Aktivasi</p>
                  
                  {/* Instruksi Khusus untuk Langkah 4 */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#1E3A8A]/20">
                    <div className="text-center space-y-2">
                      <p className="text-[#1E3A8A] font-bold text-lg">Langkah 4:</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">Isikan identitas Anda pada kolom yang tersedia</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Counter untuk Langkah 5 */}
              {step.id === 5 && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#1E3A8A]/10 border-2 border-[#F59E0B]/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">2</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">3</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">4</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">5</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">6</span>
                    </div>
                  </div>
                  <p className="text-center text-[#1E3A8A] font-semibold text-sm sm:text-base">Langkah 5: Aktivasi</p>
                  
                  {/* Instruksi Khusus untuk Langkah 5 */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#1E3A8A]/20">
                    <div className="text-center space-y-2">
                      <p className="text-[#1E3A8A] font-bold text-lg">Langkah 5:</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">Konfirmasi Pendaftaran</p>
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Klik Tutup</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Buka Email</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Counter untuk Langkah 6 */}
              {step.id === 6 && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#1E3A8A]/10 border-2 border-[#F59E0B]/20 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">2</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">3</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">4</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">5</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold text-sm">6</span>
                    </div>
                  </div>
                  <p className="text-center text-[#1E3A8A] font-semibold text-sm sm:text-base">Langkah 6: Aktivasi</p>
                  
                  {/* Instruksi Khusus untuk Langkah 6 */}
                  <div className="mt-4 p-4 bg-white rounded-lg border border-[#1E3A8A]/20">
                    <div className="text-center space-y-2">
                      <p className="text-[#1E3A8A] font-bold text-lg">Langkah 6:</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">Buka Email</p>
                      <p className="text-[#1E3A8A] font-bold text-lg">Aktivasi Akun</p>
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-white px-4 py-2 rounded-full">
                          <span className="font-bold">Klik Link Aktivasi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-6 sm:mb-8">
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[#1E3A8A] mb-4 sm:mb-6">
                  Instruksi Langkah demi Langkah
                </h3>
                <ol className="space-y-3 sm:space-y-4">
                  {step.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 sm:gap-4">
                      <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-[#374151] leading-relaxed text-sm sm:text-base md:text-lg pt-0.5 sm:pt-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <Alert type={step.notes.type} className="mb-4 sm:mb-6">
                {step.notes.content}
              </Alert>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#1E293B] mb-3 sm:mb-4">
                  Troubleshooting
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {step.troubleshooting.map((item, index) => (
                    <Accordion key={index} title={item.q}>
                      <p className="text-[#334155] leading-relaxed">{item.a}</p>
                    </Accordion>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center gap-3 sm:gap-6 pt-6 sm:pt-8 border-t-2 border-[#1E3A8A]/10 print:hidden">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] md:min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Sebelumnya
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button 
                    onClick={() => onNavigate('beranda')} 
                    className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] md:min-h-[56px] bg-[#059669] hover:bg-[#F59E0B]"
                  >
                    Selesai
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext} 
                    className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] md:min-h-[56px]"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                )}
              </div>
            </Card>

            {/* Help Section */}
            <Card className="bg-gradient-to-br from-[#F8FAFC] to-white border-2 border-[#1E3A8A]/10 print:hidden">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#1E3A8A] mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">Butuh Bantuan?</h3>
                  <p className="text-[#6B7280] mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    Jika mengalami kendala, lihat halaman troubleshooting atau hubungi KPP Pratama Jepara.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => onNavigate('troubleshooting')}
                      className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2.5 sm:py-3"
                    >
                      Lihat Troubleshooting
                    </Button>
                    <Button
                      variant="secondary"
                      className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2.5 sm:py-3"
                      onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
                    >
                      Kontak KPP Jepara
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
