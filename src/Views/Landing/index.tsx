import Header from './Header';
import Footer from './Footer';
import ProductListings from './ProductListings';
// import Hero from './Hero';
// import FeaturesTiles from './FeatureTiles';

const Landing = () => (
  <>
    <Header navPosition='right' className='reveal-from-bottom' />
    <main className='site-content'>
      {/* <Hero className='illustration-section-01' /> */}
      {/* <FeaturesTiles /> */}
      <ProductListings topOuterDivider />
    </main>
    <Footer className='reveal-from-top' data-reveal-delay='200' />
  </>
);

export default Landing;
