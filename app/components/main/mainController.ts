angular.module('Template').controller('mainController', ['$scope', '$mdSidenav', 'menuFactory', function($scope, $mdSidenav, menuFactory) {
    $scope.isOpen = true;
    $scope.toggleSidenav = function(menuId) {
        $scope.isOpen = !$scope.isOpen;
    };
    $scope.menu = menuFactory.menu;
}]);
