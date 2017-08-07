(function (){
    "use strict";
    angular.module('app.activateaccount')
        .controller('ActivateAccountController',ActivateAccountController);

ActivateAccountController.$inject =['activateAccountService','$state','$scope','getTenant','GLOBAL'];

function ActivateAccountController(activateAccountService,$state,$scope,getTenant,GLOBAL){
    
    var url = window.location;
            var competeUrl = url.toString();
            var urls = competeUrl.split('/');
            var tenantUrl = urls[2].split('.');
            var tenant = tenantUrl[0].toString();
            getTenant.save({"tenantUrlName": tenant}).$promise.then(function (data) {
                GLOBAL.TENANTNAME = data.tenantDatabaseName;
            }).catch(function (error) {
                throw new Error(error.statusText);
            });
            //GLOBAL.TENANTNAME = tenant;
    
    $scope.Activate = function (loginStatus){
        if(!loginStatus)
        {
            alert('username and password is required');
            
        }else{
                var account = angular.copy($scope.account);
                activateAccountService.Activate(account);
        }

    };
    
  };
})();


