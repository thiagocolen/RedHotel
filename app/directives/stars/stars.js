(function () {
  'use strict';

  angular
    .module('myApp.stars', [])
    .directive('stars', stars);

  function stars() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/stars/stars.html',
      scope: {
        startsNumber: '=',
        selectedStar: '='
      },
      controller: starsController,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;
  }

  function starsController() {
    var vm = this;
    vm.fiveStarts = [1, 2, 3, 4, 5];
    vm.clickStar = clickStar;
    vm.$onInit = onInit;

    function onInit() {
    }

    function clickStar(num) {
      vm.selectedStar = num;
    }

  }

})();
