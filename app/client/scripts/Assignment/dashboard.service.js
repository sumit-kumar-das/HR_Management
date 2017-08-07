/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function (){
    "use strict";
angular.module('app.controllers') 
        .factory('casesByModalityService',casesByModalityService)
        .factory('volumeByFacilityService',volumeByFacilityService)
        .factory('distanceByTechnologistService',distanceByTechnologistService)
        .factory('maximumCompleteTimeService',maximumCompleteTimeService)
        .factory('averageCompleteTimeService',averageCompleteTimeService);

    casesByModalityService.$inject=['$resource','CONSTANT'];
    volumeByFacilityService.$inject=['$resource','CONSTANT'];
    distanceByTechnologistService.$inject=['$resource','CONSTANT'];
    maximumCompleteTimeService.$inject=['$resource','CONSTANT'];
    averageCompleteTimeService.$inject=['$resource','CONSTANT'];

function casesByModalityService($resource,CONSTANT){    
    return $resource(CONSTANT.SERVICEURL + '/api/dashBoard/totalCompletedCasesByModality', {}, {
        update: {
            method: 'PUT'
        },
        fetchRecords: {
            method: 'POST',
            isArray : true
        }
    });
};

function volumeByFacilityService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/dashBoard/highestVolumeByFacility', {}, {
        update: {
            method: 'PUT'
        },
        fetchRecords: {
            method: 'POST',
            isArray : true
        }
    });
};

function distanceByTechnologistService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/dashBoard/averageDistanceByTechnologist', {}, {
        update: {
            method: 'PUT'
        },
        fetchRecords: {
            method: 'POST',
            isArray : true
        }
    });
};

function maximumCompleteTimeService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/dashBoard/maximumCompleteTimeTechnologist', {}, {
        update: {
            method: 'PUT'
        },
        fetchRecords: {
            method: 'POST',
            isArray : true
        }
    });
};

function averageCompleteTimeService($resource,CONSTANT){
    return $resource(CONSTANT.SERVICEURL + '/api/dashBoard/averageCompleteTimeTechnologist', {}, {
        update: {
            method: 'PUT'
        },
        fetchRecords: {
            method: 'POST',
            isArray : true
        }
    });
};


})();
