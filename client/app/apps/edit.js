(function() {
  'use strict';

  angular
    .module('app.apps')
    .controller('EditApp', EditApp);

  EditApp.$inject = ['$q', 'dataservice', 'logger', '$routeParams'];

  function EditApp($q, dataservice, logger, $routeParams) {
      
    var vm = this;
    vm.title = 'Apps';
    vm.app = {};
    
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
      var promises = [getSingleApp()];
      return dataservice.ready(promises).then(function(){
        logger.log('Activated App Services View', vm.title);
      });
    }

    function getSingleApp() {
      return dataservice.getSingleApp($routeParams.id).then(function(data) {
        vm.app = data[0];
        return vm.app;
      });
    }

    vm.cancel = function() {
      window.location = "#/apps";
    }

    vm.save = function() {
      dataservice.updateApp(vm.app, $routeParams.id).then(function(data){
        window.location = "#/apps";
      });
    }
  }
})();
