/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-children-prop */
import { useEffect, useState, useCallback, useRef } from 'react';
import { message, Input, Empty, Spin } from 'antd';
import axios from 'axios';
import { EmptyWrapper, ListingSpace, SearchSpace } from './styles';
import { IPagination, IProduct } from '../../Types';
import Amogus from '../../Utils/Amogus';
import ScrollReveal from '../../Utils/ScrollReveal';
import ProductCard from './ProductCard';
import ListingPagination from './ListingPagination';
import ProductDetails from './ProductDetails';
import GetQueryParams from '../../Utils/GetQueryParams';

const { Search } = Input;

const DEF_PAGINATION: IPagination = {
  per_page: 9,
  page: 1,
};

const ProductListings = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>();
  const [product, setProduct] = useState<IProduct>();
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const childRef = useRef<any>();
  const renders = useRef(1);

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

      // Yet another ugly workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
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

  const handleShowDetails = useCallback(
    async (id: number) => {
      window.history.replaceState(null, '', `?id=${id}`);
      setShowDetails(true);
      const prod = products.find((p) => p.id === id);
      if (prod) {
        setProduct(prod);
      } else {
        try {
          const { data } = await axios.get(`/listings/${id}`);
          const { success, product: dProd, msg } = data;

          if (success) {
            if (dProd.disabled) {
              message.warning('Este producto no se encuentra disponible');
              window.history.replaceState(null, '', window.location.pathname);
            } else {
              setProduct(dProd);
            }
          }
          if (msg === 'Product not found') {
            message.error('No se encontró el producto');
          }
        } catch (e) {
          message.error('Ocurrió un error al cargar el producto');
        }
      }
    },
    [products]
  );

  useEffect(() => {
    // Show product details if needed on second render (after products have been set)
    if (renders.current === 2) {
      const id = GetQueryParams('id');

      if (id) {
        handleShowDetails(+id);
      }
    }

    renders.current += 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationParams]);

  const handleSearchbar = (value: string) => {
    const trimmed = value.trim();
    setPaginationParams((p) => ({ ...p, q: trimmed, page: 1 }));
  };

  const handleSearchbarChange = (value: string) => {
    !value && setPaginationParams((p) => ({ ...p, q: value.trim(), page: 1 }));
  };

  return (
    <>
      <SearchSpace>
        <Search
          className='search-input'
          placeholder='Buscar productos'
          enterButton
          onChange={({ target }) => handleSearchbarChange(target.value)}
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
          ) : loadingProducts ? (
            <EmptyWrapper>
              <Spin spinning />
            </EmptyWrapper>
          ) : (
            <ListingSpace>
              {products.map((productInfo, i) => (
                <ProductCard
                  handleShowDetails={handleShowDetails}
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

      {product && (
        <ProductDetails
          visible={showDetails}
          setVisible={setShowDetails}
          data={product}
        />
      )}
    </>
  );
};

export default ProductListings;
