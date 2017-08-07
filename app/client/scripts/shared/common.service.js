
(function () {
    "use strict";
    angular.module('app.common')
            .factory('logger', logger)
            .factory('confirmService', confirmService)
            .factory('rosQuestionListService', rosQuestionListService)
            .factory('commonService', commonService)
            .factory('emailExistValidationService',emailExistValidationService)
            .factory('CONSTANT', CONSTANT)
            .factory('NAVCONSTANT', NAVCONSTANT)
            .factory('MESSAGE', MESSAGE)
            .factory('GLOBAL', GLOBAL)
            .factory('statusListService', statusListService);

    CONSTANT.$inject = [];
    NAVCONSTANT.$inject = [];
    logger.$inject = [];
    confirmService.$inject = ['$modal'];
    rosQuestionListService.$inject = ['$resource', 'CONSTANT'];
    MESSAGE.$inject = [];
    commonService.$inject = ['CONSTANT','$q','Upload'];
    emailExistValidationService.$inject =['CONSTANT','$http'];
    GLOBAL.$inject = ['CONSTANT', 'tokenStorage', '$state'];
    statusListService.$inject = ['$resource', 'CONSTANT'];

    function CONSTANT() {
        var CONSTANT = {};
        CONSTANT.SERVICEURL = "http://103.54.24.25:701/api/Master/";
        var dispName = localStorage.getItem("DISPLAYNAME");
        CONSTANT.PROFILEURL = "";
        CONSTANT.ACTIVATEFLAG = false;
        CONSTANT.YESNOVALUES = [{id: true, text: 'Yes'}, {id: false, text: 'No'}];
        CONSTANT.ACTIVEINACTIVEVALUES = [{id: true, text: 'Active'}, {id: false, text: 'Inactive'}];
        CONSTANT.GENDERVALUES = [{id: "Male", text: 'Male'}, {id: "Female", text: "Female"}];
        CONSTANT.MARITALVALUES = [{id: "Married", text: 'Married'}, {id: "Unmarried", text: "Unmarried"}];
        if(dispName!==null){
            CONSTANT.DISPLAYNAME = dispName;
        }else{
            CONSTANT.DISPLAYNAME = "Sumit";
        }
        CONSTANT.ORGANIZATIONHIRARCHY = "Executive Engineer" ;
        CONSTANT.CLIENTNAME = "Client Name";
        CONSTANT.PROFILEPATH = "";
        CONSTANT.LOCATION = "Padegaon Substation";
        CONSTANT.COUNTRY = [{countryCode:'bd34f444-c83f-44b3-b28f-2850a75551c4',countryName : 'India'}];
        CONSTANT.STATE = [{stateCode:'BD34F444-C83F-44B3-B28F-2850A75551C4',stateName : 'Delhi'}];
        CONSTANT.DISTRICT = [{distCode:'North East Delhi',distName : 'North East Delhi'},{distCode: 'South West Delhi',distName: 'South West Delhi'},{distCode:'New Delhi',distName : 'New Delhi'},{distCode: 'North West Delhi',distName: 'North West Delhi'}];
        CONSTANT.CITY = [{cityCode:'BD34F444-C83F-44B3-B28F-2850A75551C4',cityName : 'Delhi'}];
        CONSTANT.CONTYPE = [{conCode:1,conTitle : 'Vendor'}];
        return CONSTANT;
    }
    ;

    function NAVCONSTANT() {
        var NAVCONSTANT = {};

        NAVCONSTANT.PATIENTID = null;
        NAVCONSTANT.CASEID = null;
        NAVCONSTANT.REQUISITIONLIST = true;
        NAVCONSTANT.PROVIDERLIST = true;
        NAVCONSTANT.FACILITYLIST = false;
        NAVCONSTANT.REQUISITIONVIEW = false;
        NAVCONSTANT.REQUISITIONEDIT = false;
        return NAVCONSTANT;
    }
    ;
    function confirmService($modal) {
        var confirmFlag = false;
        return{
            isConfirmed: isConfirmed,
            confirmFlag: confirmFlag
        };
        function isConfirmed() {
            var modalInstance;
            confirmFlag = false;
            return confirmFlag;
        }
    }
    ;
    function rosQuestionListService($resource, CONSTANT) {
        return $resource(CONSTANT.SERVICEURL + '/api/list/rosQuestionAnswersByROSGroup/:reviewofSystemGroupId', {reviewofSystemGroupId: '@reviewofSystemGroupId'}, {
            update: {
                method: 'PUT'
            }
        });
    }
    ;
    function statusListService($resource,CONSTANT){
        return $resource(CONSTANT.SERVICEURL + '/api/list/listValues/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    };

    function logger() {
        var logIt;
        toastr.options = {
            "closeButton": true,
            "positionClass": "toast-top-right",
            "timeOut": "3000"
        };
        logIt = function (message, type) {
            return toastr[type](message);
        };
        return {
            logInfo: function (message) {
                logIt(message, 'info');
            },
            logWarning: function (message) {
                logIt(message, 'warning');
            },
            logSuccess: function (message) {
                logIt(message, 'success');
            },
            logError: function (message) {
                logIt(message, 'error');
            }
        };
    }
    ;


    function commonService(CONSTANT, $q, Upload) {
        var common = {};
        common.CalculateAge = function (date) {
            var age = null;
            var ageDifMs = Date.now() - new Date(date);
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            age = Math.abs(ageDate.getUTCFullYear() - 1970);
            return age;
        };
        common.GetBase64Data = function (file) {            
            var deffered = $q.defer();
            var base64Data = '';
            if(file !== null && file !== angular.undefined){
                Upload.base64DataUrl(file).then(function(urls){                    
                    if(urls !== null && urls !== angular.undefined){
                        //base64Data = urls.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                        var subStr = urls.substr(0,urls.indexOf(','));
                        base64Data = urls.replace(subStr + ',' , "");                        
                        deffered.resolve(base64Data);
                    }
                });
            }else{
                deffered.resolve(base64Data);
            }
            return deffered.promise;
        };
        return common;
    }
    ;
    
    
    function emailExistValidationService(CONSTANT,$http){
    
        return {
            checkEmail : function(data){                    
                return $http({
                            url: CONSTANT.SERVICEURL + '/api/forgotCrendential/validateMail',
                            method: 'POST',
                            contentType: "application/json",
                            data:data
                            }).success(function (response) {                                
                                return response;                                                              
                            }).error(function(){                                
                            });                            
            }
        };
    };
    

    function MESSAGE()
    {
        var MESSAGE = {};
        MESSAGE.REQUIRED = "is required";
        MESSAGE.NUMBER = "should be number only";
        MESSAGE.TEXT = "should be text only";
        MESSAGE.COUNTRY = "Please select country";
        MESSAGE.FACILITY = "Please select facility";
        MESSAGE.CONTACT = "Please select contact";
        MESSAGE.MODALITY = "Please select modality";
        MESSAGE.GROUP = "Please select group";
        MESSAGE.PATIENT_AT = "Please select patient at";
        MESSAGE.BILL_TO = "Please select bill to";
        MESSAGE.REQUIRED_CHECK = "Please fill the required fields";
        MESSAGE.ADD_SUCCESS = "Record successfully added";
        MESSAGE.UPDATE_SUCCESS = "Record successfully updated";
        MESSAGE.DELETE_SUCCESS = "Record successfully deleted";
        MESSAGE.MASTERDATA = "Please select masterdata";
        return MESSAGE;
    }

    function GLOBAL(CONSTANT, tokenStorage, $state)
    {
        var GLOBAL = {};
        var userId = null;
        GLOBAL.TENANTNAME = "mristestone";
        GLOBAL.DISPATCHCENTER = "Mristestone";
        GLOBAL.LOGO = "/MobileRIS_Files/Tenent_1/Tenent_Logos/logo.png";
        GLOBAL.PROFILEURL = "/MobileRIS_Files/tenant/User_ProfilePhoto/";
        GLOBAL.DEFAULTPROFILEURL = '/MobileRIS_Files/Tenent_1/User_ProfilePhoto/default.jpg';
        GLOBAL.SIGNATUREURL = "/MobileRIS_Files/tenant/Signature/";
        GLOBAL.TEMPROLE = "";
        
        GLOBAL.USERID = function () {
            var userFromToken = null;
            if (userId !== null) {

            } else {                
                userFromToken = JSON.parse(atob(tokenStorage.retrive().split('.')[0]));
            }
            return userFromToken.id;
        };
        
        GLOBAL.ROLETYPE = function () {
            var userFromToken = null;
            if (userId !== null) {

            } else {
                userFromToken = JSON.parse(atob(tokenStorage.retrive().split('.')[0]));
            }            
            return userFromToken.authorities[0].authority;
        };
        
        GLOBAL.FACILITYID = 0;
        
        GLOBAL.GoToSignin = function () {
            tokenStorage.clear();
            $state.go('signin');

        };
        return GLOBAL;
    };
    

})();
