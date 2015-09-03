angular.module('Template').controller('mainController', ['$scope', 'menuFactory', function($scope, menuFactory){
    $scope.menu = menuFactory.menu;

    $scope.wizard = {
        steps: [
            {
                Title: 'Step 1',
                url: 'components/demo/step1.html'
            },
            {
                Title: 'Step 2',
                url: 'components/demo/step2.html'
            },
            {
                Title: 'Step 3',
                url: 'components/demo/step3.html'
            },
            {
                Title: 'Step 4',
                url: 'components/demo/step3.html'
            }
        ]
    };
}]);
