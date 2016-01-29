(function() {
  'use strict';

  angular
    .module('app.appservices')
    .controller('AppService', AppService);

  AppService.$inject = ['$q', 'dataservice', 'logger', '$routeParams'];

  function AppService($q, dataservice, logger, $routeParams) {
      
    var vm = this;
    vm.title = 'App & Services';
    vm.app = {};
    vm.services = [];
    vm.allChecked = false;
    vm.count = 0;

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

    activate();

    function activate() {
      var promises = [getSingleApp(), getAllServices()];
      return dataservice.ready(promises).then(function(){
        logger.log('Activated Apps View', vm.title);
        checkExistingServices();
      });
    }

    function getSingleApp() {
      return dataservice.getSingleApp($routeParams.id).then(function(data) {
        vm.app = data[0];
        return vm.app;
      });
    }

    function getAllServices() {
      return dataservice.getAllServices().then(function(data) {
        vm.services = data;
        for(var i=0; i<vm.services.length; i++){
          vm.services[i].checked = false;
        }
        return vm.services;
      });
    }

    function checkExistingServices () {
      for(var i=0; i<vm.app.services.length; i++){
        var found = 0;
        var index = -1;
        for(var j=0; j<vm.services.length; j++){
          if(vm.app.services[i] == vm.services[j]._id){
            found = 1;
            index = j;
          }
        }
        if(found == 1){
          vm.services[index].checked = true;
          vm.areAllChecked(vm.services[index].checked);
        }
      }
    }

    vm.areAllChecked = function(svc) {
      if(svc){
        vm.count++;
      }
      if(!svc && vm.count > 0){
        vm.count--;
      }
      if(vm.count == vm.services.length){
        vm.allChecked = true;
      } else {
        vm.allChecked = false;
      }
    }

    vm.checkAll = function() {
      if(vm.allChecked){
        for(var i=0; i<vm.services.length; i++){
          vm.services[i].checked = true
        }
      } else {
        for(var i=0; i<vm.services.length; i++){
          vm.services[i].checked = false
        }
        vm.count = 0;
      }
    }

    vm.save = function() {
      var data = "";
      for(var i=0; i<vm.services.length; i++){
        if(vm.services[i].checked == true){
          data = data + "service=" + vm.services[i]._id + "&";
        }
      }
      var res = data.substring(0, data.length - 1);
      dataservice.postAppServices(res, $routeParams.id).then(function(result){
        window.location = "#/apps";
      });
    }

  }
})();
