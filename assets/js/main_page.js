document.addEventListener("DOMContentLoaded", function () {

    var app_id = "7bfc5058";
    var app_key = "72f32efdcea683bd1f0a63347aefc9a7";
    //var app_id = "cfba1ecd";
    //var app_key = "636950cdd1daaef47a38397170ebda0a";

    //When the page load get the time from the system. 
    //if time is from morning night 12 to morning 10 then display the breakfast recipe
    //if time is from morning 10 to afternoon 2 then display the lunch recipe
    //if time is from afternoon 2 to night 12 then display the dinner recipe

    var time = new Date().getHours();
    console.log(time);
    var recipeType = "";
    if (time >= 0 && time < 10) {
        recipeType = "Breakfast";
    } else if (time >= 10 && time < 14) {
        recipeType = "Lunch";
    } else {
        recipeType = "Dinner";
    }
    console.log(recipeType);

    //Display the time on the main page
    var todaymenutimeEL = $("#todaymenutime");
    todaymenutimeEL.append("<h3>" + recipeType + "</h3>");

    loadtodayrecipe(recipeType);

    function loadtodayrecipe(recipeType) {
        var recipeid = [];
        for (let i = 0; i < meallist.length; i++) {
            //check the recipe type and get the recipe id
            if (meallist[i].mealType === recipeType) {
                recipeid.push(meallist[i].id);
            }
        }
        console.log(recipeid);

        //do a math random to get the 4 recipe id from the list
        var randomrecipeid = [];
        for (let i = 0; i < 4; i++) {
            randomrecipeid.push(recipeid[Math.floor(Math.random() * recipeid.length)]);
        }
        console.log(randomrecipeid);
        //after that run the API to details and then only show few details as each card.
        //my API Example is https://api.edamam.com/api/recipes/v2/68b1dd6da9193b21372bee7a2bd19941?type=public&app_id=7bfc5058&app_key=72f32efdcea683bd1f0a63347aefc9a7
        //https://api.edamam.com/api/recipes/v2/68b1dd6da9193b21372bee7a2bd19941?type=public&app_id=7bfc5058&app_key=72f32efdcea683bd1f0a63347aefc9a7

        for (let i = 0; i < randomrecipeid.length; i++) {
            var recipeapi = "";
            recipeapi = "https://api.edamam.com/api/recipes/v2/" + randomrecipeid[i] + "?type=public&app_id=" + app_id + "&app_key=" + app_key;
            console.log(recipeapi);
            fetch(recipeapi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    imagelink = data.recipe.image;
                    dishname = data.recipe.label;
                    calories = data.recipe.calories;
                    //round off the calories 2 decimal places
                    calories = Math.round(calories * 100) / 100;
                    cusinetype = data.recipe.cuisineType;
                    console.log(imagelink);
                    console.log(dishname);
                    console.log(calories);
                    console.log(cusinetype);
                    var recipeEL = $("#recipe" + (i+1) );
                    recipeEL.append("<img src='" + imagelink + "' alt='recipe'>");
                    recipeEL.append("<h4>" + dishname + "</h4>");
                    recipeEL.append("<h5>" + "CusineType: " + cusinetype + "</h5>");
                    recipeEL.append("<h5>" + "Calories: " + calories + "</h5>");   
                });
        }

    }
    


    
});
   