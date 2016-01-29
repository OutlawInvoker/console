(function() {
  'use strict';

  angular
    .module('app.authentication')
    .controller('Signup', Signup);

  Signup.$inject = ['$q', 'logger', '$http'];

  function Signup($q, logger, $http) {
      
    var vm = this;
    vm.title = 'Signup';
    vm.user = {};
    
    activate();

    function activate() {
    }

    vm.signup = function() {
      if(!vm.user.username){
       alert('Please provide username');
       return;  
      }

      if(!vm.user.password){
       alert('Please provide password');
       return;  
      }

      var data = "";
      data = data + "firstname=" + vm.user.firstname;
      data = data + "&lastname=" + vm.user.lastname;
      data = data + "&email=" + vm.user.email;
      data = data + "&username=" + vm.user.username;
      data = data + "&password=" + vm.user.password;

      $http
      ({
          method: 'POST',
          url: '/api/users',
          data: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
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
