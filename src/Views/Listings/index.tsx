import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard';
import { useCartCTX } from '../../Utils/CartContext';

interface ListingsLocationProps {
  showCart: boolean;
}

const Listings = () => {
  const { state } = useLocation<ListingsLocationProps>();
  const { setVisible, setUserCart } = useCartCTX();
  const { showCart } = { ...state };

  useEffect(() => {
    if (showCart) {
      setVisible(showCart);
      setUserCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCart]);

  return (
    <Dashboard selectedKeys='listings' sectionName='Mi Meteor'>
      asd
    </Dashboard>
  );
};

export default Listings;
