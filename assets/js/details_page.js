function showDetails() {
    const h2 = document.getElementById("insertHere");
    let text = "My inserted text";
    h2.insertAdjacentText("beforeend", text);
}

$(document).ready(function() {
            function displayFoodInfo() {
                var queryURL = "https://api.edamam.com/api/recipes/v2/68b1dd6da9193b21372bee7a2bd19941?type=public&app_id=7bfc5058&app_key=72f32efdcea683bd1f0a63347aefc9a7";

                fetch(queryURL)
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
                            jQuery("#insertHere").html(`
        <h3>Cuisine Type: ${cuisineType}</h3>
        <h4>Meal Type: ${mealType.map(mealType => `${mealType}`).join("")}</4>
        <h4>Dish Type: ${dishType.map(dishType => `${dishType}`).join("")}</4>
        <h4>Calories: ${calories}</4>
        <p>Ingredients:</p>
        <ul>
        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>
        <p>Diet Labels:</p>
        <ul>
        ${dietLabels.map(dietLabels => `<li>${dietLabels}</li>`).join("")}
        </ul>
        `);
        jQuery("#image-suport").html(`
        <img src="${imageUrl}" alt="Recipe Image">
        <h2>${label}</h2>
        `);
    });
}  
displayFoodInfo();
});