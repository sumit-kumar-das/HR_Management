(function (){
    "use strict";

angular.module('app.account')
        .factory('serviceUrl',serviceUrl)
        .factory('tokenStorage',tokenStorage)
        .factory('tokenAuthInterceptor',tokenAuthInterceptor)
        .factory('sessionService',sessionService)
        .factory('sendEmailForForgotCredentialService',sendEmailForForgotCredentialService)
        .factory('getTenant',getTenant);

serviceUrl.$inject=['$resource','CONSTANT'];
tokenStorage.$inject=[];
tokenAuthInterceptor.$inject=['$q','tokenStorage'];
sessionService.$inject=['$resource','$state','$http','tokenStorage','logger','$log','CONSTANT','NAVCONSTANT'];
sendEmailForForgotCredentialService.$inject=['$resource','CONSTANT'];
getTenant.$inject=['$resource','CONSTANT'];

function serviceUrl($resource,CONSTANT){  
     return $resource(CONSTANT.SERVICEURL + '/api/login', {}, {
        loginPost: {
            method:'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
    });
}

function getTenant($resource,CONSTANT){  
     return $resource(CONSTANT.SERVICEURL + '/api/multiTenant/tenant', {}, {        
    });
}

function tokenStorage(){
    var storageKey = "tokan-key";
    
    return{
      store: function (tokan){
          return localStorage.setItem(storageKey,tokan);
      },
      retrive:function (){
          return localStorage.getItem(storageKey);
      },
      clear: function (){
          localStorage.removeItem("userRole");
          return localStorage.removeItem(storageKey);
      }
    };
}

function tokenAuthInterceptor ($q,tokenStorage){

    return {
      request: function (config){
//            if(navigator.onLine){ // to check internet connection
//                
//            }
            var authTokan = tokenStorage.retrive();
            if(authTokan)
            {
                config.headers['X-AUTH-TOKEN'] = authTokan;
            }
            return config;
      },
      requestError :function (error){
          if(error.status === 401 || error.status === 403 )
          {
              tokenStorage.clear();
//              $state.go('signin');
          }
          $q.reject(error);
      }
//      ,responseError: function(response) {
//            // Session has expired
//            var deferred = $q.defer();
//            if (response.status === 403){
//                deferred.reject();
//            }else {
//                deferred.resolve();
//            }
//            return deferred.promise;
//        }
      
    };

};

function sessionService($resource,$state,$http,tokenStorage,logger,$log,CONSTANT,NAVCONSTANT){

        var user={};
        var session ={};
        
        return {
            login:login,
            logout:logout,
            isLoggedIn:isLoggedIn,
            getUserRole:getUserRole,
            loginstatus:loginstatus,
            user:user
        };
        function login(data){
//            var url = window.location;
//            var competeUrl = url.toString();
//            var urls = competeUrl.split('/');
//            var tenantUrl = urls[2].split('.');
//            var tenant = tenantUrl[0].toString();
//            tokenStorage.clear();
//            var userData = data;
//            var username = userData.username;
//            userData.username = "testris" + "#"+ username;
////            if(tenant === "")
////            {
////                userData.username = "zcon" + "#"+ username;
////            }else {
////                userData.username = tenant + "#"+ username;
////            }
//            $http.post(CONSTANT.SERVICEURL +  "/api/login",{username:userData.username,password:userData.password},{
//                 headers: {'Content-Type': 'text/plain'}                
//                }).success(function (result, status, headers) {
//                    
//                        tokenStorage.store(headers('X-AUTH-TOKEN'));
//                        var user = JSON.parse(atob(tokenStorage.retrive().split('.')[0]));
//                        localStorage.setItem("userRole",user.authorities[0].authority);
//                        var role  = user.authorities[0].authority;
//                        if(role === CONSTANT.SADMIN){
//                            $state.go("manageTenant");
//                        }else  if (role === CONSTANT.DCADMIN){
//                            $state.go("dashboard");
//                        }else {
//                            $state.go("manageRequisition");
//                        }
//                        logger.logSuccess('Successfully logged in !!');
//                }).error(function (error,status) {
//                    
//                        if(error.status === 307)
//                        {
//                            $state.go("signin");
//                            
//                        }else if(status === 304)
//                        {
//                            logger.logSuccess("Please set your new password and your pin");
//                            $state.go("setPassword");
//                            
//                        }else if(error.status === 406)
//                        {
//                            
//                        }else if(error.status === 417)
//                        {
//                            
//                        }
//                });           
            };
            function logout(){
                tokenStorage.clear();
                session.loginstatus = false;
                NAVCONSTANT.PATIENTID = null;
                NAVCONSTANT.CASEID = null;
                NAVCONSTANT.REQUISITIONLIST = true;
                NAVCONSTANT.PROVIDERLIST = true;
                NAVCONSTANT.FACILITYLIST = false;
                NAVCONSTANT.REQUISITIONVIEW = false;
                NAVCONSTANT.REQUISITIONEDIT = false;
                CONSTANT.PROFILEURL = "";
                CONSTANT.DISPLAYNAME = "";
                CONSTANT.PROFILEPATH = "";
                $state.go("signin");
            };
            function isLoggedIn(){
//                if(tokenStorage.retrive() !== null)
//                {
//                    session.loginstatus = true;
//                }
//                else
//                {
//                    session.loginstatus = false;
//                }
                return session.loginstatus;
            };
            function getUserRole(){

                return  localStorage.getItem("userRole");
            };
            function loginstatus(){
              return session.loginstatus;  
            };
};

function sendEmailForForgotCredentialService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/forgotCrendential/sendMail', {}, {
        update: {
            method: 'PUT'
        }
    });
};

})();