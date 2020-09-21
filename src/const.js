const ROUTE_POINT_COUNT = 4;
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

const DEFAULT_EVENT = {
  type: `Flight`,
  destination: `Dublin`,
  startEvent: new Date(),
  endEvent: new Date(),
  price: 0,
  isFavorite: true,
  offers: [
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
    }
  ],
  destinationDescriptions: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam erat volutpat.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`
  ],
  destinationPhotos: [
    `img/photos/1.jpg`,
    `img/photos/2.jpg`,
    `img/photos/3.jpg`,
    `img/photos/4.jpg`,
    `img/photos/5.jpg`
  ]
};

const ESCAPE_KEY = {
  shortName: `Esc`,
  fullName: `Escape`
};

const SORT_TYPE = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

const TYPE_PREFIX_IN = {
  CHECK: `Check`,
  SIGHTSEEING: `Sightseeing`,
  RESTAURANT: `Restaurant`
};

export {
  ROUTE_POINT_COUNT,
  EVENT_TYPES,
  DESTINATIONS,
  MAX_PRICE,
  OFFERS,
  DESTINATION_DESCRIPTIONS,
  DEFAULT_EVENT,
  ESCAPE_KEY,
  SORT_TYPE,
  TYPE_PREFIX_IN
};
