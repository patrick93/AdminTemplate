angular.module('Template', ['ngRoute', 'ngMaterial', 'ngMessages'])

angular.module('Template').config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
        'default': 'A200'
    });
});

angular.module('Template').config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'components/demo/home/home.html',
        controller: 'homeController as homeCtrl'
    })
        .when('/wizard', {
        templateUrl: 'components/demo/wizard/wizard.html',
        controller: 'wizardController as wizardCtrl'
    })
}]);
