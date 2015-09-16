angular.module('Template').directive('menuToggle', ['$timeout', '$compile', function($timeout, $compile) {
    return {
        scope: {
            section: '='
        },
        templateUrl: 'components/directives/menu/menuToggle/menuToggle.html',
        link: function($scope, $element) {
            var template = '<ul class="menu-toggle-list">' +
                '<li ng-repeat="page in section.pages">' +
                    '<menu-link ng-if="page.type === \'link\'" page="page" section="section"></menu-link>' +
                    '<menu-toggle ng-if="page.type === \'toggle\'" section="page"></menu-toggle>' +
                '</li>'
            '</ul>';
            var $template = angular.element(template);
            $compile($template)($scope);
            $element.append($template);
        },

        controller: function($scope, $element) {
            var controller = (<any>angular.element(document.querySelector('side-menu ul'))).scope();
            var $ul = $element.find('ul');
            var originalHeight;

            $scope.isOpen = function() {
                return controller.isMenuOpen($scope.section);
            };
            $scope.toggle = function() {
                controller.toggleOpen($scope.section);
            };
            $scope.isPageFromSectionSelected = function() {
                return controller.isPageFromSectionSelected($scope.section);
            };
            $scope.isDisabled = function() {
                return !controller.isSidenavOpen;
            }
            $scope.$watch(
                function() {
                    return controller.isMenuOpen($scope.section);
                },
                function(open) {
                    var $ul = $element.find('ul');
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
                }
                );

        }
    };
}])
