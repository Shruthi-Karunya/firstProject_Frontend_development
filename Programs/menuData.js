let container =""
let cartInfo=[];
const PRICE=50;
let currentUser = sessionStorage.getItem("user")
let qtyinitialAdd = 0;
let orderDate = new Date();
let recipes = [];

if(!currentUser){
    alert("Plz login ")
    window.location.href="login.html";
}

function searchItemData(){

    const searchBox = document.getElementById("searchBox");
   
    searchBox.addEventListener("input", function() {
      const query = searchBox.value.toLowerCase();

      if (query.length === 0) { // Clear results if nothing typed 
      //document.getElementById("menu-item").innerHTML = ""; 
      return;
    }

      const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query)
      );
      displayResults(filtered);
    });

 
    //loadRecipes();
    loadfilteredData();
}


function displayResults(list) {
  const menu = document.getElementById("menu-item");
  menu.innerHTML = ""; // clear old items

  if (list.length === 0) {
    menu.innerHTML = "<p>No recipes found</p>";
    return;
  }

  list.forEach(recipe => {
    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = recipe.image;
    img.className = "w-36 m-4 p-2 text-center bg-white";

    let p = document.createElement("p");
    p.innerText = recipe.name;
   // alert (recipe.name);

    let button1 = document.createElement("button");
    button1.innerText = "Add to cart";
    button1.style.backgroundColor = "Orange";
    button1.style.border = "2px solid black";
    button1.style.width = "120px";
    button1.style.cursor = "pointer";

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(button1);
    menu.appendChild(div);

    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";

    menu.appendChild(div);
    //document.getElementById("menu-item").appendChild(div);

            button1.addEventListener("click",()=> {
            //alert (menu.name)
            let result = cartInfo.find(cartItem =>cartItem.name==recipe.name)
              
            if(!result){
                
                cartInfo.push({name:recipe.name,qty:1,price:PRICE})
                qtyinitialAdd = qtyinitialAdd + 1;
                alert("Item Added in cart")
                const cartBtn = document.getElementById("cartBtn"); 
                cartBtn.textContent = `Cart (${qtyinitialAdd})`;
                
            }else {
                alert("Item already present in cart")
            }
            
        })
  });
}


function loadfilteredData() {
  fetch("https://dummyjson.com/recipes")
    .then(res => res.json())
    .then(result => {
      recipes = result.recipes; // ✅ store recipes globally
      displayResults(recipes);  // show all initially
    });
}




function showCartData() {

    if(qtyinitialAdd === 0)
    {
        alert("Oops!! Cart is empty!! Grab something to eat from Foodie-Empire");
    }

    document.getElementById("view-orders").hidden = true;   // hide
    //document.getElementById("view-orders").hidden = false;  // show
    //document.getElementById("view-orders").innerHTML = "";

    document.getElementById("menu-item").style.display="none"
    document.getElementById("cart-item").style.display="flex"
    let list = document.getElementById("cart-item")
    list.innerHTML="";
    let total = 0;
    let total_qty = 0;

    cartInfo.forEach((item,i)=> {
        total = total+item.qty*item.price;
        total_qty = item.qty + total_qty;

        

        
        list.style.flexDirection = "column";  
        list.style.position = "fixed";        
        list.style.top = "200px";         
        list.style.left = "300px";         


        list.innerHTML += `
        <div class="flex justify-between items-center p-2 border-b gap-3">
        <span>${item.name}</span>
        <div class="flex items-center gap-1">
        <button onclick="updateQty(${i},-1)">-</button>
        <span>${item.qty}</span>
        <button onclick="updateQty(${i},1)">+</button>
        </div>
        <span class="font-bold">${PRICE*item.qty}</span>
        </div>
        `;


            
    });

    if (cartInfo.length > 0) {

            list.innerHTML += `
            <div class="flex justify-between items-center p-2 border-t font-bold">
            <span>Total</span>
            <span></span> <!-- empty middle column -->
            <span>${total}</span>
            </div>
            `;

        let placeOrderButton = document.createElement("button");

        placeOrderButton.innerText = "Place order";
        placeOrderButton.style.backgroundColor = "Orange";
        placeOrderButton.style.border = "1px solid black";
        list.appendChild(placeOrderButton);

        placeOrderButton.addEventListener("click",()=> {
        alert("Order placed. Happy day");
        //saveOrder(cartInfo);
        //yourorders();

    document.getElementById("cart-item").style.display="none"
       
    document.getElementById("post-order").innerHTML = "Thank you for placing the order. The order will reach you soon";
    const p1 = document.getElementById("post-order");
    p1.style.display = "flex";        
    p1.style.flexDirection = "column";  
    p1.style.position = "fixed";        
    p1.style.top = "170px";         
    p1.style.left = "220px";         
    p1.style.width = "1350px";           
    p1.style.height = "480px";          
    p1.style.overflowY = "auto";     
    p1.style.fontSize = "20px";

    // let orderRedirect = document.createElement("button");
    // orderRedirect.innerHTML = "Order Summary";
    // //document.getElementById("post-oder").appendChild(orderRedirect);
    // orderRedirect.style.backgroundColor = "Orange";
    // orderRedirect.style.border = "2px solid black";
    // orderRedirect.style.width = "120px";
    // orderRedirect.style.cursor = "pointer";

    // button1.addEventListener("click",()=> {
    //     yourorders1();
    // });

    cartInfo=[];
    const cartBtn = document.getElementById("cartBtn"); 
    cartBtn.textContent = `Cart`;
    qtyinitialAdd = 0;
        // orderDate = new Date().toLocaleDateString();
            });

        let clearCart = document.createElement("button");

        clearCart.innerText = "Clear cart";
        clearCart.style.backgroundColor = "white";
        clearCart.style.border = "1px solid black";
        list.appendChild(clearCart);

        clearCart.addEventListener("click",()=> {
        alert("Cart is cleared. Add your items of choice again");
        cartInfo=[];
        document.getElementById("cart-item").style.display = "none";
        const cartBtn = document.getElementById("cartBtn"); 
        cartBtn.textContent = `Cart`;
        qtyinitialAdd = 0;
     });
    
    }
}


