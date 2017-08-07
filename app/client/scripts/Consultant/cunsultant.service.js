(function (){
    "use strict";
angular.module('app.cunsultant')
        .factory('getCunsultantDetails',getCunsultantDetails)
        .factory('addCunsultantDetails',addCunsultantDetails)
        .factory('deleteCunsultants',deleteCunsultants)
        .factory('changeCunsultantStatus',changeCunsultantStatus)
        .factory('editCunsultant',editCunsultant)
        .factory('getBroadGroupList',getBroadGroupList);

getCunsultantDetails.$inject =['$resource','CONSTANT'];
addCunsultantDetails.$inject =['$resource','CONSTANT'];
deleteCunsultants.$inject =['$resource','CONSTANT'];
changeCunsultantStatus.$inject =['$resource','CONSTANT'];
editCunsultant.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];
function getCunsultantDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowConsultant?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};
function addCunsultantDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddConsultant?ConType=:ConType&Name=:Name&Address=:Address&IsActive=:IsActive&UserId=:UserId', {
                ConType: '@ConType',
                Name: '@Name',
                Address:'@Address',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};
function deleteCunsultants($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionConsultant?ConId=:ConId&ActionBit=false&ActionType=DEL',{
     ConId: '@ConId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeCunsultantStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionConsultant?ConId=:ConId&ActionBit=:actionBit&ActionType=INC',{
    ConId:'@ConId',
    actionBit:'@actionBit'
 },{
    'query':  {method:'GET',isArray:false}
    });      
};
function getBroadGroupList($resource,CONSTANT){
  return $resource(CONSTANT.SERVICEURL +'SelectionBroadGroup?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });  
};

function editCunsultant($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditConsultant?ConId=:ConId&Name=:Name&Address=:Address&ActiveStatus=:ActiveStatus&UserId=:UserId', {
                ConId :'@ConId',
                Name: '@Name',
                Address: '@Address',
                ActiveStatus: '@ActiveStatus',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });  
};
})();



