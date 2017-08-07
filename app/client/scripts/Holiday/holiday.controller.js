(function () {
    "use strict";

    angular.module('app.holiday')
            .controller('HolidayController', HolidayController);


    HolidayController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getHolidayDetails','addHolidayDetails','deleteHolidays','changeHolidayStatus','getBroadGroupList','editHoliday'];

    function HolidayController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getHolidayDetails,addHolidayDetails,deleteHolidays,changeHolidayStatus,getBroadGroupList,editHoliday) {
        $log.info("HolidayController initiated");
	$scope.format = 'yyyy-MM-dd';
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
        $scope.editHolidayFlag = false;
        $scope.updateHolidayFlag = false;
        $scope.statusTypesList = [{statusId:'true',statusName : 'Active'},{statusId: 'false',statusName: 'DeActive'}];
        $scope.addHolidays = function(){
            alert("Calling");
                $scope.editHolidayFlag = true;
                $scope.updateHolidayFlag = false;
        };
        $scope.cancelHolidayForm = function(){
                $scope.editHolidayFlag = false;
                $scope.updateHolidayFlag = false;
        };
        $scope.editHolidayDetails =  function(data){
                $scope.editHolidayFlag = true;
                $scope.updateHolidayFlag = true;
                $scope.upadateParams.HolidayId = data.holidayId;
                $scope.inputParams.HolidayName = data.Name;
                $scope.inputParams.HolidayDate = data.HoliDt;
                if(data.HoliDayStatus == "Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }else if(data.HoliDayStatus == "DeActive"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                        
        };
        $scope.saveHolidayDetails = function(){
            console.log($scope.inputParams.HolidayDate);
            
            addHolidayDetails.query({
                  Name: $scope.inputParams.HolidayName ? $scope.inputParams.HolidayName:"",
                  HoliDayDate: $scope.inputParams.HolidayDate,
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.holidayDetails = responseObjects;
                          $scope.editHolidayFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.holidayDetails));
                          $log.debug("HolidayContrlloer OnViewFilter: Successfully Added the Holiday.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("HolidayContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteHoliday = function(holidayId){
            if(holidayId){
                console.log("Holiday Id =  "+holidayId);
                deleteHolidays.query({
                    holidayId: holidayId
                }).$promise.then(function (data) {
                $log.debug("HolidayController: Delete Holiday Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("HolidayController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("HolidayController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(holidayId,actionBit){
                alert(holidayId);
               if(holidayId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeHolidayStatus.query({
                    HolidayId: holidayId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("HolidayController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("HolidayController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("HolidayController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("HolidayController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("HolidayController: " + error.statusText);
            });
            $scope.updateHolidayDetails =  function(holidayId){
                editHoliday.query({
                  HolidayId:holidayId,  
                  Name: $scope.inputParams.HolidayName ? $scope.inputParams.HolidayName:"",
                  HolidayDate:$scope.inputParams.HolidayDate ? $scope.inputParams.HolidayDate:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.holidayDetails = responseObjects;
                          $scope.editHolidayFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.holidayDetails));
                          $log.debug("HolidayContrlloer OnViewFilter: Successfully Added the Holiday.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("HolidayContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0];
        getHolidayDetails.query().$promise.then(function (data) {
            $log.debug("HolidayController: Successfully get the Holiday Details");
            $scope.holidayDetails = data;
            $scope.pageLoader = false;
            console.log("HolidayController :"+angular.toJson($scope.holidayDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("HolidayController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();