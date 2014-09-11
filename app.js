angular.module('fauxNews',[])
  .controller('MainCtrl', ['$scope', function($scope){
    $scope.test = "Taste like malk";
    $scope.posts = [
      {title: "post1", upvotes: 5},
      {title: "post2", upvotes: 2},
      {title: "post3", upvotes: 15},
      {title: "post4", upvotes: 9},
      {title: "post5", upvotes: 4}
    ];

    $scope.addPost = function(){
      if($scope.title = ""){return;}
      $scope.posts.push({
        title: "A new post",
        link: $scope.link,
        upvotes: 0
      });
      $scope.title = "";
      $scope.link = "";
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };

  }]);