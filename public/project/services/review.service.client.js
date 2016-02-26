(function() {
  "use strict";

  angular
    .module("FreshPotatoes")
    .factory("ReviewService", ReviewService);

  function ReviewService() {

    var reviews = [
      {
        id: 1, imdb_id: "tt0076759", title: "Review Title Wow One", author: 9281,
        content: "Great scott this movie was great!", edited: 192312, created: new Date().toString()
      },
      {
        id: 1, imdb_id: "tt0076759", title: "Review Title Dos", author: 23,
        content: "Man this movie was indescribable!", edited: 123123, created: new Date().toString()
      },
      {
        id: 1, imdb_id: "tt0076759", title: "This movie sucked so badly", author: 555,
        content: "Will never watch this movie again!", edited: 2323, created: new Date().toString()
      },
      {
        id: 1, imdb_id: "tt0076759", title: "This movie was GREAT!", author: 123,
        content: "Probably the best film of the century", edited: 1244, created: new Date().toString()
      },
    ];

    function findAllReviewsForMovie(imdbId, callback) {
      callback(reviews);
    }

    var service = {
      findAllReviewsForMovie: findAllReviewsForMovie
    };

    return service;
  }
})();