import { IPagination, ISaleRecord } from '../../Types';
import SalesTable from './SalesTable';
import { HeaderSpace, Search } from './styles';

interface Props {
  handleSearchbar(value: string): void;
  loading: boolean;
  sales: ISaleRecord[];
  setPaginationParams: React.Dispatch<React.SetStateAction<IPagination>>;
  totalRecords: number;
  paginationParams: IPagination;
}

const SalesHistory = ({
  handleSearchbar,
  loading,
  sales,
  setPaginationParams,
  totalRecords,
  paginationParams,
}: Props) => {
  return (
    <>
      <HeaderSpace>
        <Search
          placeholder='Buscar ventas'
          enterButton
          onSearch={handleSearchbar}
          allowClear
          loading={loading}
        />
      </HeaderSpace>

      <SalesTable
        loading={loading}
        sales={sales}
        setPaginationParams={setPaginationParams}
        totalRecords={totalRecords}
        paginationParams={paginationParams}
      />
    </>
  );
};

export default SalesHistory;
