angular.module('Template').controller('mainController', ['$scope', 'menuFactory', function($scope, menuFactory){
    $scope.menu = menuFactory.menu;
}]);
