const getTypeDestination = (type) => {
  switch (type) {
    case `Check`:
      return `${type} in`;
    case `Sightseeing`:
      return `${type} in`;
    case `Restaurant`:
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

export {
  getTypeDestination,
  getWaypointDays
};
