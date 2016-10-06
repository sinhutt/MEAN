'use strict';
/**
 * Define StatesController for the states component of CS142 project #4
 * problem #2.  The model data for this view (the states) is available
 * at window.cs142models.statesModel().
 */

cs142App.controller('StatesController', ['$scope', function($scope) {

   // Replace this with the code for CS142 Project #4, Problem #2

   if ($scope.main) {
      $scope.main.title = 'CS142 Project #4 - States';
   }

   $scope.states = window.cs142models.statesModel();
   $scope.statesAfterFilter;
   $scope.substring = '';
   $scope.match = false;
   $scope.noMatch = false;


   $scope.filterStates = function(substring) {
   	if (!$scope.substring) {
   		$scope.statesAfterFilter = [];
   		for (var i = 0; i < $scope.states.length; i++) {
   			if ($scope.states[i].toLowerCase().includes(substring.toLowerCase())) {
   				$scope.statesAfterFilter.push($scope.states[i]);
   			}
   		}
   		if ($scope.statesAfterFilter.length === 0) {
   			$scope.match = false;
   			$scope.noMatch = true;
   		} else {
   			$scope.noMatch = false;
   			$scope.match = true;
   		}
   	} else {
   		$scope.match = true;
   		$scope.statesAfterFilter = $scope.states;
   	}
   };

}]);
