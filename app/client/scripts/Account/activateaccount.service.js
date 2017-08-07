(function () {
    "use strict";

    angular.module('app.activateaccount')
            .factory('serviceUrl', serviceUrl)
            .factory('activateAccountService', activateAccountService)
            .factory('getTenant',getTenant);

    serviceUrl.$inject = ['$resource', 'CONSTANT'];
    activateAccountService.$inject = ['$resource', '$state', '$http', 'logger', '$log', 'CONSTANT', 'serviceUrl', 'tokenStorage','GLOBAL'];
    getTenant.$inject = ['$resource', 'CONSTANT']

    function serviceUrl($resource, CONSTANT) {
        return $resource(CONSTANT.SERVICEURL + '/api/activateAccount', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
    function getTenant($resource,CONSTANT){  
                return $resource(CONSTANT.SERVICEURL + '/api/multiTenant/tenant', {}, {
                });
    }

    function activateAccountService($resource, $state, $http, logger, $log, CONSTANT, serviceUrl, tokenStorage,GLOBAL) {

        return {
            Activate: Activate
        };
        
        function Activate(data) {
//            var url = window.location;
//            var competeUrl = url.toString();
//            var urls = competeUrl.split('/');
//            var tenantUrl = urls[2].split('.');
//            var tenant = tenantUrl[0].toString();
//            GLOBAL.TENANTNAME = tenant;
            var userData = data;
            var username = userData.username;
            userData.username = GLOBAL.TENANTNAME + "#"+ username + "#1234";            
//            if (tenant === "")
//            {
//                userData.username = GLOBAL.TENANTNAME + "#" + username;
//            } else {
//                userData.username = GLOBAL.TENANTNAME + "#" + username;
//            }
            localStorage.removeItem("userRole");
            tokenStorage.clear();
            // To get exception for activate account
            $http.post(CONSTANT.SERVICEURL + "/api/login", {username: userData.username, password: userData.password}, {
                headers: {'Content-Type': 'text/plain'}
            }).success(function (result, status, headers) {
                logger.logError('Error While activating account !!');
            }).error(function (error, status) {
                // To enable activate account flag 
                if (status === 503)
                {
                    
                    $http.post(CONSTANT.SERVICEURL + "/api/activateAccount", {
                        username: userData.username
                    }).success(function (result, status, headers) {
                        CONSTANT.ACTIVATEFLAG = true;
                        $http.post(CONSTANT.SERVICEURL + "/api/login", {
                            username: userData.username, 
                            password: userData.password}, {
                                headers: {'Content-Type': 'text/plain'}
                        }).success(function (result, status, headers) {
                                logger.logError('Error While activating account !!');
                        }).error(function (error, status) {
                                if(status === 501)
                                {
//                                    $http.post(CONSTANT.SERVICEURL + "/api/login", {username: userData.username, password: userData.password}, {
//                                        headers: {'Content-Type': 'text/plain'}
//                                    }).success(function (result, status, headers) {
//                                            logger.logSuccess("Your account is enable now !! Please set your new password and your pin");
//                                            $state.go("setPassword");
//                                    }).error(function (){
//                                            logger.logError("Error while setting account expiry");
//                                    });
                                    logger.logSuccess("Your account is enable now !! Please set your new password and your pin");
                                    $state.go("setPassword");
                                }
                            });
                    }).error(function (error) {
                        alert("error in activating the account");
                    });

                } else if (error.status === 501)
                {
                    $http.post(CONSTANT.SERVICEURL + "/api/login", {username: userData.username, password: userData.password}, {
                        headers: {'Content-Type': 'text/plain'}
                    }).success(function (result, status, headers) {
                            logger.logSuccess("Your account is enable now !! Please set your new password and your pin");
                            $state.go("setPassword");
                    }).error(function (){
                            logger.logError("Error while setting account expiry");
                    });
                } else if (status === 406)
                {

                } else if (status === 417)
                {

                }else if (status === 502)
                {
                    alert('Your account is already activated !! please login');
                    $state.go("signin");
                }
            }); 
        };
    };
})();