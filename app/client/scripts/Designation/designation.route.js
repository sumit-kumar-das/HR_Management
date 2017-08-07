(function (){
    "use strict";
angular.module('app.designation')
        .config(function($stateProvider) {
        $stateProvider
        .state('designation',{
            url:'/Designation/designationDetails',
            templateUrl:'views/Designation/designation.html',
            controller:'DesignationController',
        });
    });
})();

