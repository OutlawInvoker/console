(function() {
  'use strict';

  angular
    .module('app.services')
    .controller('Services', Services);

  Services.$inject = ['$q', 'dataservice', 'logger'];

  function Services($q, dataservice, logger) {
      
    var vm = this;
    vm.title = 'Services';
    vm.services = [];
    var svcId = "";
    activate();

    function manipulateDom() {
      if(window.JQuery){
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
      vm.services = [];
      var promises = [getAllServices()];
      return dataservice.ready(promises).then(function(){
        logger.log('Activated Apps View', vm.title);
        console.log(vm.services);
      });
    }

    function getAllServices() {
      return dataservice.getAllServices().then(function(data) {
        vm.services = data;
        return vm.services;
      });
    }

    vm.openModal = function(id) {
      svcId = id;
      $('#mySvcModal').modal();
    }

    vm.deleteService = function() {
      dataservice.deleteService(svcId).then(function(data) {
        svcId = "";
        activate();
        $('#mySvcModal').modal('hide');
      });
    }

    vm.closeModal = function() {
      svcId = "";
      $('#mySvcModal').modal('hide');
    }
  }
})();
