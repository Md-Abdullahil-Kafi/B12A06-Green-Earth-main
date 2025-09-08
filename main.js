const spinner = document.getElementById('spinner');

// Load Category
const categoryLoad = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=> res.json())
    .then(data=> loadCategories(data.categories));
}
const loadCategories=(categories)=>{
    const catSection = document.getElementById('categories');
    catSection.innerHTML = "";
    for(const category of categories){
        const newLi = document.createElement('li');
        newLi.innerHTML = `<button id="categoryBtn${category.id}" onclick="loadTrees(${category.id})" class="bg-gray-400 py-1 px-3 text-white rounded-sm hover:bg-green-700 cursor-pointer w-full btn categoryBtn">${category.category_name}</button>`;
        catSection.append(newLi);
    }
}
categoryLoad();

// Load Plants
const defaultPlants = ()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => loadPlants(data.plants))
}
// Load Trees
const loadTrees = (id)=>{
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML='';
    spinner.classList.remove('hidden');
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
        const categoryBtn = document.getElementById(`categoryBtn${id}`)
        const allBtns = document.getElementsByClassName('categoryBtn');
        for(const btn of allBtns){
            btn.classList.remove('active')
        }
        categoryBtn.classList.add('active');
        // console.log(categoryBtn)
        loadPlants(data.plants)
      
    })
    
}

// Card Details

const cardDetails = async(id)=>{
    const url= `https://openapi.programming-hero.com/api/plant/${id}`
    const res = await fetch(url) 
    const details = await res.json();
    detailView(details.plants);
}

const detailView = (card)=>{
    const modalBox = document.getElementById('modalBox');
    modalBox.innerHTML = `
    <div class="card bg-white p-4 text-start space-y-3">
                            <img class="mx-auto rounded-lg  aspect-3/2 object-cover" src="${card.image}" alt="Card Image">
                            <h1 onclick="cardDetails(${card.id})" class="font-bold text-start">${card.name}</h1>
                            <p class="opacity-80 text-[12px]">${card.description}</p>
                            <div class="price">
                            <div class="type flex justify-between">
                                <p class="py-1 px-3 font-semibold bg-[#DCFCE7] text-[#15803D] rounded-full">${card.category}</p>
                                <p class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${card.price}</span></p>
                            </div>
                            </div>
                            <div class="addToCart">
                                <button onclick="" class="bg-[#15803D] btn font-bold text-center rounded-full w-full  text-white">Add To Cart</button>
                            </div>
                            </div>
    `
    my_modal_2.showModal();
}

const loadPlants = (plants) => {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML='';
    for(const plant of plants){
        const newDiv = document.createElement('div')
        newDiv.innerHTML = `
                            <div class="card bg-white p-4 text-start space-y-3">
                            <img class="mx-auto rounded-lg  aspect-3/2 object-cover" src="${plant.image}" alt="Card Image">
                            <h1 onclick="cardDetails(${plant.id})" class="font-bold text-start hover:text-green-600 cursor-pointer">${plant.name}</h1>
                            <p class="opacity-80 text-[12px]">${plant.description}</p>
                            <div class="price">
                            <div class="type flex justify-between">
                                <p class="py-1 px-3 font-semibold bg-[#DCFCE7] text-[#15803D] rounded-full">${plant.category}</p>
                                <p class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plant.price}</span></p>
                            </div>
                            </div>
                            <div class="addToCart">
                                <button onclick="addToCart(${plant.price},'${plant.name}')" class="bg-[#15803D] btn font-bold text-center rounded-full w-full  text-white">Add To Cart</button>
                            </div>
                            </div>
        `;
        cardContainer.append(newDiv);
        spinner.classList.add('hidden');
    }
    
}

let cartItems = [];
let totalPrice = 0;
const addToCart = (price, name) =>{
    const data = {
        productName : name,
        productPrice : price,
    }
    cartItems.push(data);
    let cartContainer = document.getElementById('cartContainer');
    cartContainer.innerHTML = '';
    for(const cart of cartItems){
        const newCart = document.createElement('div');
        newCart.innerHTML = `
                    <div class="cart flex justify-between items-center bg-[#F0FDF4] rounded-lg p-2 my-3">
                    <div class="title ">
                      <h1 class="font-semibold">${cart.productName}</h1>
                      <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="font-semibold">${cart.productPrice}</span></p>
                    </div>
                    <button><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    </div>
        `
        cartContainer.append(newCart);
    }

    // console.log(cartItems)
}


// defaultPlants();