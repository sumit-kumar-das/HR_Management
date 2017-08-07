(function (){
    "use strict";
angular.module('app.user')
        .factory('userService',userService);


userService.$inject =['$resource','CONSTANT'];
function userService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/userManagement/:userId', { userId: '@userId' }, {
        update: {
            method: 'PUT'
        },
        postData:{
            method:'POST',
//            transformRequest: angular.identity,
            headers: {
                'Content-Type': 'undefined'
             }
            
        }
    });
};
})();



