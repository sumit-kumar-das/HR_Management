(function() {
  'use strict';
  angular.module('app.controllers', [])
            .controller('AppCtrl',AppCtrl)
            .controller('HeaderCtrl',HeaderCtrl)
            .controller('NavContainerCtrl',NavContainerCtrl)
            .controller('NavCtrl',NavCtrl)
            .controller('DashboardCtrl',DashboardCtrl);
    
    AppCtrl.$inject = ['$scope','$rootScope','tokenStorage','$q','$state', 'GLOBAL','getTenant'];
    HeaderCtrl.$inject = ['$scope','sessionService','CONSTANT','GLOBAL'];
    NavContainerCtrl.$inject = ['$scope'];
    NavCtrl.$inject = ['$scope','taskStorage','filterFilter','sessionService','CONSTANT','$state','NAVCONSTANT'];
    DashboardCtrl.$inject = ['$scope','$state','$filter','$log'];
    
    function AppCtrl($scope, $rootScope,tokenStorage,$q,$state, GLOBAL,getTenant){        

        var $window;
        $scope.global=GLOBAL;
        $window = $(window);
        $scope.main = {
            brand : "ZSM Testing",
            name: 'zCon'
        };
        
        function CheckLoginStatus(){
//            var deferred = $q.defer();
//            var authTokan = tokenStorage.retrive();
//            if(authTokan){
//                deferred.resolve();
//            }else{
//                deferred.reject();
//            }
//            return deferred.promise;
        }
        
        $scope.pageTransitionOpts = [
                {
                  name: 'Fade up',
                  "class": 'animate-fade-up'
                }, {
                  name: 'Scale up',
                  "class": 'ainmate-scale-up'
                }, {
                  name: 'Slide in from right',
                  "class": 'ainmate-slide-in-right'
                }, {
                  name: 'Flip Y',
                  "class": 'animate-flip-y'
                }
        ];
        $scope.admin = {
            layout: 'wide',
            menu: 'vertical',
            fixedHeader: true,
            fixedSidebar: true,
            pageTransition: $scope.pageTransitionOpts[1]
        };
        $scope.$watch('admin', function(newVal, oldVal) {
            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
              $rootScope.$broadcast('nav:reset');
              return;
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
              if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                $scope.admin.fixedHeader = true;
                $scope.admin.fixedSidebar = true;
              }
              if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                $scope.admin.fixedHeader = false;
                $scope.admin.fixedSidebar = false;
              }
              return;
            }
            if (newVal.fixedSidebar === true) {
              $scope.admin.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
              $scope.admin.fixedSidebar = false;
            }
        }, true);
        return $scope.color = {
          primary: '#5B90BF',
          success: '#A3BE8C',
          info: '#B48EAD',
          infoAlt: '#AB7967',
          warning: '#EBCB8B',
          danger: '#BF616A',
          gray: '#DCDCDC'
        };

        $scope.goToTop = function (){
            alert('error');
        };

    }
    
    function HeaderCtrl($scope,sessionService,CONSTANT,GLOBAL){
        $scope.sessionService = sessionService;
        $scope.constant = CONSTANT;
        $scope.global= GLOBAL;
        $scope.Logout = function (){
            sessionService.logout();
        };
    }
    
    function NavContainerCtrl($scope){
        
    }
    
    function NavCtrl($scope, taskStorage, filterFilter,sessionService,CONSTANT,$state,NAVCONSTANT){
        var tasks;
        $scope.navConstant = NAVCONSTANT;     
        
        
        $scope.sessionService = sessionService;
        $scope.isLoggedIn = sessionService.isLoggedIn();
        $scope.role = sessionService.getUserRole();
        $scope.constant = CONSTANT;
        tasks = $scope.tasks = taskStorage.get();
        $scope.taskRemainingCount = filterFilter(tasks, {
          completed: false
        }).length;
        return $scope.$on('taskRemaining:changed', function(event, count) {
          return $scope.taskRemainingCount = count;
        });
    }
         
    function DashboardCtrl($scope,$state,$filter,$log){
        console.log("Dashboard Controller calling");
    }
    
}).call(this);
