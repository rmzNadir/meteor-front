/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  className?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  props?: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
  id?: string;
}

const Image = ({ className, src, width, height, alt, id, ...props }: Props) => {
  const [loaded, setLoaded] = useState(false);

  const image = useRef<HTMLImageElement>(null);

  const placeholderSrc = (w: string, h: string) => {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"%3E%3C/svg%3E`;
  };

  const handlePlaceholder = (img: HTMLImageElement) => {
    const placeholder = document.createElement('img');
    if (!loaded) {
      img.style.display = 'none';
      img.before(placeholder);
      placeholder.src = placeholderSrc(
        img.getAttribute('width') || '0',
        img.getAttribute('height') || '0'
      );
      placeholder.width = Number(img.getAttribute('width'));
      placeholder.height = Number(img.getAttribute('height'));
      placeholder.style.opacity = '0';
      img.className && placeholder.classList.add(img.className);
      placeholder.remove();
      img.style.display = '';
    }
  };

  useEffect(() => {
    if (image.current) {
      handlePlaceholder(image.current);
    }
  }, []);

  function onLoad() {
    setLoaded(true);
  }

  return (
    <img
      id={id}
      {...props}
      ref={image}
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      onLoad={onLoad}
    />
  );
};

export default Image;
