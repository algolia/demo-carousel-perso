/**
 * @requires module:instantsearch
 */

const renderCarousel = ({ widgetParams, hits }, isFirstRender) => {
  const container = document.querySelector(widgetParams.container);

  if (isFirstRender) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-single');

    container.appendChild(wrapper);

    const carouselTitle = document.createElement('h2');
    carouselTitle.textContent = widgetParams.title;
    wrapper.appendChild(carouselTitle);

    const carouselListContainer = document.createElement('ul');
    carouselListContainer.classList.add('carousels__list-container');
    carouselListContainer.setAttribute('id', widgetParams.context);
    wrapper.appendChild(carouselListContainer);

    wrapper.style.width = `${window.innerWidth -
      wrapper.getBoundingClientRect().left}px`;
  }

  const ul = container.querySelector(`ul#${widgetParams.context}`);
  ul.innerHTML = hits
    .map(
      (hit, index) => `
        <li class="analytics" data-object-id="${hit.objectID}" style="${
        index === hits.length - 1
          ? `padding-right: ${ul.getBoundingClientRect().left + 180}px`
          : ''
      }">
            <img src="${hit.image}" alt="${hit.title}">
            <div class="overlay">
              <h3>${hit.title}</h3>
              <ul>
                ${hit.genre
                  .map(
                    (genre) => `
                  <li>${genre}</li>
                `
                  )
                  .join('')}
              </ul>
              <div class="button-container">
                  <button data-id="${hit.objectID}" class="js-fav">♡</button> 
                  <button data-id="${
                    hit.objectID
                  }" class="js-watch">▶️</button> 
                  <button data-id="${
                    hit.objectID
                  }" class="js-details">View details</button> 
              </div>
          </div>
        </li>
    `
    )
    .join('');

  [...container.querySelectorAll('.js-fav')].forEach((button) => {
    button.addEventListener('click', (ev) => {
      aa('clickedObjectIDs', {
        index: 'perso_movies_carousel',
        eventName: 'added_to_watchlist_movie',
        objectIDs: [ev.currentTarget.dataset.id],
      });
    });
  });
  [...container.querySelectorAll('.js-watch')].forEach((button) => {
    button.addEventListener('click', (ev) => {
      aa('clickedObjectIDs', {
        index: 'perso_movies_carousel',
        eventName: 'added_to_watchlist_movie',
        objectIDs: [ev.currentTarget.dataset.id],
      });
    });
  });
  [...container.querySelectorAll('.js-details')].forEach((button) => {
    button.addEventListener('click', (ev) => {
      aa('clickedObjectIDs', {
        index: 'perso_movies_carousel',
        eventName: 'added_to_watchlist_movie',
        objectIDs: [ev.currentTarget.dataset.id],
      });
    });
  });
};

export const customCarousel = instantsearch.connectors.connectHits(
  renderCarousel
);
