import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import FeaturesTiles from './FeatureTiles';

const Landing = () => (
  <>
    <Header navPosition='right' className='reveal-from-bottom' />
    <main className='site-content'>
      <Hero className='illustration-section-01' />
      <FeaturesTiles />
    </main>
    <Footer />
  </>
);

export default Landing;
