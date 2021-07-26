/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import Logo from './Logo';
import FooterNav from './FooterNav';
import FooterSocial from './FooterSocial';

interface Props {
  className?: string;
  topOuterDivider?: boolean;
  topDivider?: boolean;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

const Footer = ({
  className,
  topOuterDivider,
  topDivider,
  ...props
}: Props) => {
  const classes = classNames(
    'site-footer center-content-mobile',
    topOuterDivider && 'has-top-divider',
    className
  );

  return (
    <footer {...props} className={classes}>
      <div className='container'>
        <div
          className={classNames(
            'site-footer-inner',
            topDivider && 'has-top-divider'
          )}
        >
          <div className='footer-top space-between text-xxs'>
            <Logo isFooter />
            {/* <FooterSocial /> */}
          </div>
          <div className='footer-bottom space-between text-xxs invert-order-desktop'>
            <FooterNav />
            <div />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
