(function (){
    "use strict";
angular.module('app.user')
        .config(function($stateProvider) {
        $stateProvider
        .state('manageUser',{
            url:'/User/manageUser',
            templateUrl:'views/User/manageUser.html',
            controller:'UserController',
            resolve: {
//                permission: function (AuthorizationService,CONSTANT) {
//                      return AuthorizationService.permissionCheck(CONSTANT.ROLESFORDCADMIN);
//                },
                countryListServiceResolvePromise :function (countryListService){
                    return countryListService.setCountries();
                }
            }
        });
    });
})();

