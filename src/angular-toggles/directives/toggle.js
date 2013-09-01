angular.module('angularToggles.directives')
.directive('toggle', function(Toggles) {
  return {
    scope: {
      feature: '@'
    },
    restrict: 'A',
    transclude: true,
    template: '<div ng-show="enabled" ng-transclude></div>',
    link: function(scope, elem, attrs) {
      attrs.$observe('feature', function(value) {
        Toggles.resolveRule(value).then(function() {
          scope.enabled = true;
        }, function() {
          scope.enabled = false;
        });
      });
    }
  };
});

