import { useState, useEffect } from 'react';
import { Menu, X, FileText, Building2, MapPin } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tutorial-online', label: 'Online' },
    { id: 'tutorial-offline', label: 'Offline' },
    { id: 'troubleshooting', label: 'Bantuan' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#1E3A8A] border-b border-[#F59E0B] transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            <button
              onClick={() => handleNavigate('beranda')}
              className="flex items-center gap-3 text-white font-bold text-lg md:text-xl focus:outline-none rounded-lg px-3 py-2 active:bg-transparent active:text-white hover:border-b-2 hover:border-[#F59E0B] transition-all duration-200"
            >
              <div className="relative">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-[#F59E0B] rounded-lg flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full flex items-center justify-center">
                  <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#1E3A8A]" />
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="leading-tight">Panduan NPWP</span>
                <span className="text-xs md:text-sm text-[#F59E0B] font-semibold leading-tight">Jepara</span>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-[16px] font-medium transition-colors duration-200 py-2 border-b-2 focus:outline-none rounded-sm active:bg-transparent ${
                    currentPage === item.id
                      ? 'text-[#F59E0B] border-[#F59E0B] active:text-[#F59E0B]'
                      : 'text-white border-transparent hover:text-[#F59E0B] active:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-[#F59E0B]/20 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none active:bg-transparent active:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-14 right-0 bottom-0 w-[280px] bg-[#1E3A8A] shadow-xl z-40 transition-transform duration-300 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`text-left px-6 py-4 text-base font-medium transition-colors duration-200 min-h-[56px] border-b border-[#F59E0B]/20 focus:outline-none active:bg-transparent ${
                currentPage === item.id
                  ? 'bg-[#F59E0B]/20 text-[#F59E0B] active:text-[#F59E0B]'
                  : 'text-white hover:bg-[#F59E0B]/10 active:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
