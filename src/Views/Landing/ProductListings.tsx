/* eslint-disable react/no-children-prop */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { Card, message, Input, Pagination, Image } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import SectionHeader from './SectionHeader';
import {
  ListingSection,
  ListingSpace,
  PaginationSpace,
  ProductInfo,
  SearchSpace,
} from './styles';
import { IPagination, IProduct } from '../../Types';
import Amogus from '../../Utils/Amogus';
import ScrollReveal from '../../Utils/ScrollReveal';
import theme from '../../Utils/theme';

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

const { Meta } = Card;
const { Search } = Input;

const IMG_FALLBACK =
  'data:image/png;base64,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';

const DEF_PAGINATION = {
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
  const [query, setQuery] = useState<string>();
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
      console.log(prodData);
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
    setQuery(value);
    setPaginationParams((p) => ({ ...p, q: trimmed }));
  };

  console.log(loadingProducts);

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
            />
          </SearchSpace>
          <ScrollReveal
            ref={childRef}
            children={() => (
              <ListingSpace>
                {products.map(
                  (
                    {
                      id,
                      name,
                      image,
                      description,
                      has_free_shipping,
                      shipping_cost,
                    },
                    i
                  ) => (
                    <Card
                      loading={loadingProducts}
                      key={id}
                      className={`reveal-from-${
                        i % 2 === 0 ? 'bottom' : 'top'
                      }`}
                      data-reveal-delay={i * 50}
                      hoverable
                      cover={
                        <Image
                          alt={name}
                          src={
                            loadingProducts
                              ? IMG_FALLBACK
                              : image?.url || IMG_FALLBACK
                          }
                          preview={false}
                          fallback={IMG_FALLBACK}
                          style={{ objectFit: 'cover', height: '190px' }}
                        />
                      }
                    >
                      <Meta
                        title={name}
                        description={
                          <div>
                            {description}
                            <ProductInfo>
                              <>
                                <div>Envío gratis</div>
                                {has_free_shipping ? (
                                  <CheckCircleOutlined
                                    style={{
                                      color: theme.colors.success,
                                      fontSize: '1rem',
                                    }}
                                  />
                                ) : (
                                  <CloseCircleOutlined
                                    style={{
                                      color: theme.colors.error,
                                      fontSize: '1rem',
                                    }}
                                  />
                                )}
                              </>
                              <>
                                <div>Costo de Envío</div>
                                <NumberFormat
                                  value={shipping_cost}
                                  displayType='text'
                                  thousandSeparator
                                  prefix='$ '
                                  suffix=' MXN'
                                />
                              </>
                            </ProductInfo>
                          </div>
                        }
                      />
                    </Card>
                  )
                )}
              </ListingSpace>
            )}
          />
          <PaginationSpace
            className='reveal-from-bottom'
            data-reveal-delay='200'
          >
            <Pagination
              responsive
              current={paginationParams.page}
              total={totalRecords}
              defaultPageSize={9}
              defaultCurrent={1}
              showSizeChanger={false}
              onChange={(p, pS) =>
                pS &&
                setPaginationParams((params) => ({
                  ...params,
                  page: p,
                  per_page: pS,
                }))
              }
            />
          </PaginationSpace>
        </div>
      </div>
    </ListingSection>
  );
};

export default ProductListings;
