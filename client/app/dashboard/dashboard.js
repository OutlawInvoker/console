(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['$q', 'dataservice', 'logger'];

  function Dashboard($q, dataservice, logger) {
      
    var vm = this;
    vm.featured = [];
    vm.title = 'Apps';
    vm.apps = [];
    var classColor = [
      'success',
      'info',
      'warning',
      'danger'
    ];

    if (window.JQuery) {
      $('.carousel').carousel();
      $('.active').removeClass('active');
    }
    else {
      $(function() {
          $('.carousel').carousel();
          $('.active').removeClass('active');
      })
    }

    activate();

    function activate() {
      var promises = [getAllApps()];
      return dataservice.ready(promises).then(function(){
        logger.log('Activated Apps View', vm.title);
        for(var i=0; i<vm.apps.length; i++){
          var randomNumber = rand(0, classColor.length - 1);
          var randomItem = classColor[randomNumber];
          vm.apps[i].classCol = randomItem;
        }
      });
    }

    function getAllApps() {
      return dataservice.getAllApps().then(function(data) {
        vm.apps = data;
      });
    }

    function rand(min, max) {
      var offset = min;
      var range = (max - min) + 1;

      var randomNumber = Math.floor( Math.random() * range) + offset;
      return randomNumber;
    }
  }
})();
