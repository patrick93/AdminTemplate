angular.module('Template').directive('menuLink', [function() {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'components/directives/menu/menuLink/menuLink.html',
    link: function($scope) {
      var controller = (<any>angular.element(document.querySelector('side-menu ul'))).scope();

      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };
    }
  };
}]);
