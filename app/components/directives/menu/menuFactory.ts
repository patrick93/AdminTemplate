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
            },
            {
                name: "Forms",
                type: "toggle",
                pages: [
                    {
                        name: "General",
                        type: "link",
                        url: "/forms/general"
                    }
                ]
            }
        ]
    }
}]);
