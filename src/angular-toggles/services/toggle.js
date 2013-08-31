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
