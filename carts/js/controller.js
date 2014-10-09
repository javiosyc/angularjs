function ProductController($scope) {
    $scope.HTMLString = "<b>粗體字</b><br>"
    $scope.IsDebug = false;
    $scope.cart_item = {
        PName: 'Defult',
        Qty: 0,
        Price: 0
    };
    $scope.edit_cart = {};
    $scope.orderByColumns = [];
    $scope.orderBy = {};

    $scope.sub_total = function(qty, price, item) {
        var result = qty >= 10 ? 0.8 * qty * price : qty * price;
        if (typeof(item) != 'undefined') {
            item.SubTotal = result;
        }
        return result;
    };
    $scope.carts = [];

    $scope.carts.push({
        PName: 'T-shirt',
        Qty: 20,
        Price: 200
    });
    $scope.carts.push({
        PName: 'T-shirt',
        Qty: 30,
        Price: 300
    });
    $scope.carts.push({
        PName: 'Eye glasses',
        Qty: 8,
        Price: 500
    });
    $scope.carts.push({
        PName: 'Eye glasses',
        Qty: 2,
        Price: 300
    });
    $scope.carts.push({
        PName: 'shoes',
        Qty: 10,
        Price: 300
    });


    $scope.del = function(item) {
        for (var i in $scope.carts) {
            if (item == $scope.carts[i]) {
                $scope.carts.splice(i, 1);
                break;
            }
        }
    };

    $scope.checkAll = function() {
        for (var i in $scope.carts) {
            var item = $scope.carts[i];
            item.isDeleted = $scope.IsCheckAll;
        }
    }

    $scope.add = function() {
        $scope.carts.push(angular.copy($scope.cart_item));
    }

    $scope.IsEdit = function(item) {
        return $scope.edit_cart === item;
    }

    $scope.edit = function(item) {
        console.log(item);
        $scope.edit_cart = item;
        item.Qty2 = item.Qty;
    };

    $scope.done = function(event, item) {
        var keyCode = event.keyCode;
        if (keyCode === 13) {
            $scope.edit_cart = {};
            item.Qty = item.Qty2;
            delete item.Qty2;
        } else if (keyCode === 27) {
            $scope.edit_cart = {};
            delete item.Qty2;
        }
    };

    $scope.total = function() {
        var result = 0;
        for (var i in $scope.carts) {
            result += $scope.carts[i].SubTotal;
        }
        return result;
    };

    $scope.batchDel = function() {
        var temp = [];
        for (var i in $scope.carts) {
            if (!$scope.carts[i].isDeleted) {
                temp.push($scope.carts[i]);
            }
        }
        $scope.carts = temp;
    };

    $scope.addOrder = function(column, reverse) {
        $scope.orderBy[column] = reverse;
    }

    $scope.getOrder = function() {
        var orderArray = [];
        for (var column in $scope.orderBy) {
            if ($scope.orderBy[column] == "-") {
                orderArray.push("-" + column);
            } else {
                orderArray.push(column);
            }
        }
        return orderArray;
    }
    $scope.clearOrderBy = function() {
        $scope.orderBy = {};
    };

    $scope.isOrderColumn = function(column, reverse) {
        var isHide = true;
        if (column in $scope.orderBy) {
            if ($scope.orderBy[column] === reverse) {
                isHide = false;
            }
        }
        return isHide;
    };

    $scope.addOrderColumn = function(column) {
        if (column in $scope.orderBy) {
            if ($scope.orderBy[column] == "+") {
                $scope.orderBy[column] = "-";
            } else {
                delete $scope.orderBy[column];
            }
        } else {
            $scope.orderBy[column] = "+";
        }
    };
}
