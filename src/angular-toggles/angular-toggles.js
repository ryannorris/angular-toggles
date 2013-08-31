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
