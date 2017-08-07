(function (){
    "use strict";
angular.module('app.cunsultant')
        .config(function($stateProvider) {
        $stateProvider
        .state('cunsultant',{
            url:'/Consultant/cunsultantDetails',
            templateUrl:'views/Consultant/consultant.html',
            controller:'CunsultantController',
        });
    });
})();

