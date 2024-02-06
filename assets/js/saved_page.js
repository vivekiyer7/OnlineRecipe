$(document).ready(function () {
    //listen for save button clicks$(document).ready(function () {
    //listen for save button clicks
$('.saveBtn').on('click', function () {
    var value = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');
})
});
    //saves in the localStorage (Ref: As shown in class)
    document.addEventListener('DOMContentLoaded', function() {
        var savedData = localStorage.getItem('savedData');
        if (savedData) {
            document.getElementById('saved-recipes').textContent = savedData;
        } else {
            document.getElementById('saved-data').textContent = 'No data saved.';
        }
    });



// document.addEventListener('DOMContentLoaded', function() {
//     var savedData = localStorage.getItem('savedData');
//     if (savedData) {
//         document.getElementById('saved-data').textContent = savedData;
//     } else {
//         document.getElementById('saved-data').textContent = 'No data saved.';