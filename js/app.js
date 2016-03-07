var gitFav = angular.module('gitFav', []);

gitFav.controller('gitCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.process = function (username) {

    $http.get("https://api.github.com/users/" + username + "/repos")
      .success(function(data) {
        $scope.languages = [];
        $scope.frequency = [];
        var langs = [];

        for (var i = 0; i < data.length; i++) {
          langs.push(data[i].language);
        }
        langs.sort();
        $scope.analyzeRepoData(langs);

      })
      .error(function(err, status) {
        $scope.languages = [username];
        $scope.frequency = err.message + " " + status;
      })
  };

  $scope.analyzeRepoData = function (langs) {

    var repos = [],
        frequency = [],
        prev,
        favLang = [],
        maxNum = 0;

    for ( var i = 0; i < langs.length; i++ ) {
      if ( langs[i] !== prev ) {
        repos.push(langs[i]);
        frequency.push(1);
      } else {
        frequency[frequency.length-1]++;
      }
      prev = langs[i];
    }

    maxNum = Math.max.apply(null, frequency);
    for (var i = 0; i < frequency.length; i++) {
      if (frequency[i] === maxNum) {
        favLang.push(repos[i]);
      }
    }

    if (favLang.length === 0) {
      favLang.push("This User has no repositories");
      maxNum = 0;
    }

    $scope.languages = favLang;
    $scope.frequency = "Repositories: " + maxNum;
  }
}])
