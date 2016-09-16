(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', DIController);

DIController.$inject = ['$scope'];
function DIController($scope) {
  // Check lunch items
  $scope.lunchCheck = function () {
    // Initialize message string
    var messageString = "";
    messageString = "Please enter data first!";

    //
    if ($scope.lunch != null) {
      // split items by comma
      var items = $scope.lunch.split(',');

      // check item count
      var itemCount = 0;
      itemCount = countItems(items);

      // message
      if(itemCount == 0) {
        messageString = "Please enter data first!";
      } else {
          if(itemCount > 3) {
          messageString = "Too much!";
        } else {
          messageString = "Enjoy!";
        }
      }
    }
    $scope.msg = messageString;
  };
}

function countItems(items) {
  // simple version: just return the count of array
  // return items.length ;
  // bonus version: check every item, do not count empty items
  // like: ' ', ''
  var cnt = 0;
  var i;
  for ( i=0; i<items.length; i++) {
    // if item contains no valid character, do not count
    if ( items[i].trim() == "" ) continue ;
    cnt ++ ;
  }
  return cnt ;
}

//console.log(itemCount);

})();
