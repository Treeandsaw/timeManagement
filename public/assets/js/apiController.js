myApp.controller('MainCtrl', ['$scope', 'MyYelpAPI',  '$firebaseArray', '$firebaseObject', function($scope, MyYelpAPI, $firebaseArray, $firebaseObject) {

    $scope.total = [];
    $scope.businesses = [];

    $scope.searchPhone = '';
 
    var ref = new Firebase('https://anothersir.firebaseio.com/BlueNote');
    var stores = $firebaseArray(ref);
    $scope.stores = stores; 

    var test = stores.hasOwnProperty (516-775-9004); 
    
    var checkUp = 3; 

    $scope.searchStore = function(){   

        if($scope.searchPhone){

            var name = $scope.searchPhone; 

            var kname = $scope.searchkname; 

            MyYelpAPI.retrieveYelp(name,function(data) {

                $scope.businesses   = data.businesses;

                var array = $scope.businesses
                var random = Math.floor((Math.random() * array.length) + 1); 

                $scope.result = array;  

                var businesses      = data.businesses[0]; 

                angular.forEach(stores, function(store) {  
                    if(store.phone===businesses.display_phone.slice(3,15)){  
                        checkUp = 4;
                        return false;
                    }
                });  
                    if(checkUp===3){
                        $scope.insertStore = function(){ 

                            if(businesses.location.address[1]){
                                var fullAddresss = businesses.location.address[0] + ' ' + businesses.location.address[1]; 
                            } else{
                                var fullAddresss = businesses.location.address[0];        
                            };

                            fullAddresss += ' ' +  businesses.location.city + ' ' +  businesses.location.state_code + ' ' +  businesses.location.postal_code;
      
                            var data = {
                                name:   businesses.name, 
                                kname:  kname || null, 
                                image:  businesses.image_url, 
                                phone:  businesses.display_phone.slice(3,15), 
                                addr:   fullAddresss, 
                                geo:    businesses.location.coordinate,
                                rate:   businesses.rating,
                                memo:   businesses.categories[0][0],
                                date:   Date.now()
                            };

                            stores.$add(data) 

                            window.setTimeout(function() {
                                location.reload(); 
                            }, 500); 
                            console.log('Data has been added!!');
                        }();    
                    } else {
                        window.setTimeout(function() {
                            location.reload(); 
                        }, 500); 
                        return false;
                    }    
            });
            $scope.searchPhone = '';
            $scope.searchkname = '';
        } else {
            $scope.refresh(); // refresh when failed to search.
        }
    }; 

    $scope.refresh = function(){
        location.reload(); 
    };  

    $scope.insertExistDateToInputFiled = function(data){
        $scope.searchkname = data.kname;
        $scope.searchPhone = data.phone;
    }

    $scope.remove = function(store){ 
        var targetToBeDeleted = ref.child(store.$id); 
        targetToBeDeleted.remove();  
    }

}]);

myApp.factory("MyYelpAPI", function($http) { 

    function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
    }  

    var retrieveYelp = function(name, callback) {

        console.log(name);

        var method = 'GET';
        var url = 'http://api.yelp.com/v2/phone_search?';
        var params = {
                callback: 'angular.callbacks._0',
        //      location: 'Los+Angeles',
                phone: name,
                cc: 'US', 

                oauth_consumer_key: 'ZUoBsDrNdOBGhizw_p4ffg', //Consumer Key
                oauth_token: 'mfSCOfIsIa621P_Ce_5vSdmKtqkEb-dY', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        //      term: 'sushi'
                // limit: 15
            };
        var consumerSecret = 's44Il1Ce6UVIol5l7C90_I7sANc'; //Consumer Secret
        var tokenSecret = 'z6rdqTTwCfejVWrssA3Hmb9ZeZY'; //Token Secret

        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;


        console.log(signature);

        $http.jsonp(url, {params: params}).success(callback); 
    } 

    return {
        retrieveYelp: retrieveYelp 
    }

});
