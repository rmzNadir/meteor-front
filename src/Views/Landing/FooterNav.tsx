/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';

interface Props {
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

const FooterNav = ({ className, ...props }: Props) => {
  const classes = classNames('footer-nav', className);

  return (
    <nav {...props} className={classes}>
      <ul className='list-reset'>
        <li>
          <a href='mailto:dgzrz99@gmail.com?subject=Hey!'>Contacto</a>
        </li>
        <li>
          <a
            target='_blank'
            href='https://github.com/rmzNadir/meteor-front'
            rel='noreferrer'
          >
            Acerca de
          </a>
        </li>
        {/* <li>
          <Link to='#0'>FAQ&apos;s</Link>
        </li>
        <li>
          <Link to='#0'>Support</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default FooterNav;
