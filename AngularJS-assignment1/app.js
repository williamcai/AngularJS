(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', DIController);

DIController.$inject = ['$scope'];
function DIController($scope) {
  // Check lunch items
  $scope.lunchCheck = function () {
    // Initialize message string
    var messageString = "Please enter data first!";
    // Initialize message color and border color;
    var msgColor = "red";

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
        msgColor = "green";
      }
    }
    // bonus version: message color & border color
    $scope.msg = messageString;
    $scope.msgstyle = {
      "color" : msgColor,
      "border" : "1px solid " + msgColor
    } ;
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
