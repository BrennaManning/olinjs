// I'm going to focus my comments on this file, and the others will be similar.
var $order = $("form.orderForm");
var $ingredient = $("input.options");

var ingredientList = [];
var sumTotal = 0
var orderToSubmit
// Usually it's best practice to put global variables at the top of a file

// I'm giving the success & error handlers unique names so they don't conflict with the similar handlers in other javascript files...
// clientside JavaScript globals aren't scoped to files, they're scoped to all of your clientside js (not like Python)
var orderOnSuccess = function (data, status) {
  // The success callback is a good place to reset the global variables -- before you had them "after" you bound the $order.submit handler,
  // but JavaScript files only execute sequentially when your browser loads an HTML page (because they're linked in <script> tags in your main.handlebars layout).
  // If you want something to happen "after" a submit, the success callback is where it should go.
  ingredientList = [];
  sumTotal = 0;

    if (!data) {
        alert("Error!");
    } else {
        console.log("Your order has been placed!");
    }
}

var orderOnError = function(data, status) {

  console.log("status", status);
  console.log("error", data);
};




$order.submit(function (event) {

    event.preventDefault();
    var name = $order.find("[name='customerName']").val();
    var ingredients = $('input:checkbox:checked').map(function () { return this.name}).get(); // nice use of functional tools!
    var price = $('input:checkbox:checked').map(function () { return this.value}).get();

    for (var i = 0; i < price.length; i++) {
      sumTotal += price[i]
    }

    $.post('/orders/recieved', {
        name: name,
        ingredients: ingredients,
        cost: sumTotal
    })


        .done(orderOnSuccess)
        .error(orderOnError);
    // This submit handler looks great -- exactly the right way to prevent default action, get info from the form, and make a post request.
});

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

