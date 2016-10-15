'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$rootScope', '$routeParams',
  function($scope, $rootScope, $routeParams) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;

    $rootScope.FetchModel('/user/' + userId, function(data){
        // do something with your data
        $scope.$apply(function() {
            $scope.userName = data.first_name + ' ' + data.last_name;
            $rootScope.contentDisplayed = 'Photos of ' + $scope.userName;
        });
    });

    $rootScope.FetchModel('/photosOfUser/' + userId, function(data){
        // do something with your data
        $scope.$apply(function() {
            $scope.photoList = data;
            $scope.photoNameList = [];
            for (var i = 0; i < $scope.photoList.length; i++) {
                console.log($scope.photoList[i]);
                $scope.photoNameList.push('images/' + $scope.photoList[i].file_name);
            }
        });
    });

  }]);


