module.controller('mainCtrl', function ($scope, $facebook, $timeout) {
	
	$scope.isLoggedIn = false;
	$scope.login = function() {
		$facebook.login().then(function() {
		  refresh();
		});
	}
	function refresh() {
		$facebook.api("/me").then( 
			function(response) {
				console.log(response);
				$scope.welcomeMsg = "Welcome " + response.name;
				$scope.isLoggedIn = true;
			},
			function(err) {
				$scope.welcomeMsg = "Please log in";
		});
	}

	refresh();
});


        module.controller('myCtrl', function($scope) {
            $scope.sid = new Date().getTime();
        });
        module.directive('productColor', function() {
      return {
          restrict: 'E', //Element Directive
          //template: 'tpl-productColour'
          templateUrl: 'tpl-productColour'
      };
   }
  );