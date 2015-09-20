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

app.constant('SERVER', 'http://52.26.147.171:8081');
//app.constant('SERVER', 'http://localhost:8081');

app.controller('AppCtrl', [
  '$scope', '$mdMedia', '$mdSidenav',
  function($scope, $mdMedia, $mdSidenav){

    $scope.heading = '';
    $scope.gtSm = $mdMedia('gt-sm');
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

    $scope.onSwipeRight = function(evt){
      $mdSidenav('left').open();
    };

    $scope.onSwipeLeft = function(evt){
      $mdSidenav('left').close();
    };
  }
]);


app.factory('Trainer', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/api/trainers/');
}]);

app.factory('Karma', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/api/karma/');
}]);

app.factory('TypeData', [function() {
  return {
    'normal': {name: 'Normale', class: 'normal'},
    'fire': {name: 'Fuoco', class: 'fire', quantity: 12},
    'fighting': {name: 'Lotta', class: 'fighting'},
    'water': {name: 'Acqua', class: 'water', quantity: 32},
    'flying': {name: 'Volante', class: 'flying'},
    'grass': {name: 'Erba', class: 'grass', quantity: 14},
    'poison': {name: 'Veleno', class: 'poison', quantity: 33},
    'electric': {name: 'Elettro', class: 'electric', quantity: 9},
    'ground': {name: 'Terra', class: 'ground', quantity: 14},
    'psychic': {name: 'Psico', class: 'psychic', quantity: 14},
    'rock': {name: 'Roccia', class: 'rock', quantity: 11},
    'ice': {name: 'Ghiaccio', class: 'ice'},
    'bug': {name: 'Insetto', class: 'bug'},
    'dragon': {name: 'Drago', class: 'dragon'},
    'ghost': {name: 'Spettro', class: 'ghost'},
    'dark': {name: 'Buio', class: 'dark'},
    'steel': {name: 'Acciaio', class: 'steel'},
    'fairy': {name: 'Folletto', class: 'fairy'}
  };
}]);

app.factory('BadgesData', [function() {
  return{
    'boulder': {name: 'Medaglia Sasso', type: 'rock', count: 11, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/d/dd/Boulder_Badge.png/75px-Boulder_Badge.png'},
    'cascade': {name: 'Medaglia Cascata', type: 'water', count: 32, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/9/9c/Cascade_Badge.png/75px-Cascade_Badge.png'},
    'thunder': {name: 'Medaglia Tuono', type: 'electric', count: 9, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/a/a6/Thunder_Badge.png/75px-Thunder_Badge.png'},
    'rainbow': {name: 'Medaglia Arcobaleno', type: 'grass', count: 14, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/b/b5/Rainbow_Badge.png/75px-Rainbow_Badge.png'},
    'soul': {name: 'Medaglia Anima', type: 'poison', count: 33, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/7/7d/Soul_Badge.png/75px-Soul_Badge.png'},
    'marsh': {name: 'Medagli Palude', type: 'psychic', count: 14, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/6/6b/Marsh_Badge.png/75px-Marsh_Badge.png'},
    'volcano': {name: 'Medaglia Vulcano', type: 'fire', count: 12, imageUrl: 'http://cdn.bulbagarden.net/upload/thumb/1/12/Volcano_Badge.png/75px-Volcano_Badge.png'},
    'earth': {name: 'Medaglia Terra', type: 'ground', count: 14, imageUrl: 'http://cdn.bulbagarden.net/upload/7/78/Earth_Badge.png'},
    //TODO FINAL BADGE
  };
}]);

app.controller('PokemonCtrl', [
  '$scope', '$filter', 'SERVER', 'Trainer', 'TypeData', 'BadgesData',
  function($scope, $filter, SERVER, Trainer, TypeData, BadgesData){

    $scope.server = SERVER;
    $scope.$parent.heading = 'Pokemon';

    $scope.typeData = TypeData;

    Trainer.query().$promise.then(function(trainers){
      $scope.trainers = trainers;
      $scope.trainers.forEach(function(trainer){
        
        trainer.$filteredPokemons = trainer.capturedPokemons;
        
        //counting badges
        var typesCount = {};
        trainer.capturedPokemons.forEach(function(pokemon){
          pokemon.pokemon.types.forEach(function(type){
            
            var typeCount = typesCount[type];
            if (!typeCount){
              typeCount = {
                count: 0
              };
              typesCount[type] = typeCount;
            }
            typeCount.count += 1;
          });
        });

        trainer.$badges = [];
        for (badge in BadgesData){
          if (typesCount[BadgesData[badge].type] && BadgesData[badge].count <= typesCount[BadgesData[badge].type].count)
            trainer.$badges.push(BadgesData[badge]);
        }
      });
    });

    $scope.onSearchStringUpdated = function () {
      $scope.trainers.forEach(function(trainer){
        trainer.$filteredPokemons = $filter('filter')(trainer.capturedPokemons, $scope.searchString);
      });
    }
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

    $scope.oldSelectedTab = 0
    $scope.selectedTab = 0;
    $scope.stopPropagation = false;

    $scope.onSwipeRight = function(evt){
      if ($scope.stopPropagation)
        evt.stopPropagation();
    
      if ($scope.selectedTab == 0)
        $scope.stopPropagation = false;
      else
        $scope.stopPropagation = true;
    };

    $scope.onSwipeLeft = function(evt){
      $scope.stopPropagation = true;
      evt.stopPropagation();
    };

    $scope.onTabSelected = function(tabIndex){
      $scope.selectedTab = tabIndex;

      if ($scope.selectedTab > 0)
        $scope.stopPropagation = true;
    };


    Karma.query().$promise.then(function(karma){
      $scope.karma = karma;
    });

  }
]);