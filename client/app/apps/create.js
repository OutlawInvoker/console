(function() {
  'use strict';

  angular
    .module('app.apps')
    .controller('CreateApp', CreateApp);

  CreateApp.$inject = ['$q', 'dataservice', 'logger'];

  function CreateApp($q, dataservice, logger) {
      
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
    }

    vm.cancel = function() {
      window.location = "#/apps";
    }

    vm.save = function() {
      dataservice.postApp(vm.app).then(function(data){
        window.location = "#/apps";
      });
    }
  }
})();
