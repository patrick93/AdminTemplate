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
                        url: "/Components/Forms",
                        type: 'link'
                    },
                    {
                        name: "Wizard",
                        url: "/Components/Wizard",
                        type: 'link'
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
                        url: "/Components/Forms",
                        type: 'link'
                    },
                    {
                        name: "Wizard",
                        url: "/Components/Wizard",
                        type: 'link'
                    },
                    {
                        name: "Components",
                        type: "toggle",
                        pages: [
                            {
                                name: "Forms",
                                url: "/Components/Forms",
                                type: 'link'
                            },
                            {
                                name: "Wizard",
                                url: "/Components/Wizard",
                                type: 'link'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}]);
