'use strict';

// cs142App.controller('UserDetailController', ['$scope', '$routeParams',
  // function ($scope, $routeParams) {

cs142App.controller('UserDetailController', ['$scope', '$rootScope', '$routeParams',
  function ($scope, $rootScope, $routeParams) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;
    $scope.userId = userId;

    $rootScope.contentDisplayed = $scope.userName;
    $rootScope.FetchModel('/user/'+userId, function(data){
        // do something with your data
        $scope.$apply(function() {
            $scope.firstName = data.first_name;
            $scope.lastName = data.last_name;
            $scope.userName = $scope.firstName + ' ' + $scope.lastName;
            $scope.location = data.location;
            $scope.description = data.description;
            $scope.occupation = data.occupation;

            $rootScope.contentDisplayed = $scope.userName;
        });
    });
  }]);

