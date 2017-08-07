(function () {
    'use strict';
    angular.module('app', ['ngRoute',
        'ui.router', 
        'ui.bootstrap', 
        'ngResource', 
        'ngFileUpload', 
        'moment-picker', 
        'ui.mask', 
        'angular.filter',
        'angularjs-dropdown-multiselect',
        'app.controllers', 
        'app.directives', 
        'app.localization', 
        'angularSpinner', 
        'ngTagsInput',
        'oitozero.ngSweetAlert',
        'displayMask',
        'ngMap', 
        'ngBootbox',
        'app.nav',
        'app.task',
        'app.ui.form.directives', 
        'angular-confirm',
        'angularMoment', 
        'angular-linq', 
        'naif.base64', 
        'base64', 
        'app.account', 
        'app.dcadmindashboard', 
        'ui.select',
        'datatables', 
        'datatables.colreorder',
        'datatables.bootstrap', 
        'datatables.colvis', 
        'datatables.tabletools',
        'datatables.fixedcolumns',
        'datatables.fixedheader',
        'app.common',
        'app.activateaccount', 
        'app.user',
        'ui-notification',
        'mp.autoFocus',
        'app.password',
        'mgcrea.ngStrap.timepicker',
        'mgcrea.ngStrap.datepicker',
        'mgcrea.ngStrap.tooltip',
        'app.assetsList',
        'app.schduleTest',
        'ngSanitize',
        'app.reports',
        'app.schduleTest',
        'app.grade',
		'app.department',
		'app.contractor',
		'app.holiday',
                'app.cunsultant',
                'app.currency',
                'app.designation',
                'app.nationality',
        'ngGrid',
        'ui.grid',
        'chart.js'
        ])
            .config(function ($stateProvider, $logProvider, $provide, $httpProvider) {
                $httpProvider.interceptors.push('tokenAuthInterceptor');
                $httpProvider.interceptors.push('HttpRequestTimeoutInterceptor');
                $httpProvider.defaults.withCredentials = false;
                $httpProvider.defaults.useXDomain = true;
                $logProvider.debugEnabled(true);

                $provide.decorator('$log', function ($delegate) {
                    var date = new Date();
                    // Keep track of the original debug method.
                    var origDebug = $delegate.debug;
                    var origInfo = $delegate.info;
                    var origError = $delegate.error;
                    $delegate.debug = function () {
                        var args = [].slice.call(arguments);
                        args[0] = ['[DEBUG]: ', new Date().toLocaleString(), ': ', args[0]].join('');

                        // Send on our enhanced message to the original debug method.
                        origDebug.apply(null, args);
                        //origDebug = enable;
                    };
                    $delegate.info = function () {
                        var args = [].slice.call(arguments);
                        args[0] = ['[INFO]: ', new Date().toLocaleString(), ': ', args[0]].join('');

                        // Send on our enhanced message to the original debug method.
                        origInfo.apply(null, args);
                    };
                    $delegate.error = function () {
                        var args = [].slice.call(arguments);
                        args[0] = ['[ERROR]: ', new Date().toLocaleString(), ': ', args[0]].join('');

                        // Send on our enhanced message to the original debug method.
                        origError.apply(null, args);
                    };

                    return $delegate;
                });
                $provide.decorator("$exceptionHandler", function ($delegate) {
                    
                    return function (exception, cause) {                         
                        exception.message = "Some error has occured. Please try again, if error persist then please contact help desk: [" + exception.message + "]";
                        $delegate(exception, cause);
//                        alert(exception.message);
                    };
                });
                $stateProvider.state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'views/dashboard.html',
                    controller: 'DashboardCtrl'
//                    ,
//                    resolve: {
//                        permission: function (AuthorizationService, CONSTANT) {
//                            return AuthorizationService.permissionCheck(CONSTANT.ROLESFORDCADMIN);
//                        }
//                    }
                })
//                        .state('reports', {
//                            url: '/reports',
//                            templateUrl: 'views/temp.html'
//                        });
            })
            .run(function ($window, $state, tokenStorage, $rootScope, AuthorizationService, $q, HttpPendingRequestsService) {
//                LogOut();
                function LogOut() {
//                     tokenStorage.clear();
//                     $state.go('signin');
                }
                $window.onbeforeunload = function () {
                    LogOut();
                };
                $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                    if (toState.name !== fromState.name) {
                        HttpPendingRequestsService.cancelAll(); // To cancel http request when route chanage
                    }

                    if (toState.name === "signin" || toState.name === "500" || toState.name === "401" ||
                            toState.name === "activateaccount" || toState.name === "forgotPin" ||
                            toState.name === "forgotPassword" || toState.name === "forgotPinPassword" ||
                            toState.name === "setPassword" || toState.name === "signup" ||
                            toState.name === "forgotCredentials") {
                        tokenStorage.clear();
                    } else {
                        /*
                         * Sumit K
                         * After Click On Login Button this comes here and check for authToken and all that.
                         * For now i am disabling this
                         */
//                        var authTokan = tokenStorage.retrive();
//                        if (!authTokan)
//                        {
//                            e.preventDefault();
//                            tokenStorage.clear();
//                            $state.go('signin');
//                        } else {                            
//                            AuthorizationService.permissionCheck(toState.name).then(function (promise) {                                
//                            }, function (reason) {
//                                console.log(reason);
//                                e.preventDefault();
//                                tokenStorage.clear();
//                                $state.go('401');  //Redirect to UnAuthorised page
//                            });
//                        }

                    }
                    ;
                });
            })
            .factory('$exceptionHandler', function ($log,$injector) {
                return function (exception, cause) {
                    var $ngBootbox = $injector.get('$ngBootbox');
                    var str = "Some error has occured. Please try again, if error persist then please contact help desk: [Cannot read property 'toLowerCase' of undefined]";
                    if(exception.message !== str){
                        $ngBootbox.alert(exception.message);
                        $log.error(exception, cause);
                    }                                        
                };
            })
