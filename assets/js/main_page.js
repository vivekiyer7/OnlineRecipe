document.addEventListener("DOMContentLoaded", function () {
  var app_id = "7bfc5058";
  var app_key = "72f32efdcea683bd1f0a63347aefc9a7";
  //var app_id = "cfba1ecd";
  //var app_key = "636950cdd1daaef47a38397170ebda0a";

  // Hide SearchDisplaySection when the page loads
  var searchDisplaySection = $("#SearchDisplaySection"); // Corrected ID casing
  searchDisplaySection.hide();

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
      recipeapi =
        "https://api.edamam.com/api/recipes/v2/" +
        randomrecipeid[i] +
        "?type=public&app_id=" +
        app_id +
        "&app_key=" +
        app_key;
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
          var recipeEL = $("#recipe" + (i + 1));
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
      randomfoodid.push(
        randomfooddbid[Math.floor(Math.random() * randomfooddbid.length)]
      );
    }
    //call the API to get the recipe details
    var recipeapi = "";
    recipeapi =
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + randomfoodid;
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

  //Search Section

  //Auto complete for the search recipe, cuisine and meal type
  var recipe = [];
  for (let i = 0; i < meallist.length; i++) {
    recipe.push(meallist[i].label);
  }

  $("#searchRecipe").autocomplete({
    source: recipe,
  });

  var cusinetype = [];
  for (let i = 0; i < cuisineArrayType.length; i++) {
    if (!cusinetype.includes(cuisineArrayType[i])) {
      cusinetype.push(cuisineArrayType[i]);
    }
  }

  $("#searchCuisine").autocomplete({
    source: cusinetype,
  });

  var mealtype = [];
  for (let i = 0; i < MealTypeArray.length; i++) {
    if (!mealtype.includes(MealTypeArray[i])) {
      mealtype.push(MealTypeArray[i]);
    }
  }
  $("#searchMealType").autocomplete({
    source: mealtype,
  });

  //Dont allow the user to enter the number in the search box
  $("#searchRecipe").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return true;
    } else {
      return false;
    }
  });
  $("#searchCuisine").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return true;
    } else {
      return false;
    }
  });
  $("#searchMealType").keypress(function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return true;
    } else {
      return false;
    }
  });

  // When Recipe is selected, disable the other two search boxes; when it's empty, enable the other two search boxes
  $("#searchRecipe").on({
    change: function () {
      $("#searchCuisine, #searchMealType").prop("disabled", true);
    },
    keyup: function () {
      if ($(this).val() === "") {
        $("#searchCuisine, #searchMealType").prop("disabled", false);
      }
    },
  });

  // When Cuisine and MealType are selected, clear and disable the recipe search box
  $("#searchMealType, #searchCuisine").on("change", function () {
    $("#searchRecipe").prop("disabled", true);
  });

  // Enable recipe search box when Cuisine or MealType is empty
  $("#searchCuisine, #searchMealType").on("keyup", function () {
    if ($(this).val() === "") {
      $("#searchRecipe").prop("disabled", false);
    }
  });

  function checkrecipename(recipename) {
    let recipeMatch = false;
    let recipeid = "";
    for (let i = 0; i < meallist.length; i++) {
      if (recipename === meallist[i].label) {
        recipeMatch = true;
        recipeid = meallist[i].id;
        break; // Exit the loop early if a match is found
      }
    }
    // If no match is found, display an alert and clear the search box
    if (!recipeMatch) {
      alert("Please enter a recipe name that is available in the list");
      $("#searchRecipe").val("");
      return;
    }
    return recipeid;
  }

  function checkcuisine(cusinetype) {
    let cuisineMatch = false;
    let cuisine = "";
    for (let i = 0; i < cuisineArrayType.length; i++) {
      if (cusinetype === cuisineArrayType[i]) {
        cuisineMatch = true;
        cuisine = cuisineArrayType[i];
        break; // Exit the loop early if a match is found
      }
    }
    // If no match is found, display an alert and clear the search box
    if (!cuisineMatch) {
      alert("Please enter a cuisine type that is available in the list");
      $("#searchCuisine").val("");
      return;
    }
    return cuisine;
  }

  function checkmealtype(mealtype) {
    let mealMatch = false;
    let meal = "";
    for (let i = 0; i < MealTypeArray.length; i++) {
      if (mealtype === MealTypeArray[i]) {
        mealMatch = true;
        meal = MealTypeArray[i];
        break; // Exit the loop early if a match is found
      }
    }
    // If no match is found, display an alert and clear the search box
    if (!mealMatch) {
      alert("Please enter a meal type that is available in the list");
      $("#searchMealType").val("");
      return;
    }
    return meal;
  }

  //Add the event listner to search button
  //This will call the new API to get the new recipe.
  var searchbtn = $("#searchoptionbtn");
  searchbtn.click(function (e) {
    e.preventDefault();
    var recipename = $("#searchRecipe").val();
    var cusinetype = $("#searchCuisine").val();
    var mealtype = $("#searchMealType").val();
    var searchapi = "";
    if (recipename === "" && cusinetype === "" && mealtype === "") {
      alert("Please enter the search criteria");
      return;
    }

    if (recipename !== "" && cusinetype === "" && mealtype === "") {
      let recipeid = checkrecipename(recipename);

      if (recipeid !== "") {
        searchapi =
          "https://api.edamam.com/api/recipes/v2/" +
          recipeid +
          "?type=public&app_id=" +
          app_id +
          "&app_key=" +
          app_key;
      }
    } else if (recipename === "" && cusinetype !== "" && mealtype === "") {
      let cuisine = checkcuisine(cusinetype);

      if (cuisine !== "") {
        searchapi =
          "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          cusinetype +
          "&app_id=" +
          app_id +
          "&app_key=" +
          app_key;
      }
    } else if (recipename === "" && cusinetype === "" && mealtype !== "") {
      let meal = checkmealtype(mealtype);
      if (meal !== "") {
        searchapi =
          "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          mealtype +
          "&app_id=" +
          app_id +
          "&app_key=" +
          app_key;
      }
    } else if (recipename === "" && cusinetype !== "" && mealtype !== "") {
      let cuisine = checkcuisine(cusinetype);
      let meal = checkmealtype(mealtype);
      if (cuisine !== "" && meal !== "") {
        searchapi =
          "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          cusinetype +
          "&mealType=" +
          mealtype +
          "&app_id=" +
          app_id +
          "&app_key=" +
          app_key;
      }
    }

    if (searchapi === "") {
      alert("Please enter the search criteria");
      return;
    } else {
      // Assuming recipeTableBody is the ID of the table body element
      const recipeTableBody = document.getElementById("recipeTableBody");
      searchDisplaySection.show(); 
      fetch(searchapi)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          if (data.recipe) {
            imagelink = data.recipe.image;
            dishname = data.recipe.label;
            calories = data.recipe.calories;
            cusinetype = data.recipe.cuisineType;
            mealtype = data.recipe.mealType;
            calories = Math.round(calories * 100) / 100;

            // Clear the table body before adding new content
            recipeTableBody.innerHTML = "";
            // Display the recipe details in the main page Table
            recipeTableBody.innerHTML += `
                <tr>
                    <td>${dishname}</td>
                    <td>${cusinetype}</td>
                    <td>${mealtype}</td>
                    <td>${calories}</td>
                    <td><img src="${imagelink}" alt="recipe"></td>
                    <td><button class="btn Detailbtn btn-primary">Details</button></td>
                </tr>
            `;
          } else if (data.hits && data.hits.length > 0) {
            // Clear the table body before adding new content
            recipeTableBody.innerHTML = "";
            for (let i = 0; i < Math.min(10, data.hits.length); i++) {
              imagelink = data.hits[i].recipe.image;
              dishname = data.hits[i].recipe.label;
              calories = data.hits[i].recipe.calories;
              cusinetype = data.hits[i].recipe.cuisineType;
              mealtype = data.hits[i].recipe.mealType;
              calories = Math.round(calories * 100) / 100;


              // Modify this to append content to the correct element
              recipeTableBody.innerHTML += `
                    <tr>
                        <td>${dishname}</td>
                        <td>${cusinetype}</td>
                        <td>${mealtype}</td>
                        <td>${calories}</td>
                        <td><img src="${imagelink}" alt="recipe"></td>
                        <td><button class="btn Detailbtn btn-primary">Details</button></td>
                    </tr>`;
            }
          }
        });

      // Create Event listener for the Detailbtn button
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("Detailbtn")) {
          alert("Details button clicked");
        }
      });
    }
  });
});
