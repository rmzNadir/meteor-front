const CleanNumber = (dirtyNumber: string): number => {
  return Number(dirtyNumber.replace(/[^0-9.]+/g, ''));
};

export default CleanNumber;
