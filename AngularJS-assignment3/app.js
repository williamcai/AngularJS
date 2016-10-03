(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.found = [];
  menu.message = null;
  // var promise = MenuSearchService.getMenuCategories();
  //
  // promise.then(function (response) {
  //   menu.categories = response.data;
  // })
  // .catch(function (error) {
  //   console.log("Something went terribly wrong.");
  // });

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

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });

    return response;
  //
  //
  //   console.log("searchTerm:",searchTerm);
  //   var menuCategories = service.getMenuCategories();
  //   menuCategories.then(function (response) {
  //     console.log(response.data);
  //
  //     for ( var i = 0; i < response.data.length; i++ ) {
  //       var shortName = response.data[i].short_name;
  //       console.log("short_name:", shortName);
  //       var menuForCategories = service.getMenuForCategory(shortName);
  //       menuForCategories.then(function(response){
  //         for ( var i = 0; i < response.data.menu_items.length; i++) {
  //           console.log("Description:",response.data.menu_items[i].description);
  //         }
  //       })
  //       .catch(function (errro) {
  //         console.log(error);
  //       });
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //   return menuCategories;
  };
}

})();
