/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useEffect } from 'react';
import classNames from 'classnames';

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
  handleClose(
    e:
      | React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
      | KeyboardEvent
  ): void;
  show: boolean;
  closeHidden?: boolean;
  video: string;
  videoTag: 'iframe' | 'video';
}

const Modal = ({
  className,
  children,
  handleClose,
  show,
  closeHidden,
  video,
  videoTag,
  ...props
}: Props) => {
  const keyPress = (e: KeyboardEvent) => {
    e.keyCode === 27 && handleClose(e);
  };

  const stopProgagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', stopProgagation);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', stopProgagation);
    };
  });

  const handleBodyClass = () => {
    if (document.querySelectorAll('.modal.is-active').length) {
      document.body.classList.add('modal-is-active');
    } else {
      document.body.classList.remove('modal-is-active');
    }
  };

  useEffect(() => {
    handleBodyClass();
  }, [show]);

  const classes = classNames(
    'modal',
    show && 'is-active',
    video && 'modal-video',
    className
  );

  return (
    <>
      {show && (
        <div {...props} className={classes} onClick={handleClose}>
          <div
            className='modal-inner'
            onClick={(e) => stopProgagation(e as unknown as MouseEvent)}
          >
            {video ? (
              <div className='responsive-video'>
                {videoTag === 'iframe' ? (
                  <iframe
                    title='video'
                    src={video}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    frameBorder='0'
                    allowFullScreen
                  />
                ) : (
                  <video v-else controls src={video} />
                )}
              </div>
            ) : (
              <>
                {!closeHidden && (
                  <button
                    className='modal-close'
                    aria-label='close'
                    onClick={handleClose}
                  />
                )}
                <div className='modal-content'>{children}</div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
