import {createRouteInfoTemplate} from "./view/route-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createWaypointsContainerTemplate} from "./view/waypoints-container.js";
import {createAddEditFormTemplate} from "./view/add-edit-form.js";
import {createWaypointTemplate} from "./view/waypoint.js";
import {generateEvent} from "./mock/event.js";

const ROUTE_POINT_COUNT = 4;

const events = new Array(ROUTE_POINT_COUNT).fill().map(generateEvent);

events.sort((first, second) => {
  if (first.startEvent.getTime() < second.startEvent.getTime()) {
    return -1;
  } else if (first.startEvent.getTime() > second.startEvent.getTime()) {
    return 1;
  }
  return 0;
});

const getWaypointDays = () => {
  const startTripDay = events[0].startEvent;
  const waypointDays = [startTripDay];
  events.forEach((event) => {
    if (event.startEvent.getDate() !== waypointDays[waypointDays.length - 1].getDate()) {
      waypointDays.push(event.startEvent);
    }
  });
  return waypointDays;
};

const waypointDays = getWaypointDays(events);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderPageAplication = () => {
  const pageBody = document.querySelector(`.page-body`);
  const pageHeader = pageBody.querySelector(`.page-header`);
  const pageMain = pageBody.querySelector(`.page-main`);

  const tripMainElement = pageHeader.querySelector(`.trip-main`);
  render(tripMainElement, createRouteInfoTemplate(events), `afterbegin`);

  const tripMainInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
  render(tripMainInfoElement, createTripCostTemplate(events), `beforeend`);

  const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripMainControlsElement, createMenuTemplate(), `beforeend`);
  render(tripMainControlsElement, createFilterTemplate(), `beforeend`);

  const tripEventsElement = pageMain.querySelector(`.trip-events`);
  render(tripEventsElement, createSortTemplate(), `beforeend`);
  render(tripEventsElement, createWaypointsContainerTemplate(waypointDays), `beforeend`);

  const tripEventContainers = tripEventsElement.querySelectorAll(`.trip-events__list`);

  render(tripEventContainers[0], createAddEditFormTemplate(events[0]), `beforeend`);
  let waypointsContainerCount = 0;

  for (let i = 1; i < ROUTE_POINT_COUNT; i++) {
    if (events[i].startEvent.getDate() === waypointDays[waypointsContainerCount].getDate()) {
      render(tripEventContainers[waypointsContainerCount], createWaypointTemplate(events[i]), `beforeend`);
    } else {
      waypointsContainerCount++;
      render(tripEventContainers[waypointsContainerCount], createWaypointTemplate(events[i]), `beforeend`);
    }
  }
};

renderPageAplication();
