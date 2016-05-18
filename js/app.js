var zhihuDaily = angular.module('zhihuDaily', ['ionic', 'ui.router', 'indexList']);
//路由部分
zhihuDaily.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/home");
		$stateProvider.state("article", {
			url: "/article",
			templateUrl: "js/complates/article.html",
			controller: ""
		}).state("home", {
			url: "/home",
			templateUrl: "js/complates/indexContent.html",
			controller: ""
		}).state("personCenter", {
			url: "/personCenter",
			templateUrl: "js/complates/personCenter.html",
			controller: ""
		});
	}])
	//指令部分
zhihuDaily.directive("contentElement", function() {
	//创建文章内容指令
	return {
		restrict: "E",
		template: "<div  ng-bind-html = 'contentHTML'></div>"
	}
});
//控制器部分
zhihuDaily.controller("MyCtrl", ["$scope", "$ionicSlideBoxDelegate", "getIndexList", function($scope, $ionicSlideBoxDelegate, getIndexList) {
		//处理首页列表数据
		var promise = getIndexList.query();
		promise.then(function(data) {
			$scope.messageObj = data;
			$scope.stories = $scope.messageObj.stories;
			$scope.top_stories = $scope.messageObj.top_stories;
		}, function(data) {
			$scope.messageObj = {
				error: "刷新失败..."
			}
		});
		//上拉刷新获取的数据
		$scope.$on("reFresh",function(event,data){
			$scope.messageObj = data;
			$scope.stories = $scope.messageObj.stories;
			$scope.top_stories = $scope.messageObj.top_stories;
			//滑动块更新数据的方法update()
			$ionicSlideBoxDelegate.update();
		});
		//下拉加载数据
		$scope.$on("newMsg",function(event,data){
			$scope.stories = $scope.stories.concat(data.stories);
		});
	}])
	.controller("reFreshIndex", ["$scope", "$http", function($scope, $http) {
		//上拉刷新整个页面
		$scope.doRefresh = function(){
			$http.get("js/json/indexlast.json")
			.success(function(data){
				//向子代controller传递数据
				$scope.$broadcast("reFresh",data);
			})
			.finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			})
		};
		//下拉加载新数据
		
		$scope.getNewMsg = function(){
			$http.get("js/json/indexlast.json")
			.success(function(data){
				$scope.$broadcast("newMsg",data);
			})
			.finally(function(){
				$scope.$broadcast("scroll.infiniteScrollComplate");
			})
		}
		
	}])
	.controller("header", ["$scope","$ionicSideMenuDelegate", function($scope,$ionicSideMenuDelegate) {
		//侧边栏列表
		$scope.asideListArr = ["财经日报", "日常心理学", "用户推荐日报", "电影日报", "不许无聊", "设计日报", "大公司日报", "互联网安全", "开始游戏", "音乐日报", "动漫日报", "体育日报"];
		//侧边栏列表右侧图标
		$scope.ionPlus = "ion-plus";
		$scope.toggleLeft = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
	}])
	.controller("content", ["$scope", "getArticleContent", "$sce", "$http", function($scope, getArticleContent, $sce, $http) {
		//处理文章内容数据
		var promiseArticle = getArticleContent.article();
		promiseArticle.then(function(data) {
			$scope.contentObj = data;
			$scope.contentHTML = $sce.trustAsHtml($scope.contentObj.body);
		}, function(data) {
			$scope.contentObj = {
				error: "获取失败..."
			}
		});
		$scope.doRefresh = function() {
			$http({
				method: "get",
				url: "js/json/content.json"
			}).success(function(data) {
				$scope.contentObj = data;
				$scope.contentHTML = $sce.trustAsHtml($scope.contentObj.body);
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
	}])
	.controller("setHeader", ["$scope", "$rootScope", function($scope, $rootScope) {
		//header控制器
		$scope.hideOrShow = true;
		$scope.set = function() {
			$scope.hideOrShow = !$scope.hideOrShow;
		};
		$scope.whiteOrBlackContent = "夜间模式";
		$rootScope.indexStyle1 = "css/index.css";
		$rootScope.styleStyle1 = "css/style.css";
		$rootScope.personCenterStyle1 = "css/personCenter.css";
		$scope.styleChange = function() {
			$scope.hideOrShow = !$scope.hideOrShow;
			if ($scope.whiteOrBlackContent == "夜间模式") {
				$rootScope.indexStyle1 = "css/indexBlack.css";
				$rootScope.styleStyle1 = "css/styleBlack.css";
				$rootScope.personCenterStyle1 = "css/personCenterBlack.css";
				$scope.whiteOrBlackContent = "日间模式";
			} else {
				$rootScope.indexStyle1 = "css/index.css";
				$rootScope.styleStyle1 = "css/style.css";
				$rootScope.personCenterStyle1 = "css/personCenter.css";
				$scope.whiteOrBlackContent = "夜间模式";
			}
		}
	}])
	.controller("head", ["$scope", function($scope) {
		//控制head标签里的link样式
	}])