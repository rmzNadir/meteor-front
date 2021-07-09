import { Typography, Spin } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Card from '../../Components/Card';
import { ICards } from '../../Types';
import Capitalize from '../../Utils/Capitalize';
import {
  Summary,
  ProductDetailsGrid,
  CenterCardBodyColumn,
  NoData,
} from './styles';

interface Props {
  cards: ICards | undefined;
  loadingProducts: boolean;
}

const { Link } = Typography;

const Cards = ({ cards, loadingProducts }: Props) => {
  const history = useHistory();
  const { total_records, low_stock, possible_sales, latest_addition } = {
    ...cards,
  };

  return (
    <Summary>
      <Card title='Registros'>
        <CenterCardBodyColumn>
          <Spin spinning={loadingProducts}>
            {total_records ? (
              <>
                <div className='total-records'>{total_records}</div>
                <div>productos registrados</div>
              </>
            ) : (
              <NoData image={NoData.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Spin>
        </CenterCardBodyColumn>
      </Card>

      <Card title='Menores existencias' bodyPadding={false}>
        <CenterCardBodyColumn>
          <Spin spinning={loadingProducts}>
            <CenterCardBodyColumn style={{ padding: '12px' }}>
              {low_stock?.map(({ name, stock, id }) => (
                /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                <Link key={id} onClick={() => history.push(`/products/${id}`)}>
                  <ProductDetailsGrid>
                    <div>{Capitalize(name)}</div>
                    <div>-</div>
                    <div>{stock} pzas.</div>
                  </ProductDetailsGrid>
                </Link>
              )) || <NoData image={NoData.PRESENTED_IMAGE_SIMPLE} />}
            </CenterCardBodyColumn>
          </Spin>
        </CenterCardBodyColumn>
      </Card>

      <Card title='Posibles promociones' bodyPadding={false}>
        <CenterCardBodyColumn style={{ padding: '12px' }}>
          <Spin spinning={loadingProducts}>
            <CenterCardBodyColumn>
              {possible_sales?.map(({ name, stock, id }) => (
                /* eslint-disable-next-line jsx-a11y/anchor-is-valid */
                <Link key={id} onClick={() => history.push(`/products/${id}`)}>
                  <ProductDetailsGrid>
                    <div>{Capitalize(name)}</div>
                    <div>-</div>
                    <div>{stock} pzas.</div>
                  </ProductDetailsGrid>
                </Link>
              )) || <NoData image={NoData.PRESENTED_IMAGE_SIMPLE} />}
            </CenterCardBodyColumn>
          </Spin>
        </CenterCardBodyColumn>
      </Card>

      <Card title='Último añadido'>
        <CenterCardBodyColumn>
          <Spin spinning={loadingProducts}>
            <CenterCardBodyColumn>
              {latest_addition ? (
                <>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    onClick={() =>
                      history.push(`/products/${latest_addition.id}`)
                    }
                    className='latest-addition'
                  >
                    <div>{Capitalize(latest_addition.name)}</div>
                  </Link>
                  <div>{moment(latest_addition.created_at).fromNow()}</div>
                </>
              ) : (
                <NoData image={NoData.PRESENTED_IMAGE_SIMPLE} />
              )}
            </CenterCardBodyColumn>
          </Spin>
        </CenterCardBodyColumn>
      </Card>
    </Summary>
  );
};

export default Cards;
