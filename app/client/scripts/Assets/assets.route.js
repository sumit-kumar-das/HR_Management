(function (){
    "use strict";
angular.module('app.assetsList')
        .config(function($stateProvider) {
        $stateProvider
        .state('company',{
            url:'/master/company',
            templateUrl:'views/Assets/asset.html',
            controller:'AssetsController'
        });
    });
})();

