(function() {
  'use strict';

  angular
    .module('app.services')
    .controller('CreateService', CreateService);

  CreateService.$inject = ['$q', 'dataservice', 'logger'];

  function CreateService($q, dataservice, logger) {
      
    var vm = this;
    vm.title = 'Create Service';
    vm.svc = {};
    
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
      console.log('Create service loaded');
    }

    vm.cancel = function() {
      window.location = "#/services";
    }

    vm.save = function() {
      dataservice.postService(vm.svc).then(function(data){
        console.log(data);
        window.location = "#/services";
      });
    }
  }
})();
