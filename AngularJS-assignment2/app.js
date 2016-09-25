(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ListService', ListService);

ToBuyShoppingController.$inject = ['ListService'];
function ToBuyShoppingController(ListService) {
  var showList = this;

  showList.items = ListService.getItems();

  showList.removeItem = function (itemIndex) {
    var itemAdder = showList.items[itemIndex];
    ListService.addBoughtItem(itemAdder.name, itemAdder.quantity);
    ListService.removeItem(itemIndex);
  };
}

AlreadyBoughtShoppingController.$inject = ['ListService'];
function AlreadyBoughtShoppingController(ListService) {
  var boughtList = this;

  boughtList.boughtItems = ListService.getBoughtItems();
}

function ListService() {
  var service = this;

  // List of shopping items
  var items = [
    // Initialize
  	{name : 'cookies', quantity: 10},
  	{name : 'cookies', quantity: 11},
  	{name : 'candies', quantity: 12},
  	{name : 'cookies', quantity: 10},
  	{name : 'cookies', quantity: 30}
	];
  // List of bought items
  var boughtItems = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
