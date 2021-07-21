import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Badge, Button, Affix } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DropboxOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import Particles from 'react-particles-js';
import SectionName from '../SectionName';
import MeteorLogo from './MeteorLogo';
import { useCollapseCTX } from '../../Utils/CollapseContext';
import Breadcrumbs from '../Breadcrumbs';
import UserDropdown from './UserDropdown';
import { HeaderActions, LayoutContent, LogoWrapper } from './styles';
import { useAuthCTX } from '../../Utils/AuthContext';
import { useCartCTX } from '../../Utils/CartContext';
import ParticlesConfig from '../../Utils/ParticlesConfig';

interface Props {
  selectedKeys: string | string[];
  sectionName: string;
  children: React.ReactNode;
  animate?: boolean;
  adminView?: boolean;
  clientView?: boolean;
  showParticles?: boolean;
}

interface MenuProps {
  selectedKeys: Props['selectedKeys'];
  isAdmin: boolean;
  isClientUser: boolean;
}

const { Header, Sider } = Layout;

const MeteorMenu = ({ selectedKeys, isClientUser, isAdmin }: MenuProps) => {
  const history = useHistory();

  const SelectedKeys: string[] = Array.isArray(selectedKeys)
    ? selectedKeys
    : [selectedKeys];

  return (
    <Menu
      theme='dark'
      defaultSelectedKeys={SelectedKeys}
      mode='inline'
      onClick={(i) => history.push(`/${i.key}`)}
    >
      <Menu.Item key='listings' icon={<FontAwesomeIcon icon={faMeteor} />}>
        Mi Meteor
      </Menu.Item>
      <Menu.Item key='orders' icon={<ShoppingCartOutlined />}>
        Mis Pedidos
      </Menu.Item>
      {isClientUser && (
        <Menu.Item key='products' icon={<DropboxOutlined />}>
          Productos
        </Menu.Item>
      )}
      {isClientUser && (
        <Menu.Item key='sales' icon={<DollarOutlined />}>
          Ventas
        </Menu.Item>
      )}
      {isAdmin && (
        <Menu.Item key='users' icon={<UserOutlined />}>
          Usuarios
        </Menu.Item>
      )}
    </Menu>
  );
};

const Dashboard = ({
  selectedKeys,
  sectionName,
  children,
  animate = true,
  adminView = false,
  clientView = false,
  showParticles = false,
}: Props) => {
  const { setIsCollapsing } = useCollapseCTX();
  const [showSider, setShowSider] = useState(false);
  const mobile = useMediaQuery('(max-width: 767px)');
  const { setVisible, cartTotal } = useCartCTX();
  const { setIsAuth, setUser, user, isAdmin, isClientUser } = useAuthCTX();

  const animations = animate
    ? {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        transition: { type: 'tween', duration: 0.2 },
      }
    : {};

  // Ghetto code to delay table resize long enough to stop the sider animation from lagging lmao

  const handleCollapse = () => {
    !mobile && setIsCollapsing(true);
    setShowSider((s) => !s);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsCollapsing(false), 400);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSider]);

  useEffect(() => {
    mobile && setShowSider(false);
  }, [mobile]);

  if (clientView && !isAdmin && !isClientUser) {
    return <Redirect to='/' />;
  }

  if (adminView && !isAdmin) {
    return <Redirect to='/' />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!mobile && (
        <Sider
          trigger={null}
          defaultCollapsed
          collapsible
          collapsed={showSider}
        >
          <Affix>
            <MeteorLogo collapsed={showSider} />
            <MeteorMenu
              selectedKeys={selectedKeys}
              isAdmin={isAdmin}
              isClientUser={isClientUser}
            />
          </Affix>
        </Sider>
      )}

      {mobile && (
        <Drawer
          visible={showSider}
          placement='left'
          style={{ height: '100%' }}
          closable={false}
          onClose={() => {
            setShowSider(!showSider);
          }}
        >
          <LogoWrapper style={{ marginBottom: '1rem' }}>
            <img className='logo' src='/images/meteor.png' alt='meteor-logo' />
          </LogoWrapper>

          <MeteorMenu
            selectedKeys={selectedKeys}
            isAdmin={isAdmin}
            isClientUser={isClientUser}
          />
        </Drawer>
      )}

      <Layout style={{ position: 'relative' }}>
        {showParticles && !mobile && (
          <Particles
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            params={ParticlesConfig}
          />
        )}

        <Affix style={{ zIndex: 1000 }}>
          <Header
            style={{
              padding: '0 1rem 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {!mobile &&
              React.createElement(
                showSider ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  style: {
                    color: '#fff',
                    fontSize: '1.2rem',
                    marginLeft: '0.5rem',
                  },
                  onClick: () => handleCollapse(),
                }
              )}

            {mobile &&
              React.createElement(
                showSider ? MenuFoldOutlined : MenuUnfoldOutlined,
                {
                  style: {
                    color: '#fff',
                    fontSize: '1.2rem',
                    marginLeft: '1rem',
                  },
                  onClick: () => handleCollapse(),
                }
              )}

            <HeaderActions>
              <Badge
                count={cartTotal.items}
                style={{ marginTop: '4px', marginRight: '4px' }}
              >
                <Button
                  shape='circle'
                  type='primary'
                  size='large'
                  onClick={() => setVisible(true)}
                >
                  <ShoppingOutlined />
                </Button>
              </Badge>

              <UserDropdown
                setIsAuth={setIsAuth}
                setUser={setUser}
                user={user}
              />
            </HeaderActions>
          </Header>
        </Affix>
        <SectionName>{sectionName}</SectionName>

        <Breadcrumbs />

        <LayoutContent
        // className='site-layout-background'
        >
          <AnimatePresence exitBeforeEnter>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <motion.div {...animations}>{children}</motion.div>
          </AnimatePresence>
        </LayoutContent>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
