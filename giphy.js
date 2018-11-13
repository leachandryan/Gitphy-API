var animals = ["Dog", "Cat","Rabbit","Hamster","Skunk","Goldfish","Ferret","turtle", 
"Sugarglider","Chinchilla","Hedgehog","Hermit Crab","Gerbil","Pygmy Goat","Chicken", 
"Capybara","Teacup Pig","Serval","Salamander","Frog"];

var APIKey = "&api_key=FMaa48sDt4dLNF43rlAkePM7zspqqIXp";
var userpick = '';
var animalArray = 0;
var query = "q="+ animals[userpick];
var url = "https://api.giphy.com/v1/gifs/search?" +
query + 
APIKey;

for (var i=0;i<animals.length;i++){
    $(".buttonDiv").append("<button class='button' id='"+animals[i]+"'>"+animals[i]+"</button>");
    animalArray = i;
}

$(document).on("click", ".image" ,function() {

    if ($(this).attr("data-state") === "still"){
        $(this).attr("data-state", "animate")
        var animate = $(this).attr("data-animate")
        $(this).attr("src", animate)
    }
    else if ($(this).attr("data-state") === "animate"){
        $(this).attr("data-state", "still")
        var still = $(this).attr("data-still")
        $(this).attr("src", still)
    }

});


$(".submitButton").on("click", function() {
    animals.push($(".entry").val().trim())
    animalArray += 1;
    console.log(animals)
    $(".buttonDiv").append("<button class='button' id='"+animals[animalArray]+"'>"+animals[animalArray]+"</button>");

});

$(document).on("click", ".button" ,function() {
    $("#gif").html("");
    userpick = $(this).attr('id')
    query = "q="+ userpick+"&rating=pg";

    url = "https://api.giphy.com/v1/gifs/search?" +
    query + 
    APIKey;

    $.ajax({
        url: url,
        method: "GET"
      })  
      .then(function(response) {
          console.log(response.data)
          for (var i = 0;i<9;i++) {
            $("#gif").append("<img src='"+response.data[i].images.fixed_height_still.url+ 
            "' class='image "+userpick+
            "' id='"+i+"'" +
            "' data-still='"+response.data[i].images.fixed_height_still.url +"'"+
            "' data-animate='"+response.data[i].images.fixed_height.url+"'"+
            "' data-state='animate'"+response.data[i].rating+">");
            $("#gif").append("<h3>"+"Rating: "+response.data[i].rating+"</h3>");
          }
      });

  });