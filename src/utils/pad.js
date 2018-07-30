function pad(num, size) {
  if (Number.isNaN(+num)) return num;
  if (Number.isNaN(+size)) return num;
  if (!size) return num;

  let s = `${num}`;
  while (s.length < size) s = `0${s}`;
  return s;
}

module.exports = pad;
