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
  '$scope', '$mdMedia', '$mdSidenav',
  function($scope, $mdMedia, $mdSidenav){

    $scope.heading = '';

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

// var trainers = [ { _id: 55cf1313a1a8c70035fd9845,
//     capturedPokemons:
//      [ [Object],
//        [Object],
//        [Object],
//        [Object],
//        [Object],
//        [Object],
//        [Object],
//        [Object],
//        [Object],
//        [Object] ],
//     count: 10,
//     user:
//      { _id: 55cf1313a1a8c70035fd9845,
//        telegramId: 102325009,
//        name: 'Silvia',
//        __v: 0,
//        birthdate: Thu Sep 07 1989 00:00:00 GMT+0200 (W. Europe Daylight Time),
//        alias: [ 'Silvia', 'Santus', 'SilviaTek', 'Naashira', 'Nashira' ] } },


//{ "_id" : ObjectId("55cf3295b15181983880af8b"), "ndex" : 15, "name" : "Beedrill", "catchRate" : 45, "total" : 395, "sprite" : { "animated" : "assets/pokemon/sprites/animated/beedrill.gif", "officialArt" : "assets/pokemon/sprites/official-art/beedrill.png" }, "__v" : 1, "types" : [ "poison", "bug" ] }

app.controller('PokemonCtrl', [
  '$scope', 
  function($scope){
    $scope.$parent.heading = 'Pokemon';

    $scope.trainers = [{
      user: {
        name: 'Silvia'
      },
      capturedPokemons: [{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },{
        ndex: 150,
        name: "Mew",
        types: ["psycho"],
        message:"lancio la sfera",
        sprite : {
          "animated" : "assets/pokemon/sprites/animated/mew.gif",
          "officialArt" : "assets/pokemon/sprites/official-art/mew.png"
        }
      },
      ]
    }];
  }
]);