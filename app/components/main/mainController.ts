angular.module('Template').controller('mainController', ['$scope', '$mdSidenav', 'menuFactory', function($scope, $mdSidenav, menuFactory) {
    $scope.isOpen = true;
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.menu = menuFactory.menu;

    $scope.wizard = {
        steps: [
            {
                Title: 'Step 1',
                url: 'components/wizard/demo/step1.html'
            },
            {
                Title: 'Step 2',
                url: 'components/wizard/demo/step2.html'
            }
        ]
    };
}]);
