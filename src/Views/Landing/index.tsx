import { LandingContainer } from './styles';
import Header from './Header';
import Footer from './Footer';
import ProductListings from './ProductListings';
import CartProvider from '../../Utils/CartContext';
// import Hero from './Hero';
// import FeaturesTiles from './FeatureTiles';

const Landing = () => (
  <CartProvider>
    <LandingContainer>
      <Header navPosition='right' className='reveal-from-bottom' />
      <main className='site-content'>
        <ProductListings topOuterDivider className='illustration-section-01' />
        {/* <Hero className='illustration-section-01' /> */}
      </main>
      <Footer className='reveal-from-top' data-reveal-delay='200' />
    </LandingContainer>
  </CartProvider>
);

export default Landing;
