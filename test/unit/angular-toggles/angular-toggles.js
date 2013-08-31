'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('angularToggles', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('angularToggles');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('angularToggles.config')).toBeTruthy();
    });

    

    
    it('should load directives module', function() {
        expect(hasModule('angularToggles.directives')).toBeTruthy();
    });
    

    
    it('should load services module', function() {
        expect(hasModule('angularToggles.services')).toBeTruthy();
    });
    

});
