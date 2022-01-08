document.getElementById('button-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-cocktail');
    const searchText = searchField.value;
    searchField.value = '';
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res => res.json())
        .then(info => loadingCocktail(info.drinks))
})

const loadingCocktail = cocktails => {
    const displayCocktail = document.getElementById("display-cocktail")
    displayCocktail.textContent = '';
    cocktails.forEach(cocktail => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div onclick= " loadingDetails('${cocktail.idDrink}')" class="card h-100">
                <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${cocktail.strDrink}</h5>
                    <p class="card-text">${cocktail.strInstructions}</p>
                </div>
            </div>
        `;
        displayCocktail.appendChild(div)
    })
}

const loadingDetails = idDrink => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
        .then(res => res.json())
        .then(data => displayingDetails(data.drinks))
}

const displayingDetails = wines => {

    const singleCocktails = document.getElementById('single-cocktails');
    singleCocktails.textContent = '';
    for (const wine of wines) {
        const div = document.createElement('div');
        div.innerHTML = `
           <div class="row g-0">
           <div class="col-md-4">
               <img src="${wine.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
           </div>
           <div class="col-md-8">
               <div class="card-body">
                   <h5 class="card-title">Drink ID: ${wine.idDrink}</h5>
                   <p class="card-text">Modified Date: ${wine.dateModified}</p>
                   <p>Category: ${wine.strCategory}</p>
                   <p>Instructions: ${wine.strInstructions}<>
               </div>
           </div>
       </div>
           `;
        singleCocktails.appendChild(div)
    }


}