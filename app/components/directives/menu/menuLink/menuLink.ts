angular.module('Template').directive('menuLink', [function() {
    return {
        scope: {
            page: '=',
            section: '='
        },
        templateUrl: 'components/directives/menu/menuLink/menuLink.html',
        link: function($scope) {
            var controller = (<any>angular.element(document.querySelector('side-menu ul'))).scope();
            if (!angular.isDefined($scope.section)) {
                $scope.section = null;
            }

            $scope.isSelected = function() {
                return controller.isSelected($scope.page);
            };

            $scope.focusSection = function() {
                controller.focusSection($scope.section, $scope.page);
            }
        }
    };
}]);
