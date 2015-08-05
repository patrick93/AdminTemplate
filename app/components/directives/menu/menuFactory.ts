angular.module('Template').factory('menuFactory', [function() {
    return {
        menu: [
            {
                name: "Home",
                type: "link",
                url: "/"
            },
            {
                id: "components",
                name: "Components",
                type: "toggle",
                pages: [
                    {
                        name: "Forms",
                        url: "/Components/Forms"
                    },
                    {
                        name: "Wizard",
                        url: "/Components/Wizard"
                    }
                ]
            },
            {
                id: "components",
                name: "Components",
                type: "toggle",
                pages: [
                    {
                        name: "Forms",
                        url: "/Components/Forms"
                    },
                    {
                        name: "Wizard",
                        url: "/Components/Wizard"
                    }
                ]
            }
        ]
    }
}]);
