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

const index = searchClient.initIndex('perso_movies_carousel');

// for (let index = 0; index < 20; index++) {
//   aa('clickedFilters', {
//     userToken: 'action_crime',
//     index: 'perso_movies_carousel',
//     eventName: 'added_to_watchlist_movie',
//     filters: ['genre:Action'],
//   });

//   aa('viewedFilters', {
//     userToken: 'action_crime',
//     index: 'perso_movies_carousel',
//     eventName: 'detailed_movie',
//     filters: ['genre:Crime'],
//   });
// }

// index
//   .search('', {
//     facetFilters: 'actors:Benedict Cumberbatch',
//     hitsPerPage: 200,
//   })
//   .then(({ hits }) => {
//     console.log(hits);
//     hits.forEach((hit) => {
//       if (Math.random() < 0.3) {
//         aa('convertedObjectIDs', {
//           eventName: 'watched_movie',
//           index: 'perso_movies_carousel',
//           objectIDs: [hit.objectID],
//           userToken: 'history_cumberbatch',
//         });
//       }
//       if (Math.random() < 0.5) {
//         aa('clickedObjectIDs', {
//           eventName: 'added_to_watchlist_movie',
//           index: 'perso_movies_carousel',
//           objectIDs: [hit.objectID],
//           userToken: 'history_cumberbatch',
//         });
//       }
//       if (Math.random() < 0.9) {
//         aa('viewedObjectIDs', {
//           eventName: 'detailed_movie',
//           index: 'perso_movies_carousel',
//           objectIDs: [hit.objectID],
//           userToken: 'history_cumberbatch',
//         });
//       }
//     });
//   });
// index
//   .search('', {
//     filters: 'genre:History',
//     hitsPerPage: 200,
//   })
//   .then(({ hits }) => {
//     console.log(hits);
//     hits.forEach((hit) => {
//       if (Math.random() < 0.3) {
//         aa('convertedObjectIDs', {
//           eventName: 'watched_movie',
//           index: 'perso_movies_carousel',
//           objectIDs: [hit.objectID],
//           userToken: 'history_cumberbatch',
//         });
//       }
//       if (Math.random() < 0.5) {
//         aa('clickedObjectIDs', {
//           eventName: 'added_to_watchlist_movie',
//           index: 'perso_movies_carousel',
//           objectIDs: [hit.objectID],
//           userToken: 'history_cumberbatch',
//         });
//       }
//       if (Math.random() < 0.9) {
//         aa('viewedObjectIDs', {
//           eventName: 'detailed_movie',
//           index: 'perso_movies_carousel',
//           objectIDs: [hit.objectID],
//           userToken: 'history_cumberbatch',
//         });
//       }
//     });
//   });
// index
//   .search('', {
//     facetFilters: ['genre: History'],
//   })
//   .then(({ hits }) => {
//     console.log(hits);
//     aa('convertedObjectIDs', {
//       eventName: 'watched_movie',
//       index: 'perso_movies_carousel',
//       objectIDs: hits
//         .filter((hit) => Math.random() < 0.3)
//         .map((hit) => hit.objectID),
//       userToken: 'history_cumberbatch',
//     });
//     aa('clickedObjectIDs', {
//       eventName: 'added_to_watchlist_movie',
//       index: 'perso_movies_carousel',
//       objectIDs: hits
//         .filter((hit) => Math.random() < 0.5)
//         .map((hit) => hit.objectID),
//       userToken: 'history_cumberbatch',
//     });
//     aa('viewedObjectIDs', {
//       eventName: 'detailed_movie',
//       index: 'perso_movies_carousel',
//       objectIDs: hits
//         .filter((hit) => Math.random() < 0.9)
//         .map((hit) => hit.objectID),
//       userToken: 'history_cumberbatch',
//     });
//   });
// aa();

const persoSelect = document.querySelector('#user_select');
persoSelect.addEventListener('change', (e) => {
  window.location.href = `${window.location.origin}${window.location.pathname}?userToken=${e.target.value}`;
});

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

const searchParams = new URLSearchParams(window.location.search);

const userToken = searchParams.get('userToken');
persoSelect
  .querySelector(`option[value="${userToken}"]`)
  ?.setAttribute('selected', true);

const myCarousels = userToken
  ? [
      // {
      //   title: 'Trending',
      //   context: 'trending',
      //   indexName: 'perso_movies_carousel_trending',
      // },
      {
        title: 'Most Popular',
        context: 'most-popular',
        indexName: 'perso_movies_carousel',
      },
      // {
      //   title: 'Last chance',
      //   context: 'last-chance',
      //   indexName: 'perso_movies_carousel_last_chance',
      // },

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
      // {
      //   title: 'Trending',
      //   context: 'trending',
      //   indexName: 'perso_movies_carousel_trending',
      // },
      {
        title: 'Most Popular',
        context: 'most-popular',
        indexName: 'perso_movies_carousel',
      },
      // {
      //   title: 'Last chance',
      //   context: 'last-chance',
      //   indexName: 'perso_movies_carousel_last_chance',
      // },

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

instantsearch.widgets.configure({
  enablePersonalization: true,
  userToken: 'myToken',
});
