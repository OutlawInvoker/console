(function() {
  'use strict';

  angular
    .module('app.authentication')
    .controller('Login', Login);

  Login.$inject = ['$q', 'logger', '$http'];

  function Login($q, logger, $http) {
      
    var vm = this;
    vm.title = 'Login';
    vm.user = {};

    activate();

    function activate() {
    }

    vm.login = function() {
      if(!vm.user.username){
       alert('Please provide username');
       return;  
      }

      if(!vm.user.password){
       alert('Please provide password');
       return;  
      }

      $http
      ({
          method: 'POST',
          url: '/api/login',
          data: 'username=' + vm.user.username + '&password=' + vm.user.password,
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      })
      .success(function(user){
        localStorage.setItem('access_token',user.token);
        localStorage.setItem('user',JSON.stringify(user.user));
        window.location = "#/";
      })
      .error(function(error){
      });
    }
  }
})();
