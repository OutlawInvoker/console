(function() {
  'use strict';

  angular
    .module('app.apps')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/login',
        config: {
          templateUrl: 'app/authentication/login.html',
          controller: 'Login',
          controllerAs: 'vm',
          title: 'Login'
        }
      },
      {
        url: '/signup',
        config: {
          templateUrl: 'app/authentication/signup.html',
          controller: 'Signup',
          controllerAs: 'vm',
          title: 'Signup'
        }
      }
    ];
  }
})();
