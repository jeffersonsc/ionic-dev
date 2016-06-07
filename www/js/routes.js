App.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })

    .state('main',{
      url: '/',
      abstract: true,
      templateUrl: 'views/main.html'
    })

    .state('main.dash', {
      url: 'main/dash',
      views: {
        'dash-tab':{
          templateUrl: 'views/dashboard.html',
          controller: 'DashboadController'
        }
      }
    })

    .state('main.public', {
      url: 'main/public',
      views: {
        'public-tab': {
          templateUrl: 'views/public.html'
        }
      }
    })

     .state('main.admin', {
      url: 'main/admin',
      views: {
        'admin-tab': {
          templateUrl: 'views/admin.html'
        }
      }
    })

  $urlRouterProvider.otherwise(function($injector, $location){
    var $state = $injector.get('$state');
    $state.go('main.dash');
  })
})