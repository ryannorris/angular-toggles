angular.module('angularToggles.services')
.factory('Toggles', function($http, Endpoints, $q) {
  return {
    resolveRule: function(name) {
      var deferred = $q.defer();

      $http.get(Endpoints.togglesConfigUrl)
      .success(function(data, status,  headers) {
        var resolution = data[name] || false;
        if(data[name] === false) {
          deferred.reject();
        } else {
          deferred.resolve();
        }
      });

      return deferred.promise;
    }
  };
});
