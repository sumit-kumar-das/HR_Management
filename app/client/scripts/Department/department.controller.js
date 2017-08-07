(function () {
    "use strict";

    angular.module('app.department')
            .controller('DepartmentController', DepartmentController);


    DepartmentController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getDepartmentDetails','addDepartmentDetails','deleteDepartment','changeDepartmentStatus','getBroadGroupList','editDepartment'];

    function DepartmentController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getDepartmentDetails,addDepartmentDetails,deleteDepartment,changeDepartmentStatus,getBroadGroupList,editDepartment) {
        $log.info("DepartmentController initiated");
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
        $scope.editDepartmentFlag = false;
        $scope.updateDepartmentFlag = false;
        $scope.statusTypesList = [{statusId:'true',statusName : 'Active'},{statusId: 'false',statusName: 'DeActive'}];
        $scope.addDepartment = function(){
                $scope.editDepartmentFlag = true;
                $scope.updateDepartmentFlag = false;
        };
        $scope.cancelDepartmentForm = function(){
                $scope.editDepartmentFlag = false;
                $scope.updateDepartmentFlag = false;
        };
        $scope.editDepartmentDetails =  function(data){
            console.log("This is Data == "+angular.toJson(data));
                $scope.editDepartmentFlag = true;
                $scope.updateDepartmentFlag = true;
                $scope.upadateParams.DepartmentId = data.departmentId;
                $scope.inputParams.Code = data.Code;
                $scope.inputParams.Name = data.Name;
                $scope.inputParams.Hod = data.HOD;
                if(data.DeptStatus == "Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }else if(data.DeptStatus == "DeActive"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                        
        };
        $scope.saveDepartmentDetails = function(){
            console.log($scope.inputParams);
          
            
            addDepartmentDetails.query({
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Hod:$scope.inputParams.Hod ? $scope.inputParams.Hod:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.departmentDetails = responseObjects;
                          $scope.editDepartmentFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.departmentDetails));
                          $log.debug("DepartMentContrlloer OnViewFilter: Successfully Added the Grade.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("DepartMentContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteDepartment = function(DepartmentId){
			//console.log(DepartmentId);return;
            if(DepartmentId){
                console.log("Department Id =  "+DepartmentId);
                deleteDepartment.query({
                    DepartmentId: DepartmentId
                }).$promise.then(function (data) {
                $log.debug("DepartmentController: Delete department Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("DepartmentController :"+angular.toJson($scope.response));
					$scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("DepartmentController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(DepartmentId,actionBit){
				//console.log(DepartmentId);return;
               if(DepartmentId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeDepartmentStatus.query({
                    DepartmentId: DepartmentId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("DepartmentController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("DepartmentController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("DepartmentController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("DepartmentController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("DepartmentController: " + error.statusText);
            });
            $scope.updateDepartmentDetails =  function(DepartmentId){
                
                console.log($scope.inputParams.IsActive.statusId);
                editDepartment.query({
                  DepartmentId:DepartmentId,  
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  Hod:$scope.inputParams.Hod ? $scope.inputParams.Hod:"",
                  ActiveStatus: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.departmentDetails = responseObjects;
                          $scope.editDepartmentFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.departmentDetails));
                          $log.debug("DepartmentContrlloer OnViewFilter: Successfully Added the Department.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("DepartmentContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0];
        getDepartmentDetails.query().$promise.then(function (data) {
            $log.debug("DepartmentController: Successfully get the Grade Details");
            $scope.departmentDetails = data;
            $scope.pageLoader = false;
            console.log("DepartmentController :"+angular.toJson($scope.departmentDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("DepartmentController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();