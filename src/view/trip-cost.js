import AbstractView from "./abstract.js";

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

export default class TripCost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
