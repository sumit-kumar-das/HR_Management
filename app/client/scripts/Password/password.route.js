(function (){
    "use strict";
angular.module('app.password')
        //Setting the password
        .config(function($stateProvider) {
        $stateProvider
        .state('setPassword',{
            url:'/Password/setPassword',
            templateUrl:'views/Password/setPassword.html',
            controller:'SetPasswordController'
        })
        .state('changePassword',{
            url:'/Password/changePassword',
            templateUrl:'views/Password/changePassword.html',
            controller:'ChangePasswordController'
//            ,
//            resolve: {
//                permission: function (AuthorizationService,CONSTANT) {
//                            return AuthorizationService.permissionCheck(CONSTANT.ROLES);
//                }
//            }
        })
        .state('changePasswordPin',{
            url:'/Password/changePasswordPin',
            templateUrl:'views/Password/changePasswordPin.html',
            controller:'ChangePasswordPinController'
        })
        .state('forgotPin',{
            url:'/Password/forgotPin',
            templateUrl:'views/Password/forgotPin.html',
            controller:'ForgotPinController'
        })
        .state('forgotPassword',{
            url:'/Password/forgotPassword',
            templateUrl:'views/Password/forgotPassword.html',
            controller:'ForgotPasswordController'
        })
        .state('forgotPinPassword',{
            url:'/Password/forgotPinPassword',
            templateUrl:'views/Password/forgotPinPassword.html',
            controller:'ForgotPinpasswordController'
        });
    });
})();

