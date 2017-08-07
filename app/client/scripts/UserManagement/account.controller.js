(function (){
    "use strict";
    angular.module('app.account')
        .controller('InvoiceController',InvoiceController)
        .controller('forgotCredentialsController',forgotCredentialsController)
        .controller('LoginController',LoginController);
InvoiceController.$inject =['$window'];
LoginController.$inject =['sessionService','$state','tokenStorage','$http','CONSTANT','logger','$scope','GLOBAL','$log'];
forgotCredentialsController.$inject =['$scope','sessionService','$state','logger','sendEmailForForgotCredentialService','$log','GLOBAL','emailExistValidationService','$window'];


function InvoiceController($window) {
    var $scope = this;
    return $scope.printInvoice = function() {
      var originalContents, popupWin, printContents;
      printContents = document.getElementById('invoice').innerHTML;
      originalContents = document.body.innerHTML;
      popupWin = window.open();
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
      return popupWin.document.close();
    };
};
    
function forgotCredentialsController($scope,sessionService,$state,logger,sendEmailForForgotCredentialService,$log,GLOBAL,emailExistValidationService,$window)
{    
    $scope.data = {};
    $scope.isExistFlag = false;
    $scope.spinOnResetPwd = false;
    $scope.checkUserExistance = function(email){
        /*
         * In future If thtere is any requirment for forgot credential
         * You Can check here.
         */
    };
    $scope.reset = function (forgotPasswordStatus)
    {
        /*
         * Reset Password Function.
         */
    };
    $scope.goBack = function(){
            $window.history.back();
    };
};

function LoginController(sessionService,$state,tokenStorage,$http,CONSTANT,logger,$scope,GLOBAL,getTenant,$log){       
    $scope.user = null;
    $scope.constant = CONSTANT;
    var loginstatus = sessionService.isLoggedIn();
    if(loginstatus)
    {
        $state.go('dashboard');
    } 
    $scope.Login = function (loginStatus){
        $state.go('dashboard');return;
        console.log("Login Function Calling");
        if(!loginStatus)
        {
            alert('username and password is required');
        }else{
         var data = angular.copy($scope.user);
         var userData = data;
         var body = 'userName=' + userData.username + '&password=' + userData.password;
         
         $http.post("http://10.235.4.51:8080/zSM_messaging_WS/user/login",body,{
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'}                
                    }).success(function (result, status, headers) {    
                    //After Successful login
                    if(result.EmployeeId > 0){
                      $scope.constant.DISPLAYNAME = result.EmployeeName;
                      $scope.constant.ORGANIZATIONHIRARCHY = result.Positions[0].organizationHierarchyName;
                      $scope.constant.CLIENTNAME = result.ClientName;
                      $scope.constant.LOCATION =  result.officeLocationName;
                      logger.logSuccess("Welcome to ZSM Testing.");
                      $state.go('dashboard');
                    }else{
                        console.log("Incorrect Credentials");
                        logger.logError("Please enter correct login credentials.");
                        return;
                    }
                  
                    })
                    .error(function (error,status) { 
                     //If any Error ocurs while calling Login API
                        console.log("Somthing went wrong");
                        logger.logError("Please try again with correct credentials.");
                    });
        }
    }; 
        
    };
    
  
})();


