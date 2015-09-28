module Template{
    export function homeController() {
        var self = this;
    }
}

angular.module('Template').controller('homeController', Template.homeController);
