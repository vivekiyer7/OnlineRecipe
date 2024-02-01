$(document).ready(function () {
    $('.saveBtn').on('click', function () {
        var name = $(this).siblings('.description').val();
        var image = $(this).siblings().attr('id');
        var description = $(this).parent().attr('id');
    })
});

