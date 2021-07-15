/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'beautiful-react-hooks';
import { Tooltip } from 'antd';
import Logo from './Logo';
import { CartButton, LoginButton, SignUpButton } from './styles';
import { useCartCTX } from '../../Utils/CartContext';

interface Props {
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
  navPosition?: string;
  hideNav?: boolean;
  hideSignin?: boolean;
  bottomOuterDivider?: boolean;
  bottomDivider?: boolean;
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}: Props) => {
  const [isActive, setIsactive] = useState(false);
  const { setVisible } = useCartCTX();
  const history = useHistory();
  const mobile = useMediaQuery('(max-width: 640px)');

  const nav = useRef<HTMLElement>(null);
  const hamburger = useRef(null);

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = 'none');
    setIsactive(false);
  };

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    if (nav.current) {
      nav.current.style.maxHeight = `${nav?.current?.scrollHeight}px`;
      setIsactive(true);
    }
  };

  const keyPress = (e: KeyboardEvent) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e: MouseEvent) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target as unknown as Node) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  return (
    <header {...props} className={classes}>
      <div className='container'>
        <div
          className={classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}
        >
          <Logo />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className='header-nav-toggle'
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className='screen-reader'>Menu</span>
                <span className='hamburger'>
                  <span className='hamburger-inner' />
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames('header-nav', isActive && 'is-active')}
              >
                <div className='header-nav-inner'>
                  <ul
                    className={classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li>
                      <SignUpButton onClick={() => history.push('/sign-up')}>
                        Registrarse
                      </SignUpButton>
                    </li>
                  </ul>
                  {!hideSignin && (
                    <ul className='list-reset header-nav-right'>
                      <li>
                        <LoginButton
                          type='primary'
                          onClick={() => history.push('/login')}
                        >
                          Iniciar sesión
                        </LoginButton>
                      </li>
                    </ul>
                  )}
                  <ul
                    className={classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li>
                      <Tooltip title='Carrito' placement='bottom' zIndex={999}>
                        <CartButton
                          shape={mobile ? undefined : 'circle'}
                          type='primary'
                          onClick={() => setVisible(true)}
                        >
                          {mobile ? 'Carrito' : <ShoppingOutlined />}
                        </CartButton>
                      </Tooltip>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
