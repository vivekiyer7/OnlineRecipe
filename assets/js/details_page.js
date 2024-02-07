var app_id = "cfba1ecd";
var app_key = "636950cdd1daaef47a38397170ebda0a";
const data = JSON.parse(window.localStorage.getItem("Check_Details"));
const recipeId = data.id;

const apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${app_id}&app_key=${app_key}`;

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
                    <p><strong>URL:</strong><a href="${url}">Click here</a></p>
                    `);          
        console.log(data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });