//(function (){
//    "use strict";
//angular.module('app.dcadmindashboard')
//        .config(function($stateProvider) {
//        $stateProvider
//        .state('dashboard', {
//                      url: '/dashboard',
//                      templateUrl:'views/dashboard.html',
//                      controller:'DashboardController'
//                      ,
//                      resolve: {
//                          permission: function (AuthorizationService,CONSTANT) {
//                                return AuthorizationService.permissionCheck(CONSTANT.ROLES);
//                            }
//                            ,
//                          countryServ :function (countryService){
//                              return countryService.setCountries();
//                            },
//                          dispatchRegionService :function (dispatchRegionService){
//                              return dispatchRegionService.setDispatchRegions();
//                            }
//                      }
//                })
//        ;
//    });
//})();
//
