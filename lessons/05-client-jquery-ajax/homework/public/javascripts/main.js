var $form = $("#ajax-form");




var onSuccess = function(data, status) {
 //var img = "<img src='"+data+"'/>";
  $("#result").html;));

};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  // var formData = $form.serialize(); // if this works with how you've set up the form, awesome -- otherwise, the .find(...).val() method below works too

  var name = $form.find("[name='name']").val();
  var price = $form.find("[name='price']").val();
  var inStock = $form.find("[name='inStock']").val();
  var customerName = $form.find("[name='customerName']").val();
  var price = $form.find("[value ='customerName']").val();

  var formData = {
    name: name,
    price: price,
    inStock: inStock
  }

  $.get("getIngredient", formData)
    .done(onSuccess)
    .error(onError);
});




//////////////////////////////////////
/*var $inStock;
var $outOfStock;
var $editIngr;
var $addIngr;
*/





















