const mealsE1 = document.getElementById('meals');
const FavMeal = document.querySelector('ul');

async function getRandomMeal() {
    const respData = await (await fetch("https://www.themealdb.com/api/json/v1/1/random.php")).json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealbyId(id) {
    const mealbyId = await (await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)).json();
    const meal = mealbyId.meals[0];
    return meal;

}

async function getMealbySearch(term) {
    const respData = await (await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)).json();
    const mealbyTerm = respData.meals;
    return mealbyTerm;
}
getRandomMeal();
fetchFavMeals();

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
        <div class="meal-header">
        ${random ? `<span class="random"> Random Recipe </span>` : ''}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="heart">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `
    const btn = meal.querySelector(".meal-body .heart");
    btn.addEventListener("click",()=>{
       
        if(btn.classList.contains('active')){
            
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove('active');
            
        }
        else{

            addMealToLS(mealData.idMeal);
            btn.classList.add('active');
            
        }
        fetchFavMeals();
        
    });

    const showMeal = meal.querySelector('img');
    showMeal.addEventListener('click',()=>{
        showMealInfo(mealData);
    });
    mealsE1.appendChild(meal);
}

function getMealsFromLS(){
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}

function addMealToLS(mealId){
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds,mealId]));
}

function removeMealFromLS(mealId){

    const mealIds = getMealsFromLS();

    localStorage.setItem("mealIds",JSON.stringify(mealIds.filter((id)=> id !== mealId)));

}

async function fetchFavMeals(){
    //clean the container
    FavMeal.innerHTML="";

    const mealIds = getMealsFromLS();
    const meals = [];
    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        const meal = await getMealbyId(mealId);
        addMealFav(meal);
    }
}

function addMealFav(mealData){
  
    const Favmeal = document.createElement('li');
    Favmeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <span>${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-times"></i></button>
    `
    
    const deleteBtn = Favmeal.querySelector('.clear');
    deleteBtn.addEventListener('click',()=>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    });

    const showMeal = Favmeal.querySelector('img');
    showMeal.addEventListener('click',()=>{
        showMealInfo(mealData);
    });

    FavMeal.appendChild(Favmeal);

   
    
}

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click',async ()=>{
    //clean container

    mealsE1.innerHTML = '';
    const searchValue = searchTerm.value;
    
    const meals = await getMealbySearch(searchValue);
    
    if(meals){
        meals.forEach(meal=>{
            addMeal(meal);
        });
    }
});

const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');

popupCloseBtn.addEventListener('click',()=>{
    mealPopup.classList.add('hidden');
});

const mealInfoE1 = document.getElementById('meal-info');

function showMealInfo(mealData){
    //clean it up 
    mealInfoE1.innerHTML="";

    const mealE1 = document.createElement('div');
    const ingredients = [];
    //get ingredients and measure 
    for(let i = 1; i<=20; i++){
        if(mealData['strIngredient' + i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
        }
        else{
            break;
        }
    }

    mealE1.innerHTML = `
                <h2>${mealData.strMeal}</h2>
                <img src="${mealData.strMealThumb}" alt="">
                <div class="info">
                <h3>Instructions:</h3>
                <p>
                    ${mealData.strInstructions}
                </p>
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients.map(ing => `
                    <li> ${ing} </li>
                    `
                    ).join('')}
                </ul>
                </div>
    `
    mealInfoE1.appendChild(mealE1);

    //show popup
    mealPopup.classList.remove('hidden');
}