let cartInfo=[];
const PRICE=10;
let currentUser = sessionStorage.getItem("user")

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

    cartInfo.forEach((item,i)=> {
        total = total+item.qty*item.price;

        list.innerHTML+=`
            <div class="">
                <span>${item.name}</span>
                <div class="">
                    <button onclick="updateQty(${i},-1)">-</button>
            ${item.qty}
                    <button onclick="updateQty(${i},1)">+</button>
                    <span>${total}</span>
                </div>
            </div>
        `
    })
}
// function renderCartDetails(itemInCart,index) {
//         console.log(itemInCart+""+index)
//         cartInfo
// }
function updateQty(index,change){
    console.log("event called.")
    cartInfo[index].qty+=change;   
    console.log(cartInfo)
    showCartData();
}
function loadFakeData() {
    let h1 = document.createElement("p");
    let user = sessionStorage.getItem("user");
    let h1TagValue = document.createTextNode(user);
    h1.appendChild(h1TagValue);
    document.getElementById("user").appendChild(h1)
    hideAll();
    document.getElementById("menu-item").style.display="flex"
    
    fetch('https://dummyjson.com/recipes')
        .then(res => res.json())
        .then(result=> {
        result.recipes.forEach(menu=> {
        let div = document.createElement("div")
        
        div.className="flex p-2 m-4 "

        let img = document.createElement("img");
        img.src=menu.image;
        img.className="w-50 m-4 p-3 text-center bg-white"

        let p = document.createElement("p");
        p.innerText=menu.name
        

        div.appendChild(img);
        div.appendChild(p);

        img.addEventListener("click",()=> {
            console.log(menu.name)
            let result = cartInfo.find(cartItem =>cartItem.name==menu.name)
            if(result==undefined){
                
                cartInfo.push({name:menu.name,qty:1,price:PRICE})
                
                alert("Item Added in cart")
            }else {
                alert("Item already present in cart")
            }
            
        })
        //div.appendChild(divContent);
        //document.getElementsByTagName("body")[0].appendChild(div)
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