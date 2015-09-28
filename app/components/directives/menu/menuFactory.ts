angular.module('Template').factory('menuFactory', [function() {
    return {
        menu: [
            {
                name: "Home",
                type: "link",
                url: "/"
            },
            {
                name: "Wizard",
                type: "link",
                url: "/wizard"
            }
        ]
    }
}]);
