(function (){
    "use strict";
angular.module('app.holiday')
        .config(function($stateProvider) {
        $stateProvider
        .state('holiday',{
            url:'/Holiday/holidayDetails',
            templateUrl:'views/Holiday/holiday.html',
            controller:'HolidayController',
        });
    });
})();

