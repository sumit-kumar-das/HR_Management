(function () {
    "use strict";

    angular.module('app.reports')
            .controller('ReportController', ReportController)
    .directive('superColWidthUpdate', ['$timeout', function ($timeout) {
    return {
      'restrict': 'A',
          'link': function (scope, element) {
          var _colId = scope.col.colDef.superCol,
              _el = jQuery(element);
          _el.on('resize', function () {
              _updateSuperColWidth();
          });
          var _updateSuperColWidth = function () {
              $timeout(function () {
                  var _parentCol = jQuery('.ui-grid-header-cell[col-name="' + _colId + '"]');
                  var _parentWidth = _parentCol.outerWidth(),
                      _width = _el.outerWidth();
                  
                  if (_parentWidth + 1 >= _width) {
                    _parentWidth = _parentWidth + _width;
                  } else {
                    _parentWidth = _width;
                  }
                  
                  _parentCol.css({
                      'min-width': _parentWidth + 'px',
                      'max-width': _parentWidth + 'px',
                      'text-align': "center"
                  });
              }, 0);
          };
          _updateSuperColWidth();
      }
    };
  }])   ;


    ReportController.$inject = ['$scope', '$filter', '$log', 'CONSTANT',
          'logger', 'MESSAGE', '$q', 'GLOBAL','getAssetsGroup','getAllAssetsType','getAllAssetsByAssetTypeId','getAllTestResultByFilter','$state','$modal','getAllAssetsGroupType','uiGridConstants'];

    function ReportController($scope, $filter, $log, CONSTANT, logger, MESSAGE, $q, GLOBAL,getAssetsGroup,getAllAssetsType,getAllAssetsByAssetTypeId,getAllTestResultByFilter,$state,$modal,getAllAssetsGroupType,uiGridConstants) {
        $log.info("ReportController initiated");
        $scope.showTestReport = false;
        $scope.assetGroupTypeList = [];
        $scope.assetGroupList = [];
        $scope.assetTypesList = [];
        $scope.assetTypeByIdList = [];
        $scope.inputParams = [];
        // Date Picker
        $scope.format = 'MM-dd-yyyy';
        $scope.currentdate = new Date();
        $scope.isActiveAdvance = true;
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
        $scope.pulltoShow = function (){
          $scope.isActiveAdvance = true;  
        };
        $scope.pulltoHide = function (){
          $scope.isActiveAdvance = false;  
        };
        $scope.onAdvSerchHeading = function(){
            if($scope.isActiveAdvance){
                $scope.pulltoHide();
            }else{
                $scope.pulltoShow();   
            }
        };
        $scope.validateDate = function (startDate, endDate) {
            var curDate = new Date();
            if (new Date(startDate) > new Date(endDate)) {
                logger.logInfo('End Date should be greater than start date');
                return false;
            }
            if (startDate == angular.undefind) {
                logger.logInfo('Please select from Date');
                return false;
            }
            if (endDate == angular.undefind) {
                logger.logInfo('Please select to date');
                return false;
            }
            if (new Date(startDate) < curDate) {
            }
            return true;
        };
        /*
         * Get all asset Group type getAllAssetsGroupType
         */
         getAllAssetsGroupType.query().$promise.then(function (data) {
            $log.debug("ReportController: Successfully get the list of assets group type");
            $scope.assetGroupTypeList = data;
         //  console.log("Assets Group Type :"+angular.toJson($scope.assetGroupTypeList));
        }).catch(function (error) {
            throw new Error(error.statusText);
            $log.error("ReportController: " + error.statusText);
        });
        /*
         * Get all the asset group list
         */
        $scope.getAssetsGroupByGroupTypeId =  function(){
        var grpTypeId = $scope.inputParams.assetGroupType;    
        getAssetsGroup.query({'assetGrpTypeId':grpTypeId}).$promise.then(function (data) {
            $log.debug("ReportController: Successfully get the list of assets group");
            $scope.assetGroupList = data;
           console.log("Assets Group :"+angular.toJson($scope.assetGroupList));
        }).catch(function (error) {
            throw new Error(error.statusText);
            $log.error("ReportController: " + error.statusText);
        });
        };
        /*
         * Get all the asset type list
         */
        getAllAssetsType.query().$promise.then(function (data) {
            $log.debug("ReportController: Successfully get the list of assets Type");
            $scope.assetTypesList = data;
            console.log("Assets Type :"+angular.toJson($scope.assetTypesList));
        }).catch(function (error) {
            throw new Error(error.statusText);
            $log.error("ReportController: " + error.statusText);
        });
        /*
         * Get all the assets list acording to the selected Asset Type
         * Parms : typeId
         */
        $scope.getAllAssetsByAssetTypeId =  function(){
            var tyId = $scope.inputParams.assetType;
            if(tyId){
            getAllAssetsByAssetTypeId.query({'typeId':tyId}).$promise.then(function (data) {
                $log.debug("ReportController: Successfully get the list of assets Assets TYPE BY ID");
                $scope.assetTypeByIdList = data;
               console.log("Assets TYPE BY ID :"+angular.toJson($scope.assetTypeByIdList));
            }).catch(function (error) {
                throw new Error(error.statusText);
                $log.error("ReportController: " + error.statusText);
            });
            }else{
                logger.logInfo('Please select asset type');
            }
        };
        /*
         * Main Filter API Calling fot Test Result
         */
        //$scope.testResults = [];
        $scope.testResults = [{"_id":{"$oid":"58be81f41481accbe0266ca7"},"assetType":"Transformer","assetCode":"TR400","testName":"Measurement of No Load Current From HV","testCode":"NOLOADHV","assetTypeId":33331,"assetsId":999991,"assetsGroupId":22222,"officeLocationId":111001,"isForEachTap":"Yes","testDate":1443544100000,"headerFields":[{"fieldName":"Kit Used","fieldType":"Textbox","DisplayType":"SINGLESELECTLIST","listCode":"TRANSKITS","excelName":"","fieldValue":""},{"fieldName":"Normal Tap No","fieldType":"Textbox","DisplayType":"TextBox","listCode":"NLTAPNO","excelName":"","fieldValue":""},{"fieldName":"TestSrNo","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TESTSRNO","excelName":"TESTSRNO","fieldValue":"A"},{"fieldName":"TestResultTitle","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TESTRESULTTITLE","excelName":"TESTRESULTTITLE","fieldValue":"Transformer Test Results"},{"fieldName":"TestName","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TESTNAME","excelName":"TESTNAME","fieldValue":"Measurement of No load current from HV"},{"fieldName":"TransSrNo","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TRANSSRNO","excelName":"TRANSSRNO","fieldValue":"2"}],"tableHeadingField":[{"Sequence":0,"FieldHeading":"Tap No","FieldType":"Number","FieldCode":"TAPNO","excelName":"TAPSRNO","excelValue":"Tap No.","excelAllignment":"Center"},{"Sequence":1,"FieldHeading":"1.1 - N","FieldType":"Number","FieldCode":"1_1_N","excelName":"nl_HV_1_N","excelValue":"1.1-N","excelAllignment":"Center"},{"Sequence":2,"FieldHeading":"I-HV mA","FieldType":"Number","FieldCode":"nl_HV_I_HV_mA","excelName":"nl_HV_I_HV_mA","excelValue":"I-HV mA","excelAllignment":"Center"},{"Sequence":3,"FieldHeading":"2.1-N","FieldType":"Number","FieldCode":"2_1_N","excelName":"nl_HV_2_N","excelValue":"2.1-N","excelAllignment":"Center"},{"Sequence":4,"FieldHeading":"3.1 - 3.2","FieldType":"Number","FieldCode":"3_1-3_2","excelName":"nl_HV_1_2","excelValue":"3.1 - 3.2","excelAllignment":"center"},{"Sequence":5,"FieldHeading":"nl_HV_HV_IV","FieldType":"FLOAT","FieldCode":"HV_IV","Formula":"nl_HV_1_N /nl_HV_2_N","excelName":"HV_IV","excelValue":"HV/IV","excelAllignment":"Right"},{"Sequence":6,"FieldHeading":"nl_HV_HV_LV","FieldType":"FLOAT","FieldCode":"HV_LV","Formula":"nl_HV_1_N /nl_HV_1_2","excelName":"HV_LV","excelValue":"HV/LV","excelAllignment":"Right"}],"testResultFields":[{"tapNo":1,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.44,"nl_HV_2_N":202.6,"nl_HV_1_2":32.6,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":2,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.42,"nl_HV_2_N":202.8,"nl_HV_1_2":32.4,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":3,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.4,"nl_HV_2_N":205.2,"nl_HV_1_2":32.2,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":4,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.39,"nl_HV_2_N":206.4,"nl_HV_1_2":32.1,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":5,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.38,"nl_HV_2_N":207.6,"nl_HV_1_2":32,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":6,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.37,"nl_HV_2_N":208.6,"nl_HV_1_2":31.7,"nl_HV_HV_IV":1.9607,"nl_HV_HV_LV":12.902},{"tapNo":7,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.35,"nl_HV_2_N":209.9,"nl_HV_1_2":31.4,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":8,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.34,"nl_HV_2_N":211.1,"nl_HV_1_2":31.3,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":9,"nl_HV_1_N":410,"nl_HV_I_HV_mA":2.33,"nl_HV_2_N":212.1,"nl_HV_1_2":31.1,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":10,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.32,"nl_HV_2_N":213,"nl_HV_1_2":30.9,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":11,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.31,"nl_HV_2_N":214.1,"nl_HV_1_2":30.7,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":12,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.22,"nl_HV_2_N":215,"nl_HV_1_2":30.8,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":13,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.21,"nl_HV_2_N":216.1,"nl_HV_1_2":30.62,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":14,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.19,"nl_HV_2_N":217.1,"nl_HV_1_2":30.44,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":15,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.18,"nl_HV_2_N":218.2,"nl_HV_1_2":30.27,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":16,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.17,"nl_HV_2_N":219.2,"nl_HV_1_2":30.1,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":17,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.16,"nl_HV_2_N":220.3,"nl_HV_1_2":10004,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":18,"nl_HV_1_N":999,"nl_HV_I_HV_mA":2.15,"nl_HV_2_N":221.2,"nl_HV_1_2":29.8,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":19,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.13,"nl_HV_2_N":222.1,"nl_HV_1_2":29.61,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":20,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.12,"nl_HV_2_N":222.9,"nl_HV_1_2":29.44,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":21,"nl_HV_1_N":407,"nl_HV_I_HV_mA":2.1,"nl_HV_2_N":223.8,"nl_HV_1_2":29.26,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":22,"nl_HV_1_N":407,"nl_HV_I_HV_mA":2.09,"nl_HV_2_N":223.8,"nl_HV_1_2":29.21,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":23,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.07,"nl_HV_2_N":226.1,"nl_HV_1_2":28.99,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"}]},{"_id":{"$oid":"58be82181481accbe0266ca9"},"assetType":"Transformer","assetCode":"TR400","testName":"Measurement of No Load Current From HV","testCode":"NOLOADHV","assetTypeId":33331,"assetsId":999991,"assetsGroupId":22222,"officeLocationId":111002,"isForEachTap":"Yes","testDate":1483747200000,"headerFields":[{"fieldName":"Kit Used","fieldType":"Textbox","DisplayType":"SINGLESELECTLIST","listCode":"TRANSKITS","excelName":"","fieldValue":""},{"fieldName":"Normal Tap No","fieldType":"Textbox","DisplayType":"TextBox","listCode":"NLTAPNO","excelName":"","fieldValue":""},{"fieldName":"TestSrNo","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TESTSRNO","excelName":"TESTSRNO","fieldValue":"A"},{"fieldName":"TestResultTitle","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TESTRESULTTITLE","excelName":"TESTRESULTTITLE","fieldValue":"Transformer Test Results"},{"fieldName":"TestName","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TESTNAME","excelName":"TESTNAME","fieldValue":"Measurement of No load current from HV"},{"fieldName":"TransSrNo","fieldType":"Textbox","DisplayType":"TextBox","listCode":"TRANSSRNO","excelName":"TRANSSRNO","fieldValue":"2"}],"tableHeadingField":[{"Sequence":0,"FieldHeading":"Tap No","FieldType":"Number","FieldCode":"TAPNO","excelName":"tapNo","excelValue":"Tap No.","excelAllignment":"Center"},{"Sequence":1,"FieldHeading":"1.1 - N","FieldType":"Number","FieldCode":"1_1_N","excelName":"nl_HV_1_N","excelValue":"1.1-N","excelAllignment":"Center"},{"Sequence":2,"FieldHeading":"I-HV mA","FieldType":"Number","FieldCode":"nl_HV_I_HV_mA","excelName":"nl_HV_I_HV_mA","excelValue":"I-HV mA","excelAllignment":"Center"},{"Sequence":3,"FieldHeading":"2.1-N","FieldType":"Number","FieldCode":"2_1_N","excelName":"nl_HV_2_N","excelValue":"2.1-N","excelAllignment":"Center"},{"Sequence":4,"FieldHeading":"3.1 - 3.2","FieldType":"Number","FieldCode":"3_1-3_2","excelName":"nl_HV_1_2","excelValue":"3.1 - 3.2","excelAllignment":"center"},{"Sequence":5,"FieldHeading":"nl_HV_HV_IV","FieldType":"FLOAT","FieldCode":"HV_IV","Formula":"nl_HV_1_N /nl_HV_2_N","excelName":"HV_IV","excelValue":"HV/IV","excelAllignment":"Right"},{"Sequence":6,"FieldHeading":"nl_HV_HV_LV","FieldType":"FLOAT","FieldCode":"HV_LV","Formula":"nl_HV_1_N /nl_HV_1_2","excelName":"HV_LV","excelValue":"HV/LV","excelAllignment":"Right"}],"testResultFields":[{"tapNo":1,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.44,"nl_HV_2_N":202.6,"nl_HV_1_2":32.6,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":2,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.42,"nl_HV_2_N":202.8,"nl_HV_1_2":32.4,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":3,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.4,"nl_HV_2_N":205.2,"nl_HV_1_2":32.2,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":4,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.39,"nl_HV_2_N":206.4,"nl_HV_1_2":32.1,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":5,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.38,"nl_HV_2_N":207.6,"nl_HV_1_2":32,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":6,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.37,"nl_HV_2_N":208.6,"nl_HV_1_2":31.7,"nl_HV_HV_IV":1.9607,"nl_HV_HV_LV":12.902},{"tapNo":7,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.35,"nl_HV_2_N":209.9,"nl_HV_1_2":31.4,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":8,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.34,"nl_HV_2_N":211.1,"nl_HV_1_2":31.3,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":9,"nl_HV_1_N":410,"nl_HV_I_HV_mA":2.33,"nl_HV_2_N":212.1,"nl_HV_1_2":31.1,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":10,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.32,"nl_HV_2_N":213,"nl_HV_1_2":30.9,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":11,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.31,"nl_HV_2_N":214.1,"nl_HV_1_2":30.7,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":12,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.22,"nl_HV_2_N":215,"nl_HV_1_2":30.8,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":13,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.21,"nl_HV_2_N":216.1,"nl_HV_1_2":30.62,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":14,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.19,"nl_HV_2_N":217.1,"nl_HV_1_2":30.44,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":15,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.18,"nl_HV_2_N":218.2,"nl_HV_1_2":30.27,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":16,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.17,"nl_HV_2_N":219.2,"nl_HV_1_2":30.1,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":17,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.16,"nl_HV_2_N":220.3,"nl_HV_1_2":29.94,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":18,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.15,"nl_HV_2_N":221.2,"nl_HV_1_2":29.8,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":19,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.13,"nl_HV_2_N":222.1,"nl_HV_1_2":29.61,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":20,"nl_HV_1_N":409,"nl_HV_I_HV_mA":2.12,"nl_HV_2_N":2242.99,"nl_HV_1_2":29.44,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":21,"nl_HV_1_N":407,"nl_HV_I_HV_mA":2.1,"nl_HV_2_N":223.8,"nl_HV_1_2":29.26,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":22,"nl_HV_1_N":407,"nl_HV_I_HV_mA":2.09,"nl_HV_2_N":223.8,"nl_HV_1_2":29.21,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"},{"tapNo":23,"nl_HV_1_N":408,"nl_HV_I_HV_mA":2.07,"nl_HV_2_N":226.1,"nl_HV_1_2":28.50,"nl_HV_HV_IV":"nl_HV_1_N /nl_HV_1_2"}]}];
        $scope.reBuild = [];
        $scope.gridOpt = {};
        $scope.testBuild = [];
        $scope.mySelections = [];
        $scope.selected = false;
        $scope.listIndex = [];
        $scope.finalBuild = [];
        $scope.allChecked =  false;
        $scope.isActiveSpin=  false;
        $scope.$watch('testResults',function(){
        for(var i=0;i<$scope.testResults.length;i++){
            $scope.reBuild[i] = {
                "Id": $scope.testResults[i]._id,
                "AssetsGroup": $scope.testResults[i].assetsGroupId,
                "AssetType": $scope.testResults[i].assetType,
                "Assets": $scope.testResults[i].assetsId,
                "AssetCode": $scope.testResults[i].assetCode,
                "Date": $filter('date')($scope.testResults[i].testDate , "dd/MM/yyyy"),
                "testName": $scope.testResults[i].testName,
                "headerFields": $scope.testResults[i].headerFields,
                "isForEachTap": $scope.testResults[i].isForEachTap,
                "tableHeadingField":$scope.testResults[i].tableHeadingField,
                "testResultFields":$scope.testResults[i].testResultFields,
                "table" : 'gridOpt'
            };
        }
        /*
         * Grid Data Binding
         */
        $scope.gridOptions = {
            data: 'reBuild',
            showGroupPanel: true,
            selectedItems: $scope.mySelections,
            enableColumnReordering: true,
//            showColumnMenu: true,
//            showFilter: true,
            showSelectionCheckbox: true,
            groups: ['Date','testName'],//Default Grouping on Date and TestName and visible column
            columnDefs: [
                        {field: 'Id', displayName: 'Id', visible:false},
                        {field:'AssetsGroup', displayName:'Assets Group',visible:false},
                        {field:'AssetType', displayName:'Asset Type',visible:false},
                        {field:'Assets', displayName:'Assets',visible:false},
                        {field:'AssetCode', displayName:'Asset Code',visible:false},
                        {field:'Date', displayName:'Date'},
                        {field:'testName', displayName:'Test Name'},
                        {field:'headerFields', displayName:'headerFields',visible:false},
                        {field:'isForEachTap', displayName:'isForEachTap',visible:false},
                        {field:'tableHeadingField', displayName:'tableHeadingField',visible:false},
                        {field:'testResultFields', displayName:'testResultFields',visible:false},
                        {field:'table', displayName:'table',visible:false}
            ],
            afterSelectionChange: function() { 
                
            }
        }; 
               });
        /*
        * Back Button
        */
        $scope.goBack = function(){
            $scope.showTestReport= false;
            $scope.dataOne = [];
            $scope.dataTwo = [];
            $scope.dataThree = [];
            $scope.dataFour = [];
            $scope.dataFive = [];
            $scope.dataSix = [];
            $scope.dataSeven = [];
            $scope.dataEight = [];
            $scope.dataNine = [];
            $scope.dataTen = [];
        };
        /*
         * Show selected Test Names 
         */
        var GridData = ['dataOne','dataTwo', 'dataThree','dataFour','dataFive','dataSix','dataSeven','dataEight','dataNine','dataTen'];
        $scope.dataOne = [];
        $scope.dataTwo = [];
        $scope.dataThree = [];
        $scope.dataFour = [];
        $scope.dataFive = [];
        $scope.dataSix = [];
        $scope.dataSeven = [];
        $scope.dataEight = [];
        $scope.dataNine = [];
        $scope.dataTen = [];
        $scope.SwitchFuction = function (data, json) {
        switch (data) {
            case 0:
                $scope.dataOne = json;
                break;
            case 1:
                $scope.dataTwo = json;
                break;
            case 2:
                $scope.dataThree = json;
                break;
            case 3:
                $scope.dataFour = json;
                break;
            case 4:
                $scope.dataFive = json;
                break;
            case 5:
                $scope.dataSix = json;
                break;
            case 6:
                $scope.dataSeven = json;
                break;
            case 7:
                $scope.dataEight = json;
                break;
            case 8:
                $scope.dataNine = json;
                break;
            case 9:
                $scope.dataTen = json;
                break;    
            default:

        }
        };
        $scope.arrColumnDef = [];
        $scope.gridOpt = [];
        $scope.settings = [];
        $scope.sameDateDiffTest = [];
        $scope.sameTestOnDiffDate = [];
        $scope.DiffTestDiffDate = [];// Currently working
        $scope.TestDatesArr = [];
        $scope.TestNamesArr = [];
        $scope.showTest = function(){
            if($scope.mySelections.length == 0 ){
                logger.logSuccess("Please select any test.");
                return;
            }else{
                $scope.isActiveSpin=  true;
                $scope.showTestReport = true;
                logger.logSuccess("Successfully get the test result.");
                
                for(var k=0;k<$scope.mySelections.length;k++){
                    /* Slaves */
                    $scope.settings[k] = {
                            testName:$scope.mySelections[k].testName,
                            dates:$scope.mySelections[k].Date
                    };
                    $scope.TestDatesArr.push($scope.mySelections[k].Date);
                    $scope.TestNamesArr.push($scope.mySelections[k].testName);
                    
                    $scope.finalBuild[k] = $scope.mySelections[k];
                    $scope.gridOptionsForResult = $scope.finalBuild[k].testResultFields;
                    $scope.SwitchFuction(k,$scope.gridOptionsForResult);
                    $scope.keys = Object.keys($scope.mySelections[k].testResultFields[k]);
                    for(var h=0;h<Object.keys($scope.mySelections[k].testResultFields[k]).length;h++){
                    if(h==0){    
                        $scope.arrColumnDef[h] = {
                            field:$scope.keys[h],
                            displayName:$scope.mySelections[k].tableHeadingField[h].FieldHeading,
                            superCol: 'group1'
                        };
                    }else{
                      $scope.arrColumnDef[h] = {
                            field:$scope.keys[h],
                            displayName:$scope.mySelections[k].tableHeadingField[h].FieldHeading,
                            superCol: 'group2'
                        };  
                    }
                    }
                    /* If it is not working don't delete this code, reason for not working $scope.gridOpt */
                    $scope.gridOpt[k] = {
                                            headerTemplate: 'header-template.html',
                                            data: GridData[k],
                                            superColDefs:[{
                                            name: 'group1',
                                            displayName: 'Group 1'
                                            }, {
                                            name: 'group2',
                                            displayName: 'Group 2'
                                            }],
                                            enableColumnReordering: true,
                                            showColumnMenu: true,
                                            showFilter: true, 
                                            enableRowSelection: true,
                                            columnDefs:$scope.arrColumnDef 

                                            
                    };
                }
                $scope.testCount = $scope.count($scope.TestNamesArr);
                $scope.testCountByDate = $scope.count($scope.TestDatesArr);
                $scope.isActiveSpin=  false;
            }
            
            console.log("Dates Count"+angular.toJson($scope.count($scope.TestDatesArr)));
            console.log("Tests "+angular.toJson($scope.count($scope.TestNamesArr)));
            console.log("Settings "+angular.toJson($scope.settings));
             
        };
        $scope.count = function (ary, classifier) {
            return ary.reduce(function (counter, item) {
                var p = (classifier || String)(item);
                counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
                return counter;
            }, {})
        };
        
        /*
         * this chart is to compare all the data.
         */
        $scope.showChart = function(){
            
        };        
       
//This code is to fetch on-load from current date
//         $scope.showSpinner = true;
//         getAllTestResultByFilter.query({
//                  fromDate: $scope.inputParams.startDate ? $scope.inputParams.startDate:"",
//                  toDate: $scope.inputParams.endDate ? $scope.inputParams.endDate:"",
//                  assetGroupId:$scope.inputParams.assetGroup ? $scope.inputParams.assetGroup:"",
//                  assetTypeId: $scope.inputParams.assetType ? $scope.inputParams.assetType:"",
//                  assetsId: $scope.inputParams.asset ? $scope.inputParams.asset:""
//              })
//              .$promise.then(function (responseObjects) {
//                          $scope.testResults = responseObjects;
//                          console.log("Build JSON = "+angular.toJson($scope.testResults));
//                          $log.debug("ReportContrlloer OnViewFilter: Successfully Filter the test list.");
//                          $scope.showSpinner = false;
//                          $scope.isActiveAdvance =false;
//              }).catch(function (error) {
//                  $scope.showSpinner = false;
//                  $log.error("ReportContrlloer  OnViewFilter: " + error.statusText);
//              }); 
    $scope.GetCustomFilteredTestData = function(){  
        if($scope.inputParams.asset){
          $scope.showSpinner = true;
          getAllTestResultByFilter.query({
                  fromDate: $scope.inputParams.startDate ? $scope.inputParams.startDate:"",
                  toDate: $scope.inputParams.endDate ? $scope.inputParams.endDate:"",
                  assetGroupId:$scope.inputParams.assetGroup ? $scope.inputParams.assetGroup:"",
                  assetTypeId: $scope.inputParams.assetType ? $scope.inputParams.assetType:"",
                  assetsId: $scope.inputParams.asset ? $scope.inputParams.asset:""
              })
              .$promise.then(function (responseObjects) {
                          $scope.testResults = responseObjects;
                          console.log("Build JSON = "+angular.toJson($scope.testResults));
                          $log.debug("ReportContrlloer OnViewFilter: Successfully Filter the test list.");
                          $scope.showSpinner = false;
                          //$scope.isActiveAdvance =false;
              }).catch(function (error) {
                  $scope.showSpinner = false;
                  $log.error("ReportContrlloer  OnViewFilter: " + error.statusText);
              });
          }else{
              logger.logError("Proceed by selecting asset");
          }
          };
          $scope.ResetParms = function(){
              $scope.inputParams.assetGroupType = "";
              $scope.inputParams.assetGroup = "";
              $scope.inputParams.assetType = "";
              $scope.inputParams.asset = "";
              $scope.inputParams.startDate = "";
              $scope.inputParams.endDate = "";
          };
          $scope.cancel = function () {
            $modal.dismiss('cancel');
          };
          $scope.openAssetTemplate=function(titleHeader,data){
            console.log("Index: "+data);
            $scope.title=titleHeader;
            $scope.iData = data;
            var modalInstance;
            modalInstance = $modal.open(
            {
                templateUrl: "assetInfo.html",
                windowClass : 'small-modal-window',
                scope:$scope
            });
        };
        
        

       
        $scope.openComparisonChart=function(titleHeader){
            $scope.title=titleHeader;
            var modalInstance;
            modalInstance = $modal.open(
            {
                templateUrl: "compareThroughChart.html",
                windowClass : 'app-modal-window',
                scope:$scope
            });
            modalInstance.result.then(
            //close
            function (result) {
                var a = result;
            },
            //dismiss
            function (result) {
                var a = result;
            });
        
      }
       };
    ;
})();