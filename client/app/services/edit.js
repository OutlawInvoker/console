(function() {
  'use strict';

  angular
    .module('app.services')
    .controller('EditService', EditService);

  EditService.$inject = ['$q', 'dataservice', 'logger', '$routeParams'];

  function EditService($q, dataservice, logger, $routeParams) {
      
    var vm = this;
    vm.title = 'Services';
    vm.svc = {};
    
    activate();

    function manipulateDom() {
      if(window.JQuery){
        console.log('jquery loaded');
        $('.active').removeClass('active');
        $('#service-menu').addClass('active');
      } else {
        $(function() {
          $('.active').removeClass('active');
          $('#service-menu').addClass('active');
        });
      }
    }

    setTimeout(function(){
      manipulateDom();
    }, 400);

    function activate() {
      console.log('Create app loaded');
      var promises = [getSingleService()];
      return dataservice.ready(promises).then(function(){
        logger.log('Activated Services View', vm.title);
        console.log(vm.svc);
      });
    }

    function getSingleService() {
      return dataservice.getSingleService($routeParams.id).then(function(data) {
        vm.svc = data[0];
        return vm.svc;
      });
    }

    vm.cancel = function() {
      window.location = "#/services";
    }

    vm.save = function() {
      console.log(vm.svc);
      dataservice.updateService(vm.svc, $routeParams.id).then(function(data){
        console.log(data);
        window.location = "#/services";
      });
    }
  }
})();
