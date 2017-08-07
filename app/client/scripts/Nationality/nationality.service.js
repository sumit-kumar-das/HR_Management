(function (){
    "use strict";
angular.module('app.nationality')
        .factory('getNationalityDetails',getNationalityDetails)
        .factory('addNationalityDetails',addNationalityDetails)
        .factory('deleteNationality',deleteNationality)
        .factory('changeNationalityStatus',changeNationalityStatus)
        .factory('editNationality',editNationality)
        .factory('getBroadGroupList',getBroadGroupList);

getNationalityDetails.$inject =['$resource','CONSTANT'];
addNationalityDetails.$inject =['$resource','CONSTANT'];
deleteNationality.$inject =['$resource','CONSTANT'];
changeNationalityStatus.$inject =['$resource','CONSTANT'];
editNationality.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];

function getNationalityDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowNationality?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};

function addNationalityDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddNationality?Code=:Code&Name=:Name&Hod=:Hod&IsActive=:IsActive&UserId=:UserId', {
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
function deleteNationality($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionNationality?NationalityId=:NationalityId&ActionBit=False&ActionType=DEL',{
     NationalityId: '@NationalityId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeNationalityStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionNationality?NationalityId=:NationalityId&ActionBit=:actionBit&ActionType=INC',{
    NationalityId:'@NationalityId',
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
function editNationality($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditNationality?NationalityId=:NationalityId&Code=:Code&Name=:Name&Hod=:Hod&ActiveStatus=:ActiveStatus&UserId=:UserId', {
                NationalityId :'@NationalityId',
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



