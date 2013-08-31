angular.module('angularToggles.directives')
.directive('toggle', function(Toggles) {
  return {
    scope: {
      feature: '='
    },
    restrict: 'A',
    transclude: true,
    template: '<div ng-show="enabled" ng-transclude></div>',
    controller: function($scope) {
      $scope.$watch('feature', function(neww, old) {
        $scope.enabled = Toggles.resolveRule(neww);
      });
    }
  };
});

