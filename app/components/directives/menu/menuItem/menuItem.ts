angular.module('Template').directive('menuItem', ['$timeout', '$compile', function($timeout, $compile) {
    return{
        scope:{
            section: '='
        },
        template: '',
        link: MenuItemLink,
        controller: MenuItemController
    }

    function MenuItemController($scope, $element) {
        var controller = (<any>angular.element(document.querySelector('side-menu ul'))).scope();
        if ($scope.section.type === "toggle"){
            setupWatch();
        }

        $scope.isSelected = function() {
            return controller.isSelected($scope.section);
        };

        $scope.focusSection = function() {
            controller.focusSection($scope.section);
        }

        $scope.isOpen = function() {
            return controller.isMenuOpen($scope.section);
        };
        $scope.toggle = function() {
            controller.toggleOpen($scope.section);
        };
        $scope.isDisabled = function() {
            return !controller.isSidenavOpen;
        }

        function setupWatch() {
            $scope.$watch(
                function() {
                    return controller.isMenuOpen($scope.section);
                },
                function(open) {
                    var all_ul = $element.find('ul');
                    var $ul = angular.element(all_ul[0]);
                    var targetHeight = open ? getTargetHeight() : 0;
                    $timeout(function() {
                        $ul.css({ height: targetHeight + 'px' });
                    }, 0, false);

                    function getTargetHeight() {
                        var fullHeight = 0;
                        for (let i = 0; i < all_ul.length; i++) {
                            var targetHeight;
                            $ul.addClass('no-transition');
                            $ul.css('height', '');
                            targetHeight = $ul.prop('clientHeight');
                            $ul.css('height', 0);
                            $ul.removeClass('no-transition');
                            fullHeight += targetHeight;
                        }
                        return fullHeight;
                    }
                }
                );
        }
    }

    function MenuItemLink($scope, $element) {
        renderTemplate();

        function renderTemplate() {
            if ($scope.section.type === "toggle") {
                renderTemplateToggle();
            }else{
                renderTemplateLink();
            }
        }

        function renderTemplateLink() {
            addButtonWithDiv(getLinkButtonTemplate(), getDivTemplate());
        }

        function renderTemplateToggle() {
            addToggleButton();
            addSubMenu();
        }

        function addToggleButton() {
            var button = getToggleButtonTemplate();
            var div = getDivTemplate();
            var spanWithIcon = getSpanWithIconTemplate();
            div.append(spanWithIcon);
            addButtonWithDiv(button, div);
        }

        function addSubMenu() {
            var subMenu = getSubMenuTemplate();
            compileTemplate(subMenu);
            $element.append(subMenu);
        }

        function addButtonWithDiv(button: any, div: any) {
            button.append(div);
            compileTemplate(button);
            $element.append(button);
        }

        function compileTemplate(template: any) {
            $compile(template)($scope);
        }

        function getDivTemplate() {
            var div = '<div flex layout-align="start center" layout="row">' +
                '<md-icon>account_balance</md-icon>' +
                '<span class="menu-name">{{section.name}}</span>' +
                '<span flex=""></span>' +
            '</div>';
            return createHTMLFromString(div);
        }

        function getLinkButtonTemplate() {
            var button = '<md-button ng-class="{\'active\' : isSelected()}" ng-click="focusSection()" ng-href="{{(section.type === \'version\' ? \'\' : \'#\') + section.url}}"></md-button>';
            return createHTMLFromString(button);
        }

        function getToggleButtonTemplate() {
            var button = '<md-button class="md-button-toggle" ng-click="toggle()" ng-class="{\'active\' : isSelected()}" ng-disabled="isDisabled()"></md-button>';
            return createHTMLFromString(button);
        }

        function getSpanWithIconTemplate() {
            var span = '<span aria-hidden="true" class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}"><md-icon>expand_less</md-icon></span>';
            return createHTMLFromString(span);
        }

        function getSubMenuTemplate() {
            var subMenu = '<ul class="menu-toggle-list">' +
                '<li ng-repeat="page in section.pages">' +
                    '<menu-item section="page"></menu-item>' +
                '</li>'
            '</ul>';
            return createHTMLFromString(subMenu);
        }

        function createHTMLFromString(template: string) {
            return angular.element(template);
        }
    }
}]);
