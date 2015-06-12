var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
    $scope.isOpen = true;
    $scope.toggleSidenav = function (menuId) {
        $scope.isOpen = !$scope.isOpen;
    };

}]);
