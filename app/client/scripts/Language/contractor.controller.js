(function () {
    "use strict";

    angular.module('app.contractor')
            .controller('ContractorController', ContractorController);


    ContractorController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getContractorDetails','addContractorDetails','deleteContractors','changeContractorStatus','getBroadGroupList','editContractor'];

    function ContractorController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getContractorDetails,addContractorDetails,deleteContractors,changeContractorStatus,getBroadGroupList,editContractor) {
        $log.info("ContractorController initiated");
	$scope.format = 'MM-dd-yyyy';
        $scope.pageLoader = true;
        $scope.currentdate = new Date();
        $scope.inputParams ={};
        $scope.upadateParams = {};
        $scope.today = function ()
        {
            $scope.startDate = new Date();
        };
        $scope.clear = function ()
        {
            $scope.startDate = new Date();
        };
        $scope.opensd = function ($event)
        {
            $event.preventDefault();
            $event.stopPropagation();
            return $scope.openedsd = true;
        };
        $scope.opened = function ($event)
        {
            $event.preventDefault();
            $event.stopPropagation();
            return $scope.openeded = true;
        };
        $scope.editContractorFlag = false;
        $scope.updateContractorFlag = false;
        $scope.statusTypesList = [{statusId:true,statusName : 'Active'},{statusId: false,statusName: '	DeActive'}];
        $scope.addContractors = function(){
                $scope.editContractorFlag = true;
                $scope.updateContractorFlag = false;
        };
        $scope.cancelContractorForm = function(){
                $scope.editContractorFlag = false;
                $scope.updateContractorFlag = false;
        };
        $scope.editContractorDetails =  function(data){
            console.log("Sumit == "+data.HoliDayStatus);
                $scope.editContractorFlag = true;
                $scope.updateContractorFlag = true;
                $scope.upadateParams.ContractorId = data.ContractorId;
                $scope.inputParams.Code = data.Code;
                $scope.inputParams.Name = data.Name;
                $scope.inputParams.address = data.Address;
                $scope.inputParams.ContractFromDate = data.ContractFrom;
                $scope.inputParams.ContractTillDate = data.ContractTill;
                $scope.inputParams.Notes = data.Note;
                $scope.inputParams.IsActive = data.HoliDayStatus;
        };
        $scope.saveContractorDetails = function(){
            console.log($scope.inputParams);
            addContractorDetails.query({
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Address:$scope.inputParams.address ? $scope.inputParams.address:"",
                  ContractFromDate:$scope.inputParams.ContractFromDate ? $scope.inputParams.ContractFromDate:"",
                  ContractTillDate:$scope.inputParams.ContractTillDate ? $scope.inputParams.ContractTillDate:"",
                  Notes:$scope.inputParams.Notes ? $scope.inputParams.Notes:"",
                  IsActive: $scope.inputParams.IsActive ? $scope.inputParams.IsActive:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.contractorDetails = responseObjects;
                          $scope.editContractorFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.contractorDetails));
                          $log.debug("ContractorContrlloer OnViewFilter: Successfully Added the Contractor.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("ContractorContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteContractor = function(contractorId){
            if(contractorId){
                console.log("Contractor Id =  "+contractorId);
                deleteContractors.query({
                    contractorId: contractorId
                }).$promise.then(function (data) {
                $log.debug("ContractorController: Delete Contractor Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("ContractorController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("ContractorController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(contractorId,actionBit){
               if(contractorId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeContractorStatus.query({
                    siteId: contractorId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("ContractorController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("ContractorController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("ContractorController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("ContractorController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("ContractorController: " + error.statusText);
            });
            $scope.updateContractorDetails =  function(contractorId){
                editContractor.query({
                  ContractorId:contractorId,  
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Address:$scope.inputParams.address ? $scope.inputParams.address:"",
                  ContractFromDate:$scope.inputParams.ContractFromDate ? $scope.inputParams.ContractFromDate:"",
                  ContractTillDate:$scope.inputParams.ContractTillDate ? $scope.inputParams.ContractTillDate:"",
                  Notes:$scope.inputParams.Notes ? $scope.inputParams.Notes:"",
                  IsActive: $scope.inputParams.IsActive ? $scope.inputParams.IsActive:"",
                  UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.contractorDetails = responseObjects;
                          $scope.editContractorFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.contractorDetails));
                          $log.debug("ContractorContrlloer OnViewFilter: Successfully Added the Contractor.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("ContractorContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
        getContractorDetails.query().$promise.then(function (data) {
            $log.debug("ContractorController: Successfully get the Contractor Details");
            $scope.contractorDetails = data;
            $scope.pageLoader = false;
            console.log("ContractorController :"+angular.toJson($scope.contractorDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("ContractorController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();