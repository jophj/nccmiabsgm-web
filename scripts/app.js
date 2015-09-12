/* global angular */
var app = angular.module('NccmiabsgmApp', [
  'ngMaterial',
  'ngRoute',
  'ngResource'
]);

app.config(['$routeProvider', function($routeProvider) {
  console.log('config');
  $routeProvider.
  when('/pokemon', {
    templateUrl: 'partials/pokemon.html',
    controller: 'PokemonCtrl'
  }).
  when('/karma', {
    templateUrl: 'partials/karma.html',
    controller: 'KarmaCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);


app.controller('AppCtrl', [
  '$scope', '$mdMedia', '$mdSidenav',
  function($scope, $mdMedia, $mdSidenav){

    $scope.heading = '';
    $scope.assetsHost = 'http://52.26.147.171:8081';

    $scope.$watch(function(){
      return $mdMedia('gt-sm');
    }, function(){
      $scope.menuLockedOpen = $mdMedia('gt-sm');
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

//TODO host as constant
app.factory('Trainer', ['$resource', function($resource) {
  // return $resource('http://52.26.147.171:8081/api/trainers/');
  return $resource('http://localhost:8081/api/trainers/');
}]);

app.factory('TypeData', [function() {
  return {
    'normal': {name: 'Normale', class: 'normal'},
    'fire': {name: 'Fuoco', class: 'fire'},
    'fighting': {name: 'Lotta', class: 'fighting'},
    'water': {name: 'Acqua', class: 'water'},
    'flying': {name: 'Volante', class: 'flying'},
    'grass': {name: 'Erba', class: 'grass'},
    'poison': {name: 'Veleno', class: 'poison'},
    'electric': {name: 'Elettro', class: 'electric'},
    'ground': {name: 'Terra', class: 'ground'},
    'psychic': {name: 'Psico', class: 'psychic'},
    'rock': {name: 'Roccia', class: 'rock'},
    'ice': {name: 'Ghiaccio', class: 'ice'},
    'bug': {name: 'Insetto', class: 'bug'},
    'dragon': {name: 'Drago', class: 'dragon'},
    'ghost': {name: 'Spettro', class: 'ghost'},
    'dark': {name: 'Buio', class: 'dark'},
    'steel': {name: 'Acciaio', class: 'steel'},
    'fairy': {name: 'Folletto', class: 'fairy'}
  };
}]);

app.controller('PokemonCtrl', [
  '$scope', 'Trainer', 'TypeData',
  function($scope, Trainer, TypeData){

    $scope.$parent.heading = 'Pokemon';

    $scope.typeData = TypeData;

    Trainer.query().$promise.then(function(trainers){
      $scope.trainers = trainers;
    });
  }
]);

app.controller('KarmaCtrl', [
  '$scope', 'Trainer',
  function($scope, Trainer){

    $scope.$parent.heading = 'Pokemon';

    Trainer.query().$promise.then(function(trainers){
      $scope.trainers = trainers;
    });
  }
]);