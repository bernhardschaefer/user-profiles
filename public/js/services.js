'use strict';

/* Services */
var userProfilesServices = angular.module('userProfilesApp.services', ['ngResource']);

userProfilesServices.factory('User', function($resource){
  return $resource('/api/users/:id', {}, {
    create : {method: 'POST'},
    update : {method: 'PUT' },
    get    : {method: 'GET' },
    query  : {method: 'GET', isArray: true}
    // delete, query, etc. are default resource actions
    // see http://docs.angularjs.org/api/ngResource/service/$resource 
  });
});
