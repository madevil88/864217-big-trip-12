import RouteInfoView from "./view/route-info.js";
import TripCostView from "./view/trip-cost.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import TripPresenter from "./presenter/trip.js";
import {generateEvent} from "./mock/event.js";
import {ROUTE_POINT_COUNT} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";

const events = Array.from({length: ROUTE_POINT_COUNT}, generateEvent);

events.sort((first, second) => {
  return first.startEvent.getTime() - second.startEvent.getTime();
});

const pageBody = document.querySelector(`.page-body`);
const pageHeader = pageBody.querySelector(`.page-header`);
const pageMain = pageBody.querySelector(`.page-main`);
const tripMainElement = pageHeader.querySelector(`.trip-main`);
const tripMainControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = pageMain.querySelector(`.trip-events`);
const tripPresenter = new TripPresenter(tripEventsElement);

const renderPageAplication = () => {

  const tripMainInfoElement = new RouteInfoView(events);
  render(tripMainElement, tripMainInfoElement, RenderPosition.AFTERBEGIN);
  render(tripMainInfoElement, new TripCostView(events), RenderPosition.BEFOREEND);

  render(tripMainControlsElement, new MenuView(), RenderPosition.BEFOREEND);
  render(tripMainControlsElement, new FilterView(), RenderPosition.BEFOREEND);
  tripPresenter.init(events);
};

renderPageAplication();
