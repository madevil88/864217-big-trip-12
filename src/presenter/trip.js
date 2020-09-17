import {ESCAPE_KEY} from "../const.js";
import SortView from "../view/sort.js";
import WaypointsContainerView from "../view/waypoints-container.js";
import AddEditFormView from "../view/add-edit-form.js";
import WaypointView from "../view/waypoint.js";
import NoEventView from "../view/no-event.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {getWaypointDays} from "../utils/event.js";

export default class Trip {
  constructor(waypointsContainer) {
    this._waypointsContainer = waypointsContainer;

    this._sortComponent = new SortView();
    this._waypointsContainerComponent = new WaypointsContainerView(this._waypointDays);
    this._addEditFormComponent = new AddEditFormView();
    this._waypointComponent = new WaypointView();
    this._noEventViewComponent = new NoEventView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._renderTrip(tripEvents);
  }

  _renderSort() {
    render(this._waypointsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypointsContainer() {
    render(this._waypointsContainer, this._waypointsContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypoint(tripEventContainer, event) {
    const eventComponent = new WaypointView(event);
    const eventAddEditComponent = new AddEditFormView(event);

    const replaceCardToForm = () => {
      replace(eventAddEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventAddEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === ESCAPE_KEY.fullName || evt.key === ESCAPE_KEY.shortName) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventComponent.setArrowClickHandler(() => {
      replaceCardToForm();

      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventAddEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();

      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(tripEventContainer, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderWaypoints(events, waypointDays) {
    const tripEventContainers = this._waypointsContainer.querySelectorAll(`.trip-events__list`);

    let waypointsContainerCount = 0;

    events.forEach((event) => {
      if (event.startEvent.getDate() === waypointDays[waypointsContainerCount].getDate()) {
        this._renderWaypoint(tripEventContainers[waypointsContainerCount], event);
      } else {
        waypointsContainerCount++;
        this._renderWaypoint(tripEventContainers[waypointsContainerCount], event);
      }
    });
  }

  _renderNoEvent() {
    render(this._waypointsContainer, this._noEventViewComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(events) {
    if (events.length > 0) {
      this._waypointDays = getWaypointDays(events);
      this._waypointsContainerComponent = new WaypointsContainerView(this._waypointDays);
      this._renderSort();
      this._renderWaypointsContainer(this._waypointDays);
      this._renderWaypoints(events, this._waypointDays);
    } else {
      this._renderNoEvent();
    }
  }
}
