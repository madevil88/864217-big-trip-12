import AbstractView from "./abstract.js";

const getRoute = (events) => {
  const destinations = [];
  events.forEach((event) => {
    if (destinations.indexOf(event.destination) === -1) {
      destinations.push(event.destination);
    }
  });
  return destinations.join(` &mdash; `);
};

const getRouteGap = (events) => {
  const routeFirstDay = events[0].startEvent.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
  const routeLastDay = events[events.length - 1].endEvent.toLocaleString(`en-US`, {day: `numeric`});

  return `${routeFirstDay}&nbsp;&mdash;&nbsp;${routeLastDay}`;
};

const getTripInfo = (events) => {
  return (events.length > 0) ? `<div class="trip-info__main">
              <h1 class="trip-info__title">${getRoute(events)}</h1>

              <p class="trip-info__dates">${getRouteGap(events)}</p>
            </div>` : ``;
};

const createRouteInfoTemplate = (events) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
          ${getTripInfo(events)}
          </section>`
  );
};

export default class RouteInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._events);
  }
}
