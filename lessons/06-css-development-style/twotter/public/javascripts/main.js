console.log($('#login-form'))

var $loginForm = $('#login-form')

var error = function(data, status){
	console.log("Status:", status);
	console.log("Error:", data);
};

var success = function(data, status) {
	//$('#username')
	$('#newmessage').text(data.name);
	console.log(data);

};


$loginForm.submit(function loginForm(event){
	/*event.preventDefault();
	console.log('hi');
	var name = $loginForm.find("[name='name']").val();
	var loginInfo = {name: name};
	
	console.log(name)
	$.post('/twotterfeed', loginInfo)
		.done(success)
		.error(error);*/

   		
});