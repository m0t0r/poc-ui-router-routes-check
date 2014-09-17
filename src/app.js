"use strict";

angular.module("myApp",["ui.router"])
  .config(function($stateProvider) {
    $stateProvider
      .state('index', {
        url: "/",
        templateUrl:"src/templates/index.html",
        controller:'IndexCtrl'
      })
      .state('admin', {
        url: "/admin",
        templateUrl:"src/templates/admin.html",
        controller:'AdminCtrl',
        resolve:{
          routeCheck:function($state,SecurityManager) {
            SecurityManager.validateRoute('admin').then(function(result) {
              if(result) return true;
            }, function(reason) {
              if(reason){
                console.log(reason);
                $state.go('index');
              }
            })
          }
        }
      });
  });

angular.module("myApp").factory('SecurityManager', function($q) {

    var _role = null;

    return {
      setRole: function(role) {
         _role = role;
      },

      getRole:function() {
        return _role;
      },

      validateRoute:function(role) {
        var deferred = $q.defer();
        if(this.getRole() === role){
          deferred.resolve(true);
        } else {
          deferred.reject('no_authorized');
        }
        return deferred.promise;
      }

    }

  });





// Controllers
angular.module("myApp")
  .controller('IndexCtrl', function($scope, SecurityManager) {
    $scope.page = "I am index";
    $scope.signined = false;
    $scope.user = {
      username:'',
      password:'',
      role:'user'
    };

    $scope.signin = function() {
        if($scope.user && $scope.user.username && $scope.user.password) {
          if($scope.user.username === "user" && $scope.user.password === "user"){
            SecurityManager.setRole('user');
            $scope.user.role = 'user';
            $scope.signined = true;
          } else if ($scope.user.username === "admin" && $scope.user.password === "admin") {
            SecurityManager.setRole('admin');
            $scope.user.role = 'admin';
            $scope.signined = true;
          }

        }
    }

  })
  .controller('AdminCtrl', function($scope, SecurityManager) {
    $scope.page = "I am ADMIN!!!"
    $scope.user = {
      role:SecurityManager.getRole()
    };

  });