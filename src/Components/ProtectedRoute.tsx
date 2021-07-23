import { Route, Redirect } from 'react-router-dom';
import { useAuthCTX } from '../Utils/AuthContext';
import GetQueryParams from '../Utils/GetQueryParams';

interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType;
}

const ProtectedRoute = ({ component, exact = false, path }: Props) => {
  const { isAuth } = useAuthCTX();
  const id = GetQueryParams('id');

  if (isAuth) {
    return <Route exact={exact} path={path} component={component} />;
  }

  // Add ID to redirect url in case user opened a link to /listings?id=<id> and wasn't logged in
  return <Redirect to={id ? `/?id=${id}` : '/'} />;
};

export default ProtectedRoute;
