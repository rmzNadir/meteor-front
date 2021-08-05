/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react';
import { Card, message, Tooltip, Spin, Button } from 'antd';
import {
  Line,
  LineConfig,
  Liquid,
  LiquidConfig,
  Pie,
  PieConfig,
} from '@ant-design/charts';
import { PathCommand } from '@antv/g-base';
import axios from 'axios';
import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import { DashboardSpace, LiquidTooltipInfo, TitleInfo } from './styles';
import theme from '../../Utils/theme';
import { IDashboard } from '../../Types';
import Capitalize from '../../Utils/Capitalize';
import { setStorage } from '../../Utils/Storage';

const SalesDashboard = () => {
  const [dashboardData, setDashboardData] = useState<IDashboard>();
  const [loading, setLoading] = useState(false);

  // Refs
  // <Plot<AllBaseConfig> | undefined> is not typed correctly
  // TODO: create own type lmao
  // Liquid charts wont show text when downloaded
  const lineRef = useRef<any>();
  const pieRef = useRef<any>();
  const history = useHistory();

  const { week_sales, most_sold, top_buyer, top_5_products } = {
    ...dashboardData,
  };

  const { user } = { ...top_buyer };

  useEffect(() => {
    const getDashboardData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/sales-dashboard');
        const { dashboard, success } = data;

        if (success) {
          setDashboardData(dashboard);
        }
      } catch (e) {
        console.error(e);
        message.error('Ocurrió un error al tratar de cargar la información');
      }
      setLoading(false);
    };
    getDashboardData();
  }, []);

  const LineChart: LineConfig = {
    data: week_sales || [],
    xField: 'date',
    yField: 'sales',
    seriesField: 'name',
    meta: {
      date: {
        range: [0, 1],
        formatter: function formatter(v: string) {
          return moment(new Date(v)).format('DD/MMM');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 2500,
      },
    },
    color: theme.colors.primary,
  };

  const LiquidChart: LiquidConfig = {
    percent: (most_sold?.percentage || 0) / 100,
    shape: 'diamond',
    outline: {
      border: 4,
      distance: 0,
      style: {
        stroke: theme.colors.primary,
      },
    },
    statistic: {
      title: {
        content: `${most_sold?.product.name}`,
      },
    },
    style: { borderColor: 'red' },
    color: theme.colors.primary,
    wave: { length: 128 },
  };

  const PieChart: PieConfig = {
    appendPadding: 10,
    data: top_5_products || [],
    angleField: 'times_bought',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      autoRotate: false,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: '',
      },
    },
    color: ['#94D0CC', '#8b6188', '#FFD3B4', '#FFBCBC', '#A1CAE2'],
  };

  const StarChart: LiquidConfig = {
    percent: (top_buyer?.percentage || 0) / 100,
    shape: (x, y, width, height): PathCommand[] => {
      const path = [];
      const w = Math.min(width, height);
      for (let i = 0; i < 5; i++) {
        path.push([
          i === 0 ? 'M' : 'L',
          (Math.cos(((18 + i * 72) * Math.PI) / 180) * w) / 2 + x,
          (-Math.sin(((18 + i * 72) * Math.PI) / 180) * w) / 2 + y,
        ]);
        path.push([
          'L',
          (Math.cos(((54 + i * 72) * Math.PI) / 180) * w) / 4 + x,
          (-Math.sin(((54 + i * 72) * Math.PI) / 180) * w) / 4 + y,
        ]);
      }
      path.push(['Z']);
      return path as PathCommand[];
    },
    outline: {
      border: 4,
      distance: 0,
      style: {
        stroke: '#FFC100',
        strokeOpacity: 0.65,
      },
    },
    statistic: {
      title: {
        content:
          user && `${Capitalize(user.name)} ${Capitalize(user.last_name)}`,
      },
    },
    wave: { length: 128 },
    theme: { styleSheet: { brandColor: '#FFC100' } },
  };

  const handleRedirect = (route: string) => {
    setStorage('dashboardTab', 'dashboard');
    history.push(route);
  };

  return (
    <DashboardSpace>
      <div className='graph-space'>
        <Card
          title='Ventas en los últimos 7 días'
          type='inner'
          extra={
            <Button
              onClick={() =>
                lineRef.current?.downloadImage(
                  `ventas-7-dias-${moment().format('DD-MM-YYYY')}`
                )
              }
            >
              Descargar
            </Button>
          }
        >
          <Spin spinning={loading}>
            <Line {...LineChart} chartRef={lineRef} />
          </Spin>
        </Card>
        <Card
          title={
            <TitleInfo>
              <span>Producto más vendido</span>
              <Tooltip title='En relación al porcentaje total de ventas'>
                <InfoCircleOutlined />
              </Tooltip>
            </TitleInfo>
          }
          extra={
            <Button
              onClick={() =>
                handleRedirect(`/products/${most_sold?.product.id}`)
              }
            >
              Ver producto
            </Button>
          }
          type='inner'
        >
          <Tooltip
            title={
              <LiquidTooltipInfo>
                <div className='tooltip-info-wrapper'>
                  <div>Todos las ventas:</div>
                  <NumberFormat
                    value={most_sold?.all_sales}
                    displayType='text'
                    thousandSeparator
                  />
                </div>
                <div className='tooltip-info-wrapper'>
                  <div>{most_sold && Capitalize(most_sold.product.name)}: </div>
                  <NumberFormat
                    value={most_sold?.product.times_bought}
                    displayType='text'
                    thousandSeparator
                  />
                </div>
              </LiquidTooltipInfo>
            }
          >
            <Spin spinning={loading}>
              <Liquid {...LiquidChart} />
            </Spin>
          </Tooltip>
        </Card>
      </div>
      <div className='graph-space bottom-graphs'>
        <Card
          title={
            <TitleInfo>
              <span>Cliente con más ordenes</span>
              <Tooltip title='En relación al porcentaje total de ordenes'>
                <InfoCircleOutlined />
              </Tooltip>
            </TitleInfo>
          }
          extra={
            <Button
              onClick={() => handleRedirect(`/users/${top_buyer?.user.id}`)}
            >
              Ver cliente
            </Button>
          }
          type='inner'
        >
          <Tooltip
            title={
              <LiquidTooltipInfo>
                <div className='tooltip-info-wrapper'>
                  <div>Todos las ordenes:</div>
                  <NumberFormat
                    value={top_buyer?.all_sales}
                    displayType='text'
                    thousandSeparator
                  />
                </div>
                <div className='tooltip-info-wrapper'>
                  <div>
                    {user &&
                      `${Capitalize(user.name)} ${Capitalize(user.last_name)}`}
                    :
                  </div>
                  <NumberFormat
                    value={top_buyer?.user_sales}
                    displayType='text'
                    thousandSeparator
                  />
                </div>
              </LiquidTooltipInfo>
            }
          >
            <Spin spinning={loading}>
              <Liquid {...StarChart} />
            </Spin>
          </Tooltip>
        </Card>
        <Card
          title='Productos más vendidos'
          type='inner'
          extra={
            <Button
              onClick={() =>
                pieRef.current?.downloadImage(
                  `productos-mas-vendidos-${moment().format('DD-MM-YYYY')}`
                )
              }
            >
              Descargar
            </Button>
          }
        >
          <Spin spinning={loading}>
            <Pie {...PieChart} chartRef={pieRef} />
          </Spin>
        </Card>
      </div>
    </DashboardSpace>
  );
};

export default SalesDashboard;
