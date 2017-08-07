(function () {
    "use strict";

    angular.module('app.user')
            .controller('UserController', UserController);


    UserController.$inject = ['$scope', 'userService', '$filter', '$log', 'CONSTANT',
        'countryListServiceResolvePromise', 'stateService', 'logger', 'MESSAGE', '$q', 'facilityListService', 'GLOBAL','commonService','emailExistValidationService'];

    function UserController($scope, userService, $filter, $log, CONSTANT,
            countryListServiceResolvePromise, stateService, logger, MESSAGE, $q, facilityListService, GLOBAL,commonService,emailExistValidationService) {
        $log.info("User controller initiated");
        var init;
        $scope.message = MESSAGE;
        $scope.users = [];
        $scope.user = {};
        $scope.constant = CONSTANT;
        $scope.countries = countryListServiceResolvePromise;
        $scope.currentTabMain = true;
        $scope.readStatus = false;
        $scope.formValidStatus = false;
        $scope.updateIndex = null;
        $scope.disableButton = false;
        var tempUser = {};
        var tempIndex;
        var editIndex;
        $scope.user.defaultImage = "g1.jpg";
        $scope.showSpinner = true;
        $scope.imagePath = "images/default.jpg";
        $scope.formAddStatus = true;
        $scope.ascendingOrder = true;
        $scope.format = 'MM-dd-yyyy';

           //Scroller for table
          $('table').on('scroll', function () {
            $("table > *").width($("table").width() + $("table").scrollLeft());
        });
        // To get list of user
        userService.query().$promise.then(function (data) {
            $scope.users = data;
            $scope.showSpinner = false;
            $log.debug("UserController: Successfully get the list of Radiologist");
            init();

        }).catch(function (error) {
            $scope.showSpinner = false;
            throw new Error(error.statusText);
            $log.error("UserController: " + error.statusText);
        });

        //To get list of faility
        facilityListService.getFacility().$promise.then(function (data) {
            $log.debug("RequisitionController: Successfully get the list of Facilities");
            $scope.facilityList = data;
        }).catch(function (error) {
            throw new Error(error.statusText);
            $log.error("RequisitionController: " + error.statusText);
        });
       

        // To get add user
        $scope.onClickAdd = function () {
            $log.debug("UserController: on-click of add user");
            $scope.imagePath = CONSTANT.PROFILEURL + "/MobileRIS_Files/Tenent_1/User_ProfilePhoto/default.jpg";
            $scope.page = "Add";
            $scope.currentTabMain = false;
            $scope.user = null;
            $scope.readStatus = false;
            $scope.formValidStatus = false;
            $scope.formAddStatus = false;
            $scope.file = null;
            $scope.disableButton = false;
        };

        // To get edit user
        $scope.onClickEdit = function (userObj, index) {
            if ($scope.users[index].userId !== $scope.currentPageUsers[index].userId)
            {
                index = $scope.users.indexOf(userObj);
            }
            $log.debug("UserController: on-click of edit user");
            $scope.page = "Edit";
            $scope.currentTabMain = false;
            $scope.readStatus = false;
            $scope.user = $scope.users[index];
            $scope.userForm.$setPristine();
            tempUser = angular.copy($scope.users[index]);
            $scope.roleType = true;
            var fullPath = tempUser.profilePicturePath;
            if (fullPath !== null) {
                if (fullPath.indexOf("\\") !== -1)
                {                    
                    $scope.imagePath = fullPath.substring(fullPath.indexOf("MobileRIS_Files") - 1, fullPath.length) +"?time="+new Date().getTime();
                } else if (fullPath.indexOf("/") !== -1){
                    $scope.imagePath = fullPath.substring(fullPath.indexOf("MobileRIS_Files") - 1, fullPath.length) +"?time="+new Date().getTime();
                }else{
//                    $scope.imagePath = CONSTANT.SERVICEURL + "/app/Resources/MobileRIS_Files/Tenent_1/User_ProfilePhoto/default.jpg";
                    $scope.imagePath = GLOBAL.DEFAULTPROFILEURL;
                }
            }
            tempIndex = index;
            editIndex = index;
            $scope.formValidStatus = false;
            $scope.updateIndex = index;
            $scope.formAddStatus = true;
            $scope.GetStates();
            $scope.file = null;
        };
        
        $scope.blurEmail = function(){            
            emailExistValidationService.checkEmail({"tenantName":GLOBAL.TENANTNAME,"emailId": $scope.user.emailId}).then(function(flag){                   
                if(flag.data){                
                    $scope.existEmail = true;
                }else {                
                    $scope.existEmail = false;  
                }
            });         
        }; 

        // To get view user
        $scope.onClickView = function (userObj, index) {
            if ($scope.users[index].userId !== $scope.currentPageUsers[index].userId)
            {
                index = $scope.users.indexOf(userObj);
            }
            $log.debug("UserController: on-click of view user");
            $scope.page = "View";
            $scope.currentTabMain = false;
            $scope.readStatus = true;
            $scope.user = $scope.users[index];
            tempUser = angular.copy($scope.users[index]);
            var fullPath = tempUser.profilePicturePath;
            tempIndex = index;
            $scope.formValidStatus = false;
            $scope.formAddStatus = true;
            $scope.GetStates();
            if (fullPath !== null) {
                if (fullPath.indexOf("\\") !== -1)
                {
                    $scope.imagePath = fullPath.substring(fullPath.indexOf("MobileRIS_Files") - 1, fullPath.length) +"?time="+new Date().getTime();
                } else if (fullPath.indexOf("/") !== -1){
                    $scope.imagePath = fullPath.substring(fullPath.indexOf("MobileRIS_Files") - 1, fullPath.length) +"?time="+new Date().getTime();
                }else{
//                    $scope.imagePath = CONSTANT.SERVICEURL + "/app/Resources/MobileRIS_Files/Tenent_1/User_ProfilePhoto/default.jpg";
                    $scope.imagePath = GLOBAL.DEFAULTPROFILEURL;
                }
            }
            $scope.file = null;
        };

        // To get back to list of user 
        $scope.onClickList = function () {
            $scope.users[tempIndex] = tempUser;
            $scope.currentTabMain = true;
            $scope.userForm.$setPristine();
            init();
        };

        // To get states
        $scope.GetStates = function () {
            if ($scope.user.countryId === undefined)
            {
                logger.logWarning($scope.message.COUNTRY);
            } else {
                console.log($scope.user.countryId);
                stateService.query({country_id: $scope.user.countryId}).$promise.then(function (response) {
                    $scope.states = response;
                    $log.debug("UserController: Successfully get the list of states");
                }).catch(function (error) {
                    throw new Error(error.statusText);
                    $log.error("UserController: " + error.statusText);
                });
            }
        };

        // To delete user
        $scope.deleteUser = function (userObj, index) {
            if ($scope.users[index].userId !== $scope.currentPageUsers[index].userId)
            {
                index = $scope.users.indexOf(userObj);
            }
            var user = $scope.users[index];
            userService.delete({userId: user.userId}).$promise.then(function () {
                $log.debug("UserController: successfully deleted user");
                $scope.users.splice(index, 1);
                logger.logSuccess($scope.message.DELETE_SUCCESS);
                init();
            }).catch(function (error) {
                throw new Error(error.statusText);
                $log.error("UserController: " + error.statusText);
            });
        };

        var GetBase64Data = function () {
            // Upload.base64DataUrl($scope.file).then(function(urls){
            //     console.log(urls);
            // });
            var deffered = $q.defer();
            var f = $scope.file;
            var r = new FileReader();
            r.onloadend = function (e) { //callback after files finish loading
                var baseData = e.target.result;
                $scope.user.profilePictureValue = baseData.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                deffered.resolve();
                //here you can send data over your server as desired
            };
            if ($scope.file !== null) {
                r.readAsDataURL(f); //once defined all callbacks, begin reading the file
            }
            return deffered.promise;
        };

        // To save user
        $scope.Submit = function (userStatus) {

            if (!userStatus)
            {
                $scope.formValidStatus = true;
                $log.debug("UserController: form data is not valid");
                logger.logError($scope.message.REQUIRED_CHECK);
            } else
            {
                $scope.disableButton = true;
                $scope.formValidStatus = false;
                if ($scope.page === "Add")
                {
                    if ($scope.user.facilityId === angular.undefind) {
                        $scope.user.facilityId = null;
                    }
                    $scope.showSpinner = true;
                    $scope.user.dob = $filter('date')($scope.user.dob, 'yyyy-MM-dd');
                    $scope.user.userName = null;
                    commonService.GetBase64Data($scope.file).then(function (base64Data) {
                        $scope.user.profilePictureValue = null;
                        if(base64Data !== ''){
                            $scope.user.profilePictureValue = base64Data;
                        }
                        userService.save($scope.user).$promise.then(function (data) {
                            $scope.disableButton = false;
                            $scope.showSpinner = false;
                            if (data !== null)
                            {
                                $scope.users.unshift(data);
                                $scope.currentTabMain = true;
                                logger.logSuccess($scope.message.ADD_SUCCESS);
                                init();
                            }
                        }).catch(function (error) {
                            $scope.disableButton = false;
                            $scope.showSpinner = false;
                            if (error.data.message !== null || error.data.message === undefined) {
                                if (error.data.message.contains('ConstraintViolationException')) {
                                    alert("This email id is already registred ! Please select other email id");
                                }
                            } else {
                                throw new Error(error.statusText);
                                alert("file upload error");
                            }
                        });
                    }).catch(function () {
                        $scope.disableButton = false;
                    });
                } else if ($scope.page === "Edit") {
                    $scope.user.dob = $filter('date')($scope.user.dob, 'yyyy-MM-dd');
                    commonService.GetBase64Data($scope.file).then(function (base64Data) {
                        $scope.user.profilePictureValue = null;
                        if(base64Data !== ''){
                            $scope.user.profilePictureValue = base64Data;
                        }
                        userService.update($scope.user).$promise.then(function (data) {
                            $scope.disableButton = false;
                            $scope.showSpinner = false;
                            if (data !== null)
                            {
                                $scope.users.unshift(data);
                                $scope.currentTabMain = true;
                                logger.logSuccess($scope.message.ADD_SUCCESS);
                                init();
                            }
                        }).catch(function () {
                            $scope.disableButton = false;
                            $scope.showSpinner = false;
                            alert("file upload error");
                        });
                    }).catch(function () {
                        $scope.disableButton = false;
                    });
                }
            }
            ;
        };

        // Pagination
        $scope.searchKeywords = '';
        $scope.filteredUsers = [];
        $scope.row = '';
        $scope.select = function (page) {
            var end, start;
            if ($scope.numPerPage === 'All')
            {
                start = (page - 1) * $scope.filteredUsers.length;
                end = start + $scope.filteredUsers.length;
            } else
            {
                start = (page - 1) * $scope.numPerPage;
                end = start + $scope.numPerPage;
            }
            return $scope.currentPageUsers = $scope.filteredUsers.slice(start, end);

        };
        $scope.onFilterChange = function () {
            $scope.select(1);
            $scope.currentPage = 1;
            return $scope.row = '';
        };
        $scope.onNumPerPageChange = function () {
            $scope.select(1);
            return $scope.currentPage = 1;
        };
        $scope.onOrderChange = function () {
            $scope.select(1);
            return $scope.currentPage = 1;
        };
        $scope.search = function () {
            $scope.filteredUsers = $filter('filter')($scope.users, $scope.searchKeywords);
            return $scope.onFilterChange();
        };
        $scope.order = function (rowName) {
            $scope.ascendingOrder = !$scope.ascendingOrder;
            if ($scope.row === rowName) {
                return;
            }
            $scope.row = rowName;
            $scope.filteredUsers = $filter('orderBy')($scope.users, rowName);
            return $scope.onOrderChange();
        };
        $scope.numPerPageOpt = [10, 20, 50, 100, 'All'];
        $scope.numPerPage = $scope.numPerPageOpt[0];
        $scope.currentPage = 1;
        $scope.currentPageUsers = [];
        init = function () {
            $scope.search();
            return $scope.select($scope.currentPage);
        };
        return init();
    }
    ;
})();