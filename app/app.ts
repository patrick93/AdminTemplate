angular.module('Template', ['ngMaterial'])
    .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue', {
        'default': 'A200'
    });
});

angular.module('Template').controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {
    $scope.isOpen = true;
    $scope.toggleSidenav = function(menuId) {
        $scope.isOpen = !$scope.isOpen;
    };
}]);
