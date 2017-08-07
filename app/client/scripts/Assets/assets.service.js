(function (){
    "use strict";
angular.module('app.assetsList')
        .factory('getCompanyDetails',getCompanyDetails);


getCompanyDetails.$inject =['$resource','CONSTANT'];
//http://localhost:3705/api/Master/ShowCompany?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4
function getCompanyDetails($resource,CONSTANT){
    //ShowSite?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4
    //ShowGrade?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4
    return $resource(CONSTANT.SERVICEURL +'ShowCompany?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};
})();



