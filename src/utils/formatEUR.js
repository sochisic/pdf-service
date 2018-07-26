function formatEUR(num) {
  if (isNaN(num)) return num;

  const temp = num
    .toFixed(2)
    .toString()
    .split('.');
  const int = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${int},${temp[1]}`;
}

module.exports = formatEUR;
