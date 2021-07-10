/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'beautiful-react-hooks';
import Image from './Image';

interface Props {
  className?: string;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  isFooter?: boolean;
}

const Logo = ({ className, isFooter, ...props }: Props) => {
  const classes = classNames('brand', className);
  const mobile = useMediaQuery('(max-width: 745px)');

  return (
    <div {...props} className={classes}>
      <h1 className='m-0'>
        <Link to='/'>
          {isFooter && mobile ? (
            <Image
              src={require('../../assets/images/meteor.png').default}
              alt='Open'
              width={120}
              height={120}
              id='landing-logo'
            />
          ) : (
            <Image
              src={require('../../assets/images/meteor-small.png').default}
              alt='Open'
              width={50}
              height={50}
              id='landing-logo'
            />
          )}
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
