angular.module('Template').directive('menuLink', [function() {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'components/menu/menuLink/menuLink.html',
    link: function($scope, $element) {
      var controller = $element.parent().parent().scope();

      $scope.isSelected = function() {
        return controller.isSelected($scope.section);
      };
    }
  };
}]);
