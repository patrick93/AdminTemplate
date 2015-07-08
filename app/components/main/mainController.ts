angular.module('Template').controller('mainController', ['$scope', '$mdSidenav', 'menuFactory', function($scope, $mdSidenav, menuFactory) {
    $scope.isOpen = true;
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.menu = menuFactory.menu;
}]);
