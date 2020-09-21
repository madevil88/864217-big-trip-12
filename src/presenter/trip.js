import {ESCAPE_KEY, SORT_TYPE} from "../const.js";
import SortView from "../view/sort.js";
import WaypointsContainerView from "../view/waypoints-container.js";
import AddEditFormView from "../view/add-edit-form.js";
import WaypointView from "../view/waypoint.js";
import NoEventView from "../view/no-event.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {getWaypointDays, sortTimeDown, sortPriceDown} from "../utils/event.js";

export default class Trip {
  constructor(waypointsContainer) {
    this._waypointsContainer = waypointsContainer;
    this._currentSortType = SORT_TYPE.EVENT;
    this._isSortEvents = false;

    this._sortComponent = new SortView();
    this._waypointsContainerComponent = new WaypointsContainerView(this._waypointDays);
    this._addEditFormComponent = new AddEditFormView();
    this._waypointComponent = new WaypointView();
    this._noEventViewComponent = new NoEventView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();
    if (this._tripEvents.length > 0) {
      this._renderTrip(this._tripEvents);
    } else {
      this._renderNoEvent();
    }
  }

  _sortEvents(sortType) {
    this._isSortEvents = true;
    switch (sortType) {
      case SORT_TYPE.TIME:
        this._tripEvents.sort(sortTimeDown);
        break;
      case SORT_TYPE.PRICE:
        this._tripEvents.sort(sortPriceDown);
        break;
      default:
        this._tripEvents = this._sourcedTripEvents.slice();
        this._isSortEvents = false;
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventsList();
    this._renderTrip(this._tripEvents);
  }

  _renderSort() {
    render(this._waypointsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearEventsList() {
    this._waypointsContainer.innerHTML = ``;
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

  _renderWaypoints(events, waypointDays = []) {
    if (waypointDays.length > 0) {
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
    } else {
      events.forEach((event) => {
        this._renderWaypoint(this._waypointsContainer, event);
      });
    }
  }

  _renderNoEvent() {
    render(this._waypointsContainer, this._noEventViewComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(events) {
    this._renderSort();
    if (!this._isSortEvents) {
      this._waypointDays = getWaypointDays(events);
      this._waypointsContainerComponent = new WaypointsContainerView(this._waypointDays);
      this._renderWaypointsContainer(this._waypointDays);
      this._renderWaypoints(events, this._waypointDays);
    } else {
      this._renderSort();
      this._renderWaypoints(events);
    }
  }
}
