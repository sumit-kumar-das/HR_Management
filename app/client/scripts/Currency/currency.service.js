(function (){
    "use strict";
angular.module('app.currency')
        .factory('getCurrencyDetails',getCurrencyDetails)
        .factory('addCurrencyDetails',addCurrencyDetails)
        .factory('deleteCurrency',deleteCurrency)
        .factory('changeCurrencyStatus',changeCurrencyStatus)
        .factory('editCurrency',editCurrency)
        .factory('getBroadGroupList',getBroadGroupList);

getCurrencyDetails.$inject =['$resource','CONSTANT'];
addCurrencyDetails.$inject =['$resource','CONSTANT'];
deleteCurrency.$inject =['$resource','CONSTANT'];
changeCurrencyStatus.$inject =['$resource','CONSTANT'];
editCurrency.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];

function getCurrencyDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowCurrency?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};

function addCurrencyDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddCurrency?Code=:Code&Name=:Name&CountryId=:CountryId&IsActive=:IsActive&UserId=:UserId', {
                Code: '@Code',
                Name: '@Name',
                CountryId:'@CountryId',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};
function deleteCurrency($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionCurrency?Cid=:Cid&ActionBit=False&ActionType=DEL',{
     Cid: '@Cid'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeCurrencyStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionCurrency?Cid=:Cid&ActionBit=:actionBit&ActionType=INC',{
    Cid:'@Cid',
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
function editCurrency($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditCurrency?Cid=:Cid&Code=:Code&Name=:Name&CountryId=:CountryId&ActiveStatus=:ActiveStatus&UserId=:UserId', {
                Cid :'@Cid',
                Code: '@Code',
                Name: '@Name',
                CountryId:'@CountryId',
                ActiveStatus: '@ActiveStatus',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':    
            {method:'GET',isArray:false}
    });  
};
})();



