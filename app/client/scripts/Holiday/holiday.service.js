(function (){
    "use strict";
angular.module('app.holiday')
        .factory('getHolidayDetails',getHolidayDetails)
        .factory('addHolidayDetails',addHolidayDetails)
        .factory('deleteHolidays',deleteHolidays)
        .factory('changeHolidayStatus',changeHolidayStatus)
        .factory('editHoliday',editHoliday)
        .factory('getBroadGroupList',getBroadGroupList);

getHolidayDetails.$inject =['$resource','CONSTANT'];
addHolidayDetails.$inject =['$resource','CONSTANT'];
deleteHolidays.$inject =['$resource','CONSTANT'];
changeHolidayStatus.$inject =['$resource','CONSTANT'];
editHoliday.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];	
function getHolidayDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowHoliday?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};
function addHolidayDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddHoliday?Name=:Name&Date=:HoliDayDate&IsActive=:IsActive&UserId=:UserId', {
                Name: '@Name',
                HoliDayDate: '@HoliDayDate',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};

function deleteHolidays($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionHoliday?HolidayId=:holidayId&ActionBit=false&ActionType=DEL',{
     holidayId: '@holidayId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeHolidayStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionHoliday?HolidayId=:HolidayId&ActionBit=:actionBit&ActionType=INC',{
    HolidayId:'@HolidayId',
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

function editHoliday($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditHoliDay?HolidayId=:HolidayId&Name=:Name&Date=:HolidayDate&ActiveStatus=:IsActive&UserId=:UserId', {
                HolidayId :'@HolidayId',
                Name: '@Name',
		HolidayDate: '@HolidayDate',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });  
};
})();



