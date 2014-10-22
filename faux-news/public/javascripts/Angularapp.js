angular.module('fauxNews',['ui.router']) // Going with UI router to get more familiar with Angular's mobile capabilities.
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: { // using resolve this way ensures that when the home state is entered, auto query of all posts from backend is done before home state finishes loading.
          postPromise:['post', function(posts){
            return posts.getAll();
        }]
      }
      });

      .state('posts',{
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
        }]
      }
      });

      $urlRouterProvider.otherwise('home');
  }]);

  .controller('MainCtrl', ['$scope', 'posts' function($scope, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.test = "Taste like malk";

    $scope.addComment = function(){
      if($scope.body === '') { return; }
      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user',
      }).success(function(comment){
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };

    $scope.addPost = function(){
      if($scope.title === ""){return;}
      $scope.posts.create({
        title: $scope.title,
        link: $scope.link
      });
      $scope.title = "";
      $scope.link = "";
    };

    $scope.incrementUpvotes = function(post){
      post.upvotes(post);
    };
  }]);

  .controller('PostsCtrl',['$scope','$stateParams','posts', 'post', function($scope, posts, post){
    $scope.post = post;

    $scope.incrementUpvotes = function(comment){
      posts.upvoteComment(post, comment);
    }
  }]);

  .factory('posts', ['$http', function($http){
    var obj = {posts: []};
    return obj; // The return allows obj to become public AKA modularity. Good to know.

    o.getAll = function(){
      return $http.get('/posts').success(function(data){ // success allows function binding when request returns.
        angular.copy(data, o.posts); // also, copy the returned list of posts to clientside posts object
      });
    };

    o.create = function(post){
      return $http.post('/posts', post).success(function(data){
        o.posts.push(data);
      });
    };

    o.upvote = function(post){
      return $http.put('/posts/' + post._id + '/upvote')
      .success(function(data){
        post.upvotes += 1;
      });
    };

    o.get = function(id) {
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
    });

    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment);
    };

    o.upvoteComment = function(post, comment){
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
        .success(function(data){
          comment.upvotes += 1;
        });
    };
  }]);