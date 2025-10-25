import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Clock, MapPin, FileCheck, Camera, AlertCircle, ExternalLink, MessageCircle, Phone, Mail } from 'lucide-react';

interface BerandaProps {
  onNavigate: (page: string) => void;
}

export function Beranda({ onNavigate }: BerandaProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section dengan Gradient Baru */}
      <section className="bg-gradient-to-br from-[#1E3A8A] to-[#F59E0B] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 mt-4 sm:mt-0">
              <span className="bg-white text-[#1E3A8A] border-white px-3 py-1.5 text-xs font-semibold rounded-lg border">Panduan untuk Warga Jepara</span>
              <span className="bg-[#F59E0B] text-white border-[#F59E0B] px-3 py-1.5 text-xs font-semibold rounded-lg border">
                Kode Kantor: 516
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[32px] md:text-[48px] font-bold text-white mb-6 leading-tight drop-shadow-lg">
              CARA MUDAH BUAT NPWP
            </h1>
            <p className="text-[14px] sm:text-[16px] md:text-[20px] text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
              Panduan lengkap untuk warga Jepara. Ikuti langkah demi langkah—online atau offline.
            </p>
            
            {/* 2 Tombol Besar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
              <Button 
                onClick={() => onNavigate('tutorial-online')}
                className="bg-[#1E3A8A] text-white border-2 border-[#1E3A8A] hover:bg-[#F59E0B] hover:border-[#F59E0B] hover:text-white text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px] sm:min-h-[56px] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
              >
                BUAT NPWP ONLINE
              </Button>
              <Button 
                onClick={() => onNavigate('tutorial-offline')}
                className="bg-[#F59E0B] text-white border-2 border-[#F59E0B] hover:bg-[#1E3A8A] hover:border-[#1E3A8A] hover:text-white text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px] sm:min-h-[56px] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
              >
                KE KANTOR PAJAK
              </Button>
            </div>

            {/* Kontak Bantuan */}
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 sm:p-8 max-w-lg mx-auto border border-white/20">
              <p className="text-white text-lg sm:text-xl font-bold mb-4">Butuh Bantuan?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <button
                  onClick={() => window.open('tel:0291596403', '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#F59E0B] hover:text-white transition-all duration-300 font-semibold text-base sm:text-lg w-full sm:w-auto shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  Telepon: 0291-596403
                </button>
                <button
                  onClick={() => window.open('https://wa.me/6281995000516', '_blank', 'noopener,noreferrer')}
                  className="flex items-center gap-3 px-6 sm:px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold text-base sm:text-lg w-full sm:w-auto shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[#1E3A8A] mb-6">
            Pilih Cara yang Paling Mudah
          </h2>
          <p className="text-[18px] sm:text-[20px] text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
            Semua cara akan membawa Anda ke tujuan yang sama. Pilih yang paling nyaman untuk Anda.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Card 1: Persiapan Dokumen */}
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] p-8">
            <div className="w-20 h-20 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-8">
              <FileCheck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-4">Persiapan Dokumen</h3>
            <p className="text-[#6B7280] mb-8 leading-relaxed text-lg">
              Cek dokumen yang diperlukan sesuai status Anda (karyawan, wirausaha, atau mahasiswa)
            </p>
            <Button 
              onClick={() => onNavigate('persiapan-dokumen')}
              className="w-full bg-[#1E3A8A] hover:bg-[#F59E0B] text-white border-0 py-4 text-lg font-semibold active:bg-[#1E3A8A] active:text-white"
            >
              Lihat Checklist
            </Button>
          </Card>

          {/* Card 2: Online */}
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] p-8">
            <div className="w-20 h-20 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-8">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-4">Online (Paling Populer)</h3>
            <p className="text-[#6B7280] mb-6 leading-relaxed text-lg">
              Daftar dari rumah melalui website resmi DJP. Proses lebih cepat dan praktis.
            </p>
            <div className="bg-[#059669]/10 rounded-lg p-4 mb-8">
              <p className="text-[#059669] font-bold text-lg">Waktu: ±30 menit</p>
              <p className="text-sm text-[#059669]">12 langkah mudah dengan screenshot</p>
            </div>
            <Button 
              onClick={() => onNavigate('tutorial-online')}
              className="w-full bg-[#059669] hover:bg-[#F59E0B] text-white border-0 py-4 text-lg font-semibold active:bg-[#059669] active:text-white"
            >
              Mulai Tutorial Online
            </Button>
          </Card>

          {/* Card 3: Offline */}
          <Card className="text-center hover:shadow-xl transition-all duration-300 border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] p-8">
            <div className="w-20 h-20 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-4">Ke Kantor Pajak</h3>
            <p className="text-[#6B7280] mb-6 leading-relaxed text-lg">
              Daftar langsung di KPP Pratama Jepara dengan bantuan petugas yang ramah.
            </p>
            <div className="bg-[#F59E0B]/10 rounded-lg p-4 mb-8">
              <p className="text-[#F59E0B] font-bold text-lg">Waktu: ±2 jam</p>
              <p className="text-sm text-[#F59E0B]">8 langkah dengan panduan lokasi</p>
            </div>
            <Button 
              onClick={() => onNavigate('tutorial-offline')}
              className="w-full bg-[#F59E0B] hover:bg-[#1E3A8A] text-white border-0 py-4 text-lg font-semibold active:bg-[#F59E0B] active:text-white"
            >
              Mulai Tutorial Offline
            </Button>
          </Card>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-[#1E3A8A] mb-6">
              Kenapa Pakai Panduan Ini?
            </h2>
            <p className="text-[18px] sm:text-[20px] text-[#6B7280] max-w-3xl mx-auto leading-relaxed">
              Panduan yang dibuat khusus untuk warga Jepara dengan pertimbangan kebutuhan lokal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            <Card className="text-center bg-white border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] hover:shadow-xl transition-all duration-300 p-8">
              <div className="w-20 h-20 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-8">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-4">
                Screenshot Asli
              </h3>
              <p className="text-[#6B7280] leading-relaxed text-lg">
                Setiap langkah dilengkapi gambar nyata dari sistem pendaftaran, jadi tidak bingung harus klik apa.
              </p>
            </Card>

            <Card className="text-center bg-white border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] hover:shadow-xl transition-all duration-300 p-8">
              <div className="w-20 h-20 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-8">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-4">
                Solusi Error
              </h3>
              <p className="text-[#6B7280] leading-relaxed text-lg">
                Halaman troubleshooting khusus untuk masalah umum seperti OTP tidak masuk atau gagal upload dokumen.
              </p>
            </Card>

            <Card className="text-center bg-white border-2 border-[#1E3A8A]/10 hover:border-[#F59E0B] hover:shadow-xl transition-all duration-300 p-8">
              <div className="w-20 h-20 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-8">
                <ExternalLink className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-[22px] font-bold text-[#1E3A8A] mb-4">
                Siap Cetak
              </h3>
              <p className="text-[#6B7280] leading-relaxed text-lg">
                Checklist dokumen bisa dicetak untuk dibawa ke kantor pajak atau digunakan sebagai panduan offline.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Kontak KPP Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-br from-[#1E3A8A] to-[#F59E0B] text-white border-0 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-[28px] md:text-[32px] font-bold mb-6">
                Kontak & Info KPP Pratama Jepara
              </h2>
              <p className="text-white/90 leading-relaxed mb-8 text-lg">
                Butuh info lebih lanjut atau ingin mengunjungi langsung? Lihat alamat, jam layanan, dan kontak resmi.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white text-[#1E3A8A] border-white px-4 py-2 text-sm font-semibold rounded-lg border">
                  Kode Kantor: 516
                </span>
                <Badge className="bg-[#059669] text-white border-[#059669] px-4 py-2 text-sm font-semibold">
                  Kanwil DJP Jawa Tengah I
                </Badge>
              </div>
            </div>
            <button
              className="bg-[#1E3A8A] text-white hover:bg-[#F59E0B] hover:text-white border-0 flex items-center gap-3 whitespace-nowrap px-10 py-5 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
              onClick={() => window.open('https://pajak.go.id/id/kpp-pratama-jepara', '_blank', 'noopener,noreferrer')}
            >
              Buka Halaman Resmi
              <ExternalLink className="w-6 h-6" />
            </button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A8A] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-bold text-xl mb-6">Kontak Cepat</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-[#F59E0B]" />
                  <span className="text-white/90 text-lg">0291-596403</span>
                </div>
                <div className="flex items-center gap-4">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white/90 text-lg">081995000516 (WA)</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#F59E0B]" />
                  <span className="text-white/90 text-lg">kpp.516@pajak.go.id</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-6">Media Sosial</h3>
              <div className="space-y-4">
                <a href="https://instagram.com/pajakjepara" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/90 hover:text-[#F59E0B] transition-colors text-lg">
                  <span>Instagram: @pajakjepara</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-6">Info Resmi</h3>
              <div className="space-y-4">
                <p className="text-white/90 text-lg">Diperbarui: Januari 2025</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Konten bersifat edukatif. Untuk proses resmi, gunakan tautan resmi DJP/KPP.
                </p>
                <a
                  href="https://pajak.go.id/id/kpp-pratama-jepara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] hover:text-white transition-colors flex items-center gap-3 text-lg"
                >
                  Situs Resmi KPP Jepara
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/70 text-lg">
              © 2025 Panduan NPWP Jepara. Dibuat untuk membantu warga Jepara.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
