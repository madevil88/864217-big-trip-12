export const createRouteInfoTemplate = (events) => {

  const getRoute = () => {
    const destinations = [];
    events.forEach((event) => {
      if (destinations.indexOf(event.destination) === -1) {
        destinations.push(event.destination);
      }
    });
    return destinations.join(` &mdash; `);
  };
  const getRouteGap = () => {
    const routeFirstDay = events[0].startEvent.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
    const routeLastDay = events[events.length - 1].endEvent.toLocaleString(`en-US`, {day: `numeric`});

    return `${routeFirstDay}&nbsp;&mdash;&nbsp;${routeLastDay}`;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getRoute()}</h1>

              <p class="trip-info__dates">${getRouteGap()}</p>
            </div>
          </section>`
  );
};