function updateQty(index,change){
    console.log("event called.")
    
    cartInfo[index].qty+=change;  
    if (cartInfo[index].qty === 0) {
            cartInfo.splice(index,1);
            qtyinitialAdd = qtyinitialAdd - 1;
                const cartBtn = document.getElementById("cartBtn"); 
                cartBtn.textContent = `Cart (${qtyinitialAdd})`;
        } 
    console.log(cartInfo)
    
    showCartData();
}


function loadFakeData() {
    document.getElementById("post-order").style.display = "none";
    //document.getElementById("view-orders").hidden = true; 
    document.getElementById("view-orders").innerHTML = "";
    if (container==="") {
    let h1 = document.createElement("p");
    let user = sessionStorage.getItem("user");
    let h1TagValue = document.createTextNode(user);
    h1.appendChild(h1TagValue);
    document.getElementById("user").appendChild(h1)
}
    container = document.getElementById("user")

    hideAll();
    // document.getElementById("menu-item").style.display="flex"

    const menu = document.getElementById("menu-item");
    menu.style.display = "flex";        
    menu.style.flexDirection = "column";  
    menu.style.position = "fixed";        
    menu.style.top = "170px";         
    menu.style.left = "220px";         
    menu.style.width = "1350px";           
    menu.style.height = "480px";          
    menu.style.overflowY = "auto";     
    //menu.style.border = "1px solid #ccc"; 


    
   
    fetch('https://dummyjson.com/recipes')
        .then(res => res.json())
        .then(result=> {
        result.recipes.forEach(menu=> {
        let div = document.createElement("div")
         
        let img = document.createElement("img");
        img.src=menu.image;
        img.className="w-36 m-4 p-2 text-center bg-white"

        let p = document.createElement("p");
        p.innerText=menu.name;
        let button1 = document.createElement("button");
        button1.innerText = "Add to cart";
        button1.style.backgroundColor = "Orange";
        button1.style.border = "2px solid black";
        button1.style.width = "120px";
        button1.style.cursor = "pointer";

        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(button1);
        

        button1.addEventListener("click",()=> {
            
            console.log(menu.name)
            let result = cartInfo.find(cartItem =>cartItem.name==menu.name)
              
            if(result==undefined){
                
                cartInfo.push({name:menu.name,qty:1,price:PRICE})
                qtyinitialAdd = qtyinitialAdd + 1;
                alert("Item Added in cart")
                const cartBtn = document.getElementById("cartBtn"); 
                cartBtn.textContent = `Cart (${qtyinitialAdd})`;
                
            }else {
                alert("Item already present in cart")
            }
            
        })
        
        div.style.display = "flex"; 
        div.style.flexDirection = "column"; 
        div.style.alignItems = "center"; 

        document.getElementById("menu-item").appendChild(div);

    })
});  

//document.getElementById("place-order").style.display = "none";

}

function hideAll() {
    document.getElementById("cart-item").style.display="none"
}

function logout() {
    sessionStorage.removeItem("user");
    window.location.href="login.html";
}

function aboutus() {
    document.getElementById("view-orders").hidden = false; 
    document.getElementById("post-order").hidden = true;
    document.getElementById("cart-item").style.display="none";
    const D = CommonFunc;
    D();
}

function services() {
    document.getElementById("view-orders").hidden = false;
    document.getElementById("post-order").hidden = true; 
    document.getElementById("cart-item").style.display="none";
    const E = CommonFunc;
    E();
    
}

// function yourorders() {
    
