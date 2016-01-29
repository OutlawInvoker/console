(function() {
  'use strict';

  angular
    .module('app.apps')
    .controller('Apps', Apps);

  Apps.$inject = ['$q', 'dataservice', 'logger'];

  function Apps($q, dataservice, logger) {
      
    var vm = this;
    vm.title = 'Apps';
    vm.apps = [];
    var appId = "";
    
    activate();

    function manipulateDom() {
      if(window.JQuery){
        $('.active').removeClass('active');
        $('#app-menu').addClass('active');
      } else {
        $(function() {
          $('.active').removeClass('active');
          $('#app-menu').addClass('active');
        });
      }
    }

    setTimeout(function(){
      manipulateDom();
    }, 400);

    

    function activate() {
      var promises = [getAllApps()];
      return dataservice.ready(promises).then(function(){
        logger.log('Activated Apps View', vm.title);
      });
    }

    function getAllApps() {
      return dataservice.getAllApps().then(function(data) {
        vm.apps = data;
        return vm.apps;
      });
    }

    vm.openModal = function(id) {
      appId = id;
      $('#myModal').modal();
    }

    vm.deleteApp = function() {
      dataservice.deleteApp(appId).then(function(data) {
        appId = "";
        activate();
        $('#myModal').modal('hide');
      });
    }

    vm.closeModal = function() {
      appId = "";
      $('#myModal').modal('hide');
    }
  }
})();
