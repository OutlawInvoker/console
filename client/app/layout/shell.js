(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['$timeout', 'config', 'logger', 'AdminLTEOptions'];

  function Shell($timeout, config, logger, AdminLTEOptions) {
      
    var vm = this;

    vm.title = config.appTitle;
    vm.busyMessage = 'Please wait ...';
    vm.isBusy = true;
    vm.showSplash = true;
    vm.isCollapsed = false;

    activate();

    function activate() {
      // Using a resolver on all routes or dataservice.ready in every controller
      // dataservice.ready().then(function(){
      //     hideSplash();
      // });
      vm.currentUser = JSON.parse(localStorage.getItem('user'));
      hideSplash();
    };

    function hideSplash() {
      //Force a 1 second delay so we can see the splash.
      $timeout(function() {
          vm.showSplash = false;
      }, 1000);
    }

    vm.signout = function() {
      localStorage.clear();
      window.location = "#/login";
    }
  }
})();
