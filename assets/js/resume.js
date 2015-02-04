var resume = angular.module('parker.resume', ['ui.bootstrap']);

resume.filter('fromTo', function() {
  return function(input, from, total, lessThan) {
      from = parseInt(from);
      total = parseInt(total);
      for (var i = from; i < from + total && i < lessThan; i++) {
          input.push(i);
      }
      return input;
  }
});

resume.factory('portfolio', ['$rootScope', '$http', 
  function($rootScope, $http){

    return {
      getData: function(successCallback, failCallback){
        var promise = $http.get('http://localhost:1337');
        
        var success = function(successCallback, data){
          $rootScope.$emit('portfolio-success', {status: 'fuck yeah'});
          successCallback(data);
        }

        var failure = function(failCallback, message){
          $rootScope.$emit('portfolio-failure', {status: 'fuck no'});
          failCallback(message);          
        }


        return promise.then(success, failure);

        }
      }
    }]);

resume.factory('stackExchange', ['$rootScope','$http', 
  function($rootScope, $http){
    var apiEndpoint = '';

    var initialized = false;

    SE.init({
      clientId: 4198,
      key: ')T0IKkZOvEgE1t2jqPfRfg((',
      channelUrl: 'http://localhost/parkerResume/blank',
      complete: function (data) { 
        var retObj = {};

        if(typeof data.version != "number" && data.version > -1 ){
          retObj['version'] = data.version;
          retObj.initialized = initialized = true;
          $rootScope.$emit('se-event', retObj);
        }
       }
    });

    return {
      fetchQuestions: function(callback){},
      fetchAnswers: function(callback){},
      fetchBadges: function(callback){}
    }
  }
]);

resume.factory('instagram', ['$http',
  function($http) {

    var api_endpoint = "https://api.instagram.com/v1/";
    var user_id = '409158899';
    var client_id = '642176ece1e7445e99244cec26f4de1f';

    return {
      fetchProfile: function(callback) {
        var endPoint = api_endpoint + "users/"+ user_id +"/media/recent?client_id="+ client_id +"&callback=JSON_CALLBACK";
        $http.jsonp(endPoint).success(function(response) {
            callback(response.data);
        });
      }
    }
  }
]);

resume.controller("instaController", function($scope, $interval, instagram) {
  $scope.pics = [];
  $scope.have = [];
  $scope.orderBy = "-likes.count";
  $scope.getMore = function() {
    instagram.fetchProfile(function(data) {
        for(var i=0; i<12 ; i++) {
          if (typeof $scope.have[data[i].id]==="undefined") {
            $scope.pics.push(data[i]) ;
            $scope.have[data[i].id] = "1";
          }
        }
    });
  };
  $scope.getMore();
  
    $scope.tags = [
        'Bootstrap', 'AngularJS', 'Instagram', 'Factory'
    ]
});


resume.controller('AccordionDemoCtrl', ['$rootScope','$scope', 'portfolio', function ($rootScope, $scope, portfolio) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1',
      imgUrl: 'https://placekitten.com/g/300/200'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2',
      imgUrl: 'https://placekitten.com/g/300/200'
    }
  ];

  $scope.items = function(){
    portfolio.getData(function(data){
      console.log(data);
    }, function(message){
      console.log(message);
    });    
  }

  $scope.items();

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
}]);


// Create a clone of the menu, right next to original.
$('.menu').addClass('original').clone().insertAfter('.menu').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;               

  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.     
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;  
    widthOrgElement = orgElement.parent().css('width');

    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width', widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}

