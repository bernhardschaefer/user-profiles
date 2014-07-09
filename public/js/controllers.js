'use strict';

/* Controllers */

var userControllers = angular.module('userProfilesApp.controllers', []);

userControllers.controller('UserListCtrl', function($scope, User) {
  $scope.users = User.query();
  $scope.orderProp = "first_name"; // set initial order criteria

  $scope.delete = function(userId) {
    User.delete({id: userId}, {}, function(value, responseHeaders) {
      $scope.users = User.query();
    }, handleError);
  };
});

userControllers.controller('UserCtrl', function($scope, $routeParams, $location, User) {
  var userId = $routeParams.userId;
  if (userId === undefined ) {
    // we are creating a new user
    $scope.user = {};
  }
  else {
    // an existing user is updated --> fetch user based on id
    $scope.user = User.get({id: userId}, function(value, responseHeaders) { }, handleError);
  }

  $scope.update = function() {
    User.update({id: $scope.user._id}, $scope.user, function(value, responseHeaders) { 
      // redirect to user list page after successful update
      $location.path('users');
    }, handleError);
  };

  $scope.create = function() {
    User.create({}, $scope.user, function(value, responseHeaders) {
      // redirect to user list page after successful creation
      $location.path('users');
    }, handleError);
  };

});

var handleError = function(httpResponse) {
  alert('An error occurred. See console log for details.');
  console.log(httpResponse);
};
