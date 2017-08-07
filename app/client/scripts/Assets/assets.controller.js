(function () {
    "use strict";

    angular.module('app.assetsList')
            .controller('AssetsController', AssetsController);
         

    AssetsController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT', 'logger', 'MESSAGE', '$q','GLOBAL','$modal','getCompanyDetails'];
    function AssetsController($scope, userService, $filter, $log, CONSTANT,
              logger, MESSAGE, $q,GLOBAL,$modal,getCompanyDetails) {
      $scope.editflag=false;
      $scope.editGradeFlag = false;
      $scope.companyDetails = [];
      $scope.editCompany = function (){
          $scope.editflag = true;
      }; 
      $scope.cancelEditCompany = function (){
          $scope.editflag = false;
      };
       getCompanyDetails.query().$promise.then(function (data) {
            $log.debug("SiteController: Successfully get the Site Details");
            $scope.companyDetails = data;
            console.log("SiteController :"+angular.toJson($scope.companyDetails));
            $scope.pageLoader = false;
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("SiteController: " + error.statusText);
        });
                               
    };
})();