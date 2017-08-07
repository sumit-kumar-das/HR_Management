(function () {
    "use strict";

    angular.module('app.schduleTest')
            .controller('ScheduleTestController', ScheduleTestController);


    ScheduleTestController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','commonService','getSiteDetails','deleteSites','changeSiteStatus','addSiteDetails','editSite'];

    function ScheduleTestController($scope, userService, $filter, $log, CONSTANT,logger, MESSAGE, $q, GLOBAL,commonService,getSiteDetails,deleteSites,changeSiteStatus,addSiteDetails,editSite) {
            $log.info("siteController initiated");
            $scope.editSiteFlag = false;
	    $scope.pageLoader = true;
            $scope.updateSiteFlag = false;
            $scope.updateParams = {};
            $scope.inputParams = {};
            $scope.countryList = CONSTANT.COUNTRY;
            $scope.stateList = CONSTANT.STATE;
            $scope.cityList  = CONSTANT.CITY;
            $scope.districtList = CONSTANT.DISTRICT;
            $scope.statusTypesList = [{statusId:'True',statusName : 'Active'},{statusId: 'False',statusName: '	DeActive'}];
            $scope.addSites = function(){
                $scope.editSiteFlag = true;
                $scope.updateSiteFlag = false;
            };
            $scope.cancelSiteForm = function(){
                $scope.editSiteFlag = false;
                $scope.updateSiteFlag = false;
            };
            $scope.editSiteDetails = function(data){
                //alert("Country"+data.Country);
                $scope.editSiteFlag = true;
                $scope.updateSiteFlag = true;
                console.log(data);
                $scope.updateParams.SiteId =  data.SiteId;
                $scope.inputParams.Home = data.Home;
                $scope.inputParams.Address_1 = data.Address_1;
                $scope.inputParams.Address_2 = data.Address_2; 
                $scope.inputParams.District = data.District;
                $scope.inputParams.State = data.State;
                $scope.inputParams.City = data.City;
                $scope.inputParams.Email = data.Email;
                $scope.inputParams.Country = data.Country;
                $scope.inputParams.Mobile = data.Mobile;
                $scope.inputParams.Cell = data.Cell;
                if(data.Status=="Active"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[0];
                }else if(data.Status=="DeActive"){
                    $scope.inputParams.IsActive = $scope.statusTypesList[1];
                }
                console.log("Edited Data : "+$scope.updateParams.SiteId);
            };
            $scope.saveSiteDetails = function(){
            console.log($scope.inputParams);
            addSiteDetails.query({ 
                  Home: $scope.inputParams.Home ? $scope.inputParams.Home:"",
                  Address_1: $scope.inputParams.Address_1 ? $scope.inputParams.Address_1:"",
                  Address_2:$scope.inputParams.Address_2 ? $scope.inputParams.Address_2:"",
                  District: $scope.inputParams.District ? $scope.inputParams.District:"",
                  State: $scope.inputParams.State ? $scope.inputParams.State:"",
                  City:$scope.inputParams.City ? $scope.inputParams.City:"",
                  Email: $scope.inputParams.Email ? $scope.inputParams.Email:"",
                  Country: $scope.inputParams.Country ? $scope.inputParams.Country:"",
                  Mobile:$scope.inputParams.Mobile ? $scope.inputParams.Mobile:"",
                  Cell:$scope.inputParams.Cell ? $scope.inputParams.Cell:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.siteDetails = responseObjects;
                          $scope.editSiteFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.siteDetails));
                          $log.debug("SiteContrlloer OnViewFilter: Successfully Added the Site.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("SiteContrlloer Error: " + error.statusText);
              });
            };
            $scope.deleteSite = function(siteId){
            if(siteId){
                console.log("Site Id =  "+siteId);
                deleteSites.query({
                    siteId: siteId
                }).$promise.then(function (data) {
                $log.debug("SiteController: Delete Site Call");
                    $scope.response = data;
                    $scope.init();
                    console.log("SiteController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("SiteController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }
            };
            $scope.changeStatus = function(siteId,actionBit){
               if(siteId){
                   if(actionBit === 'Active'){
                       actionBit = 'False';
                   }else{
                       actionBit = 'True';
                   }
                changeSiteStatus.query({
                    siteId: siteId,
                    actionBit:actionBit
                }).$promise.then(function (data) {
                $log.debug("SiteController: Changing Status");
                    $scope.response = data;
                    $scope.init();
                    console.log("SiteController :"+angular.toJson($scope.response));
		    $scope.pageLoader = false;
                }).catch(function (error) {
		    $scope.pageLoader = false;
                    throw new Error(error.statusText);
                    $log.error("SiteController: " + error.statusText);
                });
            }else{
                console.log("Somthing went wrong!!!!!!!!!!");
            }  
            };
            $scope.updateSiteDetails = function(siteId){
                editSite.query({ 
                  SiteId:siteId,
                  Name: $scope.inputParams.Home ? $scope.inputParams.Home:"",
                  Address_1: $scope.inputParams.Address_1 ? $scope.inputParams.Address_1:"",
                  Address_2:$scope.inputParams.Address_2 ? $scope.inputParams.Address_2:"",
                  District: $scope.inputParams.District ? $scope.inputParams.District:"",
                  State: $scope.inputParams.State ? $scope.inputParams.State:"",
                  City:$scope.inputParams.City ? $scope.inputParams.City:"",
                  Email: $scope.inputParams.Email ? $scope.inputParams.Email:"",
                  Country: $scope.inputParams.State ? $scope.inputParams.State:"",
                  Mobile:$scope.inputParams.Mobile ? $scope.inputParams.Mobile:"",
                  Cell:$scope.inputParams.Cell ? $scope.inputParams.Cell:"",
                  IsActive: $scope.inputParams.IsActive.statusId ? $scope.inputParams.IsActive.statusId:"",
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
              })
              .$promise.then(function (responseObjects) {
                          $scope.siteDetails = responseObjects;
                          $scope.editSiteFlag = false;
                          $scope.init();
                          console.log("Response JSON = "+angular.toJson($scope.siteDetails));
                          $log.debug("SiteContrlloer OnViewFilter: Successfully Added the Site.");
                          
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("SiteContrlloer Error: " + error.statusText);
              });
            };
            $scope.init = function(){
            getSiteDetails.query().$promise.then(function (data) {
            $log.debug("SiteController: Successfully get the Site Details");
            $scope.siteDetails = data;
            console.log("SiteController :"+angular.toJson($scope.siteDetails));
			$scope.pageLoader = false;
            }).catch(function (error) {
			$scope.pageLoader = false;
            throw new Error(error.statusText);
            $log.error("SiteController: " + error.statusText);
            });
            };
            $scope.init();
    }
    ;
})();