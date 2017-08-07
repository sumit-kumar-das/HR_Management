(function (){
    "use strict";
angular.module('app.contractor')
        .config(function($stateProvider) {
        $stateProvider
        .state('contractor',{
            url:'/Contractor/contractorDetails',
            templateUrl:'views/Contractor/contractor.html',
            controller:'ContractorController',
        });
    });
})();

