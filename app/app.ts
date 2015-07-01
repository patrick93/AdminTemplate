angular.module('Template', ['ngMaterial'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
        'default': 'A200'
    });
});
