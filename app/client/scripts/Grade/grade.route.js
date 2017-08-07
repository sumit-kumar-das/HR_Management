(function (){
    "use strict";
angular.module('app.grade')
        .config(function($stateProvider) {
        $stateProvider
        .state('grade',{
            url:'/Grade/gradeDetails',
            templateUrl:'views/Grade/grade.html',
            controller:'GradeController',
        });
    });
})();

