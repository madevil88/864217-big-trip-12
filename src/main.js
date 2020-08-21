import {createRouteInfoTemplate} from "./view/route-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createMenuTemplate} from "./view/menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createWaypointsContainerTemplate} from "./view/waypoints-container.js";
import {createAddEditFormTemplate} from "./view/add-edit-form.js";
import {createWaypointTemplate} from "./view/waypoint.js";

const ROUTE_POINT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderPageAplication = () => {
  const pageBody = document.querySelector(`.page-body`);
  const pageHeader = pageBody.querySelector(`.page-header`);
  const pageMain = pageBody.querySelector(`.page-main`);

  const tripMainElement = pageHeader.querySelector(`.trip-main`);
  render(tripMainElement, createRouteInfoTemplate(), `afterbegin`);

  const tripMainInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
  render(tripMainInfoElement, createTripCostTemplate(), `beforeend`);

  const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripMainControlsElement, createMenuTemplate(), `beforeend`);
  render(tripMainControlsElement, createFilterTemplate(), `beforeend`);

  const tripEventsElement = pageMain.querySelector(`.trip-events`);
  render(tripEventsElement, createSortTemplate(), `beforeend`);
  render(tripEventsElement, createWaypointsContainerTemplate(), `beforeend`);

  const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);
  render(tripEventsListElement, createAddEditFormTemplate(), `beforeend`);
  for (let i = 0; i < ROUTE_POINT_COUNT; i++) {
    render(tripEventsListElement, createWaypointTemplate(), `beforeend`);
  }
};

renderPageAplication();
