var gifsDiv = $("#gifs");
var emotion = $(this).attr("emotion");
var buttons = $("#buttons");
var fixed = 0;
var emotionArray = ["happy","sad","confused","horny","concerned","caring"];

$("#submitInput").on("click", function(event) {
	event.preventDefault();
	var newEmotion = $("#getInput").val().trim();
	console.log(newEmotion);
	emotionArray.push(newEmotion);
	populateButtons();
});

function populateButtons () {
	buttons.empty();
	for (i=0;i<emotionArray.length;i++) {
		buttons.append("<button class='buttons' emotion='"+emotionArray[i]+"'>"+emotionArray[i]+"</button>");
	}
	getGifsButton();
}

function animate() {
	$(".gif").on("click", function() {
		console.log("hmm");
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
		}
	});
}

function getGifsButton () {
	$("button").on("click", function() {
		gifsDiv.empty();
		emotion = $(this).attr("emotion");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
			var result = response.data;
			for (var i = 0; i < 10; i++) {
				gifsDiv.append("<div id='"+i+"' class='results'><img class='gif' src='"+result[i].images.fixed_width_still.url+"' data-still='"+result[i].images.fixed_width_still.url+"' data-animate='"+result[i].images.fixed_width.url+"' data-state='still'><p style='text-align: center;'>Rating: <strong>"+result[i].rating+"</strong></p></div>");
			}
		});
		setTimeout(function() {animate();}, 1000);
	});
}

function censorOnOff() {
	if (alreadyAsked === 1) {
		if (over18 === false) {
			$(document).write("Nice try.  Go eat some Trix... They're for kids.");
		}
	}
	if (censor === 1) {
		censor = 0;
	} else {
		censor = 1;
	}
}

function search() {
	if(censor === 1) {
		searchCensor();
	} else {
		searchExplicit();
	}
}

function searchCensor() {

}

populateButtons();