//     document.getElementById("post-order").innerHTML = "";
//        document.getElementById("cart-item").style.display="none"
       
//     document.getElementById("post-order").innerHTML = "Thank you for placing the order. The order will reach you soon";
//         const p1 = document.getElementById("post-order");
//     p1.style.display = "flex";        
//     p1.style.flexDirection = "column";  
//     p1.style.position = "fixed";        
//     p1.style.top = "170px";         
//     p1.style.left = "220px";         
//     p1.style.width = "1350px";           
//     p1.style.height = "480px";          
//     p1.style.overflowY = "auto";     
//     p1.style.fontSize = "20px";

//     // let orderRedirect = document.createElement("button");
//     // orderRedirect.innerHTML = "Order Summary";
//     // //document.getElementById("post-oder").appendChild(orderRedirect);
//     // orderRedirect.style.backgroundColor = "Orange";
//     // orderRedirect.style.border = "2px solid black";
//     // orderRedirect.style.width = "120px";
//     // orderRedirect.style.cursor = "pointer";

//     // button1.addEventListener("click",()=> {
//     //     yourorders1();
//     // });

//     cartInfo=[];
//     const cartBtn = document.getElementById("cartBtn"); 
//     cartBtn.textContent = `Cart`;
//     qtyinitialAdd = 0;
    
// }

function CommonFunc() {
    
    document.getElementById("menu-item").style.display="none"
    document.getElementById("view-orders").innerHTML = "";

    let p = document.createElement("p");
    p.innerText = "You are in the page that need to be Enhanced still";
    document.getElementById("view-orders").appendChild(p);
    const p1 = document.getElementById("view-orders");
    p1.style.display = "flex";        
    p1.style.flexDirection = "column";  
    p1.style.position = "fixed";        
    p1.style.top = "170px";         
    p1.style.left = "220px";         
    p1.style.width = "1350px";           
    p1.style.height = "480px";          
    p1.style.overflowY = "auto";     
    p1.style.fontSize = "20px";
}

function yourorders1() {
    document.getElementById("view-orders").hidden = false; 
    document.getElementById("post-order").innerHTML = "";
    document.getElementById("cart-item").style.display="none";
    const A=CommonFunc;
    A();
    // showOrderHistory();
}
function wishlists() {
    document.getElementById("view-orders").hidden = false; 
    document.getElementById("post-order").hidden = true;
    document.getElementById("cart-item").style.display="none";
    const B = CommonFunc;
    B();
}

function contact() {
     document.getElementById("view-orders").hidden = false; 
     document.getElementById("post-order").hidden = true;
     document.getElementById("cart-item").style.display="none";
    const C = CommonFunc;
    C();
}


document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(".itemList li");
  const menuBtn = document.getElementById("loadFakedataInitial");

  // Highlight clicked li
  listItems.forEach(item => {
    item.addEventListener("click", function() {
      // clear all li highlights and menu button highlight
      listItems.forEach(li => li.classList.remove("active"));
      menuBtn.classList.remove("active");

      // add active to clicked li
      this.classList.add("active");
    });
  });

  // Highlight menu button and clear li highlights
  menuBtn.addEventListener("click", function() {
    listItems.forEach(li => li.classList.remove("active"));
    this.classList.add("active");
  });
});


// function saveOrder(cartInfo) {
//   const orderDate = new Date().toLocaleString();
//   const order = {
//     date: orderDate,
//     items: cartInfo.map(item => ({
//       name: item.name,
//       qty: item.qty,
//       price: item.price
//     }))
//   };

//   // Get existing history or start fresh
//   let history = JSON.parse(localStorage.getItem("orderHistory")) || [];
//   history.push(order);

//   // Save back
//   localStorage.setItem("orderHistory", JSON.stringify(history));
// }

// function showOrderHistory() {
//   const summaryContainer = document.getElementById("view-orders");
//   summaryContainer.innerHTML = "";

//   const history = JSON.parse(localStorage.getItem("orderHistory")) || [];

//   if (history.length === 0) {
//     summaryContainer.textContent = "No past orders yet.";
//     return;
//   }

//   history.forEach((order, index) => {
//     const section = document.createElement("div");
//     section.className = "order-block";

//     const heading = document.createElement("h3");
//     heading.textContent = `Order #${index + 1} — ${order.date}`;
//     section.appendChild(heading);

//     const list = document.createElement("ul");
//     let total = 0;
//     order.items.forEach(item => {
//       const li = document.createElement("li");
//       li.textContent = `${item.name} — Qty: ${item.qty} — Price: ${item.qty * item.price}`;
//       list.appendChild(li);
//       total += item.qty * item.price;
//     });
//     section.appendChild(list);

//     const totalPara = document.createElement("p");
//     totalPara.textContent = `Total: ${total}`;
//     section.appendChild(totalPara);

//     summaryContainer.appendChild(section);
//   });
// }
