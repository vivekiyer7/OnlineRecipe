document.addEventListener('DOMContentLoaded', function () {
    displaySavedRecipes()

    function displaySavedRecipes() {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'))
        let savedRecipesContainer = document.getElementById('savedtablebody')

        if (savedRecipes === null || savedRecipes.length === 0) {
            savedRecipesContainer.innerHTML = ''
            //hide the savedrecipetable table but add a comment "No saved recipe in Local Storage in saveddisplaysection"
            let displaySection = document.getElementById('saveddisplaysection')

            // Styling for the display section
            displaySection.style.display = 'block'
            displaySection.style.textAlign = 'center'
            displaySection.style.padding = '20px'
            displaySection.style.fontSize = '30px'
            displaySection.style.fontWeight = 'bold'
            displaySection.style.color = 'red'
            displaySection.style.fontStyle = 'italic'
            displaySection.style.backgroundColor = 'lightgrey'
            displaySection.innerHTML = 'No saved recipe in Local Storage'
        } else {
            savedRecipesContainer.innerHTML = ''
            savedRecipes.forEach(recipe => {
                savedRecipesContainer.innerHTML += `
                <tr>
                    <td style="text-align: center; vertical-align: middle;"><img src="${recipe.image
                    }" alt="Recipe Image" style="width: 250px; height: auto;"></td>
                    <td style="text-align: center; vertical-align: middle;">${recipe.dishname
                    }</td>
                    <td style="text-align: center; vertical-align: middle;">
                    <div> Meal Type: ${recipe.mealtype}</div>
                    <div> Calories: ${recipe.cusinetype}</div>
                    <div> Cuisine Type: ${recipe.calories}</div>
                    <div> Comments: ${recipe.description}</div>
                    </td>
                    <td style="text-align: center; vertical-align: middle;">
                    <textarea id="comments_${recipe.id
                    }" placeholder="Add comments" style="width: 100%; min-height: 3em;">${recipe.comments || ''
                    }</textarea>
                    </td>
                    <td style="text-align: center; vertical-align: middle;"><button class="btn btn-primary" onclick="saveComments('${recipe.id
                    }')">Save</button></td>
                    <td style="text-align: center; vertical-align: middle;"><button class="btn btn-danger" onclick="deleteRecipe('${recipe.id
                    }')">Delete</button></td>        
                </tr>
                `
            })
        }
    }

    // Save comments to local storage and add that to description
    window.saveComments = function (id) {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'))
        let comments = document.getElementById(`comments_${id}`).value
        let recipeIndex = savedRecipes.findIndex(recipe => recipe.id === id)
        savedRecipes[recipeIndex].description = `${savedRecipes[recipeIndex].description}\n\n${comments}`
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes))
        location.reload(true)
    }

    // Delete recipe from local storage
    window.deleteRecipe = function (id) {
        let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'))
        let recipeIndex = savedRecipes.findIndex(recipe => recipe.id === id)
        savedRecipes.splice(recipeIndex, 1)
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes))
        location.reload(true)
    }
})
