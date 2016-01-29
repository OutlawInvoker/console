(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/',
        config: {
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'Dashboard',
          controllerAs: 'vm',
          title: 'Dashboard',
          resolve: {
            token: function() {
              if(!localStorage.getItem('access_token')){
                localStorage.clear();
                window.location = "#/login";
              }
            }
          }
        }
      }
    ];
  }
})();
