import { useState } from 'react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { ChevronLeft, Check, Printer, ExternalLink } from 'lucide-react';

interface PersiapanDokumenProps {
  onNavigate: (page: string) => void;
}

type Status = 'karyawan' | 'wirausaha' | 'mahasiswa' | null;

interface Document {
  name: string;
  description: string;
  required: boolean;
}

const documentsByStatus: Record<Exclude<Status, null>, { wajib: Document[]; opsional: Document[] }> = {
  karyawan: {
    wajib: [
      { name: 'KTP (Kartu Tanda Penduduk)', description: 'KTP asli dan fotokopi yang masih berlaku', required: true },
      { name: 'Email Aktif', description: 'Alamat email yang sering Anda cek untuk verifikasi dan komunikasi', required: true },
      { name: 'Nomor HP Aktif', description: 'Nomor telepon untuk menerima OTP dan konfirmasi', required: true }
    ],
    opsional: [
      { name: 'Surat Keterangan Kerja', description: 'Dari perusahaan tempat Anda bekerja (jika diminta)', required: false },
      { name: 'Kartu Keluarga (KK)', description: 'KK asli dan fotokopi (kadang diminta untuk verifikasi alamat)', required: false },
      { name: 'Slip Gaji Terakhir', description: 'Untuk verifikasi status karyawan (jika diminta)', required: false }
    ]
  },
  wirausaha: {
    wajib: [
      { name: 'KTP (Kartu Tanda Penduduk)', description: 'KTP asli dan fotokopi yang masih berlaku', required: true },
      { name: 'Email Aktif', description: 'Alamat email yang sering Anda cek untuk verifikasi dan komunikasi', required: true },
      { name: 'Nomor HP Aktif', description: 'Nomor telepon untuk menerima OTP dan konfirmasi', required: true }
    ],
    opsional: [
      { name: 'SKU (Surat Keterangan Usaha)', description: 'Dari kelurahan/kecamatan tempat usaha berada', required: false },
      { name: 'NIB (Nomor Induk Berusaha)', description: 'Jika usaha sudah terdaftar di OSS', required: false },
      { name: 'Foto Tempat Usaha', description: 'Foto depan toko/tempat usaha untuk verifikasi', required: false },
      { name: 'Kartu Keluarga (KK)', description: 'KK asli dan fotokopi (kadang diminta untuk verifikasi)', required: false }
    ]
  },
  mahasiswa: {
    wajib: [
      { name: 'KTP/Kartu Mahasiswa', description: 'KTP atau kartu mahasiswa aktif yang masih berlaku', required: true },
      { name: 'Email Aktif', description: 'Alamat email yang sering Anda cek (bisa email kampus atau pribadi)', required: true },
      { name: 'Nomor HP Aktif', description: 'Nomor telepon untuk menerima OTP dan konfirmasi', required: true }
    ],
    opsional: [
      { name: 'Surat Keterangan Mahasiswa', description: 'Dari kampus/universitas (jika diminta)', required: false },
      { name: 'KTM (Kartu Tanda Mahasiswa)', description: 'Kartu mahasiswa yang masih aktif', required: false },
      { name: 'Kartu Keluarga (KK)', description: 'KK orang tua (kadang diminta untuk mahasiswa di bawah 21 tahun)', required: false }
    ]
  }
};

const tips = [
  'Pastikan semua data di dokumen konsisten (nama, alamat, tanggal lahir harus sama di semua dokumen)',
  'Scan atau foto dokumen dengan pencahayaan yang baik, tidak blur, dan semua teks terbaca jelas',
  'Format file yang diterima: JPG, PNG, atau PDF dengan ukuran maksimal 2MB per file',
  'Koneksi internet yang stabil sangat penting untuk proses upload dokumen',
  'Simpan salinan digital semua dokumen di cloud storage (Google Drive, dll) sebagai backup'
];

