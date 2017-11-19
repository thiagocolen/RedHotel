(function () {
  'use strict';

  angular.module('myApp.filters', ['ngRoute', 'chart.js'])
    .filter('rateValue', rateValue);


  function rateValue() {
    return function (input, uppercase) {
      return 1;
    }
  }

})();
