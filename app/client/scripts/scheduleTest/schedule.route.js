(function (){
    "use strict";
angular.module('app.schduleTest')
        .config(function($stateProvider) {
        $stateProvider
        .state('schedule',{
            url:'/scheduleTest/schedule',
            templateUrl:'views/scheduleTest/schedule.html',
            controller:'ScheduleTestController',
        });
    });
})();

