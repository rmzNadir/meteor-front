import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ICollapse {
  isCollapsing: boolean;
  setIsCollapsing: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollapseCTX = createContext<ICollapse>({
  isCollapsing: false,
  setIsCollapsing: () => false,
});

export const useCollapseCTX = () => {
  return useContext(CollapseCTX);
};

const CollapseProvider: React.FC<Props> = ({ children }) => {
  const [isCollapsing, setIsCollapsing] = useState(false);

  const value: ICollapse = {
    isCollapsing,
    setIsCollapsing,
  };

  return <CollapseCTX.Provider value={value}>{children}</CollapseCTX.Provider>;
};

export default CollapseProvider;
