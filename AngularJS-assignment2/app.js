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

  // List of shopping items : at least 5 items
  var items = [
    // Initialize
  	{name : 'Milk',          quantity: 10},
  	{name : 'Donuts',        quantity: 50},
  	{name : 'Cookies',       quantity: 100},
  	{name : 'Chocolate',     quantity: 80},
    {name : 'Cookies',       quantity: 100},
    {name : 'Cookies',       quantity: 30},
  	{name : 'Peanut Butter', quantity: 30},
    {name : 'Pepto Bismol',  quantity: 30}
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
