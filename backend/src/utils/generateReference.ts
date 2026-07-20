export const generateReference = () => {
  return `TXN_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
};
