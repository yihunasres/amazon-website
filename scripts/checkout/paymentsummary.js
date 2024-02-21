import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';
import { formatCurrency } from '../utils/money.js';



export function renderPaymentSummary()

{

let productPriceCents=0;
let ShippingCost=0;

cart.forEach((cartItem) => 

{

const product=getProduct(cartItem.itemId);
const deliveryOption=getDeliveryOption(cartItem.deliveryoptionId);

productPriceCents+=product.priceCents*cartItem.quantity;
ShippingCost+=deliveryOption.priceCents;
 
});

console.log(productPriceCents);
console.log(ShippingCost);
let totalCostBeforeTax=productPriceCents+ShippingCost;
let totalTaxCost=totalCostBeforeTax*.1;
let totalCost=totalTaxCost+totalCostBeforeTax;

console.log(totalCostBeforeTax);
console.log(totalTaxCost);
console.log(totalCost);


const paymentSummaryHTML=`
<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(ShippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCostBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalTaxCost)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>


`;

document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

}