let container =""
let cartInfo=[];
const PRICE=50;
let currentUser = sessionStorage.getItem("user")
let qtyinitialAdd = 0;
let orderDate = new Date();

if(!currentUser){
    alert("Plz login ")
    window.location.href="login.html";
}

function searchItemData(){
    let mid = document.getElementById("mid").value
   fetch('https://dummyjson.com/recipes/'+mid)
    .then(res => res.json())
    .then(result=>console.log(result)).catch(error=>console.log(error))
}


function showCartData() {
    //console.log(cartInfo.length)
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
    yourorders();
    orderDate = new Date().toLocaleDateString();
});

let clearCart = document.createElement("button");

clearCart.innerText = "Clear cart";
clearCart.style.backgroundColor = "white";
clearCart.style.border = "1px solid black";
list.appendChild(clearCart);

clearCart.addEventListener("click",()=> {
    alert("Cart is cleared. Add your items of choice again");
    cartInfo=[];
    list.innerHTML="";
    // placeOrderButton.remove();
    // clearCart.remove();
    homePage();
});
    

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
    menu.style.border = "1px solid #ccc"; 


    
   
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

}

function hideAll() {
    document.getElementById("cart-item").style.display="none"
}

function logout() {
    sessionStorage.removeItem("user");
    window.location.href="login.html";
}

function aboutus() {
    window.location.href="Aboutus.html";
}

function services() {
    window.location.href="Services.html";
}

function yourorders() {
       
    document.getElementById("cart-item").style.display="none"
    

    let p = document.createElement("p");
    p.innerText = "Thank you for placing the order. The order will reach you soon";
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
    

    let p2 = document.createElement("p");
    p2.innerText = "Click below to get get into Orders page";
    document.getElementById("view-orders").appendChild(p2);

    let ordersButton = document.createElement("button");

    ordersButton.innerText = "Orders";
    ordersButton.style.backgroundColor = "Orange";
    ordersButton.style.border = "1px solid black";
    ordersButton.style.width = "200px";
    ordersButton.style.marginTop = "35px";

    document.getElementById("view-orders").appendChild(ordersButton);

    ordersButton.addEventListener("click",()=> {
        document.getElementById("view-orders").innerHTML = "";
        yourorders1();
});
}

function yourorders1() {
    window.location.href="Orders.html";
}

function wishlists() {
    window.location.href="Wishlists.html";
}

function contact() {
    window.location.href="Contact.html";
}

function homePage() {
    window.location.href="dashboard.html";
}