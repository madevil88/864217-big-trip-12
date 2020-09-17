import {EVENT_TYPES, DESTINATIONS, OFFERS, DEFAULT_EVENT} from "../const.js";
import {checkLessThanTen} from "../utils/common.js";
import {getTypeDestination} from "../utils/event.js";
// import {getTypeDestination, checkLessThanTen} from "../utils.js";
import AbstractView from "./abstract.js";

const transferEvents = EVENT_TYPES.slice(0, 7);
const activityEvents = EVENT_TYPES.slice(7, 10);

const getType = (type) => (type.toLowerCase() === `check`) ? `check-in` : type.toLowerCase();

const createEventEditTypesTemplate = (currentType, groupEnents) => {

  return groupEnents.map((type) => `<div class="event__type-item">
              <input
                id="event-type-${getType(type)}-1"
                class="event__type-input  visually-hidden"
                type="radio" name="event-type"
                value="${getType(type)}"
                ${currentType === getType(type) ? `checked` : ``}
                >
              <label
                class="event__type-label  event__type-label--${getType(type)}"
                for="event-type-${getType(type)}-1">
                ${type}
              </label>
            </div>`).join(``);
};

const createDestinationsTemplate = () => {
  return DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join(``);
};

const getHumanizeDate = (date) => {
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const year = date.getFullYear().toString().substr(-2);

  const getMonth = month.length === 2 ?
    month : `0${month}`;
  const getDay = day.length === 2 ?
    day : `0${day}`;

  return `${getDay}/${getMonth}/${year} ${checkLessThanTen(date.getHours())}:${checkLessThanTen(date.getMinutes())}`;
};

const createOffersTemplate = () => {
  const checkedOffers = DEFAULT_EVENT.offers.map((checkedOffer) => {
    return Object.values(checkedOffer)[0];
  });

  return OFFERS.map((offer) => {
    const isSelected = () => {
      if (checkedOffers.indexOf(offer.name) !== -1) {
        return `checked`;
      }
      return ``;
    };

    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox
          visually-hidden"
          id="event-offer-${offer.name}-1"
          type="checkbox"
          name="event-offer-${offer.name}"
          ${isSelected()}>
        <label class="event__offer-label" for="event-offer-${offer.name}-1">
          <span class="event__offer-title">${offer.description}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`;
  }).join(``);
};

const createDestinationDescription = (arr) => {
  return arr.map((destinationDescription) => `${destinationDescription} `).join(``);
};

const createPhotosTape = (photos) => {
  return (photos.length === 0) ? `` : `<div class="event__photos-container">
                  <div class="event__photos-tape">
  ${photos.map((photo) => `<img class="event__photo" src="
  ${photo}
  " alt="Event photo">
  `).join(``)}</div>`;
};

const createAddEditFormTemplate = (event) => {

  return `<div>
          <form class="trip-events__item  event  event--edit" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${getType(event.type)}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${createEventEditTypesTemplate(event.type, transferEvents)}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${createEventEditTypesTemplate(event.type, activityEvents)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${getTypeDestination(event.type)}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.destination}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${createDestinationsTemplate()}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
                value="${getHumanizeDate(event.startEvent)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
                value="${getHumanizeDate(event.endEvent)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
                value="${event.price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
              ${event.isFavorite ? `checked` : ``}>
                <label class="event__favorite-btn" for="event-favorite-1">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </label>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${createOffersTemplate()}
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">
                ${createDestinationDescription(event.destinationDescriptions)}
                </p>
                ${createPhotosTape(event.destinationPhotos)}
              </section>
            </section>
          </form>
        </div>`;
};

export default class AddEditForm extends AbstractView {
  constructor(event = DEFAULT_EVENT) {
    super();
    this._event = event;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  getTemplate() {
    return createAddEditFormTemplate(this._event);
  }
}
