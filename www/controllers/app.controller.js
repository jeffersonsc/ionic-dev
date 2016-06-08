App.controller('AppController', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username;

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
    var alertPopup = $ionicPopup.alert({
      title: 'Not authorized',
      template: 'You not authorized!'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Not authenticated',
      template: 'You not authenticated.'
    });
  });

  $scope.setCurrentUsername = function(name){
    $scope.username = name;
  };
})