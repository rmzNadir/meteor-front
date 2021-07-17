/* eslint-disable react/no-children-prop */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import SectionHeader from './SectionHeader';
import { ListingSection } from './styles';
import ProductListings from '../../Components/ProductListings';

interface Props {
  className?: string;
  topOuterDivider?: boolean;
  bottomOuterDivider?: boolean;
  topDivider?: boolean;
  bottomDivider?: boolean;
  hasBgColor?: boolean;
  invertColor?: boolean;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

const Listings = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}: Props) => {
  const outerClasses = classNames(
    'features-tiles section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-tiles-inner section-inner pt-0',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const sectionHeader = {
    title: 'Descubre las mejores ofertas',
    paragraph: 'Productos que amas, siempre a los mejores precios del mercado',
  };

  return (
    <ListingSection {...props} className={outerClasses}>
      <div className='container'>
        <div className={innerClasses}>
          <SectionHeader
            data={sectionHeader}
            className='center-content reveal-from-top'
          />
          <ProductListings />
        </div>
      </div>
    </ListingSection>
  );
};

export default Listings;
