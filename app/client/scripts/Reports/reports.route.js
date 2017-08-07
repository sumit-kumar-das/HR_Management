(function (){
    "use strict";
angular.module('app.reports')
        .config(function($stateProvider) {
        $stateProvider
        .state('Reports',{
            url:'/Reports',
            templateUrl:'views/Reports/Report.html',
            controller:'ReportController'
        }).state('TestResult',{
            url:'Reports/TestResult',
            templateUrl:'views/Reports/TestResult.html',
            controller:'ReportController'
        });
    });
})();

