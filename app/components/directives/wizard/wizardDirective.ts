module Template {
    export function wizardDirective() {
        return {
            restrict: 'E',
            scope: {
                wizard: '='
            },
            templateUrl: 'components/directives/wizard/wizard.html',
            controller: wizardController,
            controllerAs: 'wizardCtrl'
        };

        wizardController.$inject = ['$scope', '$element', '$timeout'];

        function wizardController($scope, $element, $timeout) {
            var self = this;
            self.selected = 0;
            self.progressValue = 0;

            self.nextStep = nextStep;
            self.previousStep = previousStep;
            self.isLastStep = isLastStep;
            self.isFirstStep = isFirstStep;

            activate();

            function nextStep(){
                self.selected += 1;
            }

            function previousStep(){
                self.selected -= 1;
            }

            function isFirstStep() {
                return self.selected == 0;
            }

            function isLastStep() {
                return self.selected == $scope.wizard.steps.length - 1;
            }

            function updateProgress(){
                self.progressValue = (100/$scope.wizard.steps.length)*(self.selected+1);
            }

            function updateContentHeight(content_height){
                var contents = $element.find('md-tab-content').children().children();
                contents.css({height: content_height + 'px'});
            }

            function activate(){
                $element.find('md-ink-bar').css({display: 'none'});
                var progress = $element.find('md-progress-linear');
                var tabs_header = $element.find('md-tabs-canvas')[0].offsetHeight;
                var main_area = $element.parent()[0].offsetHeight;
                var content_height = main_area - tabs_header - 96 - 68;
                progress.css({position: 'inherit', top: tabs_header+2 + 'px'});
                setupWatcher(content_height);
            }

            function setupWatcher(content_height) {
                $scope.$watch(function(){
                        return $element.find('md-tab-content').children().children().length;
                    }, function(newValue, oldValue){
                            updateContentHeight(content_height);
                        });
                $scope.$watch('wizardCtrl.selected', function(newValue, oldValue){
                    updateProgress()
                });
            }

        }
    }
}

angular.module('Template').directive('wizardDirective', Template.wizardDirective);
