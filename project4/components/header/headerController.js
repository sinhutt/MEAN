'use strict';

cs142App.controller('HeaderController', ['$scope', function($scope) {
    $scope.image = cs142models.headerModel().src;
    $scope.imageList = cs142models.headerModel().imgList;

   	$scope.clickImg = function(currImg) {
   	$scope.image = currImg;
   };
}]);
