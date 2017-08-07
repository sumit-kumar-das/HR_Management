(function (){
    "use strict";
angular.module('app.department')
        .config(function($stateProvider) {
        $stateProvider
        .state('department',{
            url:'/Department/departmentDetails',
            templateUrl:'views/department/department.html',
            controller:'DepartmentController',
        });
    });
})();

