angular.module('Template', ['ngMaterial', 'ngMessages'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
        'default': 'A200'
    });
});
