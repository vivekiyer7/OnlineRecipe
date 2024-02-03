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
    var recipeType = "";
    if (time >= 0 && time < 10) {
        recipeType = "Breakfast";
    } else if (time >= 10 && time < 14) {
        recipeType = "Lunch";
    } else {
        recipeType = "Dinner";
    }

    //Display the time on the main page
    var todaymenutimeEL = $("#todaymenutime");
    todaymenutimeEL.append("<h3>" + recipeType + "</h3>");

    //loadtodayrecipe(recipeType);

    function loadtodayrecipe(recipeType) {
        var recipeid = [];
        for (let i = 0; i < meallist.length; i++) {
            //check the recipe type and get the recipe id
            if (meallist[i].mealType === recipeType) {
                recipeid.push(meallist[i].id);
            }
        }

        //do a math random to get the 4 recipe id from the list which is unique
        var randomrecipeid = [];
        for (let i = 0; i < 4; i++) {
            temp = Math.floor(Math.random() * recipeid.length);
            if (randomrecipeid.includes(recipeid[temp])) {
                i--;
            } else {
                randomrecipeid.push(recipeid[temp]);
            }
        }

        for (let i = 0; i < randomrecipeid.length; i++) {
            var recipeapi = "";
            recipeapi = "https://api.edamam.com/api/recipes/v2/" + randomrecipeid[i] + "?type=public&app_id=" + app_id + "&app_key=" + app_key;
            fetch(recipeapi)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    imagelink = data.recipe.image;
                    dishname = data.recipe.label;
                    calories = data.recipe.calories;
                    //round off the calories 2 decimal places
                    calories = Math.round(calories * 100) / 100;
                    cusinetype = data.recipe.cuisineType;
                    var recipeEL = $("#recipe" + (i+1) );
                    recipeEL.append("<img src='" + imagelink + "' alt='recipe'>");
                    recipeEL.append("<h4>" + dishname + "</h4>");
                    recipeEL.append("<h5>" + "CusineType: " + cusinetype + "</h5>");
                    recipeEL.append("<h5>" + "Calories: " + calories + "</h5>");   
                });
        }
    }

    //Add the event listner to Try Something New button
    //This will call the new API to get the new recipe.
    //Example of API is 
    function getramdomrecipe(recipeType) {
        var randomfooddbid = []; 
    
        for (let i = 0; i < fooddbmeal.length; i++) {
            tempstr = fooddbmeal[i].strCategory;
            if (tempstr === recipeType) {    
                randomfooddbid.push(fooddbmeal[i].idMeal);
            }
        }
        var randomfoodid = [];
        for (let i = 0; i < 1; i++) {
            randomfoodid.push(randomfooddbid[Math.floor(Math.random() * randomfooddbid.length)]);
        }
        //call the API to get the recipe details
        var recipeapi = "";
        recipeapi = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + randomfoodid;
        fetch(recipeapi)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                imagelink = data.meals[0].strMealThumb;
                dishname = data.meals[0].strMeal;
                area = data.meals[0].strArea;
                var recipeEL = $("#randonrecipedata");
                recipeEL.empty();
                recipeEL.append("<h4>" + dishname + "</h4>");
                recipeEL.append("<h5>" + "Cusine Area/Origin: " + area + "</h5>");
                var recipeEL = $("#randonrecipeimage");
                recipeEL.empty();
                recipeEL.append("<img src='" + imagelink + "' alt='recipe'>");
            });
    }

    getramdomrecipe(recipeType);
    //Add the event listner to Try Something New button
    //This will call the new API to get the new recipe.
    var trynewbtn = $("#randonrecipebtn");
    trynewbtn.click(function () {
        getramdomrecipe(recipeType);
    });

});
   