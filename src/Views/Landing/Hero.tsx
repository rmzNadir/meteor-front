/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import classNames from 'classnames';
import Image from './Image';
import Modal from './Modal';

interface Props {
  className?: string;
  topOuterDivider?: boolean;
  bottomOuterDivider?: boolean;
  topDivider?: boolean;
  bottomDivider?: boolean;
  hasBgColor?: boolean;
  invertColor?: boolean;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}: Props) => {
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (
    e:
      | React.MouseEvent<
          HTMLDivElement | HTMLButtonElement | HTMLAnchorElement,
          MouseEvent
        >
      | KeyboardEvent
  ) => {
    e.preventDefault();
    setVideomodalactive(false);
  };

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section {...props} className={outerClasses}>
      <div className='container-sm'>
        <div className={innerClasses}>
          <div className='hero-content'>
            <h1
              className='mt-0 mb-16 reveal-from-bottom'
              data-reveal-delay='200'
            >
              Toda tu <span className='text-color-primary'>empresa </span>
              en un solo lugar
            </h1>
            <div className='container-xs'>
              <p
                className='m-0 mb-32 reveal-from-bottom'
                data-reveal-delay='400'
              >
                La información de todas tus actividades, reunida y actualizada
                para todos tus colaboradores de manera efectiva.
              </p>
              <div className='reveal-from-bottom' data-reveal-delay='600'>
                {/* <ButtonGroup>
                  <Button
                    tag='a'
                    color='primary'
                    wideMobile
                  >
                    Get started
                  </Button>
                  <Button
                    tag='a'
                    color='dark'
                    wideMobile
                  >
                    View on Github
                  </Button>
                </ButtonGroup> */}
              </div>
            </div>
          </div>
          <div
            className='hero-figure reveal-from-bottom illustration-element-01'
            data-reveal-value='20px'
            data-reveal-delay='800'
          >
            <a
              data-video='https://www.youtube.com/embed/kNH_EjHvm3I?autoplay=1'
              href='#0'
              aria-controls='video-modal'
              onClick={openModal}
            >
              <Image
                className='has-shadow'
                src={
                  require('../../assets/images/video-placeholder.png').default
                }
                alt='Hero'
                width={896}
                height={504}
              />
            </a>
          </div>

          <Modal
            id='video-modal'
            show={videoModalActive}
            handleClose={closeModal}
            video='https://www.youtube.com/embed/kNH_EjHvm3I?autoplay=1'
            videoTag='iframe'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
