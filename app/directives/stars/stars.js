angular
  .module('myApp.stars', [])
  .directive('stars', stars);

function stars() {
  var directive = {
    link: link,
    templateUrl: 'directives/stars/stars.html',
    restrict: 'EA'
  };
  return directive;

  function link(scope, element, attrs) {
    console.log('stars', attrs.number);
    /* */
  }
}
