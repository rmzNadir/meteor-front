/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { Card, message, Tooltip } from 'antd';
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
import { DashboardSpace } from './styles';
import theme from '../../Utils/theme';
import { IDashboard } from '../../Types';
import Capitalize from '../../Utils/Capitalize';

const SalesDashboard = () => {
  const [dashboardData, setDashboardData] = useState<IDashboard>();

  const { week_sales, most_sold, top_buyer, top_5_products } = {
    ...dashboardData,
  };

  const { user } = { ...top_buyer };

  useEffect(() => {
    const getDashboardData = async () => {
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
    };
    getDashboardData();
  }, []);

  const LineChart: LineConfig = {
    data: week_sales || [],
    xField: 'date',
    yField: 'sales',
    seriesField: 'name',
    xAxis: {
      label: {
        formatter: function formatter(v: string) {
          return moment(v).format('DD/MMM');
        },
      },
    },
    meta: {
      date: {
        formatter: function formatter(v: string) {
          return moment(v).format('DD/MMM');
        },
      },
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
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
    color: ['#94D0CC', '#8b6188', '#FFD3B4', '#FFBCBC'],
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

  return (
    <DashboardSpace>
      <div className='graph-space'>
        <Card title='Ventas en los últimos 7 días' type='inner'>
          <Line {...LineChart} />
        </Card>
        <Card
          title='Producto más vendido'
          type='inner'
          extra={
            <Tooltip
              title='En relación al porcentaje total de ventas'
              placement='left'
            >
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <Liquid {...LiquidChart} />
        </Card>
      </div>
      <div className='graph-space bottom-graphs'>
        <Card
          title='Cliente con más ordenes'
          type='inner'
          extra={
            <Tooltip
              title='En relación al porcentaje total de ordenes'
              placement='left'
            >
              <InfoCircleOutlined />
            </Tooltip>
          }
        >
          <Liquid {...StarChart} />
        </Card>
        <Card title='Productos más vendidos' type='inner'>
          <Pie {...PieChart} />
        </Card>
      </div>
    </DashboardSpace>
  );
};

export default SalesDashboard;
