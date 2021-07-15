/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import {
  DollarOutlined,
  DropboxOutlined,
  FileDoneOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SectionHeader from './SectionHeader';

interface Props {
  className?: string;
  topOuterDivider?: boolean;
  bottomOuterDivider?: boolean;
  topDivider?: boolean;
  bottomDivider?: boolean;
  hasBgColor?: boolean;
  invertColor?: boolean;
  pushLeft?: boolean;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

const FeaturesTiles = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}: Props) => {
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

  const tilesClasses = classNames(
    'tiles-wrap center-content',
    pushLeft && 'push-left'
  );

  const sectionHeader = {
    title: 'Descubre todas las características que ofrecemos',
    paragraph:
      'Módulos cuidadosamente construidos y diseñados específicamente para hacer la administración de tu empresa más fácil.',
  };

  return (
    <section {...props} className={outerClasses}>
      <div className='container'>
        <div className={innerClasses}>
          <SectionHeader
            data={sectionHeader}
            className='center-content'
            paddingBottom
          />
          <div className={tilesClasses}>
            <div className='tiles-item reveal-from-bottom'>
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <UserOutlined style={{ fontSize: 34 }} />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8'>Usuarios</h4>
                  <p className='m-0 text-sm'>
                    Altas, bajas y privilegios basados en roles para todos los
                    colaboradores en tu organización.
                  </p>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-bottom'
              data-reveal-delay='200'
            >
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <DropboxOutlined style={{ fontSize: 34 }} />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8'>Inventarios</h4>
                  <p className='m-0 text-sm'>
                    El control absoluto de las existencias de tu organización,
                    disponible en todo momento.
                  </p>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-bottom'
              data-reveal-delay='400'
            >
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <FileDoneOutlined style={{ fontSize: 34 }} />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8'>Reportes</h4>
                  <p className='m-0 text-sm'>
                    Genera y descarga reportes actualizados sobre todas las
                    actividades de tu organización
                  </p>
                </div>
              </div>
            </div>

            <div className='tiles-item reveal-from-bottom'>
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <ShoppingOutlined style={{ fontSize: 34 }} />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8'>Compras</h4>
                  <p className='m-0 text-sm'>
                    Registra, visualiza, modifica y elimina registros de tus
                    adquisiciones, desde cualquier lugar.
                  </p>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-bottom'
              data-reveal-delay='200'
            >
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <DollarOutlined style={{ fontSize: 34 }} />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8'>Ventas</h4>
                  <p className='m-0 text-sm'>
                    Lleva un control de todas las ventas y mejora el proceso de
                    toma de decisiones en tu empresa.
                  </p>
                </div>
              </div>
            </div>

            <div
              className='tiles-item reveal-from-bottom'
              data-reveal-delay='400'
            >
              <div className='tiles-item-inner'>
                <div className='features-tiles-item-header'>
                  <div className='features-tiles-item-image mb-16'>
                    <SettingOutlined style={{ fontSize: 34 }} />
                  </div>
                </div>
                <div className='features-tiles-item-content'>
                  <h4 className='mt-0 mb-8'>Administración</h4>
                  <p className='m-0 text-sm'>
                    Gestiona quién debería o no tener acceso a módulos dentro de
                    la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesTiles;
