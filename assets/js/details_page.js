function showDetails() {
    const h2 = document.getElementById("insertHere");
    let text = "My inserted text";
    h2.insertAdjacentText("beforeend", text);
}

var apiKey = "1";

fetch(apiKey)
    .then(function(response) {
        return response
    });