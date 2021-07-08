import { Route, Redirect } from 'react-router-dom';
import { useAuthCTX } from '../Utils/AuthContext';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType;
}

const UnAuthRoute = ({ component, exact = false, path }: Props) => {
  const { isAuth } = useAuthCTX();

  if (!isAuth) {
    return <Route exact={exact} path={path} component={component} />;
  }

  return <Redirect to='/products' />;
};

export default UnAuthRoute;
