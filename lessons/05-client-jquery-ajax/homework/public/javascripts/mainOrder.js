/*var $form = $("#ajax-form");

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
  formData = $form.serialize();
  var order={};
  order.ingedientsSelected=[];
  order.ingredientsNotSelected=[];

  $("input:checkbox").each(function(){
      var $this = $(this);

      if($this.is(":checked")){
          order.ingredientsSelected.push($this.attr("id"));
      }else{
          order.ingredientsNotSelected.push($this.attr("id"));
      }
  });
  var ingredients = [];
  var prices = []
  for(i = 0; i < ingredientsSelected.length; i++){
      ingredients[i] =  ingredientsSelected[i].name
  }

  for(i = 0; i < ingredientsSelected.length; i++){
      prices[i] =  ingredientsSelected[i].price
  }


  var customerName= $form.find("[name ='customerName']").val(); 
  //var price = order.ingredientsSelected.price.val();
  
  formData = {
    customerName: customerName,
    ingredients: ingredients,
    prices: prices
  }


})




  $.get("orders", formData)
    .done(onSuccess)
    .error(onError);
});


$form.submit(function(event) {
  event.preventDefault();
  formData = $form.serialize();

  var name = $form.find("[name='name']").val();
  var price = $form.find("[name='price']").val();
  var inStock = $form.find("[name='inStock']").val();  
  var customerName = $form.find("[name='customerName']").val(); 

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
*/





//////////////////////////////////////



var $orderForm = $("form.orderForm");
var $ingredients = $("input.ingredients");

var onSuccess = function (data, status) {
    if (!data) {
        alert("Error!");
    } else {
        //$orderForm.css('display', 'none');
        $('#orderMessage').html('Your order has been placed!');
        console.log("Your order has been placed!");
    }
}

var onError = function (data, status) {
    console.log("status", status);
    console.log("error", data);
}

$orderForm.submit(function (event) {
    event.preventDefault();
    var name = $orderForm.find("[name='customerName']").val();
    var ingredients = $('input:checkbox:checked').map(function () { return this.name}).get();
    console.log(ingredients.length);
    console.log(ingredients);
    $.post('/orders/recieved', {
        name: name,
        ingredients: ingredients
    })
        .done(onSuccess)
        .error(onError);
});

$ingredients.click(function () {
    var $price = $('#price');
    var checkbox = event.target;
    var total = $price.html();
    var checkedValue = $(checkbox).is(':checked') ? checkbox.value : -checkbox.value;
    $price.html((Number(total) + Number(checkedValue)).toFixed(2));
});

















