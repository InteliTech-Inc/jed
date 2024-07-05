const calculateCommission = (revenue: number, FACTOR = 0.1): number => {
  return revenue * FACTOR;
};

export { calculateCommission };
