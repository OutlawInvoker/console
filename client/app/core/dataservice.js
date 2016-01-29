(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];
  
  function dataservice($http, $location, $q, exception, logger) {
    var isPrimed = false;
    var primePromise;
    var config = {
      headers: {
        'Authorization': 'Basic '+ localStorage.getItem('access_token')
      }
    };

    var service = {
      getAllApps: getAllApps,
      getSingleApp: getSingleApp,
      postApp: postApp,
      updateApp: updateApp,
      deleteApp: deleteApp,
      getAllServices: getAllServices,
      getSingleService: getSingleService,
      updateService: updateService,
      deleteService: deleteService,
      postService: postService,
      // getAppServices: getAppServices,
      postAppServices: postAppServices,
      ready: ready
    };

    return service;

    /*
     * Methods for Apps
     */
    function getAllApps() {
      return $http.get('/api/apps', {
        headers: {'Authorization': 'Basic ' + localStorage.getItem('access_token')}
      })
      .then(getAppsComplete)
      .catch(function(message) {
        exception.catcher('XHR Failed for getAllApps')(message);
      });

      function getAppsComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function postApp(data) {
      var data = "name=" + data.name + "&description=" + data.description;
      return $http.post('/api/apps', data,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(postAppComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for postApp')(message);
        });

      function postAppComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function getSingleApp(appId) {
      return $http.get('/api/apps/' + appId, {
        headers: {'Authorization': 'Basic ' + localStorage.getItem('access_token')}
      })
      .then(getAppComplete)
      .catch(function(message) {
        exception.catcher('XHR Failed for getAllApps')(message);
      });

      function getAppComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function updateApp(data, appId) {
      var data = "description=" + data.description;
      return $http.post('/api/apps/' + appId, data,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(updateAppComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for updateApp')(message);
        });

      function updateAppComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function deleteApp(appId) {
      return $http.delete('/api/apps/' + appId,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(deleteAppComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for deleteApp')(message);
        });

      function deleteAppComplete(data, status, headers, config) {
        return data.data;
      }
    }

    /*
     * Methods for Services
     */
    function getAllServices() {
      return $http.get('/api/services', {
        headers: {'Authorization': 'Basic ' + localStorage.getItem('access_token')}
      })
      .then(getServicesComplete)
      .catch(function(message) {
        exception.catcher('XHR Failed for getAllApps')(message);
      });

      function getServicesComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function getSingleService(svcId) {
      return $http.get('/api/services/' + svcId, {
        headers: {'Authorization': 'Basic ' + localStorage.getItem('access_token')}
      })
      .then(getServiceComplete)
      .catch(function(message) {
        exception.catcher('XHR Failed for getSingleService')(message);
      });

      function getServiceComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function updateService(data, svcId) {
      var data = "description=" + data.description;
      return $http.post('/api/services/' + svcId, data,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(updateServiceComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for updateService')(message);
        });

      function updateServiceComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function deleteService(svcId) {
      return $http.delete('/api/services/' + svcId,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(deleteServiceComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for deleteService')(message);
        });

      function deleteServiceComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function postService(data) {
      var data = "name=" + data.name + "&description=" + data.description;
      return $http.post('/api/services', data,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(postServiceComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for postApp')(message);
        });

      function postServiceComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function postAppServices (services, appId) {
      return $http.post('/api/apps/' + appId + '/services', services,{
          headers: {
            'Authorization': 'Basic ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(postAppServicesComplete)
        .catch(function(message) {
          exception.catcher('XHR Failed for postAppServices')(message);
        });

      function postAppServicesComplete(data, status, headers, config) {
        return data.data;
      }
    }

    function prime() {
      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);
      return primePromise;

      function success() {
        isPrimed = true;
      }
    }

    ready.$inject = ['nextPromises'];
    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
        .then(function() { return $q.all(nextPromises); })
        .catch(exception.catcher('"ready" function failed'));
    }
  }
})();
