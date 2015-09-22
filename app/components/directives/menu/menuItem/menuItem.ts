angular.module('Template').directive('menuItem', ['$timeout', '$compile', function($timeout, $compile) {
    return {
        scope: {
            section: '='
        },
        template: '',
        link: MenuItemLink,
        controller: MenuItemController
    }

    function MenuItemController($scope, $element) {
        var controller = (<any>angular.element(document.querySelector('side-menu ul'))).scope();
        if (isSectionToggle($scope)) {
            setupWatch();
        }

        $scope.isSelected = function() {
            return controller.isSelected($scope.section);
        }
        $scope.focusSection = function() {
            controller.focusSection($scope.section);
        }
        $scope.mouseEnter = function() {
            controller.mouseEnter($scope.section);
        }
        $scope.mouseLeave = function() {
            controller.mouseLeave($scope.section);
        }
        $scope.isOpen = function() {
            return controller.isMenuOpen($scope.section);
        }
        $scope.toggle = function() {
            controller.toggleOpen($scope.section);
        }
        $scope.isDisabled = function() {
            return !controller.isSidenavOpen && isSectionInFirstLevel($scope);
        }

        function setupWatch() {
            $scope.$watch(
                function() {
                    return controller.isMenuOpen($scope.section);
                },
                function(open) {
                    var all_ul = $element.find('ul');
                    var $main_ul = angular.element(all_ul[0]);
                    var targetHeight = open ? getTargetHeight() : 0;
                    $timeout(function() {
                        $main_ul.css({ height: targetHeight + 'px' });
                    }, 0, false);

                    function getTargetHeight() {
                        var fullHeight = 0;
                        for (let i = 0; i < all_ul.length; i++) {
                            var $ul = angular.element(all_ul[i]);
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
            if (isSectionToggle($scope)) {
                renderTemplateToggle();
            } else {
                renderTemplateLink();
            }
        }

        function renderTemplateLink() {
            var button = getLinkButtonTemplate();
            button.append(getDivTemplate());
            addElementToTemplate(button);
        }

        function renderTemplateToggle() {
            var toggleDiv = getToggleDivTemplate();
            var button = getToggleButtonTemplate();
            var div = getDivTemplate();
            var spanWithIcon = getSpanWithIconTemplate();
            var subMenu = getSubMenuTemplate();
            div.append(spanWithIcon);
            button.append(div);
            toggleDiv.append(button);
            toggleDiv.append(subMenu);
            addElementToTemplate(toggleDiv);
        }

        function addElementToTemplate(element: any) {
            compileTemplate(element);
            $element.append(element);
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

        function getToggleDivTemplate() {
            var div;
            if (isSectionInFirstLevel($scope)){
                div = '<div ng-mouseenter="mouseEnter(section)" ng-mouseleave="mouseLeave(section)"></div>';
            }else{
                div = '<div></div>';
            }
            return createHTMLFromString(div);
        }

        function getLinkButtonTemplate() {
            var button = '<md-button ng-class="{\'active\' : isSelected()}" ng-click="focusSection()" ng-href="{{(section.type === \'version\' ? \'\' : \'#\') + section.url}}"></md-button>';
            return createButtonHTMLFromString(button);
        }

        function getToggleButtonTemplate() {
            var button = '<md-button class="md-button-toggle" ng-click="toggle()" ng-class="{\'active\' : isSelected()}" ng-disabled="isDisabled()"></md-button>';
            return createButtonHTMLFromString(button);
        }

        function createButtonHTMLFromString(button: any) {
            var buttonElem = createHTMLFromString(button);
            addPaddingToButton(buttonElem);
            return buttonElem;
        }

        function addPaddingToButton(buttonElem: any) {
            buttonElem.css({ "padding-left": $scope.section.id.length * 16 + 'px' });
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

    function isSectionToggle($scope: any) {
        return $scope.section.type === "toggle";
    }

    function isSectionInFirstLevel($scope: any) {
        return $scope.section.id.length === 1;
    }
}]);
