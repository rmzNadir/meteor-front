import { Link, useParams, withRouter } from 'react-router-dom';
import { Breadcrumb } from './styles';

interface IBreadcrumbNameMap {
  [key: string]: string | undefined;
}

const Breadcrumbs = withRouter(({ location }) => {
  const { id }: { id: string } = useParams();

  const breadcrumbNameMap: IBreadcrumbNameMap = {
    '/': 'Inicio',
    '/products': 'Productos',
    '/products/:id': 'Detalles',
    '/listings': 'Todos los productos',
  };

  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const pathSnippetsCopy = [...pathSnippets];

  if (id) {
    pathSnippets[pathSnippets.length - 1] = ':id';
  }

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const mapUrl = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const actualUrl = `/${pathSnippetsCopy.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={mapUrl}>
        <Link to={actualUrl}>{breadcrumbNameMap[mapUrl]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to='/'>Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
});

export default Breadcrumbs;
