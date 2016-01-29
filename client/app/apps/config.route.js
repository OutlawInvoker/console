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
        url: '/apps',
        config: {
          templateUrl: 'app/apps/index.html',
          controller: 'Apps',
          controllerAs: 'vm',
          title: 'Apps',
          resolve: {
            token: function() {
              if(!localStorage.getItem('access_token')){
                localStorage.clear();
                window.location = "#/login";
              }
            }
          }
        }
      },
      {
        url: '/apps/create',
        config: {
          templateUrl: 'app/apps/create.html',
          controller: 'CreateApp',
          controllerAs: 'vm',
          title: 'Create App',
          resolve: {
            token: function() {
              if(!localStorage.getItem('access_token')){
                localStorage.clear();
                window.location = "#/login";
              }
            }
          }
        }
      },
      {
        url: '/apps/:id',
        config: {
          templateUrl: 'app/apps/edit.html',
          controller: 'EditApp',
          controllerAs: 'vm',
          title: 'Update App',
          resolve: {
            token: function() {
              if(!localStorage.getItem('access_token')){
                localStorage.clear();
                window.location = "#/login";
              }
            }
          }
        }
      },
    ];
  }
})();
