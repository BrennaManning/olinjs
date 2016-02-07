var $form = $("#ajax-form");

var onSuccess = function(data, status) {
  var img = "<img src='"+data+"'/>";
  $("#result").html(img);
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
  formData = {
    name: name,
    price: price,
    inStock: inStock

  }
  $.get("getIngredient", formData)
    .done(onSuccess)
    .error(onError);
});
