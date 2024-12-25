export const removeEscapeChar = (str) =>
  str
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => item !== '');
