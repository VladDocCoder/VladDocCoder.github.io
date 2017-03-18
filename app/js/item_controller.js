'use strict';
angular
    .module('myApp')
    .controller('ItemController', ItemController);

function ItemController($localStorage, toastr) {
    var vm = this;

    vm.items = $localStorage.items;
    vm.comments = $localStorage.comments;

    if (vm.items == null) {
        vm.items = [];
    }
    if (vm.comments == null) {
        vm.comments = [];
    }

    vm.addItem = function (itemName) {
        vm.comment = {id: new Date().getTime(), text: itemName};
        vm.item = {id: new Date().getTime(), name: itemName, commentId: vm.comment.id};
        vm.items.push(vm.item);
        $localStorage.items = vm.items;
        vm.comments.push(vm.comment);
        $localStorage.comments = vm.comments;
        toastr.success("New item and it comment have been created");
    };

    vm.deleteItem = function (item) {
        for (var i = 0; i < vm.items.length; i++) {
            if (vm.items[i].id === item.id) {
                vm.items.splice(i, 1);
            }
        }
        $localStorage.items = vm.items;
        toastr.warning("Item has been deleted");
    };

    vm.addComment = function (text) {
        vm.comment = {id: new Date().getTime(), text: text};
        vm.comments.push(vm.comment);
        $localStorage.comments = vm.comments;
        toastr.success("Comment has been added");
    };

    vm.deleteComment = function (comment) {
        for (var i = 0; i < vm.comments.length; i++) {
            if (vm.comments[i].id === comment.id) {
                vm.comments.splice(i, 1);
            }
        }
        $localStorage.comments = vm.comments;
        toastr.warning("Comment has been deleted");
    };

    vm.updateComment = function (comment, text) {
        var equals = false;
        for (var i = 0; i < vm.comments.length; i++) {
            if (vm.comments[i].id === comment.id && text != null) {
                vm.comments[i].text = vm.comments[i].text + "  ...............@next comment:   " + text + " ;";
                toastr.success("Comment has been updated");
                equals = true;
                break;
            }
        }
        if (!equals) {
            toastr.error("Failure! Fill please the field on the bottom of the page and try again");
        }
        $localStorage.comments = vm.comments;
    };

    vm.getItemInfo = function (item) {
        for (var i = 0; i < vm.comments.length; i++) {
            if (vm.comments[i].id === item.commentId) {
                toastr.info(vm.comments[i].text);
            }
        }
    }
}
