import {createElement, checkLessThanTen} from "../utils.js";

const getDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [date.getFullYear(),
    checkLessThanTen(month),
    checkLessThanTen(day)
  ].join(`-`);
};

const getShotDate = (date) => {
  return date.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
};

const createWaypointDayTemplate = (waypointDays) => {

  return waypointDays.map((waypointDay, index) =>
    `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${index + 1}</span>
                <time class="day__date" datetime="${getDate(waypointDay)}">${getShotDate(waypointDay)}</time>
              </div>
              <ul class="trip-events__list">
              </ul>
            </li>`).join(``);
};

const createWaypointsContainerTemplate = (waypointDays) => {

  return `<ul class="trip-days">
            ${createWaypointDayTemplate(waypointDays)}
    </ul>`;
};

export default class WaypointsContainer {
  constructor(waypointDays) {
    this._waypointDays = waypointDays;
    this._element = null;
  }

  getTemplate() {
    return createWaypointsContainerTemplate(this._waypointDays);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
