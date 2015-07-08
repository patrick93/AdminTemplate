angular.module('Template').directive('menuLink', [function() {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'components/menu/menuLink/menuLink.html',
    link: function($scope) {
      var controller = angular.element(document.querySelector('side-menu')).children().scope();

      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };
    }
  };
}]);
