import {createElement} from "../utils.js";

const createTripCostTemplate = (events) => {

  const getTotalPrice = () => {
    let total = 0;
    events.forEach((event) => {
      total += event.price;
      event.offers.forEach((offer) => {
        total += offer.price;
      });
    });
    return total;
  };

  return (
    `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
            </p>`
  );
};

export default class TripCost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
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
