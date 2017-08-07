(function (){
    "use strict";
angular.module('app.grade')
        .factory('getGradeDetails',getGradeDetails)
        .factory('addGradeDetails',addGradeDetails)
        .factory('deleteGrades',deleteGrades)
        .factory('changeGradeStatus',changeGradeStatus)
        .factory('editGrade',editGrade)
        .factory('getBroadGroupList',getBroadGroupList);

getGradeDetails.$inject =['$resource','CONSTANT'];
addGradeDetails.$inject =['$resource','CONSTANT'];
deleteGrades.$inject =['$resource','CONSTANT'];
changeGradeStatus.$inject =['$resource','CONSTANT'];
editGrade.$inject =['$resource','CONSTANT'];
getBroadGroupList.$inject =['$resource','CONSTANT'];
function getGradeDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL +'ShowGrade?UserId=BD34F444-C83F-44B3-B28F-2850A75551C4', { 
    'query':  {method:'GET',isArray:true}
    });
};
function addGradeDetails($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'AddGrade?Code=:Code&Home=:Home&BoardGroup=:BoardGroup&IsActive=:IsActive&UserId=:UserId', {
                Code: '@Code',
                Home: '@Home',
                BoardGroup:'@BoardGroup',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });
};
function deleteGrades($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionGrade?GradeId=:gradeId&ActionBit=False&ActionType=DEL',{
     gradeId: '@gradeId'
 },{ 
    'query':  {method:'GET',isArray:false}
    });   
};
function changeGradeStatus($resource,CONSTANT){
 return $resource(CONSTANT.SERVICEURL +'ActionGrade?GradeId=:gradeId&ActionBit=:actionBit&ActionType=ACI',{
    gradeId:'@gradeId',
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
function editGrade($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + 'EditGrade?GradeId=:GradeId&Code=:Code&Name=:Name&BroadGrId=:BroadGrId&IsActive=:IsActive&UserId=:UserId', {
                GradeId :'@GradeId',
                Code: '@Code',
                Name: '@Name',
                BroadGrId:'@BroadGrId',
                IsActive: '@IsActive',
                UserId:'BD34F444-C83F-44B3-B28F-2850A75551C4'
            }, { 
    'query':  
            {method:'GET',isArray:false}
    });  
};
})();



