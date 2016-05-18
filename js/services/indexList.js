var indexList = angular.module("indexList",[]);
indexList.service("getIndexList",["$http","$q",function($http,$q){
	//获取首页列表数据
	return{
		query:function(){
			var deferred = $q.defer();
			$http({
				method:"get",
				url:"js/json/index.json"
			}).success(function(data){
				deferred.resolve(data);
			}).error(function(data){
				deferred.reject(data);
			});
			return deferred.promise;
		}
	}
}])
.service("getArticleContent",["$http","$q",function($http,$q){
	return{
		//获取文章内容
	article:function(){
		var deferred = $q.defer();
		$http({
			method:"get",
			url:"js/json/content.json"
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(data){
			deferred.reject(data);
		});
		return deferred.promise;
	}
	}
	
}])

