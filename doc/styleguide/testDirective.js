'use strict';

// Test directive is used to demo lazy loading external directive in the test project
angular.module('sgApp')
  .directive('sgTestDirective', function($rootScope, $window, $timeout) {
    return {
      replace: true,
      restrict: 'A',
      templateUrl: 'demo/testDirective.html'
    };
  });
