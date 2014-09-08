angular.module('fauxNews', [])
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.test = "Taste like malk";
    $scope.posts = ["post1", "post2", "post3", "post4", "post5"];
  }])