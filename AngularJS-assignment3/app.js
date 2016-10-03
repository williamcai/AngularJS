(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'A',
    scope: {
      foundItems: '<',
      onRemove: '&',
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.found = [];
  menu.message = null;

  menu.getMatchedMenuItems = function (searchTerm) {
    menu.found = [] ;
    menu.message = null;

    console.log("searchTerm:",searchTerm);
    if(searchTerm == null || searchTerm == '') {
      menu.message = "Nothing found";
      console.log(menu.message);
      return ;
    }
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      var menuItems = response.data.menu_items;
      for ( var i = 0 ; i < menuItems.length ; i++ ) {
        if ( menuItems[i].description.toUpperCase().search(searchTerm.toUpperCase()) != -1 ) {
          // console.log("Description:", menuItems[i].description);
          menu.found.push(menuItems[i]);
        } else {
          // just forget it
        }
      }
      if ( menu.found.length == 0 ) {
        menu.message = "Nothing found";
        console.log(menu.message);
      } else {
        console.log("Service Finished!");
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  menu.removeMenu = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response;
  };
}

})();
