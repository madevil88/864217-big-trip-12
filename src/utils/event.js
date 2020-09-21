import {TYPE_PREFIX_IN} from "../const.js";

const getTypeDestination = (type) => {
  switch (type) {
    case TYPE_PREFIX_IN.CHECK:
    case TYPE_PREFIX_IN.SIGHTSEEING:
    case TYPE_PREFIX_IN.RESTAURANT:
      return `${type} in`;
    default:
      return `${type} to`;
  }
};

const getWaypointDays = (events) => {
  const startTripDay = events[0].startEvent;
  const waypointDays = [startTripDay];
  events.forEach((event) => {
    if (event.startEvent.getDate() !== waypointDays[waypointDays.length - 1].getDate()) {
      waypointDays.push(event.startEvent);
    }
  });
  return waypointDays;
};

const getWeightForNull = (first, second) => {
  if (first === null && second === null) {
    return 0;
  }

  if (first === null) {
    return 1;
  }

  if (second === null) {
    return -1;
  }

  return null;
};

const sortTimeDown = (firstEvent, secondEvent) => {
  const weight = getWeightForNull(firstEvent.startEvent, secondEvent.startEvent);

  if (weight !== null) {
    return weight;
  }

  return secondEvent.startEvent.getTime() - firstEvent.startEvent.getTime();
};

const sortPriceDown = (firstEvent, secondEvent) => {
  const weight = getWeightForNull(firstEvent.price, secondEvent.price);

  if (weight !== null) {
    return weight;
  }

  return secondEvent.price - firstEvent.price;
};

export {
  getTypeDestination,
  getWaypointDays,
  sortTimeDown,
  sortPriceDown
};
