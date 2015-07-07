angular.module('Template').directive('menuToggle', [ '$timeout', function($timeout) {
  return {
    scope: {
      section: '='
    },
    templateUrl: 'components/menu/menuToggle/menuToggle.html',
    link: function($scope, $element) {
      var controller = $element.parent().parent().scope();
      var $ul = $element.find('ul');
      var originalHeight;

      $scope.isOpen = function() {
        return controller.isOpen($scope.section);
      };
      $scope.toggle = function() {
        controller.toggleOpen($scope.section);
      };
      $scope.$watch(
          function () {
            return controller.isOpen($scope.section);
          },
          function (open) {
            var $ul = $element.find('ul');
            var targetHeight = open ? getTargetHeight() : 0;
            $timeout(function () {
              $ul.css({ height: targetHeight + 'px' });
            }, 0, false);

            function getTargetHeight () {
              var targetHeight;
              $ul.addClass('no-transition');
              $ul.css('height', '');
              targetHeight = $ul.prop('clientHeight');
              $ul.css('height', 0);
              $ul.removeClass('no-transition');
              return targetHeight;
            }
          }
      );
    }
  };
}])