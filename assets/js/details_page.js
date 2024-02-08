var app_id = "cfba1ecd";
var app_key = "636950cdd1daaef47a38397170ebda0a";
const data = JSON.parse(window.localStorage.getItem("Check_Details"));
const option1 = data.fromapi;
const recipeId = data.id;
const recepieId2 = data.id;
const apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${app_id}&app_key=${app_key}`;
const apiUrl2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recepieId2}`;
console.log(recipeId);
console.log(recepieId2);

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
            var imageUrl = data.recipe.image;
            var label = data.recipe.label;
            var cuisineType = data.recipe.cuisineType[0];
            var ingredients = data.recipe.ingredientLines;
            var dietLabels = data.recipe.dietLabels;
            var mealType = data.recipe.mealType;
            var dishType = data.recipe.dishType;
            var calories = data.recipe.calories;
            var source = data.recipe.source;
            var url = data.recipe.url;
            jQuery("#insertHere").html(`
                                        <h2 class="name">${label}</h2>
                    <h5><strong>Cuisine Type:</strong> ${cuisineType}</h5>
                    <p><strong>Meal Type:</strong> ${mealType.map(mealType => `${mealType}`).join("")}<p>
                    <p><strong>Dish Type:</strong> ${dishType.map(dishType => `${dishType}`).join("")}<p>
                    <p><strong>Calories:</strong> ${calories}<p>
                    <hr />
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
                    </ul>
                    <p><strong>Diet Labels:</strong></p>
                    <ul>
                    ${dietLabels.map(dietLabels => `<li>${dietLabels}</li>`).join("")}
                    </ul>
                    `);
                    jQuery("#image-suport").html(`
                    <img src="${imageUrl}" alt="Recipe Image">
                    <h5 class="name">${label}</h5>
                    <p><strong>Source Website:</strong> ${source}</p>
                    <p><strong>URL:</strong><a href="${url}"> To visit the original site click here</a></p>
                    `);          
        console.log(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
fetch(apiUrl2)
    .then(response => response.json())
    .then(data => {
        var strArea = data.meals[0].strArea;
        var strMeal = data.meals[0].strMeal;
        var strCategory = data.meals[0].strCategory;
        var strMealThumb = data.meals[0].strMealThumb;
        var strTags = data.meals[0].strTags;
        var strYoutube = data.meals[0].strYoutube;
        var strSource = data.meals[0].strSource;
        var strInstructions = data.meals[0].strInstructions;
        jQuery("#insertHere").html(`
        <h5 class="name">${strMeal}</h5>
<p><strong>Sreet Area:</strong> ${strArea}</p>
<p><strong>Sreet Tags:</strong> ${strTags}</p>
<p><strong>Category:</strong> ${strCategory}</p>
<p> Instructions: ${strInstructions}</p>
`)
        jQuery("#image-suport").html(`
                    <img src="${strMealThumb}" alt="Recipe Image" height=500px>
                    <h5 class="name">${strMeal}</h5>
                    <p><strong>Youtube:</strong><a href="${strYoutube}"> To visit the original site click here</a></p>
                    <p><strong>URL:</strong><a href="${strSource}"> To visit the original site click here</a></p>
                    `);
        console.log(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });