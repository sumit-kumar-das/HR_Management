(function (){
    "use strict";
angular.module('app.department')
        .factory('getDepartmentDetails',getDepartmentDetails)
        .factory('addDepartmentDetails',addDepartmentDetails)
        .factory('deleteDepartment',deleteDepartment)
        .factory('changeDepartmentStatus',changeDepartmentStatus)
        .factory('editDepartment',editDepartment)
        .factory('getBroadGroupList',getBroadGroupList);

getDepartmentDetails.$inject =['$resource','CONSTANT'];
addDepartmentDetails.$inject =['$resource','CONSTANT'];
deleteDepartment.$inject =['$resource','CONSTANT'];
changeDepartmentStatus.$inject =['$resource','CONSTANT'];
editDepartment.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];

function getDepartmentDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowDepartment?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};

function addDepartmentDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddDepartment?Code=:Code&Name=:Name&Hod=:Hod&IsActive=:IsActive&UserId=:UserId', {
                Code: '@Code',
                Name: '@Name',
                Hod:'@Hod',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};
function deleteDepartment($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionDepartment?DepartmentId=:DepartmentId&ActionBit=False&ActionType=DEL',{
     DepartmentId: '@DepartmentId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeDepartmentStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionDepartment?DepartmentId=:DepartmentId&ActionBit=:actionBit&ActionType=INC',{
    DepartmentId:'@DepartmentId',
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
function editDepartment($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditDepartment?DepartmentId=:DepartmentId&Code=:Code&Name=:Name&Hod=:Hod&ActiveStatus=:ActiveStatus&UserId=:UserId', {
                DepartmentId :'@DepartmentId',
                Code: '@Code',
                Name: '@Name',
                Hod:'@Hod',
                ActiveStatus: '@ActiveStatus',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });  
};
})();



