import {ESCAPE_KEY} from "./const.js";
import RouteInfoView from "./view/route-info.js";
import TripCostView from "./view/trip-cost.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import WaypointsContainerView from "./view/waypoints-container.js";
import AddEditFormView from "./view/add-edit-form.js";
import WaypointView from "./view/waypoint.js";
import {generateEvent} from "./mock/event.js";
import {ROUTE_POINT_COUNT} from "./const.js";
import {render, RenderPosition} from "./utils.js";

const events = Array.from({length: ROUTE_POINT_COUNT}, generateEvent);

events.sort((first, second) => {
  return first.startEvent.getTime() - second.startEvent.getTime();
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

const renderWaypoint = (tripEventContainer, event) => {
  const eventComponent = new WaypointView(event);
  const eventAddEditComponent = new AddEditFormView(event);

  const replaceCardToForm = () => {
    tripEventContainer.replaceChild(eventAddEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    tripEventContainer.replaceChild(eventComponent.getElement(), eventAddEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === ESCAPE_KEY.fullName || evt.key === ESCAPE_KEY.shortName) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();

    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventAddEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();

    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventContainer, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderPageAplication = () => {
  const pageBody = document.querySelector(`.page-body`);
  const pageHeader = pageBody.querySelector(`.page-header`);
  const pageMain = pageBody.querySelector(`.page-main`);

  const tripMainElement = pageHeader.querySelector(`.trip-main`);

  render(tripMainElement, new RouteInfoView(events).getElement(), RenderPosition.AFTERBEGIN);

  const tripMainInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
  render(tripMainInfoElement, new TripCostView(events).getElement(), RenderPosition.BEFOREEND);

  const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
  render(tripMainControlsElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
  render(tripMainControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

  const tripEventsElement = pageMain.querySelector(`.trip-events`);
  render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new WaypointsContainerView(waypointDays).getElement(), RenderPosition.BEFOREEND);

  const tripEventContainers = tripEventsElement.querySelectorAll(`.trip-events__list`);

  let waypointsContainerCount = 0;

  events.forEach((event) => {
    if (event.startEvent.getDate() === waypointDays[waypointsContainerCount].getDate()) {
      renderWaypoint(tripEventContainers[waypointsContainerCount], event);
    } else {
      waypointsContainerCount++;
      renderWaypoint(tripEventContainers[waypointsContainerCount], event);
    }
  });
};

renderPageAplication();
