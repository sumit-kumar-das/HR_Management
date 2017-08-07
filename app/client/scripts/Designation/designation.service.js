(function (){
    "use strict";
angular.module('app.designation')
        .factory('getDesignationDetails',getDesignationDetails)
        .factory('addDesignationDetails',addDesignationDetails)
        .factory('deleteDesignation',deleteDesignation)
        .factory('changeDesignationStatus',changeDesignationStatus)
        .factory('editDesignation',editDesignation)
        .factory('getBroadGroupList',getBroadGroupList);

getDesignationDetails.$inject =['$resource','CONSTANT'];
addDesignationDetails.$inject =['$resource','CONSTANT'];
deleteDesignation.$inject =['$resource','CONSTANT'];
changeDesignationStatus.$inject =['$resource','CONSTANT'];
editDesignation.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];

function getDesignationDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowDesignation?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};

function addDesignationDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddDesignation?Code=:Code&Name=:Name&Hod=:Hod&IsActive=:IsActive&UserId=:UserId', {
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
function deleteDesignation($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionDesignation?DesignationId=:DesignationId&ActionBit=False&ActionType=DEL',{
     DesignationId: '@DesignationId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeDesignationStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionDesignation?DesignationId=:DesignationId&ActionBit=:actionBit&ActionType=INC',{
    DesignationId:'@DesignationId',
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
function editDesignation($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditDesignation?DesignationId=:DesignationId&Code=:Code&Name=:Name&Hod=:Hod&ActiveStatus=:ActiveStatus&UserId=:UserId', {
                DesignationId :'@DesignationId',
                Code: '@Code',
                Name: '@Name',
                ActiveStatus: '@ActiveStatus',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });  
};
})();



