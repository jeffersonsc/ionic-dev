App.service('LoginService', function($q) {
  return {
    loginUser: function(email, password){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (email == 'teste@teste.com' && password == '12345678'){
        deferred.resolve('Bem vindo '+ email + '!');
      }else{
        deferred.reject('Invalid email or password!');
      }

      promise.success = function(fn){
        promise.then(fn);
        return promise
      }

      promise.error = function(fn){
        promise.then(null, fn);
        return promise
      }

      return promise
    }
  }
})