(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('Profile', Profile);

  Profile.$inject = ['$q', 'dataservice', 'logger'];

  function Profile($q, dataservice, logger) {
      
    var vm = this;
    vm.title = 'Profile';
    vm.user = {};
    vm.apps = [];
    vm.services = [];
    
    activate();  

    function activate() {
      var promises = [getAllApps(), getAllServices()];
      return dataservice.ready(promises).then(function(){
        vm.user = JSON.parse(localStorage.getItem('user'));
      });
    }

    function getAllApps() {
      return dataservice.getAllApps().then(function(data) {
        vm.apps = data;
        return vm.apps;
      });
    }

    function getAllServices() {
      return dataservice.getAllServices().then(function(data) {
        vm.services = data;
        return vm.services;
      });
    }

  }
})();
