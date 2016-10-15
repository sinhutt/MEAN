'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            otherwise({
                redirectTo: '/users'
                // redirectTo: ''
            });
    }]);

cs142App.controller('MainController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
        $scope.main = {};
        $scope.main.title = 'Users';

        $rootScope.FetchModel = function(url, doneCallback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        var data = JSON.parse(httpRequest.responseText);
                        if (doneCallback) doneCallback(data);
                    }
                }
            }
            httpRequest.open('GET', url);
            httpRequest.send();
        };

        $rootScope.FetchModel('/test/info', function(data){
            // do something with your data
            $scope.$apply(function() {
                $scope.versionNumber = data.__v;
                $scope.versionInfo = 'Version ' + $scope.versionNumber;
            });
        });
        $rootScope.contentDisplayed = 'List of Users';
        
    }]);

