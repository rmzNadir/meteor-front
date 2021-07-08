import './App.less';
import { memo } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

moment.locale('es');

const Routes = memo(() => {
  const { loading } = useAuthCTX();
  if (loading) {
    return <AppLoading />;
  }
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path='/404' component={NotFound} />
        <UnAuthRoute exact path='/' component={Login} />
        <UnAuthRoute exact path='/sign-up' component={SignUp} />
        <ProtectedRoute exact path='/products' component={Products} />
        <ProtectedRoute exact path='/products/:id' component={Product} />
        <Route path='*' component={() => <Redirect to='/404' />} />
      </Switch>
    </BrowserRouter>
  );
});

function App() {
  return (
    <ConfigProvider locale={esEs}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
