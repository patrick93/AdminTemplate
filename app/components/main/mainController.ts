angular.module('Template').controller('mainController', ['$scope', '$mdSidenav', 'menuFactory', function($scope, $mdSidenav, menuFactory) {
    $scope.isOpen = true;
    $scope.toggleSidenav = function(menuId) {
        if ($scope.isOpen) {
            angular.element(document.querySelectorAll('menu-link')).css('display', 'none');
            angular.element(document.querySelectorAll('menu-toggle')).css('display', 'none');
        }else{
            angular.element(document.querySelectorAll('menu-link')).css('display', 'inherit');
            angular.element(document.querySelectorAll('menu-toggle')).css('display', 'inherit');
        }
        $scope.isOpen = !$scope.isOpen;
    };
    $scope.menu = menuFactory.menu;
}]);
