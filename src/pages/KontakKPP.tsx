import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ChevronLeft, ExternalLink, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface KontakKPPProps {
  onNavigate: (page: string) => void;
}

export function KontakKPP({ onNavigate }: KontakKPPProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-16 md:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="secondary"
          onClick={() => onNavigate('beranda')}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-[28px] md:text-[40px] font-bold text-[#1E293B] mb-3">
            Kontak KPP Pratama Jepara
          </h1>
          <p className="text-[#64748B] leading-relaxed">
            Informasi lengkap untuk menghubungi atau mengunjungi kantor pajak
          </p>
        </div>

        <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white border-[#0066CC]">
          <div className="text-center py-8">
            <MapPin className="w-16 h-16 text-[#0066CC] mx-auto mb-4" />
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#1E293B] mb-4">
              KPP Pratama Jepara
            </h2>
            <p className="text-[#64748B] mb-6 max-w-2xl mx-auto leading-relaxed">
              Untuk informasi paling akurat tentang alamat, jam operasional, kontak, dan layanan yang tersedia, silakan kunjungi halaman resmi KPP Pratama Jepara.
            </p>
            <Button
              variant="primary"
              className="inline-flex items-center gap-2"
              onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="w-5 h-5" />
              Buka Halaman Resmi KPP Pratama Jepara
            </Button>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#0066CC]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Jam Layanan</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Cek jam operasional terkini di halaman resmi untuk memastikan kantor buka saat Anda berkunjung.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Nomor Telepon</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Hubungi langsung untuk konsultasi, tanya jawab, atau konfirmasi sebelum berkunjung.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Email & Media Sosial</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Kirim pertanyaan via email atau ikuti media sosial untuk info terbaru dan pengumuman.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#1E293B] mb-2">Lokasi & Peta</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Lihat alamat lengkap dan peta interaktif untuk memudahkan perjalanan Anda ke kantor.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-blue-50 border-[#0066CC]">
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-[#1E293B] mb-2">Tips Sebelum Berkunjung</h3>
              <ul className="space-y-2 text-[#334155] text-sm leading-relaxed">
                <li>• Datang di pagi hari (08:00-10:00) untuk menghindari antrean panjang</li>
                <li>• Hindari hari Senin dan akhir bulan (biasanya lebih ramai)</li>
                <li>• Bawa dokumen lengkap: KTP asli, fotokopi, dan dokumen pendukung lainnya</li>
                <li>• Hubungi terlebih dahulu untuk memastikan kantor buka dan tidak ada perubahan jadwal</li>
                <li>• Gunakan Google Maps untuk cek rute dan estimasi waktu perjalanan</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
