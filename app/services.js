(function () {
  'use strict';

  angular
    .module('myApp.services', [])
    .service('Services', Services);

  Services.$inject = ['$http'];

  function Services($http) {
    return {
      getHotels: getHotels
    };

    function getHotels() {
      return $http.get('http://www.raphaelfabeni.com.br/rv/hotels.json')
        .then(function (response) {
          return response.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    
  }

})();
