var $order = $("form.orderForm");
var $ingredient = $("input.options");

var onSuccess = function (data, status) {

    if (!data) {
        alert("Error!");
    } else {
        console.log("Your order has been placed!");
    }
}

var onError = function(data, status) {

  console.log("status", status);
  console.log("error", data);
};


var ingredientList = [];
var sumTotal = 0
var orderToSubmit

$order.submit(function (event) {
  
    event.preventDefault();
    var name = $order.find("[name='customerName']").val();
    var ingredients = $('input:checkbox:checked').map(function () { return this.name}).get();
    console.log(ingredients.length);
    console.log(ingredients);
    var price = $('input:checkbox:checked').map(function () { return this.value}).get();
    
    for (var i = 0; i < price.length; i++) {
      sumTotal += price[i]
    };

    $.post('/orders/recieved', {
        name: name,
        ingredients: ingredients,
        cost: sumTotal
    })


        .done(onSuccess)
        .error(onError);
});

var ingredientList = [];
var sumTotal = 0
var orderToSubmit

function handleClick(){
  var checkbox = event.target;
  var price = checkbox.value
  var ingredient = checkbox.name;
  ingredientList.push(ingredient)
  sumTotal +=price
  var orderToSubmit = {
    'ingredients':ingredientList,
    'cost': sumTotal
  }
  return orderToSubmit
}

  
  // $ingredients.click(function () {
  //   console.log("we clicked an")
  //   debugger;
  //    console.log("mainOrderjs4");
  //     var $price = $('#price');
  //     var checkbox = event.target;
  //     var total = $price.html();
  //     var checkedValue = $(checkbox).is(':checked') ? checkbox.value : -checkbox.value;
  //     $price.html((Number(total) + Number(checkedValue)).toFixed(2));


  //  console.log("mainOrderjs5");


// $.get("orders", formData)
//     .done(onSuccess)
//     .error(onError);

