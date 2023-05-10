$(document).ready(function() {
    //collect info from databse
fetch('http://localhost:3000/recipes')
  .then(response => response.json())
  .then(data => {
    //create cards with the info
    data.forEach(element => {
        // create a new card element with jQuery
        const newCard = $('<div>').addClass('col-md-4 mb-3');
        const card = $('<div>').addClass('card');
        const cardImg = $('<img>').addClass('card-img-top')
                                .attr('src', element.image_url)
                                .attr('alt', 'Recipe 1');
        const cardBody = $('<div>').addClass('card-body');
        const cardTitle = $('<h5>').addClass('card-title').text(element.title);
        const cardText = $('<p>').addClass('card-text').text(element.description);
        const cardBtn = $('<a>').addClass('btn btn-primary').text('View Recipe').click(function() { repcipePage(element)});;
        
        // append the elements to the new card
        newCard.append(card);
        card.append(cardImg, cardBody);
        cardBody.append(cardTitle, cardText, cardBtn);
        
        // append the new card to the "cards" element
        $('#cards').append(newCard);
            });
  })
  .catch(error => {
    // handle the error
    alert('Error:'+ error);
    });

    function repcipePage(data) {
        // Encode the data as a query parameter
        const encodedData = encodeURIComponent(JSON.stringify(data));
      
        // Redirect to the new page with the encoded data in the URL
        window.location = `http://127.0.0.1:5500/recipePage.html?data=${encodedData}`;
      }
// Parse the query parameter from the URL and decode it
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encodedData = urlParams.get('data');
const data = JSON.parse(decodeURIComponent(encodedData));

// Use the data to populate the page
let listin = $();
let dataArray = data.ingredient.split(",");
dataArray.forEach(ingredient => {
  listin = listin.add($('<p>').text(ingredient));
});
$('#ingredients').append(listin);

let listins = $();
let inArray = data.instructions.split("/");
inArray.forEach(step => {
  if(step!="")
    listins = listins.add($('<li>').text(step)).add("<br>");
});
$('#recipe').text(data.title);
$('#desc').text(data.description);
$('#instructions').append(listins);
$('#recipe_img').attr('src', data.image_url).attr('alt', data.title);
//window.history.pushState({}, '', 'recipePage.html');
});
