/* eslint-disable react/no-children-prop */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { message, Input, Empty } from 'antd';
import SectionHeader from './SectionHeader';
import {
  EmptyWrapper,
  ListingSection,
  ListingSpace,
  SearchSpace,
} from './styles';
import { IPagination, IProduct } from '../../Types';
import Amogus from '../../Utils/Amogus';
import ScrollReveal from '../../Utils/ScrollReveal';
import ProductCard from './ProductCard';
import ListingPagination from './ListingPagination';
import Cart from '../../Components/Cart';

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

const { Search } = Input;

const DEF_PAGINATION: IPagination = {
  per_page: 9,
  page: 1,
};

const ProductListings = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}: Props) => {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>();
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);
  const childRef = useRef<any>();

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

  const getProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const params = new URLSearchParams(
        paginationParams as unknown as Record<string, string>
      );
      const [prodRes] = await Amogus(
        {
          method: 'GET',
          url: `/listings/?${params}`,
        },
        false
      );

      const {
        data: prodData,
        headers: { total },
      } = prodRes;

      // Yet another guetto workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
      setProducts(prodData);
      setTotalRecords(total);
    } catch (e) {
      message.error('Ocurrió un error al cargar el catálogo de productos');
    }
    setLoadingProducts(false);

    if (childRef.current) {
      childRef.current.init();
    }
  }, [paginationParams]);

  useEffect(() => {
    getProducts();
  }, [paginationParams]);

  const handleSearchbar = (value: string) => {
    const trimmed = value.trim();
    setPaginationParams((p) => ({ ...p, q: trimmed }));
  };

  return (
    <ListingSection {...props} className={outerClasses}>
      <div className='container'>
        <div className={innerClasses}>
          <SectionHeader
            data={sectionHeader}
            className='center-content reveal-from-top'
          />
          <SearchSpace>
            <Search
              placeholder='Buscar productos'
              enterButton
              onSearch={handleSearchbar}
              allowClear
              loading={loadingProducts}
            />
          </SearchSpace>

          <ScrollReveal
            ref={childRef}
            children={() =>
              products.length < 1 && !loadingProducts ? (
                <EmptyWrapper className='reveal-scale-up'>
                  <Empty description='No hay productos para mostrar' />
                </EmptyWrapper>
              ) : (
                <ListingSpace>
                  {products.map((productInfo, i) => (
                    <ProductCard
                      key={productInfo.id}
                      loadingProducts={loadingProducts}
                      productInfo={productInfo}
                      index={i}
                    />
                  ))}
                </ListingSpace>
              )
            }
          />

          {totalRecords && totalRecords > paginationParams.per_page && (
            <ListingPagination
              totalRecords={totalRecords}
              paginationParams={paginationParams}
              setPaginationParams={setPaginationParams}
            />
          )}
        </div>
      </div>

      <Cart />
    </ListingSection>
  );
};

export default ProductListings;
