App.service('AuthService', function($q, $http) {
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
})