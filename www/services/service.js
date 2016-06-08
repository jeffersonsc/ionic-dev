App
  .service('AuthService', function($q, $http) {
    var LOCAL_TOKEN_KEY = 'token';
    var username = '';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials(){
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token){
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      username = token.split('.')[0];
      isAuthenticated = true;
      authToken = token;

      setHttpHeader(token);
    }

    function destroyUserCredentials(token) {
      authToken = undefined;
      username = '';
      isAuthenticated = false
      setHttpHeader(authToken);
      window.localStorage.removeItem(LOCAL_TOKEN_KEY)
    }

    function setHttpHeader(token){
       // Set the token as header for your requests!
      $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    var login = function(email, password){
      return $q(function(resolve, reject) {
        //Use $http for request server to session login
        if (email === 'teste@teste.com' && password === '12345678') {
          storeUserCredentials(email + 'hsddsjhdhgaaseuqrheohcdb');
          resolve('Login Success!')
        }else(
          reject('')
        )
      })
    }

    var logout = function(){
      destroyUserCredentials();
    }

    return {
      login: login,
      logout: logout,
      isAuthenticated: function() { return isAuthenticated; },
      username: function() { return username; }
    }
  })

  .factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS){
    return {
      responseError: function(response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }, [response.status], response);
        return $q.reject(response);
      }
    };
  })