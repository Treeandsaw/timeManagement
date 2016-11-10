myApp.controller('MainCtrl', ['$scope', '$firebaseArray', '$firebaseObject', '$http', function($scope, $firebaseArray, $firebaseObject, $http) {

    var ref = new Firebase('https://dddddddd.firebaseio.com/s');
    var todos = $scope.todos = $firebaseArray(ref); 
 

    $scope.AddToDo = function(){   

        var data = {
            title       : $scope.title || '',
            subtitle    : $scope.subtitle || '',
            website     : $scope.website || '',
            time        : $scope.time || Date.now()
        };

        todos.$add(data) 
        localStorage.setItem('LastedInsert', Date.now()); 

        console.log($scope.title);
        console.log($scope.subtitle);
        console.log($scope.time); 
        
        $scope.title    =   '';
        $scope.subtitle =   '';
        $scope.website  =   '';
        $scope.time     =   ''; 

    };  

    $scope.remove = function(store){     
        $scope.todos.$remove(store);
    };

    $scope.edit = function(store){    
        $scope.title    =   store.title;
        $scope.subtitle =   store.subtitle;
        $scope.time     =   store.time;
        $scope.website  =   store.website;
        $scope.todos.$remove(store);
    }; 

    $scope.putCategory = function(store){ 
        $scope.title    =   store.title;
        $scope.website  =   store.website;
    };

    $scope.gotoWebSite = function(store){
        console.log(store.website) 
        window.open(store.website,'_blank');
    };

    $scope.searchBlank = function(){
        $scope.search = ''
    }; 
 
}]);
 