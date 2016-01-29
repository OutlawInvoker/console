(function() {
  'use strict';

  angular
    .module('app.appservices')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/apps/:id/services',
        config: {
          templateUrl: 'app/appservices/index.html',
          controller: 'AppService',
          controllerAs: 'vm',
          title: 'App & Service',
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
