/* Create an Array that will contain the value of the user searches.

listen for the
submit button being clicked.

The submit button will take the text input
value and create a button with that value.

That button value will also be added to a data-value property of the button

*/
var animalSearched = [];

function renderButtons() {
  $(".buttonSpace").empty();
  for (var i = 0; i < animalSearched.length; i++) {
    var newAnimal = $("<button>");
    newAnimal.addClass("animalButton");
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
    "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalDiv.append(p);
      animalDiv.append(animalImage);
      $("#gifSpace").append(animalDiv);
    }
  });
});
