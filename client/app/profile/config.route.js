(function() {
  'use strict';

  angular
    .module('app.profile')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [
      {
        url: '/profile',
        config: {
          templateUrl: 'app/profile/index.html',
          controller: 'Profile',
          controllerAs: 'vm',
          title: 'Profile',
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
