import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShoppingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Redirect, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';
import SectionName from '../SectionName';
import MeteorLogo from './MeteorLogo';
import { useCollapseCTX } from '../../Utils/CollapseContext';
import Breadcrumbs from '../Breadcrumbs';
import UserDropdown from './UserDropdown';
import { LogoWrapper } from './styles';
import { useAuthCTX } from '../../Utils/AuthContext';

interface Props {
  selectedKeys: string | string[];
  sectionName: string;
  children: React.ReactNode;
  animate?: boolean;
  adminView?: boolean;
}

interface MenuProps {
  selectedKeys: Props['selectedKeys'];
  isAdmin: boolean;
}

const { Header, Sider, Content } = Layout;

const MeteorMenu = ({ selectedKeys, isAdmin }: MenuProps) => {
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
      {isAdmin && (
        <Menu.Item key='products' icon={<ShoppingOutlined />}>
          Productos
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
}: Props) => {
  const { setIsCollapsing } = useCollapseCTX();
  const [showSider, setShowSider] = useState(false);
  const mobile = useMediaQuery('(max-width: 767px)');
  const { setIsAuth, setUser, user } = useAuthCTX();
  const { role } = { ...user };

  const isAdmin = useMemo(() => role === 'admin', [role]);

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
          <MeteorLogo collapsed={showSider} />
          <MeteorMenu selectedKeys={selectedKeys} isAdmin={isAdmin} />
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

          <MeteorMenu selectedKeys={selectedKeys} isAdmin={isAdmin} />
        </Drawer>
      )}

      <Layout>
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

          <UserDropdown
            isAdmin={isAdmin}
            setIsAuth={setIsAuth}
            setUser={setUser}
          />
        </Header>
        <SectionName>{sectionName}</SectionName>

        <Breadcrumbs />

        <Content
          // className='site-layout-background'
          style={{
            margin: '2rem 1rem 1rem',
            padding: '1.5rem',
          }}
        >
          <AnimatePresence exitBeforeEnter>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <motion.div {...animations}>{children}</motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
