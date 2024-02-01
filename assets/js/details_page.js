function showDetails() {
    const h2 = document.getElementById("insertHere");
    let text = "My inserted text";
    h2.insertAdjacentText("beforeend", text);
}