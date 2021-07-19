import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { IPagination } from '../../Types';
import { PaginationSpace } from './styles';

interface Props {
  paginationParams: IPagination;
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number;
}

const Pagination = ({
  paginationParams,
  setPaginationParams,
  totalRecords,
}: Props) => {
  return (
    <PaginationSpace>
      <AntPagination
        responsive
        current={paginationParams.page}
        total={totalRecords}
        pageSizeOptions={['6', '12', '25', '50', '100']}
        defaultPageSize={12}
        defaultCurrent={1}
        showSizeChanger
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

export default Pagination;
