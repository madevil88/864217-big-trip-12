import {createElement} from "../utils.js";

const createNoEventTemplate = () => {
  return `<div>
            <p class="trip-events__msg" style="
              margin-top: 0;
              color: #158deb;
              ">Click New Event to create your first point
            </p>
          </div>`;
};

export default class NoEvent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoEventTemplate();
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
