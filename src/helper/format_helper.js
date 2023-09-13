export const formatCurrency = value => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol',
  });
  const formattedValue = formatter.format(value);
  return formattedValue.replace('₫', ' đ');
};
