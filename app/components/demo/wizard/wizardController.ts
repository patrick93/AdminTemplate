module Template{
    export function wizardController() {
        var self = this;

        self.wizard = {
            steps: [
                {
                    Title: 'Step 1',
                    url: 'components/demo/wizard/steps/step1.html'
                },
                {
                    Title: 'Step 2',
                    url: 'components/demo/wizard/steps/step2.html'
                },
                {
                    Title: 'Step 3',
                    url: 'components/demo/wizard/steps/step3.html'
                },
                {
                    Title: 'Step 4',
                    url: 'components/demo/wizard/steps/step3.html'
                }
            ]
        };
    }
}

angular.module('Template').controller('wizardController', Template.wizardController);
