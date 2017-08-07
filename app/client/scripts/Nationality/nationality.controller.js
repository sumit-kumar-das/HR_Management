(function () {
    "use strict";

    angular.module('app.nationality')
            .controller('NationalityController', NationalityController);


    NationalityController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getNationalityDetails','addNationalityDetails','deleteNationality','changeNationalityStatus','getBroadGroupList','editNationality'];

    function NationalityController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getNationalityDetails,addNationalityDetails,deleteNationality,changeNationalityStatus,getBroadGroupList,editNationality) {
        $log.info("NationalityController initiated");
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
        $scope.editNationalityFlag = false;
        $scope.updateNationalityFlag = false;
        $scope.statusTypesList = [{statusId:'true',statusName : 'Active'},{statusId: 'false',statusName: 'DeActive'}];
        $scope.addNationality = function(){
                $scope.editNationalityFlag = true;
                $scope.updateNationalityFlag = false;
        };
        $scope.cancelNationalityForm = function(){
                $scope.editNationalityFlag = false;
                $scope.updateNationalityFlag = false;
        };
        $scope.editNationalityDetails =  function(data){
            console.log("This is Data == "+angular.toJson(data));
                $scope.editNationalityFlag = true;
                $scope.updateNationalityFlag = true;
                $scope.upadateParams.NationalityId = data.nationalityId;
                $scope.inputParams.Code = data.Code;
                $scope.inputParams.Name = data.Name;
                $scope.inputParams.Hod = data.HOD;
                if(data.DeptStatus == "Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }else if(data.DeptStatus == "DeActive"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                        
        };
        $scope.saveNationalityDetails = function(){
            console.log($scope.inputParams);
          
            
            addNationalityDetails.query({
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Hod:$scope.inputParams.Hod ? $scope.inputParams.Hod:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.nationalityDetails = responseObjects;
                          $scope.editNationalityFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.nationalityDetails));
                          $log.debug("NationalityController OnViewFilter: Successfully Added the Grade.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("NationalityController Error: " + error.statusText);
              });
        };
        $scope.deleteNationality = function(NationalityId){
			//console.log(NationalityId);return;
            if(NationalityId){
                console.log("Nationality Id =  "+NationalityId);
                deleteNationality.query({
                    NationalityId: NationalityId
                }).$promise.then(function (data) {
                $log.debug("NationalityController: Delete nationality Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("NationalityController :"+angular.toJson($scope.response));
					$scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("NationalityController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(NationalityId,actionBit){
				//console.log(NationalityId);return;
               if(NationalityId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeNationalityStatus.query({
                    NationalityId: NationalityId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("NationalityController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("NationalityController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("NationalityController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("NationalityController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("NationalityController: " + error.statusText);
            });
            $scope.updateNationalityDetails =  function(NationalityId){
                
                console.log($scope.inputParams.IsActive.statusId);
                editNationality.query({
                  NationalityId:NationalityId,  
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Hod:$scope.inputParams.Hod ? $scope.inputParams.Hod:"",
                  ActiveStatus: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.nationalityDetails = responseObjects;
                          $scope.editNationalityFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.nationalityDetails));
                          $log.debug("NationalityContrlloer OnViewFilter: Successfully Added the Nationality.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("NationalityContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0];
        getNationalityDetails.query().$promise.then(function (data) {
            $log.debug("NationalityController: Successfully get the Grade Details");
            $scope.nationalityDetails = data;
            $scope.pageLoader = false;
            console.log("NationalityController :"+angular.toJson($scope.nationalityDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("NationalityController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();