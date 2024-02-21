import {cart,removeCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js';
import {getProduct, products} from  '../../data/products.js';
import {formatCurrency} from  '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentsummary.js';

export function updateAllContents()

{


let chechoutProductContainer='';



cart.forEach((cartItem)=>{

  let matchingItem=getProduct(cartItem.itemId);

const deliveryOptionId=cartItem.deliveryoptionId;

let deliveryOption=getDeliveryOption(deliveryOptionId);



const today=dayjs();
  const deliveryDay=today.add(deliveryOption.deliveryDays,'days');
  const dayFormat=deliveryDay.format('dddd, MMMM D');


chechoutProductContainer+= 

`   
<div class="cart-item-container js-cart-container-${matchingItem.id}">
<div class="delivery-date">
  Delivery date:${dayFormat}
</div>

<div class="cart-item-details-grid">
  <img class="product-image"       
    src=${matchingItem.image}>

  <div class="cart-item-details"> 
    <div class="product-name">
      ${matchingItem.name}
    </div>
    <div class="product-price">
      $${formatCurrency(matchingItem.priceCents)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
      </span>

      <span class="update-quantity-link link-primary js-update-quantity-link" 
      data-product-id="${matchingItem.id}">
        Update
      </span>
      <input class="quantity-input js-quantity-input-${matchingItem.id} js-quantity-input-event" data-product-id="${matchingItem.id}">
      <span class="link-primary save-quantity-link js-save-quantity" data-product-id="${matchingItem.id}">save</span>

      <span class="delete-quantity-link js-delete-quantity-link link-primary"
      data-product-id = "${matchingItem.id}">
        Delete
      </span> 
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:

    </div>
    
     ${deliveryOptionGenerate(matchingItem,cartItem)}
    
  </div>

  </div>

</div>

`;

})

function deliveryOptionGenerate(matchingItem,cartItem)

{

let deliveryOptionhtml='';
let isChecked;

let shippingCost;
deliveryOptions.forEach((deliveryOption)=>
{

  const today=dayjs();
  const deliveryDay=today.add(deliveryOption.deliveryDays,'days');
  const dayFormat=deliveryDay.format('dddd, MMMM D');

  if(deliveryOption.priceCents===0)
  {
shippingCost='FREE';

  }
  else
  {
shippingCost = `$${formatCurrency(deliveryOption.priceCents)}`;

  }



if(deliveryOption.id===cartItem.deliveryoptionId)

{

  isChecked='checked'

}

else
{

  isChecked='';
}

deliveryOptionhtml+=
`

  <div class="delivery-option js-delivery-option"
  data-product-id="${matchingItem.id}"
  data-option-id="${deliveryOption.id}">
      <input type="radio" 
       ${isChecked}
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}">
      <div>
        <div class="delivery-option-date">
          ${deliveryDay}
        </div>
        <div class="delivery-option-price">
          ${shippingCost}-Shipping
        </div>
      </div>

    </div>
`

})



return deliveryOptionhtml;


}


document.querySelector('.js-order-summary').innerHTML= chechoutProductContainer;

document.querySelectorAll('.js-delete-quantity-link')
.forEach((link)=>{
link.addEventListener('click',()=>{

const productId=link.dataset.productId;

removeCart(productId);

const cartContainer = document.querySelector(`.js-cart-container-${productId}`);

cartContainer.remove();

updateCheckoutQuantity();
renderPaymentSummary();

})


})

function updateCheckoutQuantity()

{

  document.querySelector('.js-checkout-section').innerHTML=calculateCartQuantity();


}
  
document.querySelectorAll('.js-update-quantity-link')
.forEach((link)=>{
link.addEventListener('click',()=>{

const productId=link.dataset.productId;

const Container=document.querySelector(`.js-cart-container-${productId}`);

Container.classList.add('is-editing-quantity');


})


})

document.querySelectorAll('.js-save-quantity')
.forEach((link)=>{

  link.addEventListener('click',()=>{

    const productId=link.dataset.productId;


    const Container=document.querySelector(`.js-cart-container-${productId}`);
  
    Container.classList.remove('is-editing-quantity');
    
    const inputValue=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    
    let newInput;
    
    if(inputValue>=0&&inputValue<=1000)
    {
    
    newInput=inputValue;
    
    }
    
    else
    {
    
      alert('YOU GOT WRONG INPUT');
    
    }
    
    updateQuantity(productId,newInput);
    
    const quantityLabel=document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newInput;
    
    updateCheckoutQuantity();
    renderPaymentSummary();
    

})


})

  
    document.querySelectorAll('.js-quantity-input-event')
    .forEach((link)=>{
    
      link.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){



          const productId=link.dataset.productId;
    
  
        const Container=document.querySelector(`.js-cart-container-${productId}`);
      
        Container.classList.remove('is-editing-quantity');
        
        const inputValue=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
        
        
        
        let newInput;
        
        if(inputValue>=0&&inputValue<=1000)
        {
        
        newInput=inputValue;
        
        }
        
        else
        {
        
          alert('YOU GOT WRONG INPUT');
        
        }
        
        updateQuantity(productId,newInput);
        
        const quantityLabel=document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newInput;
        
        updateCheckoutQuantity();
        renderPaymentSummary();
        
    
        }
  
    
    })
    
    
    })


document.querySelectorAll('.js-delivery-option').forEach((element)=>
    {

element.addEventListener('click',()=>{

const productId=element.dataset.productId;
const deliveryOptionId=element.dataset.optionId

updateDeliveryOption(productId,deliveryOptionId); 

updateAllContents();
renderPaymentSummary();

})

    })
    

updateCheckoutQuantity();

  }
  
