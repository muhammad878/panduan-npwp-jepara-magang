import { useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Accordion } from '../components/Accordion';
import { ChevronLeft, ChevronRight, Check, ExternalLink } from 'lucide-react';

interface TutorialOfflineProps {
  onNavigate: (page: string) => void;
}

const steps = [
  {
    id: 1,
    title: 'Siapkan Dokumen',
    description: 'Kumpulkan semua dokumen yang diperlukan sebelum berangkat ke kantor.',
    instructions: [
      'KTP asli dan fotokopi (2 lembar)',
      'Kartu Keluarga asli dan fotokopi (1 lembar)',
      'Surat keterangan kerja (jika karyawan)',
      'SKU/NIB atau foto usaha (jika wirausaha)',
      'Kartu mahasiswa atau surat keterangan kampus (jika mahasiswa)',
      'Siapkan folder/map untuk menyimpan dokumen',
      'Bawa pulpen untuk isi formulir di tempat'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Bawa dokumen asli untuk verifikasi dan fotokopi untuk diserahkan. Pastikan fotokopi jelas dan tidak blur.'
    },
    troubleshooting: [
      { q: 'Tidak punya fotokopi', a: 'Ada jasa fotokopi di sekitar kantor pajak. Atau fotokopi dulu di dekat rumah sebelum berangkat.' },
      { q: 'KTP hilang/rusak', a: 'Buat KTP baru terlebih dahulu di Dukcapil. NPWP tidak bisa dibuat tanpa KTP yang valid.' }
    ]
  },
  {
    id: 2,
    title: 'Cek Lokasi & Jam Layanan',
    description: 'Pastikan Anda tahu alamat dan jadwal operasional KPP Pratama Jepara.',
    instructions: [
      'Buka halaman resmi KPP Pratama Jepara',
      'Catat alamat lengkap kantor',
      'Catat jam operasional (biasanya Senin-Jumat, 08:00-16:00)',
      'Cek hari libur nasional/cuti bersama',
      'Gunakan Google Maps untuk cek rute terbaik',
      'Estimasi waktu tempuh dari lokasi Anda'
    ],
    notes: {
      type: 'info' as const,
      content: 'Layanan pendaftaran NPWP tidak tersedia di hari Sabtu, Minggu, dan hari libur nasional. Datang di pagi hari untuk menghindari antrean panjang.'
    },
    troubleshooting: [
      { q: 'Tidak tahu alamat pastinya', a: 'Kunjungi https://pajak.go.id/id/kpp-pratama-jepara untuk info lengkap. Atau hubungi telepon KPP Jepara untuk konfirmasi.' },
      { q: 'Kantor tutup mendadak', a: 'Cek pengumuman di website resmi atau sosial media KPP. Hubungi telepon kantor sebelum berangkat untuk memastikan.' }
    ]
  },
  {
    id: 3,
    title: 'Rencanakan Waktu Kunjungan',
    description: 'Pilih waktu yang tepat untuk menghindari antrean panjang.',
    instructions: [
      'Hindari datang di hari Senin (biasanya ramai)',
      'Hindari akhir bulan dan tanggal 20-25 (banyak lapor pajak)',
      'Datang pagi (08:00-10:00) untuk antrean lebih singkat',
      'Hindari jam istirahat (12:00-13:00)',
      'Sisakan waktu minimal 2 jam untuk seluruh proses',
      'Jika memungkinkan, datang di hari Selasa-Kamis'
    ],
    notes: {
      type: 'success' as const,
      content: 'Waktu terbaik: Selasa/Rabu/Kamis pagi (08:00-10:00). Antrean lebih pendek dan pelayanan lebih cepat.'
    },
    troubleshooting: [
      { q: 'Hanya bisa datang siang', a: 'Tidak masalah, tapi siapkan waktu lebih banyak karena mungkin antrean lebih panjang. Pastikan datang sebelum jam 15:00.' }
    ]
  },
  {
    id: 4,
    title: 'Datang ke Loket Pendaftaran',
    description: 'Tiba di kantor dan menuju loket yang tepat.',
    instructions: [
      'Datang ke KPP Pratama Jepara sesuai alamat',
      'Masuk dan cari papan informasi/denah kantor',
      'Tanyakan ke satpam/petugas: "Loket pendaftaran NPWP di mana?"',
      'Ikuti petunjuk menuju loket pendaftaran/TPT (Tempat Pelayanan Terpadu)',
      'Jika bingung, jangan ragu bertanya ke petugas',
      'Siapkan dokumen sambil menunggu giliran'
    ],
    notes: {
      type: 'info' as const,
      content: 'Petugas di KPP sangat membantu. Jangan sungkan bertanya jika bingung atau butuh bantuan.'
    },
    troubleshooting: [
      { q: 'Tidak tahu harus ke loket mana', a: 'Tanya ke satpam atau petugas informasi. Katakan: "Saya mau buat NPWP baru, ke loket mana ya?"' },
      { q: 'Loket penuh/tutup', a: 'Tanyakan ke petugas apakah ada loket lain atau bisa datang di waktu lain. Ambil nomor antrean jika tersedia.' }
    ]
  },
  {
    id: 5,
    title: 'Ambil Nomor Antrean & Isi Formulir',
    description: 'Daftar antrean dan lengkapi formulir pendaftaran.',
    instructions: [
      'Ambil nomor antrean di mesin/loket informasi',
      'Minta formulir pendaftaran NPWP ke petugas',
      'Isi formulir dengan lengkap dan jelas (gunakan huruf kapital)',
      'Isi sesuai KTP: NIK, nama, alamat, tanggal lahir',
      'Centang jenis pekerjaan: karyawan/wirausaha/lainnya',
      'Tanyakan ke petugas jika ada kolom yang tidak dipahami',
      'Tunggu nomor antrean Anda dipanggil'
    ],
    notes: {
      type: 'warning' as const,
      content: 'Isi formulir dengan teliti. Kesalahan penulisan akan memperlambat proses atau perlu isi ulang.'
    },
    troubleshooting: [
      { q: 'Salah isi formulir', a: 'Minta formulir baru dan isi ulang. Atau coret yang salah, tulis yang benar, dan paraf di samping.' },
      { q: 'Tidak ada pulpen', a: 'Pinjam pulpen ke petugas atau pemohon lain. Atau beli di warung sekitar kantor.' }
    ]
  },
  {
    id: 6,
    title: 'Verifikasi Kelengkapan',
    description: 'Petugas akan memeriksa dokumen dan formulir Anda.',
    instructions: [
      'Serahkan formulir yang sudah diisi ke petugas',
      'Serahkan juga semua dokumen (KTP asli & fotokopi, KK, dll)',
      'Petugas akan memeriksa kelengkapan dan kebenaran data',
      'Jawab pertanyaan petugas dengan jujur dan jelas',
      'Jika ada dokumen kurang, petugas akan memberitahu',
      'Jika dokumen lengkap, lanjut ke proses berikutnya'
    ],
    notes: {
      type: 'info' as const,
      content: 'Petugas mungkin bertanya tentang pekerjaan atau alasan membuat NPWP. Jawab sesuai kondisi Anda yang sebenarnya.'
    },
    troubleshooting: [
      { q: 'Dokumen kurang', a: 'Tanyakan dokumen apa yang kurang. Jika bisa dilengkapi hari itu, lengkapi dulu. Jika tidak, buat janji kembali.' },
      { q: 'Data di formulir salah', a: 'Petugas akan minta isi ulang atau membetulkan langsung. Ikuti instruksi petugas.' }
    ]
  },
  {
    id: 7,
    title: 'Perekaman Data',
    description: 'Data Anda akan diinput ke sistem oleh petugas.',
    instructions: [
      'Petugas akan menginput data dari formulir ke komputer',
      'Petugas mungkin akan memfoto Anda (untuk arsip)',
      'Tunggu proses input selesai (5-10 menit)',
      'Petugas akan meminta Anda memverifikasi data di layar',
      'Cek ulang: nama, NIK, alamat, nomor HP',
      'Jika ada yang salah, beritahu petugas segera',
      'Jika sudah benar, petugas akan finalisasi'
    ],
    notes: {
      type: 'success' as const,
      content: 'Ini kesempatan terakhir memeriksa data sebelum dicetak. Pastikan semua informasi sudah benar.'
    },
    troubleshooting: [
      { q: 'Sistem error/lambat', a: 'Bersabar menunggu. Petugas akan coba restart atau hubungi IT. Proses mungkin memakan waktu lebih lama.' },
      { q: 'Data tidak bisa diinput', a: 'Petugas akan cari solusi atau minta Anda datang lagi. Minta nomor kontak petugas untuk follow-up.' }
    ]
  },
  {
    id: 8,
    title: 'Simpan Tanda Terima',
    description: 'Terima bukti pendaftaran dan tunggu kartu NPWP jadi.',
    instructions: [
      'Petugas akan memberikan tanda terima/bukti pendaftaran',
      'Catat nomor NPWP Anda (15 digit)',
      'Tanyakan kapan kartu NPWP bisa diambil (biasanya 1-7 hari)',
      'Tanyakan apakah kartu akan dikirim atau harus diambil',
      'Simpan tanda terima baik-baik (jangan hilang)',
      'Foto tanda terima dengan HP sebagai backup',
      'Ucapkan terima kasih ke petugas'
    ],
    notes: {
      type: 'success' as const,
      content: 'Selamat! Pendaftaran NPWP Anda selesai. Nomor NPWP sudah bisa digunakan meskipun kartu fisik belum jadi.'
    },
    troubleshooting: [
      { q: 'Kartu kapan jadi?', a: 'Tanyakan langsung ke petugas. Biasanya 1-7 hari kerja. Simpan nomor kontak petugas untuk konfirmasi.' },
      { q: 'Tanda terima hilang', a: 'Segera ke KPP Jepara dengan KTP untuk minta duplikat atau cek status dengan NIK.' }
    ]
  }
];

export function TutorialOffline({ onNavigate }: TutorialOfflineProps) {
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
            Tutorial Pendaftaran NPWP Offline
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">Panduan lengkap daftar NPWP langsung di kantor pajak</p>
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

              {/* Instructions */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[#1E3A8A] mb-4 sm:mb-6">
                  Yang Perlu Dilakukan
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
                  Masalah yang Sering Terjadi
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
                  <h3 className="font-bold text-[#1E3A8A] mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">Info Lengkap KPP Pratama Jepara</h3>
                  <p className="text-[#6B7280] mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                    Lihat alamat lengkap, jam operasional, dan kontak kantor sebelum berkunjung.
                  </p>
                  <Button
                    className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2.5 sm:py-3"
                    onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
                  >
                    Buka Halaman Resmi KPP Jepara
                  </Button>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}
