var $form = $("#ajax-form");

var onSuccess = function(data, status) {
 //var img = "<img src='"+data+"'/>";
   if (!data) {
        alert("Error!");
    } else {  
    $("#result").html;));
    }

};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  formData = $form.serialize();

  var name = $form.find("[name='name']").val();
  var price = $form.find("[name='price']").val();
  var inStock = $form.find("[name='inStock']").val();  
  var customerName = $form.find("[name='customerName']").val(); 
  var price = $form.find("[value ='customerName']").val();

  formData = {
    name: name,
    price: price,
    inStock: inStock
  }

});
  $.get("getIngredient", formData)
    .done(onSuccess)
    .error(onError);
});


////////////////////////////////////////////////
 console.log("mainOrderjs0");
var $order = $("form.orderForm");
var $ingredients = $("input.ingredients");



var onSuccessOrder = function (data, status) {
  console.log("mainOrderjs1");
    if (!data) {
        alert("Error!");
    } else {
        //$orderForm.css('display', 'none');
        $('#orderMessage').html('Your order has been placed!');
        console.log("Your order has been placed!");
    }
}

var onErrorOrder = function(data, status) {
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














