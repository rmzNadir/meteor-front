/* eslint-disable react/no-children-prop */
import './App.less';
import { memo, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import moment from 'moment';

import 'moment/locale/es';
import esEs from 'antd/es/locale/es_ES';

import ProtectedRoute from './Components/ProtectedRoute';

// Utils
import ScrollToTop from './Utils/ScrollToTop';
import theme from './Utils/theme';

// Views
import Login from './Views/Login';
import Products from './Views/Products';
import Product from './Views/Product';
import SignUp from './Views/SignUp';
import AuthProvider, { useAuthCTX } from './Utils/AuthContext';
import UnAuthRoute from './Components/UnAuthRoute';
import AppLoading from './Components/AppLoading';
import NotFound from './Views/NotFound';
import ScrollReveal from './Utils/ScrollReveal';
import Landing from './Views/Landing';
import Listings from './Views/Listings';
import CartProvider from './Utils/CartContext';
import Cart from './Components/Cart';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

moment.locale('es');

const Routes = memo(() => {
  const { loading } = useAuthCTX();
  const childRef = useRef<any>();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('is-loaded');
    if (childRef.current) {
      childRef.current.init();
    }
  }, [location.key, loading]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <>
      <CartProvider>
        <ScrollToTop />
        <Cart />

        <ScrollReveal
          ref={childRef}
          children={() => (
            <Switch>
              <Route exact path='/404' component={NotFound} />
              <UnAuthRoute exact path='/' component={Landing} />
              <UnAuthRoute exact path='/login' component={Login} />
              <UnAuthRoute exact path='/sign-up' component={SignUp} />
              <ProtectedRoute exact path='/products' component={Products} />
              <ProtectedRoute exact path='/products/:id' component={Product} />
              <ProtectedRoute exact path='/listings' component={Listings} />
              <Route path='*' component={() => <Redirect to='/404' />} />
            </Switch>
          )}
        />
      </CartProvider>
    </>
  );
});

function App() {
  return (
    <ConfigProvider locale={esEs}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
