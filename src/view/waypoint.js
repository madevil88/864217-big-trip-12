import {checkLessThanTen} from "../utils/common.js";
import {getTypeDestination} from "../utils/event.js";
import AbstractView from "./abstract.js";

const getDiffTime = (startEvent, endEvent) => {
  const viewDiffTime = [];
  const diffTime = (endEvent - startEvent) / 1000;
  const diffDays = parseInt(diffTime / 60 / 60 / 24, 10);
  viewDiffTime.push((diffDays === 0) ?
    `` :
    `${diffDays}D`);

  const diffHours = parseInt(diffTime / 60 / 60, 10) - (diffDays * 24);
  viewDiffTime.push((diffHours === 0) ?
    `` :
    `${diffHours}H`);

  const diffMinutes = parseInt(diffTime / 60, 10) - (diffHours * 60);
  viewDiffTime.push((diffMinutes === 0) ?
    `` :
    `${diffMinutes}M`);
  return viewDiffTime.join(` `);
};

const createOffersTemplate = (offers) => {
  return offers.map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.description}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </li>`).join(``);
};

const createWaypointTemplate = (event) => {
  const {type, destination, startEvent, endEvent, price, offers} = event;

  return (
    `<li class="trip-events__item" style="list-style: none;">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${
    (type.toLowerCase() === `check`) ?
      `check-in` :
      type.toLowerCase()
    }.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${getTypeDestination(type)} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startEvent.toISOString()}">${checkLessThanTen(startEvent.getHours())}:${checkLessThanTen(startEvent.getMinutes())}</time>
            &mdash;
            <time class="event__end-time" datetime="${endEvent.toISOString()}">${checkLessThanTen(endEvent.getHours())}:${checkLessThanTen(endEvent.getMinutes())}</time>
          </p>
          <p class="event__duration">${getDiffTime(startEvent, endEvent)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersTemplate(offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Waypoint extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._arrowClickHandler = this._arrowClickHandler.bind(this);
  }

  _arrowClickHandler(evt) {
    evt.preventDefault();
    this._callback.arrowClick();
  }

  setArrowClickHandler(callback) {
    this._callback.arrowClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._arrowClickHandler);
  }

  getTemplate() {
    return createWaypointTemplate(this._event);
  }
}
