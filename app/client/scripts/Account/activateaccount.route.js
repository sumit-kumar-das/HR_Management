(function (){
    "use strict";
angular.module('app.activateaccount').config(function($stateProvider) {
        $stateProvider
        .state('activateaccount', {
                url:'/Account/activateAccount',
                templateUrl: 'views/Account/activateAccount.html',
                controller:'ActivateAccountController'
        });
    }).run(function ($state){
//        $state.go('signin');
    });
})();


