const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check`, `Sightseeing`, `Restaurant`];
const DESTINATIONS = [`Paris`, `Tokyo`, `Sharm El Sheikh`, `Lisbon`, `Barcelona`, `Lucerne`, `Dublin`];
const MAX_PRICE = 500;
const OFFERS = [
  {
    name: `luggage`,
    get description() {
      return `Add ${this.name}`;
    },
    price: 30
  },
  {
    name: `comfort`,
    get description() {
      return `Switch to ${this.name} class`;
    },
    price: 100
  },
  {
    name: `meal`,
    get description() {
      return `Add ${this.name}`;
    },
    price: 15
  },
  {
    name: `seats`,
    get description() {
      return `Choose ${this.name}`;
    },
    price: 5
  },
  {
    name: `train`,
    get description() {
      return `Travel by ${this.name}`;
    },
    price: 40
  },
];
const DESTINATION_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElement = (arr) => {
  return arr[getRandomInteger(0, arr.length - 1)];
};

const getRandomArray = (minCount, maxCount, arr) => {
  let indexes = [];
  const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  while (indexes.length < count) {
    let index = Math.floor(Math.random() * arr.length);
    if (indexes.indexOf(index) === -1) {
      indexes.push(index);
    }
  }
  const newArr = [];
  for (let j = 0; j < indexes.length; j++) {
    newArr.push(arr[indexes[j]]);
  }
  return newArr;
};

const getDestinationPhotos = (min, max) => {
  const indexes = [];
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  for (let k = min; k < count; k++) {
    indexes.push(k);
  }
  const newArr = [];
  for (let l = 0; l < indexes.length; l++) {
    newArr.push(`img/photos/${indexes[l]}.jpg`);
  }
  return newArr;
};

export {EVENT_TYPES, DESTINATIONS, OFFERS};

export const generateEvent = () => {
  const price = Math.round(getRandomInteger(1, MAX_PRICE));
  const currentDate = new Date();
  const startEvent = new Date(currentDate.getTime() + getRandomInteger(1000 * 60 * 5, 1000 * 60 * 60 * 24 * 2));
  const endEvent = new Date(startEvent.getTime() + getRandomInteger(1000 * 60 * 30, 1000 * 60 * 60 * 2));
  startEvent.setSeconds(0);
  endEvent.setSeconds(59);

  return {
    type: getRandomElement(EVENT_TYPES),
    destination: getRandomElement(DESTINATIONS),
    startEvent,
    endEvent,
    price,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getRandomArray(0, 5, OFFERS),
    destinationDescriptions: getRandomArray(1, 5, DESTINATION_DESCRIPTIONS),
    destinationPhotos: getDestinationPhotos(1, 5),
  };
};
