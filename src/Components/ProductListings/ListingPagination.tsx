import React from 'react';
import { Pagination } from 'antd';
import { IPagination } from '../../Types';
import { PaginationSpace } from './styles';

interface Props {
  paginationParams: IPagination;
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number;
}

const ListingPagination = ({
  paginationParams,
  setPaginationParams,
  totalRecords,
}: Props) => {
  return (
    <PaginationSpace className='reveal-from-top'>
      <Pagination
        responsive
        current={paginationParams.page}
        total={totalRecords}
        defaultPageSize={9}
        defaultCurrent={1}
        showSizeChanger={false}
        hideOnSinglePage
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
  );
};

export default ListingPagination;
