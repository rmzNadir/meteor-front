import { useState, useCallback, useEffect, useRef } from 'react';
import { message, Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { IPagination, ISaleRecord } from '../../Types';
import SalesTable from './SalesTable';
import { HeaderSpace, Search } from './styles';

const fileDownload = require('js-file-download');

const DEF_PAGINATION = {
  per_page: 10,
  page: 1,
};

const SalesHistory = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [sales, setSales] = useState<ISaleRecord[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [paginationParams, setPaginationParams] =
    useState<IPagination>(DEF_PAGINATION);

  const renders = useRef(0);

  const getProducts = useCallback(
    async (isDownload: boolean = false) => {
      isDownload ? setLoadingDownload(true) : setLoading(true);
      try {
        let params = new URLSearchParams(
          paginationParams as unknown as Record<string, string>
        );

        if (isDownload) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { page, per_page, ...rest } = paginationParams;
          params = new URLSearchParams({
            ...rest,
            download: 'true',
          } as unknown as Record<string, string>);
        }

        const res = await axios.get(
          `/sales/?${params}`,
          isDownload ? { responseType: 'blob' } : undefined
        );

        const {
          data,
          headers: { total },
        } = res;

        // Yet another guetto workaround, in this case it helps avoid the ugly stuttering animation on 1st renders
        if (isDownload) {
          fileDownload(
            data,
            `Reporte-ventas-${moment().format('DD-MM-YYYY')}.xlsx`
          );
        } else if (renders.current <= 1) {
          setTimeout(() => {
            setSales(data);
          }, 250);
        } else {
          setSales(data);
        }

        setTotalRecords(total);
      } catch (e) {
        message.error('Ocurrió un error al cargar el historial de ventas');
      }
      isDownload ? setLoadingDownload(false) : setLoading(false);
    },
    [paginationParams]
  );

  useEffect(() => {
    renders.current += 1;
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
      <HeaderSpace>
        <Tooltip title='Descargar reporte'>
          <Button
            shape='circle'
            type='primary'
            loading={loadingDownload}
            disabled={totalRecords < 1}
            icon={<DownloadOutlined />}
            onClick={() => getProducts(true)}
          />
        </Tooltip>
        <Search
          className='search-input'
          placeholder='Buscar ventas'
          enterButton
          onSearch={handleSearchbar}
          onChange={({ target }) => handleSearchbarChange(target.value)}
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
