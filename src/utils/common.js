const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const checkLessThanTen = (number) => {
  return number.toString().padStart(2, `0`);
};

export {
  getRandomInteger,
  checkLessThanTen
};
