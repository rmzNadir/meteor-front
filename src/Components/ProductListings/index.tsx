/* eslint-disable react/no-children-prop */
import { useEffect, useState, useCallback, useRef } from 'react';
import { message, Input, Empty } from 'antd';
import { EmptyWrapper, ListingSpace, SearchSpace } from './styles';
import { IPagination, IProduct } from '../../Types';
import Amogus from '../../Utils/Amogus';
import ScrollReveal from '../../Utils/ScrollReveal';
import ProductCard from './ProductCard';
import ListingPagination from './ListingPagination';
import ProductDetails from './ProductDetails';

const { Search } = Input;

const DEF_PAGINATION: IPagination = {
  per_page: 9,
  page: 1,
};

const ProductListings = () => {
  const [product, setProduct] = useState<IProduct>();
  const [showDetails, setShowDetails] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>();
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);
  const childRef = useRef<any>();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationParams]);

  const handleSearchbar = (value: string) => {
    const trimmed = value.trim();
    setPaginationParams((p) => ({ ...p, q: trimmed, page: 1 }));
  };

  const handleSearchbarChange = (value: string) => {
    !value && setPaginationParams((p) => ({ ...p, q: value.trim(), page: 1 }));
  };

  const handleShowDetails = (id: number) => {
    setProduct(products.find((p) => p.id === id));
    setShowDetails(true);
  };

  return (
    <>
      <SearchSpace>
        <Search
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
          data={product}
          visible={showDetails}
          setVisible={setShowDetails}
        />
      )}
    </>
  );
};

export default ProductListings;
