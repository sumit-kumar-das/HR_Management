(function () {
    "use strict";

    angular.module('app.cunsultant')
            .controller('CunsultantController', CunsultantController);


    CunsultantController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getCunsultantDetails','addCunsultantDetails','deleteCunsultants','changeCunsultantStatus','getBroadGroupList','editCunsultant'];

    function CunsultantController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getCunsultantDetails,addCunsultantDetails,deleteCunsultants,changeCunsultantStatus,getBroadGroupList,editCunsultant) {
        $log.info("CunsultantController initiated");
	$scope.format = 'MM-dd-yyyy';
        $scope.pageLoader = true;
        $scope.currentdate = new Date();
        $scope.conTypeList = CONSTANT.CONTYPE;
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
        $scope.editConsultantFlag = false;
        $scope.updateConsultantFlag = false;
        $scope.statusTypesList = [{"id":true,"name" : "Active"},{"id": false,"name": "DeActive"}];
        $scope.addConsultants = function(){
                $scope.editConsultantFlag = true;
                $scope.updateConsultantFlag = false;
        };
        $scope.cancelConsultantForm = function(){
                $scope.editConsultantFlag = false;
                $scope.updateConsultantFlag = false;
        };
        $scope.editConsultantDetails =  function(data){
            console.log("Sumit == "+data.HoliDayStatus);
                $scope.editConsultantFlag = true;
                $scope.updateConsultantFlag = true;
                $scope.upadateParams.conId = data.conId;
                $scope.inputParams.ConType = data.ConType;
                $scope.inputParams.Name = data.name;
                $scope.inputParams.Address = data.address;
                if(data.Status=="Active"){
                   $scope.inputParams.IsActive = $scope.statusTypesList[0]; 
                }else if(data.Status=="DeActive"){
                   $scope.inputParams.IsActive = $scope.statusTypesList[1]; 
                }
        };
        $scope.saveConsultantDetails = function(){
            addCunsultantDetails.query({
                  ConType: $scope.inputParams.ConType ? $scope.inputParams.ConType:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Address:$scope.inputParams.Address ? $scope.inputParams.Address:"",
                  IsActive: $scope.inputParams.IsActive.id ? $scope.inputParams.IsActive.id:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.consultantDetails = responseObjects;
                          $scope.editConsultantFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.consultantDetails));
                          $log.debug("CunsultantContrlloer OnViewFilter: Successfully Added the Consultant.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("CunsultantContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteConsultant = function(cunsultantId){
            if(cunsultantId){
                console.log("Cunsultant Id =  "+cunsultantId);
                deleteCunsultants.query({
                    ConId: cunsultantId
                }).$promise.then(function (data) {
                $log.debug("CunsultantController: Delete Cunsultant Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("CunsultantController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("CunsultantController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(cunsultantId,actionBit){
               if(cunsultantId){
                   if(actionBit === 'Active'){
                       actionBit = 'FALSE';
                   }else{
                       actionBit = 'TRUE';
                   }
                changeCunsultantStatus.query({
                    ConId: cunsultantId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("CunsultantController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("CunsultantController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("CunsultantController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("CunsultantController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("CunsultantController: " + error.statusText);
            });
            $scope.updateConsultantDetails =  function(cunsultantId){
                
                console.log("Edited Data == "+$scope.inputParams.IsActive.id);
                editCunsultant.query({
                  ConId:cunsultantId,  
                  ConType: $scope.inputParams.ConType ? $scope.inputParams.ConType:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Address:$scope.inputParams.Address ? $scope.inputParams.Address:"",
                  ActiveStatus: $scope.inputParams.IsActive.id ? $scope.inputParams.IsActive.id:"",
                  UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.consultantDetails = responseObjects;
                          $scope.editConsultantFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.cunsultantDetails));
                          $log.debug("CunsultantContrlloer OnViewFilter: Successfully Added the Cunsultant.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("CunsultantContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0]; 
        getCunsultantDetails.query().$promise.then(function (data) {
            $log.debug("CunsultantController: Successfully get the Cunsultant Details");
            $scope.consultantDetails = data;
            $scope.pageLoader = false;
            console.log("CunsultantController :"+angular.toJson($scope.consultantDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("CunsultantController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();