/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface IData {
  title: string;
  paragraph: string;
}

interface Props {
  className?: string;
  data: IData;
  children?: ReactNode;
  paddingBottom?: boolean;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const SectionHeader = ({
  className,
  data,
  children,
  paddingBottom,
  ...props
}: Props) => {
  const classes = classNames('', className, paddingBottom && 'section-header');

  return (
    <>
      {(data.title || data.paragraph) && (
        <div {...props} className={classes}>
          <div className='container-xs'>
            {children}
            {data.title && (
              <h2
                className={classNames(
                  'mt-0',
                  data.paragraph ? 'mb-16' : 'mb-0'
                )}
              >
                {data.title}
              </h2>
            )}
            {data.paragraph && <p className='m-0'>{data.paragraph}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default SectionHeader;
