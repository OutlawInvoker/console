(function() {
  'use strict';

  angular
    .module('app.services')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/services',
        config: {
          templateUrl: 'app/services/index.html',
          controller: 'Services',
          controllerAs: 'vm',
          title: 'Services',
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
        url: '/services/create',
        config: {
          templateUrl: 'app/services/create.html',
          controller: 'CreateService',
          controllerAs: 'vm',
          title: 'Create Service',
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
        url: '/services/:id',
        config: {
          templateUrl: 'app/services/edit.html',
          controller: 'EditService',
          controllerAs: 'vm',
          title: 'Update Service',
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
