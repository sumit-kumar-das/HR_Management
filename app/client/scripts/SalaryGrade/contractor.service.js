(function (){
    "use strict";
angular.module('app.contractor')
        .factory('getContractorDetails',getContractorDetails)
        .factory('addContractorDetails',addContractorDetails)
        .factory('deleteContractors',deleteContractors)
        .factory('changeContractorStatus',changeContractorStatus)
        .factory('editContractor',editContractor)
        .factory('getBroadGroupList',getBroadGroupList);

getContractorDetails.$inject =['$resource','CONSTANT'];
addContractorDetails.$inject =['$resource','CONSTANT'];
deleteContractors.$inject =['$resource','CONSTANT'];
changeContractorStatus.$inject =['$resource','CONSTANT'];
editContractor.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];
function getContractorDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowContractor?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};
function addContractorDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddContractor?Code=:Code&Name=:Name&Address=:Address&ContractFromDate=:ContractFromDate&ContractTillDate=:ContractTillDate&Notes=:Notes&IsActive=:IsActive&UserId=:UserId', {
                Code: '@Code',
                Name: '@Name',
                Address:'@Address',
                ContractFromDate:'@ContractFromDate',
                ContractTillDate:'@ContractTillDate',
                Notes:'@Notes',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};
function deleteContractors($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionContractor?ContractorId=:contractorId&ActionBit=False&ActionType=DEL',{
     contractorId: '@contractorId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeContractorStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionContractor?ContractorId=:contractorId&ActionBit=:actionBit&ActionType=INC',{
    contractorId:'@contractorId',
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

function editContractor($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditContractor?ContractorId=:ContractorId&Code=:Code&Name=:Name&Address=:Address&ContractFromDate=:ContractFromDate&ContractTillDate=:ContractTillDate&Notes=:Notes&ActiveStatus=:ActiveStatus&UserId=:UserId', {
                ContractorId :'@ContractorId',
                Code: '@Code',
                Name: '@Name',
                Notes: '@Notes',
                ContractFromDate:'@ContractFromDate',
                ContractTillDate:'@ContractTillDate',
                ActiveStatus: '@ActiveStatus',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });  
};
})();



