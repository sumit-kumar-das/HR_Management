(function (){
    "use strict";
angular.module('app.schduleTest')
        .factory('getSiteDetails',getSiteDetails)
        .factory('deleteSites',deleteSites)
        .factory('changeSiteStatus',changeSiteStatus)
        .factory('editSite',editSite)
        .factory('addSiteDetails',addSiteDetails);


getSiteDetails.$inject =['$resource','CONSTANT'];
deleteSites.$inject =['$resource','CONSTANT'];
changeSiteStatus.$inject =['$resource','CONSTANT'];
editSite.$inject =['$resource','CONSTANT'];
addSiteDetails.$inject =['$resource','CONSTANT'];
function getSiteDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowSite?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4',{ 
    'query':  {method:'GET',isArray:true}
    });
};
function addSiteDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddSite?Home=:Home&Address_1=:Address_1&Address_2=:Address_2&District=:District&State=:State&City=:City&Email=:Email&Country=:Country&Mobile=:Mobile&Cell=:Cell'
                  +'&IsActive=:IsActive&UserId=:UserId', {
                  Home: '@Home',
                  Address_1: '@Address_1',
                  Address_2: '@Address_2',
                  District: '@District',
                  State: '@State',
                  City: '@City',
                  Email: '@Email',
                  Country: '@Country',
                  Mobile:'@Mobile',
                  Cell:'@Cell',
                  IsActive: '@IsActive',
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};
function deleteSites($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionSite?SiteId=:siteId&ActionBit=False&ActionType=DEL',{
     siteId: '@siteId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeSiteStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionSite?SiteId=:siteId&ActionBit=:actionBit&ActionType=INC',{
    siteId:'@siteId',
    actionBit:'@actionBit'
 },{
    'query':  {method:'GET',isArray:false}
    });      
};
function editSite($resource,CONSTANT){
   return $resource(CONSTANT.SERVICEURL + 'EditSite?SiteId=:SiteId&Name=:Name&Address_1=:Address_1&Address_2=:Address_2&District=:District&State=:State&City=:City&Email=:Email&Country=:Country&Mobile=:Mobile&Cell=:Cell'
                  +'&IsActive=:IsActive&UserId=:UserId', {
                  Name: '@Name',
                  Address_1: '@Address_1',
                  Address_2: '@Address_2',
                  District: '@District',
                  State: '@State',
                  City: '@City',
                  Email: '@Email',
                  Country: '@Country',
                  Mobile:'@Mobile',
                  Cell:'@Cell',
                  IsActive: '@IsActive',
                  UserId: 'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    }); 
};
//http://localhost:3705/api/Master/ActionSite?SiteId=D441B78D-121E-464B-91E1-9FA2ED857CAA&ActionBit=False&ActionType=INC
          
//http://localhost:3705/api/Master/ActionSite?SiteId=D441B78D-121E-464B-91E1-9FA2ED857CAA&ActionBit=False&ActionType=DEL
})();



