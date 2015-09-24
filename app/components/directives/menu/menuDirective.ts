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
                $scope.openedSectionId = '';
            };

            generateId($scope.menu, "");

            if ($scope.menu[0].type === 'link') {
                $scope.pageSelectedId = $scope.menu[0].id;
                $scope.openedSectionId = '';
            } else {
                var section = $scope.menu[0];
                $scope.openedSectionId = section.id;
                $scope.pageSelectedId = section.pages[0].id;
            }


            function generateId(section, parentId) {
                for (let i = 0; i < section.length; i++) {
                    section[i]["id"] = parentId + (i+1);
                    if (section[i].type === "toggle") {
                        generateId(section[i].pages, section[i]["id"])
                    }
                }
            }

            $scope.isSelected = function(section) {
                return $scope.pageSelectedId.slice(0, section.id.length) === section.id;
            }

            $scope.isMenuOpen = function(section) {
                return $scope.openedSectionId.slice(0, section.id.length) === section.id;
            }

            $scope.toggleOpen = function(section) {
                if ($scope.isMenuOpen(section)) {
                    $scope.openedSectionId = section.id.slice(0, section.id.length - 1);
                }else{
                    $scope.openedSectionId = section.id;
                }
            }

            $scope.mouseOver = function(section) {
                if (!$scope.isSidenavOpen && !$scope.isMenuOpen(section)) {
                    $scope.openedSectionId = section.id;
                }
            }

            $scope.focusSection = function(section) {
                $scope.pageSelectedId = section.id;
            }
        }
    }
}]);
