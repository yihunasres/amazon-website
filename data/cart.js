
export let cart=JSON.parse(localStorage.getItem('cart'));


if(!cart){

  cart=[   
    {
    itemId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2,
    deliveryoptionId:'1'
    },
    {
    itemId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    
    quantity:1,
    deliveryoptionId:'1'
    
    
    
    }
    
    
    
    ];

}
 


export function addToCart(itemId)
{
  let matchingItem;

  cart.forEach((product)=>{
if(itemId===product.itemId)
{
matchingItem=product;

}
   })


const quantitySelector=document.querySelector(`.js-quantity-selector-${itemId}`);
const quantity=Number(quantitySelector.value);



if(matchingItem)
{
matchingItem.quantity+=quantity;

}
else

{
  cart.push({
    itemId:itemId,
    quantity:quantity,
    deliveryoptionId:'2'
  
  
    
      })

}

saveToLocalStorage();

}
export function removeCart(productNumber){

const newCart=[];
cart.forEach((cartItem)=>{

if(cartItem.itemId!==productNumber){

newCart.push(cartItem);

}


})

cart=newCart;

saveToLocalStorage()

;
}


function saveToLocalStorage() {

  localStorage.setItem('cart',JSON.stringify(cart));

}
export function calculateCartQuantity()
{
  let cartQuantity=0;

  cart.forEach((item)=>{
  
  cartQuantity+=item.quantity;

  })
  
return cartQuantity;

}

export function updateQuantity(productId,newQuantity)

{
cart.forEach((cartItem)=>{

if(cartItem.itemId===productId)

{

    cartItem.quantity=newQuantity;
}



})

saveToLocalStorage();

}


export function updateDeliveryOption(productId,deliveryOptionId){

  let matchingItem;

cart.forEach((product)=>{
if(productId===product.itemId)
{
matchingItem=product;

}
   })

matchingItem.deliveryoptionId=deliveryOptionId;

saveToLocalStorage();

}