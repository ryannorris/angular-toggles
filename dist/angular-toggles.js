// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('angularToggles.config', [])
    .value('angularToggles.config', {
        debug: true
    });

// Modules
angular.module('angularToggles.directives', [], function() {
});

angular.module('angularToggles.services', []);
angular.module('angularToggles',
    [
        'angularToggles.config',
        'angularToggles.directives',
        'angularToggles.services'
    ]);
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

angular.module('angularToggles.services')
.factory('Toggles', function($http, Endpoints) {

  var self = this;

  $http.get(Endpoints.togglesConfigUrl).success(function(data, status,        headers) {
    self.rules = data;
  });

  return {
    resolveRule: function(name) {
      return self.rules[name] || false;
    }
  };
});