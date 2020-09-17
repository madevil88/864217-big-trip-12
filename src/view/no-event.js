import AbstractView from "./abstract.js";

const createNoEventTemplate = () => {
  return `<div>
            <p class="trip-events__msg" style="
              margin-top: 0;
              color: #158deb;
              ">Click New Event to create your first point
            </p>
          </div>`;
};

export default class NoEvent extends AbstractView {
  getTemplate() {
    return createNoEventTemplate();
  }
}
