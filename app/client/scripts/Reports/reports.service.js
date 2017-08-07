(function (){
    "use strict";
angular.module('app.reports')
                .factory('getAllAssetsGroupType',getAllAssetsGroupType)
                .factory('getAssetsGroup',getAssetsGroup)
                .factory('getAllAssetsType',getAllAssetsType)
                .factory('getAllAssetsByAssetTypeId',getAllAssetsByAssetTypeId)
                .factory('getAllTestResultByFilter',getAllTestResultByFilter)
                .factory('getAssetTemplateByAssetId',getAssetTemplateByAssetId)
                .factory('getAssetHeaderFieldsByAssetTypeId',getAssetHeaderFieldsByAssetTypeId);


getAllAssetsGroupType.$inject = ['$resource','CONSTANT'];
getAssetsGroup.$inject = ['$resource','CONSTANT'];
getAllAssetsType.$inject = ['$resource','CONSTANT'];
getAllAssetsByAssetTypeId.$inject = ['$resource','CONSTANT'];
getAllTestResultByFilter.$inject = ['$resource','CONSTANT'];
getAssetTemplateByAssetId.$inject = ['$resource','CONSTANT'];
getAssetHeaderFieldsByAssetTypeId.$inject = ['$resource','CONSTANT'];
function getAllAssetsGroupType($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/testDetails/getAllAssetGroupTypes', {}, { 
    'query':  {method:'GET',isArray:true}
    });
}
//TransformerTest/api/testDetails/getAssetGroupByAssetGrpTypeId/
function getAssetsGroup($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/testDetails/getAssetGroupByAssetGrpTypeId/:assetGrpTypeId', {assetGrpTypeId:'@assetGrpTypeId'}, { 
    'query':  {method:'GET',isArray:true}
    });
}
function getAllAssetsType($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/testDetails/getAllAssetTypes', {}, { 
    'query':  {method:'GET',isArray:true}
    });
}
function getAllAssetsByAssetTypeId($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/testDetails/getAllAssetsByAssetTypeId/:typeId', {typeId:'@typeId'}, { 
    'query':  
            {method:'GET',isArray:true}
    });
}
function getAllTestResultByFilter($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/testDetails/getAllTestResultByFilter', {
                fromDate: '@fromDate',
                toDate: '@toDate',
                assetGroupId:'@assetGroupId',
                assetTypeId: '@assetTypeId',
                assetsId:'@assetsId'
            }, { 
    'query':  
            {method:'POST',isArray:true}
    });
}
function getAssetTemplateByAssetId($resource,CONSTANT){
     return $resource(CONSTANT.SERVICEURL + '/api/testDetails/getAssetsByAssetId/:typeId', {typeId:'@typeId'}, { 
    'query':  
            {method:'GET',isArray:true}
    });
}

function getAssetHeaderFieldsByAssetTypeId($resource,CONSTANT){
     return $resource(CONSTANT.SERVICEURL + '/api/ManualAssetTypes/getAssetHeaderFieldsByAssetTypeId/:typeId', {typeId:'@typeId'}, { 
    'query':  
            {method:'GET',isArray:true}
    });
}
})();



