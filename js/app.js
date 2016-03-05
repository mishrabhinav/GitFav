var gitFav = angular.module('gitFav', []);

gitFav.controller('gitCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.process = function (username) {
    $http.get("https://api.github.com/users/" + username + "/repos")
      .success(function(data) {
        $scope.languages = [];
        $scope.frequency = [];
        for (var i = 0; i < data.length; i++) {
          $scope.languages.push(data[i].language);
        }
        $scope.languages.sort();
        $scope.analyzeRepoData();
        $scope.getFav();

      })
      .error(function(err, status) {
        $scope.languages = "Error Received";
        $scope.frequency = err.message + " " + status;
      })
  };

  $scope.analyzeRepoData = function () {
    var a = [], b = [], prev;

    for ( var i = 0; i < $scope.languages.length; i++ ) {
      if ( $scope.languages[i] !== prev ) {
        a.push($scope.languages[i]);
        b.push(1);
      } else {
        b[b.length-1]++;
      }
      prev = $scope.languages[i];
    }
    $scope.languages = a;
    $scope.frequency = b;
  };

  $scope.getFav = function () {
    var a = 0,
        b = 0;

    for (var i = 0; i < $scope.frequency.length; i++) {
      if ($scope.frequency[i] > b) {
        b = $scope.frequency[i];
        a = i;
      }
    }
    $scope.languages = $scope.languages[a];
    $scope.frequency = "Repositories: " + b;
  }
}])
