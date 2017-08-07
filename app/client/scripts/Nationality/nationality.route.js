(function (){
    "use strict";
angular.module('app.nationality')
        .config(function($stateProvider) {
        $stateProvider
        .state('nationality',{
            url:'/Nationality/nationalityDetails',
            templateUrl:'views/Nationality/nationality.html',
            controller:'NationalityController',
        });
    });
})();

