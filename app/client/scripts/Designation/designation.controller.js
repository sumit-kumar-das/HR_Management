(function () {
    "use strict";

    angular.module('app.designation')
            .controller('DesignationController', DesignationController);


    DesignationController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getDesignationDetails','addDesignationDetails','deleteDesignation','changeDesignationStatus','getBroadGroupList','editDesignation'];

    function DesignationController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getDesignationDetails,addDesignationDetails,deleteDesignation,changeDesignationStatus,getBroadGroupList,editDesignation) {
        $log.info("DesignationController initiated");
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
        $scope.editDesignationFlag = false;
        $scope.updateDesignationFlag = false;
        $scope.statusTypesList = [{statusId:'true',statusName : 'Active'},{statusId: 'false',statusName: '	DeActive'}];
        $scope.addDesignation = function(){
                $scope.editDesignationFlag = true;
                $scope.updateDesignationFlag = false;
        };
        $scope.cancelDesignationForm = function(){
                $scope.editDesignationFlag = false;
                $scope.updateDesignationFlag = false;
        };
        $scope.editDesignationDetails =  function(data){
                $scope.editDesignationFlag = true;
                $scope.updateDesignationFlag = true;
                $scope.upadateParams.DesignationId = data.DesignationId;
                $scope.inputParams.Code = data.Code;
                $scope.inputParams.Name = data.Name;
                if(data.DesignationStatus == "Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }
                else if(data.DesignationStatus == "DeActive"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                        
        };
        $scope.saveDesignationDetails = function(){
            console.log($scope.inputParams);
            
            addDesignationDetails.query({
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  IsActive: $scope.inputParams.IsActive ? $scope.inputParams.IsActive:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.designationDetails = responseObjects;
                          $scope.editGradeFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.designationDetails));
                          $log.debug("DepartMentContrlloer OnViewFilter: Successfully Added the Grade.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("DepartMentContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteDesignation = function(DesignationId){
			//console.log(DesignationId);return;
            if(DesignationId){
                console.log("Designation Id =  "+DesignationId);
                deleteDesignation.query({
                    DesignationId: DesignationId
                }).$promise.then(function (data) {
                $log.debug("DesignationController: Delete designation Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("DesignationController :"+angular.toJson($scope.response));
					$scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("DesignationController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(DesignationId,actionBit){
				//console.log(DesignationId);return;
               if(DesignationId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeDesignationStatus.query({
                    DesignationId: DesignationId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("DesignationController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("DesignationController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("DesignationController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("DesignationController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("DesignationController: " + error.statusText);
            });
            $scope.updateDesignationDetails =  function(DesignationId){
                editDesignation.query({
                  DesignationId:DesignationId,  
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  ActiveStatus: $scope.inputParams.ActiveStatus ? $scope.inputParams.ActiveStatus:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.designationDetails = responseObjects;
                          $scope.editDesignationFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.designationDetails));
                          $log.debug("DesignationContrlloer OnViewFilter: Successfully Added the Designation.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("DesignationContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0];
        getDesignationDetails.query().$promise.then(function (data) {
            $log.debug("DesignationController: Successfully get the Grade Details");
            $scope.designationDetails = data;
            $scope.pageLoader = false;
            console.log("DesignationController :"+angular.toJson($scope.designationDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("DesignationController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();