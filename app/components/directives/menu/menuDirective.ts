angular.module('Template').directive('sideMenu', ['$mdSidenav', function($mdSidenav) {
    return {
        restrict: 'E',
        scope: {
            menu: '='
        },
        templateUrl: 'components/directives/menu/menu.html',
        controller: function($scope, $element) {
            $scope.isSidenavOpen = true;
            $scope.toggleSidenav = function(menuId) {
                $mdSidenav(menuId).toggle();
                $scope.openedSection = null;
            };

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

            $scope.isMenuOpen = function(section) {
                return $scope.openedSection === section;
            }

            $scope.toggleOpen = function(section) {
                $scope.openedSection = ($scope.openedSection === section ? null : section);
            }

            $scope.mouseOver = function(section) {
                if (!$scope.isSidenavOpen) {
                    $scope.toggleOpen(section);
                }
            }
            $scope.focusSection = function(section, page) {
                $scope.pageSelected = page;
                $scope.openedSection = section;
            }
        }
    }
}]);
