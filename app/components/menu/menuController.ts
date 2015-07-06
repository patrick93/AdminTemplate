angular.module('Template').directive('sideMenu', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            menu: '='
        },
        templateUrl: 'components/menu/menu.html',
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

            $timeout(function() {
                angular.forEach($scope.menu, function(item, index) {
                    if (item.type == 'toggle') {
                        addWatch(item, index);
                    }
                });
            });

            function addWatch(section, index) {
                $scope.$watch(
                    function() {
                        return $scope.isOpen(section);
                    },
                    function(open) {
                        var $ul = $element.children().find('ul').eq(index - 1);
                        var targetHeight = open ? getTargetHeight() : 0;
                        $timeout(function() {
                            $ul.css({ height: targetHeight + 'px' });
                        }, 0, false);

                        function getTargetHeight() {
                            var targetHeight;
                            $ul.addClass('no-transition');
                            $ul.css('height', '');
                            targetHeight = $ul.prop('clientHeight');
                            $ul.css('height', 0);
                            $ul.removeClass('no-transition');
                            return targetHeight;
                        }
                    });
            }
        }
    }
}]);
