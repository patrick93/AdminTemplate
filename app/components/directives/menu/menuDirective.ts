angular.module('Template').directive('sideMenu', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            menu: '='
        },
        templateUrl: 'components/directives/menu/menu.html',
        controller: function($scope, $element) {
            if ($scope.menu[0].type === 'link') {
                $scope.pageSelected = $scope.menu[0];
                $scope.openedSection = null;
            } else {
                var section = $scope.menu[0];
                $scope.openedSection = section;
                $scope.pageSelected = section.pages[0];
            }

            $scope.isSelected = function(page) {
                return $scope.pageSelected === page;
            }

            $scope.isOpen = function(section) {
                return $scope.openedSection === section;
            }

            $scope.toggleOpen = function(section) {
                $scope.openedSection = ($scope.openedSection === section ? null : section);
            }
        }
    }
}]);
