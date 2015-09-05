/* global angular */
var app = angular.module('NccmiabsgmApp', [
  'ngMaterial',
  'ngRoute'
]);
app.config(['$routeProvider', function($routeProvider) {
  console.log('config');
  $routeProvider.
  when('/pokemon', {
    templateUrl: 'partials/test.html'
    //controller: 'PhoneListCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);

app.controller('AppCtrl', [
  '$scope', 
  function($scope){
    console.log('AppCtrl');
  }
]);
