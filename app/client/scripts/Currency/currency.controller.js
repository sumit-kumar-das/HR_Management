(function () {
    "use strict";

    angular.module('app.currency')
            .controller('CurrencyController', CurrencyController);


    CurrencyController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getCurrencyDetails','addCurrencyDetails','deleteCurrency','changeCurrencyStatus','getBroadGroupList','editCurrency'];

    function CurrencyController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getCurrencyDetails,addCurrencyDetails,deleteCurrency,changeCurrencyStatus,getBroadGroupList,editCurrency) {
        $log.info("CurrencyController initiated");
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
        $scope.editCurrencyFlag = false;
        $scope.updateCurrencyFlag = false;
        $scope.statusTypesList = [{statusId:'true',statusName : 'Active'},{statusId: 'false',statusName: 'DeActive'}];
        $scope.addCurrency = function(){
                $scope.editCurrencyFlag = true;
                $scope.updateCurrencyFlag = false;
        };
        $scope.cancelCurrencyForm = function(){
                $scope.editCurrencyFlag = false;
                $scope.updateCurrencyFlag = false;
        };
        $scope.editCurrencyDetails =  function(data){
            console.log("This is Data == "+angular.toJson(data));
                $scope.editCurrencyFlag = true;
                $scope.updateCurrencyFlag = true;
                $scope.upadateParams.CurrencyId = data.currencyId;
                $scope.inputParams.Code = data.Code;
                $scope.inputParams.Name = data.Name;
                $scope.inputParams.Hod = data.HOD;
                if(data.DeptStatus == "Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }else if(data.DeptStatus == "DeActive"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                        
        };
        $scope.saveCurrencyDetails = function(){
            console.log($scope.inputParams);
          
            
            addCurrencyDetails.query({
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  CountryId:$scope.inputParams.CountryId ? $scope.inputParams.CountryId:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.currencyDetails = responseObjects;
                          $scope.editCurrencyFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.currencyDetails));
                          $log.debug("DepartMentContrlloer OnViewFilter: Successfully Added the Grade.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("DepartMentContrlloer Error: " + error.statusText);
              });
        };
        $scope.deleteCurrency = function(CurrencyId){
			//console.log(CurrencyId);return;
            if(CurrencyId){
                console.log("Currency Id =  "+CurrencyId);
                deleteCurrency.query({
                    CurrencyId: CurrencyId
                }).$promise.then(function (data) {
                $log.debug("CurrencyController: Delete currency Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("CurrencyController :"+angular.toJson($scope.response));
					$scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("CurrencyController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(CurrencyId,actionBit){
				//console.log(CurrencyId);return;
               if(CurrencyId){
                   if(actionBit === 'Active'){
                       actionBit = 'false';
                   }else{
                       actionBit = 'true';
                   }
                changeCurrencyStatus.query({
                    Cid: CurrencyId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("CurrencyController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("CurrencyController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("CurrencyController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            getBroadGroupList.query().$promise.then(function (data) {
                $log.debug("CurrencyController: Successfully get the Board Group Details");
                $scope.boardGroupList = data;
                
                //$scope.pageLoader = false;
                console.log("BoardGroupList :"+angular.toJson($scope.boardGroupList));
            }).catch(function (error) {
                //$scope.pageLoader = false;
                throw new Error(error.statusText);
                $log.error("CurrencyController: " + error.statusText);
            });
            $scope.updateCurrencyDetails =  function(CurrencyId){
                
                console.log($scope.inputParams.IsActive.statusId);
                editCurrency.query({
                  Cid:CurrencyId,  
                  Code: $scope.inputParams.Code ? $scope.inputParams.Code:"",
                  Name: $scope.inputParams.Name ? $scope.inputParams.Name:"",
                  CountryId:$scope.inputParams.CountryId ? $scope.inputParams.CountryId:"",
                  ActiveStatus: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.currencyDetails = responseObjects;
                          $scope.editCurrencyFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.currencyDetails));
                          $log.debug("CurrencyContrlloer OnViewFilter: Successfully Added the Currency.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("CurrencyContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
                $scope.inputParams.IsActive = $scope.statusTypesList[0];
        getCurrencyDetails.query().$promise.then(function (data) {
            $log.debug("CurrencyController: Successfully get the Grade Details");
            $scope.currencyDetails = data;
            $scope.pageLoader = false;
            console.log("CurrencyController :"+angular.toJson($scope.currencyDetails));
        }).catch(function (error) {
            $scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("CurrencyController: " + error.statusText);
        });
            }
            $scope.init();
    }
    ;
})();