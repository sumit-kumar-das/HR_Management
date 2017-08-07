(function ()
{
    "use strict";
    angular.module('app.password')
            .controller('SetPasswordController', SetPasswordController)
            .controller('ChangePasswordController', ChangePasswordController)
            .controller('ChangePasswordPinController', ChangePasswordPinController)
            .controller('ForgotPinController', ForgotPinController)
            .controller('ForgotPasswordController', ForgotPasswordController)
            .controller('ForgotPinpasswordController', ForgotPinpasswordController);

    SetPasswordController.$inject = ['$scope', '$state', '$log', 'logger', 'setPasswordService', '$stateParams' ,'GLOBAL','$tooltip'];
    ChangePasswordController.$inject = ['$scope', '$state', '$log', 'logger', 'changePasswordService', '$stateParams', 'GLOBAL','$tooltip','$window'];
    ChangePasswordPinController.$inject = ['$scope', '$log', 'logger', 'GLOBAL', '$state','changePasswordService', 'changePinService','changePasswordPinService', '$stateParams','$tooltip','$window'];
    ForgotPinController.$inject = ['$scope', '$log', 'logger', 'GLOBAL', '$state', 'forgotPinService', '$location','getTenant'];
    ForgotPasswordController.$inject = ['$scope', '$log', 'logger', 'GLOBAL', 'forgotPasswordService', '$state', '$location','$tooltip','getTenant'];
    ForgotPinpasswordController.$inject = ['$scope', '$log', 'logger', 'GLOBAL', '$state', 'forgotPinAndPasswordService', '$location','$tooltip','getTenant'];

    function SetPasswordController($scope, $state, $log, logger, setPasswordService, $stateParams ,GLOBAL, $tooltip)
    {
        $log.info("SetPasswordController  initiated");
        $scope.tooltip = {title: 'Password should be minimum of 8 characters and maximum of 14,consisting of uppercase alphabet(s), lower alphabet(s), number(s) and special character(s).', checked: false};        
        $scope.Submit = function (formStatus)
        {
            $log.debug("SetPasswordController : submit method called");
            if (!formStatus)
            {
                $scope.formValidStatus = true;
                $log.info("SetPasswordController : Password data is not valid");
                logger.logError("Please recheck password");
            } else
            {
                
                var url = window.location;
                var competeUrl = url.toString();
                var urls = competeUrl.split('/');
                var tenantUrl = urls[2].split('.');
                var tenant = tenantUrl[0].toString();
                var user = angular.copy($scope.user);
                var userData = user;
                var username = userData.username;
                userData.username = GLOBAL.TENANTNAME + "#" + username + "#" + $scope.pinNumber;

//            if(tenant === "")
//            {
//                userData.username = GLOBAL.TENANTNAME + "#"+ username;
//            }
//            else 
//            {
//                userData.username = GLOBAL.TENANTNAME + "#"+ username;
//            }

                setPasswordService.save(userData).$promise.then(function () {
                    logger.logSuccess("Your Password and pin set successfully!! You can login with new password and pin");
                    $state.go('signin');
                }).catch(function (error) {
                    throw new Error(error.statusText);
                    $log.error("PasswordController: " + error.statusText);
                });
            }
        };
        $scope.CheckPassword = function () {
            if ($scope.user !== angular.undefind)
            {
                if ($scope.user.password !== $scope.confirmPassword) {
                    logger.logError("Confirm Password do not match");
                }
            }
        };
        $scope.CheckPin = function (value) {
            if (value) {
                alert('pin number should be 4 digit');
            }
        };
    };

    function ChangePasswordController($scope, $state, $log, logger,changePasswordService, GLOBAL, $tooltip,$window)
    {
        $log.info("ChangePasswordController initiated");
        $scope.tooltip = {title: 'Password should be minimum of 8 characters and maximum of 14,consisting of uppercase alphabet(s), lower alphabet(s), number(s) and special character(s).', checked: false};  
        if (true)
        {
            $scope.formValidStatus = true;
            $log.info("ChangePasswordController : Password data is not valid");
            logger.logError("Please recheck password");
        }
        $scope.goBack = function(){
            console.log("Calling");
            $window.history.back();
        };
    };
    
    function ChangePasswordPinController($scope, $log, logger, GLOBAL, $state, changePasswordService,changePinService,changePasswordPinService, $stateParams, $tooltip,$window)
    {
//        $scope.user = {};
//        $scope.user.newPassword = "";
//        $scope.$watch('user.newPassword',function(newvalue, oldvalue){
//            if(newvalue.length > 0){
//                 logger.logError("Pin data is not valid");
//            }
//        });

//        var isLoggedIn = sessionService.isLoggedIn();
        $scope.data = {};
        $scope.data.isPassword = true;
        $scope.data.isPin = false;
        $scope.spinOnChangePwdPin = false;
        $scope.openChangePin = function () {            
            delete $scope.user.oldPin;
            delete $scope.user.newPin;
            $scope.confirmPin = "";
        };
        $scope.openChangePassword = function () {
            delete $scope.user.oldPassword;
            delete $scope.user.newPassword;
            $scope.confirmPassword = "";
            
        };
        $scope.goBack = function(){
            console.log("Calling");
            $window.history.back();
        };
        $log.info("ChangePasswordPinController initiated");
        $scope.tooltip = {title: 'Password should be minimum of 8 characters and maximum of 14,consisting of uppercase alphabet(s), lower alphabet(s), number(s) and special character(s).', checked: false};
        $scope.user = {};
//        var user = angular.copy($scope.user);
//        $scope.changePasswordPin = $scope.user;
        $scope.Submit = function(formStatus) {    
             $scope.spinOnChangePwdPin = true;
            if (!formStatus) {
                $scope.formValidStatus = true;
                $scope.spinOnChangePwdPin = false;
                logger.logError('Password should be minimum of 8 characters and maximum of 14,consisting of uppercase alphabet(s), lower alphabet(s), number(s) and special character(s) & pin should be of 4 digits');
                $log.info("ChangePasswordPinController : Data is not valid");
            } else {
                $scope.formValidStatus = false;
                var userId = GLOBAL.USERID();
                if (userId === undefined) {
                    alert("Could not found user");
                    $scope.spinOnChangePwdPin = false;
                } else {
                    
                    $scope.user.tenantName = GLOBAL.TENANTNAME;
                    $scope.user.id = userId;
                    if($scope.data.isPassword && $scope.data.isPin){
                        changePasswordPinService.save($scope.user).$promise.then(function (data) {                       
                            if (data.result == 3) {
                            logger.logError("Please enter correct old pin");
                        } else if (data.result == 2) {
                             logger.logError("Your new pin should not be matched with last pin");
                        } else if (data.result == 1) {
                            logger.logSuccess("Your password and pin changed successfully! You can login with new password and pin");
                            $scope.spinOnChangePwdPin = false;
                            $state.go('signin');
                        } else if (data.result == 5) {
                            logger.logError("Please enter correct old password");
                        } else if (data.result == 4) {
                            logger.logError("Your new password should not be matched with last password");
                        } else if (data.result == 6) {
                            logger.logError("Your forgot password link is expired.");
                        } 
                    }).catch(function (error) {
//                          throw new Error(error.statusText);
                        $log.error("ChangePasswordPinController: " + error.statusText);
                        $scope.spinOnChangePwdPin = false;
                    });
                    }else if($scope.data.isPassword){
                        changePasswordService.save($scope.user).$promise.then(function (data) {                            
                        if (data.result == 3) {
                            logger.logError("Please enter correct old password");
                        } else if (data.result == 2) {
                            logger.logError("Your new password should not be matched with last password");
                        } else if (data.result == 1) {
                            logger.logSuccess("Your password changed successfully! You can login with new password");
                            $scope.spinOnChangePwdPin = false;
                            $state.go('signin');
                        }  else if (data.result == 4) {
                            logger.logError("Your forgot password link is expired.");
                        } 
                    }).catch(function (error) {
//                          throw new Error(error.statusText);
                        $log.error("ChangePasswordPinController: " + error.statusText);
                        $scope.spinOnChangePwdPin = false;
                    });
                    }   else{
                        changePinService.save($scope.user).$promise.then(function (data) {                                
                        if (data.result == 3) {
                            logger.logError("Please enter correct old pin");
                        } else if (data.result == 2) {
                            logger.logError("Your new pin should not be matched with last pin");
                        } else if (data.result == 1) {
                            logger.logSuccess("Your pin changed successfully! You can login with new pin");
                            $scope.spinOnChangePwdPin = false;
                            $state.go('signin');
                        }   else if (data.result == 4) {
                            logger.logError("Your forgot password link is expired.");
                        } 
                    }).catch(function (error) {
//                          throw new Error(error.statusText);
                        $log.error("ChangePasswordPinController: " + error.statusText);
                        $scope.spinOnChangePwdPin = false;
                    });
                    }     
                    $scope.spinOnChangePwdPin = false;
                }
            }
        };
    };
  
    function ForgotPinController($scope, $log, logger, GLOBAL, $state, forgotPinService, $location,getTenant)
    {
        $log.debug("ForgotPinController : Forgor pin method called");
        var url = window.location;
        var competeUrl = url.toString();
        var urls = competeUrl.split('/');
        var tenantUrl = urls[2].split('.');
        var tenant = tenantUrl[0].toString();
        if (tenant !== '' && tenant !== null) {
            getTenant.save({"tenantUrlName": tenant}).$promise.then(function (data) {
                GLOBAL.TENANTNAME = data.tenantDatabaseName;
            }).catch(function (error) {
                throw new Error(error.statusText);
            });
        }
        $scope.forgotPin = {};
        $scope.Submit = function (forstatus) {
            if (!forstatus) {
                $scope.formValidStatus = true;
                $log.info("ForgotPinController : Password data is not valid");
                logger.logError("Please recheck password");
            } else {
                var emailId = $location.search()['email'];
                if (emailId === undefined) {
                    alert("Could not found email address");
                } else {
                    $scope.forgotPin.tenantName = GLOBAL.TENANTNAME;
                    $scope.forgotPin.emailId = emailId;
                    forgotPinService.save($scope.forgotPin).$promise.then(function (data) {
                        if (data.result == 3) {
                            logger.logError("Please enter correct received PIN");
                        } else if (data.result == 2) {
                            logger.logError("Your new PIN should not be matched with last PIN");
                        } else if (data.result == 1) {
                            logger.logSuccess("Your PIN set successfully!! You can login with new password and pin");
                            $state.go('signin');
                        }
                    }).catch(function (error) {
//                        throw new Error(error.statusText);
                        $log.error("ForgotPinController : " + error.statusText);
                    });
                }
            }
        };
    };

    function ForgotPasswordController($scope, $log, logger, GLOBAL, forgotPasswordService, $state, $location,$tooltip,getTenant)
    {
        
        console.log(GLOBAL.TENANTNAME);
        $scope.forgotPassword = {};
        $log.debug("ForgotPasswordController : Forgor password method called");
        var url = window.location;
        var competeUrl = url.toString();
        var urls = competeUrl.split('/');
        var tenantUrl = urls[2].split('.');
        var tenant = tenantUrl[0].toString();
        if (tenant !== '' && tenant !== null) {
            getTenant.save({"tenantUrlName": tenant}).$promise.then(function (data) {
                GLOBAL.TENANTNAME = data.tenantDatabaseName;
            }).catch(function (error) {
                throw new Error(error.statusText);
            });
        }
        $scope.Submit = function (forstatus) {
            if (!forstatus) {
                $scope.formValidStatus = true;
                $log.info("ForgotPasswordController : Password data is not valid");
                logger.logError("Please recheck password");
            } else {
                var emailId = $location.search()['email'];
                if (emailId === undefined) {
                    alert("Could not found email address");
                } else {
                    $scope.forgotPassword.tenantName = GLOBAL.TENANTNAME;
                    $scope.forgotPassword.emailId = emailId;
                    forgotPasswordService.save($scope.forgotPassword).$promise.then(function (data) {
                        if (data.result == 1) {
                            logger.logSuccess("Your Password and pin set successfully!! You can login with new password and pin");
                            $state.go('signin');
                        } else if (data.result == 2) {
                            logger.logError("Your new password should not be matched with last password");
                        } else if (data.result == 3) {
                            logger.logError("Please enter correct received password");
                        } 
                        
                    }).catch(function (error) {
//                        throw new Error(error.statusText);
                        $log.error("ForgotPasswordController: " + error.statusText);
                    });
                }
            }
        };
    };

    function ForgotPinpasswordController($scope, $log, logger, GLOBAL, $state, forgotPinAndPasswordService, $location, $tooltip,getTenant)
    {  
        $log.debug("ForgotPinpasswordController : Forgor pin-password method called");
        $scope.forgotPinPassword = {};
        $scope.tooltip = {title: 'Password should be minimum of 8 characters and maximum of 14,consisting of uppercase alphabet(s), lower alphabet(s), number(s) and special character(s).', checked: false};
        var url = window.location;
        var competeUrl = url.toString();
        var urls = competeUrl.split('/');
        var tenantUrl = urls[2].split('.');
        var tenant = tenantUrl[0].toString();
        if (tenant !== '' && tenant !== null) {
            getTenant.save({"tenantUrlName": tenant}).$promise.then(function (data) {
                GLOBAL.TENANTNAME = data.tenantDatabaseName;
            }).catch(function (error) {
                throw new Error(error.statusText);
            });
        }
        $scope.Submit = function (forstatus) {
            if (!forstatus) {
                $scope.formValidStatus = true;
                $log.info("ForgotPasswordController : Password data is not valid");
                logger.logError("Please recheck password");
            } else {
                var emailId = $location.search()['email'];
                if (emailId === undefined) {
                    alert("Could not found email address");
                } else {
                    $scope.forgotPinPassword.tenantName = GLOBAL.TENANTNAME;
                    $scope.forgotPinPassword.emailId = emailId;
                    forgotPinAndPasswordService.save($scope.forgotPinPassword).$promise.then(function (data) {
                        if (data.result == 3) {
                            logger.logError("Please enter correct received pin");
                        } else if (data.result == 2) {
                            logger.logError("Your new pin should not be matched with last pin");
                        } else if (data.result == 1) {
                            logger.logSuccess("Your password and pin set successfully! You can login with new password and pin");
                            $state.go('signin');
                        } else if (data.result == 5) {
                            logger.logError("Please enter correct received password");
                        } else if (data.result == 4) {
                            logger.logError("Your new password should not be matched with last password");
                        } 
                    }).catch(function (error) {
//                        throw new Error(error.statusText);
                        $log.error("ForgotPinPasswordController: " + error.statusText);
                    });
                }
            }
        };
    };
})();