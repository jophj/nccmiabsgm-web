/* global angular */
var app = angular.module('NccmiabsgmApp', [
  'ngMaterial',
  'ngRoute',
  'ngResource',
  'md.data.table'
]);

app.config(['$routeProvider', function($routeProvider) {
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
      redirectTo: '/pokemon'
    });
}]);


app.controller('AppCtrl', [
  '$scope', '$mdMedia', '$mdSidenav',
  function($scope, $mdMedia, $mdSidenav){

    $scope.heading = '';
    $scope.gtSm = $mdMedia('gt-sm');;
    $scope.$watch(function(){
      $scope.gtSm = $mdMedia('gt-sm');
      return $scope.gtSm;
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

app.constant('SERVER', 'http://52.26.147.171:8081');
// app.constant('SERVER', 'http://localhost:8081');

app.factory('Trainer', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/api/trainers/');
}]);

app.factory('Karma', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/api/karma/');
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
  '$scope', 'SERVER', 'Trainer', 'TypeData',
  function($scope, SERVER, Trainer, TypeData){

    $scope.server = SERVER;
    $scope.$parent.heading = 'Pokemon';

    $scope.typeData = TypeData;

    Trainer.query().$promise.then(function(trainers){
      $scope.trainers = trainers;
    });
  }
]);

app.controller('KarmaCtrl', [
  '$scope', 'Karma',
  function($scope, Karma){

    $scope.$parent.heading = 'Karma';

    $scope.query = {
      filter: '',
      order: 'date'
    };

    Karma.query().$promise.then(function(karma){
      $scope.karma = karma;
    });
  }
]);