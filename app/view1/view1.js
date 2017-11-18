(function () {
  'use strict';

  angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl',
        controllerAs: 'vm'
      });
    }])

    .controller('View1Ctrl', View1Ctrl);


  function View1Ctrl($scope, Services) {
    var vm = this;
    vm.init = init;
    vm.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    function init() {



      $('input[name="daterange"]')
        .dateRangePicker({
          startOfWeek: 'monday',
          separator: '=',
          format: 'DD.MM.YYYY',
          inline: true,
          container: '#hotel-calendar',
          alwaysOpen: true,
          singleMonth: true
        });

      $('input[name="daterange"]')
        .dateRangePicker()
        .bind('datepicker-change', function (event, obj) {

          var date1 = new Date(obj.date1);
          var date2 = new Date(obj.date2);

          Services.getHotels().then(function (response) {
            vm.hotels = response.hotels;
            console.log('', 'vm.hotels:', vm.hotels);
          });
    
          vm.startDate =
            vm.monthNames[date1.getMonth()] +
            ' ' + date1.getDate() +
            ', ' + date1.getFullYear();

          vm.endDate =
            vm.monthNames[date2.getMonth()] +
            ' ' + date2.getDate() +
            ', ' + date2.getFullYear();


          $scope.$apply();
        });
    }


  }




})();
