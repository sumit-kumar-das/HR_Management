(function () {
    "use strict";
    angular.module('app.account').config(function ($stateProvider) {
        $stateProvider
                .state('500', {
                    url: '/500',
                    templateUrl: 'views/pages/500.html'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: 'views/pages/404.html'
                })
                .state('blank', {
                    url: '/blank',
                    templateUrl: 'views/pages/blank.html'
                })
                .state('forgotCredentials', {
                    url: '/forgotCredentials',
                    templateUrl: 'views/pages/forgotCredentials.html',
                    controller: 'forgotCredentialsController'
                })
                .state('invoice', {
                    url: '/invoice',
                    templateUrl: 'views/pages/invoice.html'
                })
                .state('lock-screen', {
                    url: '/lock-screen',
                    templateUrl: 'views/pages/lock-screen.html'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'views/pages/profile.html'
                })
                .state('signin', {
                    url: '/signin',
                    templateUrl: 'views/pages/signin.html',
                    controller: 'LoginController'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'views/pages/signup.html'
                })
                .state('401', {
                    url: '/401',
                    templateUrl: 'views/pages/401.html'
                });
    })
            .run(function ($state, $location, $window) {
                $state.go('signin');

            });
})();


