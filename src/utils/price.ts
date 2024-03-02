const formatCurrency = (value: number, currency: "LKR" | "$" ) => {
  return `${currency} ${value}`;
};

export { formatCurrency };