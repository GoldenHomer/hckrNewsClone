angular.module('fauxNews', [])
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.test = "Taste like malk";
    $scope.posts = [
      {title: "post1", upvotes: 5},
      {title: "post2", upvotes: 2},
      {title: "post3", upvotes: 15},
      {title: "post4", upvotes: 9},
      {title: "post5", upvotes: 4}
    ];
  }])