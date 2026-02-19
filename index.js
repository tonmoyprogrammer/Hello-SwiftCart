const loadProducts= ()=>
{
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data=>displayProducts(data));
    
}

const loadShowmodal =(id)=>
{
    const fetchData = `https://fakestoreapi.com/products/${id}`
    fetch(fetchData)
    .then(res => res.json())
    .then(data => {displayShowmodal(data)})
}
const displayShowmodal = (product)=>
{
   const modalContainer = document.getElementById("modal-container");
   modalContainer.innerHTML="";
   
   
        const modal = document.createElement("div");
        modal.innerHTML=`
       

       <div class="p-10 space-y-4">
        <div class= "" >
               <p class="font-bold text-3xl">${product.category}</p>
        </div>

        <p class="font-semibold l text-gray-600">${product.title}</p>
        <p class="font-semibold l text-gray-600">${product.description}</p>


       
        <div class="flex justify-between " >
        <p class=" bg-[#BADEFF40] py-2 px-5 font-semibold rounded-2xl text-violet-700" >
        <i class="fa-solid fa-dollar-sign"></i> ${product.price}</p>
        <p class="text-gray-600" ><i class="fa-regular fa-star "></i> 
        <span> (${product.rating.rate})</p>
        </div>
        <button class="btn btn-primary px-10 rounded-2xl "><i class="fa-solid fa-cart-arrow-down"></i>
          Add
        </button>
        </div>

       </div>
        </div>
        
        `
           
        modalContainer.appendChild(modal);
          document.getElementById("my_modal_5").showModal();
  

 
}

//  
const displayProducts =(products)=>
{
    manageSpinner(true)
    
    const cartContainer = document.getElementById("cart-container");
        cartContainer.innerHTML="";


//  category: "men's clothing"
// description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
// id: 1
// image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
// price: 109.95
// rating: {rate: 3.9, count: 120}
// title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      products.forEach(product => {
     const cart = document.createElement("div");
        cart.innerHTML=`
        <div class="shadow-xl rounded-xl  h-full">
        <div class= "bg-[#BADEFF50] py-5 rounded-md ">
        <img src="${product.image}" class="h-[250px] w-[200px] mx-auto
        " alt="">
        </div>

       <div class="p-10 space-y-4">
        <div class="flex justify-between " >
        <p class="carts bg-[#BADEFF40] py-2 px-5 font-semibold rounded-2xl text-violet-700" >${product.category}</p>
        <p class="text-gray-600" ><i class="fa-regular fa-star "></i> ${product.rating.rate} 
        <span> (${product.rating.count})</p>
        </div>

        <p class="font-semibold text-2xl text-gray-600">${product.title}</p>
        <p id ="price${product.id}" class="font-2xl font-bold"><i class="fa-solid fa-dollar-sign">${product.price}</i></p>

        <div class="flex justify-between gap-2.5 "> 
        <button onClick="loadShowmodal(${product.id})" class="btn px-10 rounded-2xl text-gray-500"><i class="fa-solid fa-eye"></i>
            Details
        </button>

        <button id="cart-btn-${product.id}"  onClick="addCart(${product.id})"class="btn btn-primary px-10 rounded-2xl cartBtn"><i class="fa-solid fa-cart-arrow-down"></i>
          Add
        </button>
        </div>

       </div>
        </div>
        
        `
        cartContainer.appendChild(cart)
        
        
      });
      manageSpinner(false)
}

const removeBg = ()=>
{
    const allbtn = document.querySelectorAll(".cartBtn");
    allbtn.forEach(btn=>btn.classList.remove("btnClick"))
}

const addCart = (id)=>
    {
       let  showmoney = document.getElementById("total-price").innerText
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => {
            removeBg();
            const btn = document.getElementById(`cart-btn-${id}`)
         if(btn)
         {
               btn.classList.add("btnClick")
         }
            
            showCart(data)
        } )
    }

    const showCart = (price)=>
    {
        let  showmoney = document.getElementById("total-price");
        const newTotal = parseFloat(showmoney.innerText);

      const totalmoney = newTotal + price.price;
      showmoney.innerText = totalmoney.toFixed(2);
    //   alert("Added Successfuly");
    }
        
        
        
        
        loadProducts();
document.getElementById("sub-btn").addEventListener(("click"),(e)=>
{
    
    const input = document.getElementById("input-btn");
    const inputValue = input.value;
    if(inputValue.trim() !== "")
    {
        window.location.href = "index.html"
    

    }
    else{
        alert("something error")
    }
})


// Manage spinner
const manageSpinner = (status)=>
{
    const spinner = document.getElementById("spinner");
    const cartContainer = document.getElementById("cart-container");
    if(status)
    {
        spinner.classList.remove("hidden");
        cartContainer.classList.add("hidden")
    }
    else{
        spinner.classList.add("hidden")
        cartContainer.classList.remove("hidden");
    }

}