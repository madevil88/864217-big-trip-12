const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getTypeDestination = (type) => {
  switch (type) {
    case `Check`:
      return `${type} in`;
    case `Sightseeing`:
      return `${type} in`;
    case `Restaurant`:
      return `${type} in`;
    default:
      return `${type} to`;
  }
};

const checkLessThanTen = (number) => {
  return number.toString().padStart(2, `0`);
};

export {
  RenderPosition,
  render,
  renderTemplate,
  createElement,
  getRandomInteger,
  getTypeDestination,
  checkLessThanTen
};
