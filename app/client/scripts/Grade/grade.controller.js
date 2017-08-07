(function () {
    "use strict";

    angular.module('app.grade')
            .controller('GradeController', GradeController);


    GradeController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getGradeDetails','addGradeDetails','deleteGrades','changeGradeStatus','getBroadGroupList','editGrade'];

    function GradeController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getGradeDetails,addGradeDetails,deleteGrades,changeGradeStatus,getBroadGroupList,editGrade) {
        $log.info("GradeController initiated");
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
        $scope.editGradeFlag = false;
        $scope.updateGradeFlag = false;
        $scope.statusTypesList = [{statusId:'True',statusName : 'Active'},{statusId: 'False',statusName: 'DeActive'}];
        $scope.addGrades = function(){
                $scope.editGradeFlag = true;
                $scope.updateGradeFlag = false;
        };
        $scope.cancelGradeForm = function(){
                $scope.editGradeFlag = false;
                $scope.updateGradeFlag = false;
        };
        $scope.editGradeDetails =  function(data){
                $scope.editGradeFlag = true;
                $scope.updateGradeFlag = true;
                $scope.upadateParams.GradeId = data.GradeId;
                $scope.inputParams.Code = data.Code;
                $scope.inputParams.Home = data.Home;
                $scope.inputParams.BoardGroup = data.BoardGroup;
                if(data.Status == "Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }else if(data.Status == "DeActive"){
                     $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                        
        };
        $scope.saveGradeDetails = function(){
            console.log($scope.inputParams);
            
            addGradeDetails.query({
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Home: $scope.inputParams.Home ? $scope.inputParams.Home:"",
                  BoardGroup:$scope.inputParams.BoardGroup ? $scope.inputParams.BoardGroup:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.gradeDetails = responseObjects;
                          $scope.editGradeFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.gradeDetails));
                          $log.debug("GradeContrlloer OnViewFilter: Successfully Added the Grade.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("GradeContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteGrade = function(gradeId){
            if(gradeId){
                console.log("Grade Id =  "+gradeId);
                deleteGrades.query({
                    gradeId: gradeId
                }).$promise.then(function (data) {
                $log.debug("GradeController: Delete Grade Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("GradeController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("GradeController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(gradeId,actionBit){
               if(gradeId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeGradeStatus.query({
                    gradeId: gradeId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("GradeController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("GradeController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("GradeController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("GradeController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("GradeController: " + error.statusText);
            });
            $scope.updateGradeDetails =  function(gradeId){
                console.log("Edit== "+$scope.inputParams.IsActive.statusId);
                editGrade.query({
                  GradeId:gradeId,  
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Home ? $scope.inputParams.Home:"",
                  BroadGrId:$scope.inputParams.BoardGroup ? $scope.inputParams.BoardGroup:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.gradeDetails = responseObjects;
                          $scope.editGradeFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.gradeDetails));
                          $log.debug("GradeContrlloer OnViewFilter: Successfully Added the Grade.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("GradeContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0];
        getGradeDetails.query().$promise.then(function (data) {
            $log.debug("GradeController: Successfully get the Grade Details");
            $scope.gradeDetails = data;
            $scope.pageLoader = false;
            console.log("GradeController :"+angular.toJson($scope.gradeDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("GradeController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();