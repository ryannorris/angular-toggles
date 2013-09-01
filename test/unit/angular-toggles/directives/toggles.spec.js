'use strict';

describe('using the toggles directive', function() {
  var scope, elem, Toggles, q;

  angular.module('angularToggles.test', []);

  angular.module('angularToggles.test').factory('Toggles', function() {
    return {
      resolveRule: function(value) { return value; }
    };
  });

  beforeEach(module('angularToggles.test', 'angularToggles.directives'));

  beforeEach(inject(function($compile, $rootScope, _Toggles_, _$q_) {
    Toggles = _Toggles_;
    q = _$q_;

    elem = $compile('<div toggle feature="bar"><h1>Hello World</h1></div>')($rootScope);
    scope = elem.scope();
  }));

  it('should call the service with the name of the feature from the directive', inject(function(Toggles) {
    var deferred = q.defer();
    var promise = deferred.promise;

    spyOn(Toggles, 'resolveRule').andReturn(promise);

    scope.$apply(function() {
      scope.feature = "bar";
      deferred.resolve();
    });

    expect(Toggles.resolveRule).toHaveBeenCalledWith('bar');
  }));

  it('should hide the content when the feature is disabled', inject(function(Toggles) {
    var deferred = q.defer();
    var promise = deferred.promise;

    spyOn(Toggles, 'resolveRule').andReturn(promise);

    scope.$apply(function() {
      scope.feature = "bar";
      deferred.reject();
    });

    expect(elem.children('div').css('display')).toBe('none');
    expect(Toggles.resolveRule).toHaveBeenCalledWith('bar');
  }));

  it('should show the content when the feature is enabled', inject(function(Toggles) {
    var deferred = q.defer();
    var promise = deferred.promise;

    spyOn(Toggles, 'resolveRule').andReturn(promise);

    scope.$apply(function() {
      scope.feature = "bar";
      deferred.resolve();
    });

    expect(elem.children('div').css('display')).toBe('');
    expect(Toggles.resolveRule).toHaveBeenCalledWith('bar');
  }));

  it('should show the content when the feature is not configured', inject(function(Toggles) {
    var deferred = q.defer();
    var promise = deferred.promise;

    spyOn(Toggles, 'resolveRule').andReturn(promise);

    scope.$apply(function() {
      scope.feature = "bar";
      deferred.resolve();
    });

    expect(elem.children('div').css('display')).toBe('');
    expect(Toggles.resolveRule).toHaveBeenCalledWith('bar');
  }));

  afterEach(function() {
    Toggles.resolveRule.reset();
  });
});