//            .factory('AuthorizationService', function ($log, $q, sessionService, $state) {
//                return {
//                    permissionCheck: function (roleCollection) {
//                        var deferred = $q.defer();
//                        var ifPermissionPassed = false;
//                        angular.forEach(roleCollection, function (role) {
//                            if (sessionService.getUserRole() === role) {
//                                ifPermissionPassed = true;
//                            }
//                        });
//                        if (!ifPermissionPassed) {
//                            $log.debug("Resolved the state change watch");
////                    alert("You are not authorised user to access this page !!");
//                            deferred.reject();
//                        } else {
//                            deferred.resolve();
//                        }
//                        return deferred.promise;
//                    }
//                };
//            })
            .factory('AuthorizationService', function ($q, sessionService, CONSTANT) {
                return {
                    permissionCheck: function (state) {
                        
                        var deferred = $q.defer();
                       var stateCollection = [];
                       
                       if (stateCollection.indexOf(state) !== -1) {
                           deferred.resolve(true);
                       } else {
                           deferred.reject("Not Authorised");
                       }
                        // deferred.resolve(true);
                        return deferred.promise;
                    }
                };
            })
            // Http Service to add promise to every request and to cancel all http request when route channges
            .service('HttpPendingRequestsService', function ($q) {
                var cancelPromises = [];

                function newTimeout() {
                    var cancelPromise = $q.defer();
                    cancelPromises.push(cancelPromise);
                    return cancelPromise.promise;
                }

                function cancelAll() {
                    angular.forEach(cancelPromises, function (cancelPromise) {
                        cancelPromise.promise.isGloballyCancelled = true;
                        cancelPromise.resolve();
                    });
                    cancelPromises.length = 0;
                }

                return {
                    newTimeout: newTimeout,
                    cancelAll: cancelAll
                };
            })
            // Http Interceptor to cancel http request when route channges
            .factory('HttpRequestTimeoutInterceptor', function ($q, HttpPendingRequestsService) {
                return {
                    request: function (config) {
                        config = config || {};
                        if (config.timeout === undefined && !config.noCancelOnRouteChange) {
                            config.timeout = HttpPendingRequestsService.newTimeout();
                        }
                        return config;
                    },
                    responseError: function (response) {
                        if (response.config.timeout.isGloballyCancelled) {
                            return $q.defer().promise;
                        }
                        return $q.reject(response);
                    }
                };
            });
}).call(this);


