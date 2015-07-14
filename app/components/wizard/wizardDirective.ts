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
            self.progressValue = 0;
            $element.find('md-ink-bar').css('display', 'none');

            self.nextStep = function(){
                self.selected += 1;
            }

            self.previous = function(){
                self.selected -= 1;
            }

            activate();

            function updateProgress(){
                var totalWidth = $element.find('md-tabs-canvas')[0].offsetWidth;
                var tabWidth = $element.find('md-tab-item')[0];
                if (tabWidth) {
                    tabWidth = tabWidth.offsetWidth;
                    self.progressValue = (((self.selected+1)*tabWidth)/totalWidth)*100;
                }
            }

            function activate(){
                var progress = $element.find('md-progress-linear');
                var tabs_header = $element.find('md-tabs-canvas')[0].offsetHeight;
                var tabs_height = $element.find('md-tabs')[0].offsetHeight;
                var content_height = tabs_height - tabs_header;
                var contents = $element.find('md-tab-content');
                angular.forEach(contents, function(el){
                        el.children().children().css({height: content_height + 'px'})
                    })
                progress.css({position: 'inherit', top: tabs_header-3 + 'px'});
                setupWatcher();
            }

            function setupWatcher() {
                $scope.$watch(function(){
                        return $element.find('md-tab-item').length;
                    }, function(newValue, oldValue){
                            updateProgress();
                        });
                $scope.$watch('wizardCtrl.selected', function(newValue, oldValue){
                    updateProgress()
                });
            }

        }
    }
}

angular.module('Template').directive('wizardDirective', Template.wizardDirective);
