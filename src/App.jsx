import { useEffect, useState } from 'react';
import { DestinationProvider } from './context/DestinationContext';
import { initLenis, destroyLenis } from './hooks/useLenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PackageDetails from './components/PackageDetails';
import DestinationsGrid from './components/DestinationsGrid';
import AboutStats from './components/AboutStats';
import Services from './components/Services';
import InstagramGallery from './components/InstagramGallery';
import MapContact from './components/MapContact';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <DestinationProvider>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Navbar />
      <main>
        <Hero ready={ready} />
        <PackageDetails />
        <DestinationsGrid />
        <AboutStats />
        <Services />
        <InstagramGallery />
        <MapContact />
      </main>
      <Footer />
    </DestinationProvider>
  );
}
