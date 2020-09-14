import {EVENT_TYPES, DESTINATIONS, MAX_PRICE, OFFERS, DESTINATION_DESCRIPTIONS} from "../const.js";
import {getRandomInteger} from "../utils.js";

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
  for (let i = 0; i < indexes.length; i++) {
    newArr.push(arr[indexes[i]]);
  }
  return newArr;
};

const getDestinationPhotos = (min, max) => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;

  const newArr = [];
  for (let j = 1; j <= count; j++) {
    newArr.push(`img/photos/${j}.jpg`);
  }
  return newArr;
};

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
