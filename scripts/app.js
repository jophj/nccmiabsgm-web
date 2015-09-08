/* global angular */
var app = angular.module('NccmiabsgmApp', [
  'ngMaterial',
  'ngRoute'
]);


app.config(['$routeProvider', function($routeProvider) {
  console.log('config');
  $routeProvider.
  when('/pokemon', {
    templateUrl: 'partials/pokemon.html',
    controller: 'PokemonCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);


app.controller('AppCtrl', [
  '$scope', '$mdMedia',
  function($scope, $mdMedia){

    $scope.heading = '';

    $scope.$watch(function(){
      return $mdMedia('gt-md');
    }, function(){
      $scope.menuLockedOpen = $mdMedia('gt-md');
    });

    $scope.toggleMenu = function(){
      $mdSidenav('left').toggle();
    };
    $scope.openMenu = function(){
      $mdSidenav('left').open();
    };
    $scope.closeMenu = function(){
      $mdSidenav('left').close();
    };
  }
]);

app.controller('PokemonCtrl', [
  '$scope', 
  function($scope){
    $scope.$parent.heading = 'Pokemon';
  }
]);