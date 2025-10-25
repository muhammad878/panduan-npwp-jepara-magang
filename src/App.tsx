import { useState } from 'react';
import { Header } from './components/Header';
import { Beranda } from './pages/Beranda';
import { TutorialOnline } from './pages/TutorialOnline';
import { TutorialOffline } from './pages/TutorialOffline';
import { Troubleshooting } from './pages/Troubleshooting';
import { PersiapanDokumen } from './pages/PersiapanDokumen';
import { KontakKPP } from './pages/KontakKPP';

type Page = 'beranda' | 'tutorial-online' | 'tutorial-offline' | 'troubleshooting' | 'persiapan-dokumen' | 'kontak-kpp';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('beranda');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'beranda':
        return <Beranda onNavigate={handleNavigate} />;
      case 'tutorial-online':
        return <TutorialOnline onNavigate={handleNavigate} />;
      case 'tutorial-offline':
        return <TutorialOffline onNavigate={handleNavigate} />;
      case 'troubleshooting':
        return <Troubleshooting onNavigate={handleNavigate} />;
      case 'persiapan-dokumen':
        return <PersiapanDokumen onNavigate={handleNavigate} />;
      case 'kontak-kpp':
        return <KontakKPP onNavigate={handleNavigate} />;
      default:
        return <Beranda onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
    </>
  );
}

export default App;
