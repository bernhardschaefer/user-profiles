'use strict';

/* App Module */
var userProfilesApp = angular.module('userProfilesApp', [
  'ngRoute',
  'userProfilesApp.controllers',
  'userProfilesApp.services'
]);

/* Routing */
userProfilesApp.config(function($routeProvider) {
  $routeProvider.
    when('/users', {
      templateUrl: 'partials/user-list.html',
      controller: 'UserListCtrl'
    }).
    when('/users/create', {
      templateUrl: 'partials/user-form.html',
      controller: 'UserCtrl'
    }).
    when('/users/update/:userId', {
      templateUrl: 'partials/user-form.html',
      controller: 'UserCtrl'
    }).
    otherwise({
      redirectTo: '/users'
    });
});
