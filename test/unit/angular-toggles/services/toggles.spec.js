describe('when we are using the sales service', function() {
  var httpBackend, Endpoints;
  var stubRules;

  angular.module('angularToggles.config', []).factory('Endpoints', function() {
    return {
      togglesConfigUrl: '/toggles.json'
    };
  });

  beforeEach(function() {
    module('angularToggles.services', 'angularToggles.config');
    stubRules = { 'foo': true, 'bar': false };

    inject(function($injector, _$httpBackend_, _Endpoints_) {
      $httpBackend = $injector.get('$httpBackend');
      Endpoints = _Endpoints_;
    });

    $httpBackend.when('GET', Endpoints.togglesConfigUrl).respond(stubRules);
  });

  it('we should go to a configured URL to get the toggles config', inject(function($injector, Endpoints, $http) {
    // arrange

    $injector.get('Toggles');

    $httpBackend.flush();
  }));

  it('we should return that the feature is enabled when the toggle is true', inject(function($injector) {
    var rules = stubRules;

    var Toggles = $injector.get('Toggles');
    $httpBackend.flush();

    var ruleName = 'foo';
    var resolution = Toggles.resolveRule(ruleName);

    expect(resolution).toBeTruthy();
  }));

  it('we should return that the feature is disabled when the toggle is false', inject(function($injector) {
    var rules = stubRules;

    var Toggles = $injector.get('Toggles');
    $httpBackend.flush();

    var ruleName = 'bar';
    var resolution = Toggles.resolveRule(ruleName);

    expect(resolution).toBeFalsy();
  }));

  it('we should return that the feature is enabled is the toggle is not configured', inject(function($injector) {
    var rules = stubRules;

    var ruleName = 'zoo';

    var Toggles = $injector.get('Toggles');
    $httpBackend.flush();

    var resolution = Toggles.resolveRule(ruleName);

    expect(resolution).toBeFalsy();
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));
});
