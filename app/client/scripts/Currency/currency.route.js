(function (){
    "use strict";
angular.module('app.currency')
        .config(function($stateProvider) {
        $stateProvider
        .state('currency',{
            url:'/Currency/currencyDetails',
            templateUrl:'views/currency/currency.html',
            controller:'CurrencyController',
        });
    });
})();

