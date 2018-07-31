function formatEUR(num) {
  if (Number.isNaN(+num)) return num;
  const n = num.toFixed(2).split('.');
  const int = n[0].split('').reverse();
  const result = [];
  let s = 0;
  int.forEach((item, index) => {
    if (s === 3 && !(index > int.length - 1)) {
      result.push('.');
      s = 0;
    }
    result.push(item);
    s += 1;
  });
  return result
    .reverse()
    .join('')
    .concat(',', n[1]);
}

module.exports = formatEUR;
