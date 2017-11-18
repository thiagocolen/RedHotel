(function () {
  'use strict';

  angular.module('myApp.view1', ['ngRoute', 'chart.js'])

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
    vm.startDate = 'Choose a date';
    vm.endDate = 'Choose a date';
    vm.starsNumber = starsNumber;
    vm.priceHistoryVisibilityChange = priceHistoryVisibilityChange;
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
    
    vm.chartColors = ['#f98100', '#f98100', '#f98100', '#f98100', '#f98100', '#f98100', '#f98100'];
    vm.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      elements: {
        rectangle: {
          borderWidth: 0
        }
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: false
        }]
      }
    };

    function init() {
      Services.getHotels().then(function (response) {
        vm.hotels = response.hotels;
        createChartData(vm.hotels);
      });

      $('input[name="daterange"]')
        .dateRangePicker({
          startOfWeek: 'monday',
          separator: '=',
          format: 'DD.MM.YYYY',
          inline: true,
          container: '#calendarContainer',
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

    function starsNumber(num) {
      var allStars = new Array(1, 2, 3, 4, 5);
      var someStarts = allStars.slice(0, num);
      return someStarts;
    }

    function priceHistoryVisibilityChange(item) {
      item.visibility = !item.visibility;
    }

    function createChartData(hotels) {
      hotels.forEach((hotelsElement, hotelsIndex, hotelsArray) => {
        let chartData = [];
        let chartLabels = [];
        let counter = 0;
        hotelsElement.price_history.forEach((price_historyElement, price_historyIndex, price_historyArray) => {
          counter++;
          chartLabels.push(price_historyElement.month);
          chartData.push(price_historyElement.value);
          if (counter === price_historyArray.length) {
            hotelsElement.price_history.chartData = chartData;
            hotelsElement.price_history.chartLabels = chartLabels;
          }
        });
      });




    }

  }

})();



