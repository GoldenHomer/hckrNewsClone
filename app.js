angular.module('fauxNews',['ui.router']) // Going with UI router to get more familiar with Angular's mobile capabilities.
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      });

      .state('posts',{
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

      $urlRouterProvider.otherwise('home');
  }]);

  .controller('MainCtrl', ['$scope', 'posts' function($scope, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.test = "Taste like malk";

    $scope.addPost = function(){
      if($scope.title = ""){return;}
      $scope.posts.push({
        title: "A new post",
        link: $scope.link,
        upvotes: 0
        comments:[
          {author: 'Bart', body:'Don\'t have a cow man'}
          {author: 'Apu', body:'Please come again'}
        ]
      });
      $scope.title = "";
      $scope.link = "";
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    };

  .controller('PostsCtrl',['$scope','$stateParams','posts',function($scope, $stateParams, posts){

  }]);

  .factory('posts', [function(){
    var obj = {posts: []};
    return obj; // The return allows obj to become public AKA modularity. Good to know.
  }])

  }]);