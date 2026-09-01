import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import FeatureGrid from './components/FeatureGrid';
import InteractiveWorkflow from './components/InteractiveWorkflow';
import PricingSection from './components/PricingSection';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <HeroSection />
        <StatsBar />
        <FeatureGrid />
        <InteractiveWorkflow />
        <PricingSection />
        <Testimonials />
        <FaqSection />
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
