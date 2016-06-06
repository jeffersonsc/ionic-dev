App.controller('SessionController', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function(){
    LoginService.loginUser($scope.data.email, $scope.data.password)
      .success(function(data){
        $state.go('home');
      })
      .error(function(data){
        var alertPopup = $ionicPopup.alert({
          title: 'Error login',
          template: 'Error: invalid email or password!'
        });
      });
  }

  $scope.signin = function(){
    $state.go('signin');
  }
})