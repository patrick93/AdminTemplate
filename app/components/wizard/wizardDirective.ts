module Template {
    export function wizardDirective() {
        return {
            restrict: 'E',
            scope: {
                wizard: '='
            },
            templateUrl: 'components/wizard/wizard.html',
            controller: wizardController,
            controllerAs: 'wizardCtrl'
        };

        wizardController.$inject = ['$scope', '$element', '$timeout'];

        function wizardController($scope, $element, $timeout) {
            var self = this;
            self.selected = 0;
            $element.find('md-ink-bar').css('display', 'none');

            self.nextStep = function(){
                self.selected += 1;
            }

            self.previous = function(){
                self.selected -= 1;
            }
        }
    }
}

angular.module('Template').directive('wizardDirective', Template.wizardDirective);
