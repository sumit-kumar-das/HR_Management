(function (){
    "use strict";
angular.module('app.password')
        .factory('setPasswordService',setPasswordService)
        .factory('changePasswordService',changePasswordService)
        .factory('changePinService',changePinService)
        .factory('changePasswordPinService',changePasswordPinService)
        .factory('forgotPasswordService',forgotPasswordService)
        .factory('forgotPinService',forgotPinService)
        .factory('forgotPinAndPasswordService',forgotPinAndPasswordService)
        .factory('getTenant',getTenant);
        

setPasswordService.$inject=['$resource','CONSTANT'];
changePasswordService.$inject=['$resource','CONSTANT','$http','$log'];
changePinService.$inject=['$resource','CONSTANT','$http','$log'];
changePasswordPinService.$inject=['$resource','CONSTANT','$http','$log'];
forgotPasswordService.$inject=['$resource','CONSTANT','$log','$http'];
forgotPinService.$inject=['$resource','CONSTANT','$log','$http'];
forgotPinAndPasswordService.$inject=['$resource','CONSTANT','$log','$http'];
getTenant.$inject=['$resource','CONSTANT'];

function setPasswordService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/setPassword', {}, {
        update: {
            method: 'PUT'
        }
    });
};

function changePasswordService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/changePassword/changePassword/:username', { username: '@username' }, {
        update: {
            method: 'PUT'
        }
    });
};

function changePinService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/changePassword/changePin/:username', { username: '@username' }, {
        update: {
            method: 'PUT'
        }
    });
};

function changePasswordPinService($resource,CONSTANT,$http,$log){
    return $resource(CONSTANT.SERVICEURL + '/api/changePassword/changePinPassword/:id', {id : '@userId'}, {
        update: {
            method: 'PUT'
        }
    });
};

function forgotPasswordService($resource,CONSTANT,$log,$http){
    return $resource(CONSTANT.SERVICEURL + '/api/forgotCrendential/resetPassword',{}, {
        update: {
            method: 'PUT'
        },
        GetResponse: {
            method: 'POST',
            responseType: 'text'
//            transformResponse: [function(data, headersGetter) {
//                $log.info(data); // returns true
//                return { response: data };
//            }].concat($http.defaults.transformResponse)
        }
    });
};

function forgotPinService($resource,CONSTANT,$http,$log){
    return $resource(CONSTANT.SERVICEURL + '/api/forgotCrendential/resetPin', {}, {
        update: {
            method: 'PUT'
        
        },
        GetResponse: {
            method: 'POST',
            responseType: 'text'
//            ,
//            transformResponse: [function(data, headersGetter) {
//                $log.info(data); // returns true
//                return { response: data };
//            }].concat($http.defaults.transformResponse)
        }
    });
};

function forgotPinAndPasswordService($resource,CONSTANT,$http,$log){
    return $resource(CONSTANT.SERVICEURL + '/api/forgotCrendential/resetPinPassword', {}, {
        update: {
            method: 'PUT'
        },
        GetResponse: {
            method: 'POST',
            responseType: 'json'
//            transformResponse: [function(data, headersGetter) {
//                $log.info(data); // returns true
//                return { response: data };
//            }]
        }
    });
};
function getTenant($resource,CONSTANT){  
     return $resource(CONSTANT.SERVICEURL + '/api/multiTenant/tenant', {}, {        
    });
}

})();