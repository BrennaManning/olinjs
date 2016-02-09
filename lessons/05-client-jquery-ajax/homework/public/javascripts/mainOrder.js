 console.log("mainOrderjs0");
var $order = $("form.orderForm");
var $ingredients = $("input.ingredients");

var onSuccess = function (data, status) {
  console.log("mainOrderjs1");
    if (!data) {
        alert("Error!");
    } else {
        console.log("Your order has been placed!");
    }
}

var onError = function(data, status) {
   console.log("mainOrderjs2");
  console.log("status", status);
  console.log("error", data);
};

$order.submit(function (event) {
   console.log("mainOrderjs3");
    event.preventDefault();
    var name = $order.find("[name='customerName']").val();
    var ingredients = $('input:checkbox:checked').map(function () { return this.name}).get();
    console.log(ingredients.length);
    console.log(ingredients);
    $.post('/orders/recieved', {
        name: name,
        ingredients: ingredients
    })

    formData = {
      name: customerName,
      ingredients: ingredients,
      price: price,
      completed: false
    }

        .done(onSuccess)
        .error(onError);
});

$ingredients.click(function () {
   console.log("mainOrderjs4");
    var $price = $('#price');
    var checkbox = event.target;
    var total = $price.html();
    var checkedValue = $(checkbox).is(':checked') ? checkbox.value : -checkbox.value;
    $price.html((Number(total) + Number(checkedValue)).toFixed(2));
});

 console.log("mainOrderjs5");


$.get("orders", formData)
    .done(onSuccess)
    .error(onError);
});
