import { customCarousel } from './widgets/Carousel';

/* global algoliasearch instantsearch */
const searchClient = algoliasearch(
  '8C8FZ01CFC',
  'dba2ba1776fea66e298b834915331de1'
);

const search = instantsearch({
  indexName: 'perso_movies_carousel',
  searchClient,
});

const persoSelect = document.querySelector('#user_select');
persoSelect.addEventListener('change', (e) => {
  window.location.href = `${window.location.origin}${window.location.pathname}?userToken=${e.target.value}`;
});

const searchParams = new URLSearchParams(window.location.search);

const userToken = searchParams.get('userToken');
const selectedOption = persoSelect.querySelector(
  `option[value="${userToken}"]`
);
if (selectedOption) {
  selectedOption.setAttribute('selected', true);
}

// Fetch from your own DB
const referenceHits = {
  history_cumberbatch: {
    title: 'The Imitation Game',
    image: 'https://image.tmdb.org/t/p/w154/ntZGfHt4d73A9fDD4KUN4nbDQlq.jpg',
    color: '#192229',
    popularity_score: 108.4335114104872,
    actors: ['Benedict Cumberbatch', 'Keira Knightley', 'Matthew Goode'],
    genre: ['History', 'Drama', 'Thriller', 'War'],
    ongoing_watch: [],
    tmdb_id: 205596,
    views_last_7_days: 596898,
    days_to_expire: 44,
    objectID: '439434880',
  },

  downey_jr: {
    title: 'Sherlock Holmes',
    image: 'https://image.tmdb.org/t/p/w154/momkKuWburNTqKBF6ez7rvhYVhE.jpg',
    popularity_score: 76.33650710838658,
    actors: ['Robert Downey Jr.', 'Jude Law', 'Rachel McAdams'],
    genre: [
      'Adventure',
      'Drama',
      'Action',
      'Comedy',
      'Thriller',
      'Crime',
      'Mystery',
    ],
    tmdb_id: 10528,
    views_last_7_days: 337051,
    days_to_expire: 24,
    objectID: '440017250',
  },

  action_crime: {
    title: 'The Dark Knight',
    image: 'https://image.tmdb.org/t/p/w154/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    color: '#2B3D4D',
    popularity_score: 87.26775638632606,
    actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    genre: ['Drama', 'Action', 'Crime', 'Thriller'],
    ongoing_watch: ['user_4'],
    tmdb_id: 155,
    views_last_7_days: 147970,
    days_to_expire: 19,
    objectID: '439695620',
  },
};

const myCarousels = userToken
  ? [
      {
        title: 'Most Popular',
        context: 'most-popular',
        indexName: 'perso_movies_carousel',
      },

      {
        title: 'Fantasy Comedy',
        context: 'comedy_fantasy',
        indexName: 'perso_movies_carousel',
      },
      {
        title: 'Because you watched ' + referenceHits[userToken].title,
        context: 'related',
        indexName: 'perso_movies_carousel',
        relatedRef: referenceHits[userToken],
        extraConfig: {
          enablePersonalization: true,
          userToken,
        },
      },
      {
        title: 'Curated for you',
        context: 'curated',
        indexName: 'perso_movies_carousel',
        extraConfig: {
          enablePersonalization: true,
          userToken,
        },
      },
    ]
  : [
      {
        title: 'Most Popular',
        context: 'most-popular',
        indexName: 'perso_movies_carousel',
      },
      {
        title: 'Fantasy Comedy',
        context: 'comedy_fantasy',
        indexName: 'perso_movies_carousel',
      },
    ];

const addWidgets = () => {
  search.addWidgets(
    myCarousels.map((carousel) =>
      instantsearch.widgets
        .index({
          indexName: carousel.indexName,
          indexId: carousel.context,
        })
        .addWidgets(
          !carousel.relatedRef
            ? [
                instantsearch.widgets.configure({
                  ruleContexts: carousel.context,
                  hitsPerPage: 15,
                  query: '',
                  ...carousel.extraConfig,
                }),
                customCarousel({
                  container: '.carousels',
                  title: carousel.title,
                  context: carousel.context,
                }),
              ]
            : [
                instantsearch.widgets.configure({
                  ruleContexts: carousel.context,
                  hitsPerPage: 15,
                  query: '',
                  ...carousel.extraConfig,
                }),
                instantsearch.widgets.EXPERIMENTAL_configureRelatedItems({
                  hit: carousel.relatedRef,
                  matchingPatterns: {
                    genre: { score: 2 },
                    actors: { score: 3 },
                  },
                }),
                customCarousel({
                  container: '.carousels',
                  title: carousel.title,
                  context: carousel.context,
                }),
              ]
        )
    )
  );
};

addWidgets();

search.start();
