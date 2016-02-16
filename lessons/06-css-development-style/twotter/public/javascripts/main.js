

console.log($('#login-form'));

var $loginForm = $('#login-form');
var $userInList = $('.user-in-list');
var $userToHighlight;
var $currentUserTwotes;
var $deleteButton = $('#delete-button');


var error = function(data, status){
	console.log("Status:", status);
	console.log("Error:", data);
};

var success = function(data, status) {
	//$('#username')
	console.log("main.js success");
	console.log("data.name");
	console.log(data.name);
	$user = $("."+data.name);
	console.log($user);
	$user.remove();

	//$('#newmessage').text(data.name);
	//console.log(data);

};

$userInList.hover(
  function() {
  	var text = $(this).text();
  	$userToHighlight = $("."+text);
  	console.log($userToHighlight);
  	console.log("User to Highlight:" + text);
  	$userToHighlight.css({ "background-color": "#99CCCC"});
  	//$($userToHighlight).removeClass($userToHighlight).addClass("highlighted");
  },
  function(){
  	var text = $(this).text();
  	$userToHighlight = $("."+text);
  	console.log("User to Unhighlight:" + text);
  	$userToHighlight.css({ "background-color": "#E0E9EB", "color": "#005D73"});
  	//$("highlighted").removeClass("highlighted").addClass($userToHighlight);
  }
);

 
var $currentUser = $('.current-user-name');
var $currentUserName
$currentUserName = $currentUser.text();
$currentUserName = $currentUserName.substring(0, $currentUserName.length - 1);

console.log("Main.js current-user = " + $currentUserName);


$deleteButton.click(
	function() {
		console.log("removing twotes of " + $currentUserName)
		$.post('/deletetwotes', $currentUserName)
			.done(success);
			//.error(error);
  		

	}
);


FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log(response.authResponse.accessToken);
    loggedInUser = authresponse.userid;
    console.log("loggedInUser "+ loggedInUser)

  }
});
FB.api('/me', function(response) {
    console.log(JSON.stringify(response));
});

/*
$deleteButton.on("click", $deleteButton, function() {
    alert('Removing all twotes by ' + $currentUserName);
    console.log("removing twotes of " + $currentUserName)
    db.twotes.remove( { user: $currentUserName}, true )
});*/

/*$loginForm.submit(function loginForm(event){
	event.preventDefault();
	console.log('hi');
	var name = $loginForm.find("[name='name']").val();
	var loginInfo = {name: name};
	
	console.log(name)
	$.post('/twotterfeed', loginInfo)
		.done(success)
		.error(error);

   		
});*/