export function PersiapanDokumen({ onNavigate }: PersiapanDokumenProps) {
  const [selectedStatus, setSelectedStatus] = useState<Status>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleCheckItem = (itemName: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemName)) {
      newChecked.delete(itemName);
    } else {
      newChecked.add(itemName);
    }
    setCheckedItems(newChecked);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderStatusSelection = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-bold text-[#1E3A8A] mb-3 sm:mb-4">
          Pilih Status Anda
        </h2>
        <p className="text-[#6B7280] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Dokumen yang diperlukan berbeda tergantung status pekerjaan Anda. Pilih yang paling sesuai.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div className="cursor-pointer" onClick={() => setSelectedStatus('karyawan')}>
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl">💼</span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#1E3A8A] mb-2 sm:mb-3">
              Karyawan
            </h3>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Bekerja di perusahaan atau instansi sebagai pegawai tetap/kontrak
            </p>
            <Button className="w-full bg-[#1E3A8A] hover:bg-[#F59E0B] text-white border-0 text-sm sm:text-base md:text-lg py-3 sm:py-4">
              Pilih Status Ini
            </Button>
          </Card>
        </div>

        <div className="cursor-pointer" onClick={() => setSelectedStatus('wirausaha')}>
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl">🏪</span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#1E3A8A] mb-2 sm:mb-3">
              Wirausaha/UMKM
            </h3>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Memiliki usaha sendiri, toko, warung, atau bisnis online
            </p>
            <Button className="w-full bg-[#059669] hover:bg-[#F59E0B] text-white border-0 text-sm sm:text-base md:text-lg py-3 sm:py-4">
              Pilih Status Ini
            </Button>
          </Card>
        </div>

        <div className="cursor-pointer" onClick={() => setSelectedStatus('mahasiswa')}>
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B]">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl">🎓</span>
            </div>
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-[#1E3A8A] mb-2 sm:mb-3">
              Mahasiswa
            </h3>
            <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Sedang kuliah dan butuh NPWP untuk beasiswa atau keperluan kampus
            </p>
            <Button className="w-full bg-[#F59E0B] hover:bg-[#1E3A8A] text-white border-0 text-sm sm:text-base md:text-lg py-3 sm:py-4">
              Pilih Status Ini
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => {
    if (!selectedStatus) return null;

    const docs = documentsByStatus[selectedStatus];
    const allDocs = [...docs.wajib, ...docs.opsional];
    const checkedCount = allDocs.filter(doc => checkedItems.has(doc.name)).length;
    const wajibCount = docs.wajib.length;
    const wajibChecked = docs.wajib.filter(doc => checkedItems.has(doc.name)).length;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px] font-bold text-[#1E3A8A] mb-3 sm:mb-4">
              Checklist Dokumen
            </h2>
            <span className={`${
              selectedStatus === 'karyawan' ? 'bg-[#1E3A8A] text-white' : 
              selectedStatus === 'wirausaha' ? 'bg-[#059669] text-white' : 
              'bg-[#F59E0B] text-white'
            } border-0 px-3 py-1.5 text-xs font-semibold rounded-lg border`}>
              {selectedStatus === 'karyawan' ? 'Karyawan' : selectedStatus === 'wirausaha' ? 'Wirausaha/UMKM' : 'Mahasiswa'}
            </span>
            {selectedStatus === 'karyawan' && (
              <p className="text-[#64748B] text-sm mt-2">Contoh skenario: bekerja di perusahaan/instansi, perlu NPWP untuk keperluan HR/payroll.</p>
            )}
            {selectedStatus === 'wirausaha' && (
              <p className="text-[#64748B] text-sm mt-2">Contoh skenario: memiliki usaha/toko/bisnis online; NPWP diperlukan untuk pembukaan rekening usaha, perizinan, dan transaksi supplier/marketplace.</p>
            )}
            {selectedStatus === 'mahasiswa' && (
              <p className="text-[#64748B] text-sm mt-2">Contoh skenario: membutuhkan NPWP untuk beasiswa, magang berbayar, atau kebutuhan administrasi kampus.</p>
            )}
          </div>
          <div className="text-left sm:text-right print:hidden">
            <p className="text-xs sm:text-sm text-[#6B7280] mb-2 font-medium">
              Progress: {checkedCount}/{allDocs.length}
            </p>
            <div className="w-32 sm:w-40 h-2 sm:h-3 bg-[#F8FAFC] rounded-full overflow-hidden border border-[#1E3A8A]/10">
              <div
                className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#F59E0B] transition-all duration-500"
                style={{ width: `${(checkedCount / allDocs.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {selectedStatus && (
          <Alert type="info" className="mb-6">
            Format file yang umum diterima saat pendaftaran online: JPG, PNG, atau PDF (maks ±2MB per file). Pastikan foto/scan dokumen jelas dan tidak blur.
            {selectedStatus === 'wirausaha' && ' Jika diminta SKU/NIB atau foto tempat usaha, pastikan informasi terbaca dan foto tampak depan jelas.'}
            {selectedStatus === 'mahasiswa' && ' Jika diminta surat keterangan kampus atau KTM, pastikan identitas dan masa berlaku terlihat jelas.'}
          </Alert>
        )}

        <Card className="mb-6 sm:mb-8 border-2 border-[#1E3A8A]/10">
          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[#1E3A8A] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <span className="bg-[#1E3A8A] text-white border-[#1E3A8A] px-3 py-1.5 text-xs font-semibold rounded-lg border">Wajib</span>
            <span>Dokumen Wajib</span>
            <span className="text-xs sm:text-sm font-normal text-[#6B7280]">({wajibChecked}/{wajibCount})</span>
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {docs.wajib.map((doc) => (
              <label
                key={doc.name}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-[#F5F7FA] cursor-pointer transition-colors duration-200 min-h-[40px] sm:min-h-[44px]"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(doc.name)}
                  onChange={() => handleCheckItem(doc.name)}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E3A8A] border-[#1E3A8A]/20 rounded focus:ring-2 focus:ring-[#F59E0B] mt-0.5 sm:mt-1 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#1E293B] mb-1 text-sm sm:text-base">{doc.name}</p>
                  <p className="text-[13px] sm:text-[15px] text-[#64748B]">{doc.description}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        <Card className="mb-6 sm:mb-8 border-2 border-[#1E3A8A]/10">
          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[#1E3A8A] mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <span className="bg-[#6B7280] text-white border-[#6B7280] px-3 py-1.5 text-xs font-semibold rounded-lg border">Opsional</span>
            <span>Dokumen Opsional (jika diminta)</span>
          </h3>
          <div className="space-y-4">
            {docs.opsional.map((doc) => (
              <label
                key={doc.name}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-[#F5F7FA] cursor-pointer transition-colors duration-200 min-h-[40px] sm:min-h-[44px]"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(doc.name)}
                  onChange={() => handleCheckItem(doc.name)}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E3A8A] border-[#1E3A8A]/20 rounded focus:ring-2 focus:ring-[#F59E0B] mt-0.5 sm:mt-1 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#1E293B] mb-1 text-sm sm:text-base">{doc.name}</p>
                  <p className="text-[13px] sm:text-[15px] text-[#64748B]">{doc.description}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        <Card className="mb-6 sm:mb-8 border-2 border-[#1E3A8A]/10">
          <h3 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-bold text-[#1E3A8A] mb-4 sm:mb-6">
            Tips Sukses
          </h3>
          <ul className="space-y-3 sm:space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="flex gap-3 sm:gap-4">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#059669] flex-shrink-0 mt-0.5 sm:mt-1" />
                <span className="text-[#374151] leading-relaxed text-sm sm:text-base md:text-lg">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {wajibChecked === wajibCount && (
          <Alert type="success" className="mb-6">
            <strong>Siap!</strong> Semua dokumen wajib sudah disiapkan. Anda bisa mulai proses pendaftaran NPWP.
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 print:hidden">
          <Button
            variant="secondary"
            onClick={() => {
              setSelectedStatus(null);
              setCheckedItems(new Set());
            }}
            className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] md:min-h-[56px]"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Pilih Status Lain
          </Button>
          <Button
            variant="secondary"
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] md:min-h-[56px]"
          >
            <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
            Cetak Checklist
          </Button>
          <Button
            className="flex-1 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold min-h-[44px] sm:min-h-[48px] md:min-h-[56px]"
            onClick={() => onNavigate('tutorial-online')}
          >
            Mulai Tutorial Online
          </Button>
        </div>

        <Card className="mt-6 sm:mt-8 bg-gradient-to-br from-[#F8FAFC] to-white border-2 border-[#1E3A8A]/10 print:hidden">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#1E3A8A] mb-2 sm:mb-3 text-sm sm:text-base md:text-lg">Profil & Kontak KPP Pratama Jepara</h3>
              <p className="text-[#6B7280] mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                Lihat info lengkap lokasi, jam operasional, dan kontak kantor untuk konsultasi langsung.
              </p>
              <Button
                variant="secondary"
                className="text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-6 py-2.5 sm:py-3"
                onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
              >
                Buka Halaman Resmi
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

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
            <span className="bg-white text-[#1E3A8A] border-white px-3 py-1.5 text-xs font-semibold rounded-lg border">Checklist Dokumen</span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[36px] font-bold mb-2 md:mb-3">
            Persiapan Dokumen
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
            Pastikan semua dokumen siap sebelum memulai proses pendaftaran NPWP
          </p>
        </div>

        {selectedStatus === null ? renderStatusSelection() : renderChecklist()}
      </div>
    </div>
  );
}
