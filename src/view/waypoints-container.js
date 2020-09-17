import {checkLessThanTen} from "../utils/common.js";
import AbstractView from "./abstract.js";

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

const createWaypointDaysTemplate = (waypointDays) => {

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
            ${createWaypointDaysTemplate(waypointDays)}
    </ul>`;
};

export default class WaypointsContainer extends AbstractView {
  constructor(waypointDays) {
    super();
    this._waypointDays = waypointDays;
  }

  getTemplate() {
    return createWaypointsContainerTemplate(this._waypointDays);
  }
}
