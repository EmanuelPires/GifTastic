/* Create an Array that will contain the value of the user searches.

listen for the
submit button being clicked.

The submit button will take the text input
value and create a button with that value.

That button value will also be added to a data-value property of the button

*/
var animalSearched = ["goats", "fish", "cat"];

function renderButtons() {
  $(".buttonSpace").empty();
  for (var i = 0; i < animalSearched.length; i++) {
    var newAnimal = $("<button>");
    newAnimal.addClass("animalButton btn btn-danger");
    newAnimal.attr("data-animal", animalSearched[i]);
    newAnimal.text(animalSearched[i]);

    $(".buttonSpace").append(newAnimal);
  }
}
$("#animalSubmitted").on("click", function(event) {
  event.preventDefault();
  var userSearch = $("#userInput")
    .val()
    .trim();
  animalSearched.push(userSearch);
  renderButtons();
});

/* clicking on the newly created buttons will fire a query to the API
witht the data-animal being queried.

*/

$(document).on("click", ".animalButton", function() {
  var animal = $(this).attr("data-animal");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=qblmO0dj7fRyzxgTFKW8jP8rV14dGMC8&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    $("#gifSpace").empty();
    for (var i = 0; i < results.length; i++) {
      //
      var animalDiv = $("<span>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-state", "still");
      animalImage.attr("data-id", results[i].id);
      animalDiv.append(p);
      animalDiv.append(animalImage);
      $("#gifSpace").append(animalDiv);
    }
  });
});

renderButtons();
//Now we need the function to switch between still and animated.
//I'm thinking we can use the API ID to retrieve the animated vs still versions of gifs
$(document).on("click", "img", function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    var id = $(this).attr("data-id");

    var queryURL =
      "http://api.giphy.com/v1/gifs/" +
      id +
      "?&api_key=qblmO0dj7fRyzxgTFKW8jP8rV14dGMC8";
    var image = $(this);
    console.log(image);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      image.attr("src", results.images.fixed_height.url);
      image.attr("data-state", "animated");
    });
  }

  if (state === "animated") {
    var id = $(this).attr("data-id");

    var queryURL =
      "http://api.giphy.com/v1/gifs/" +
      id +
      "?&api_key=qblmO0dj7fRyzxgTFKW8jP8rV14dGMC8";
    var image = $(this);
    console.log(image);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      image.attr("src", results.images.fixed_height_still.url);
      image.attr("data-state", "still");
    });
  }
});
