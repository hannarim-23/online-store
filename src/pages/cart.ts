import { mainContainer } from "../index";
import { products } from "../components/products";
import { createHtmlElement } from "../components/createlement";
import { showModal } from "../components/modal";
import product from "./product";
import { ObjectType } from "../components/objectTtype";

const cartCountElement = document.querySelector('.cartCount');
const totalPriceElement = document.querySelector('.totalPrice');
const sectionCart = createHtmlElement('section', 'section-cart');


export let cartObject: ObjectType = {};

export let promoObject: ObjectType = {
    "HAPPYNY": 50,
    "RS": 10,
}

//added promocodes
export let promoActive: ObjectType = {};

function isEmpty(cartObject: ObjectType) {
    for (let key in cartObject) {
      return false;
    }
    return true;
}

export function sumCartProduct(cartObject: ObjectType): number{
    let sum = 0;
    if(isEmpty(cartObject)){
       sum = 0;
    }else{
        sum = Object.values(cartObject).reduce((accumulator, value)=>accumulator + value);
    }
    return sum;
}

let sumOfCartProduct = sumCartProduct(cartObject);
if(cartCountElement) cartCountElement.innerHTML = `${sumOfCartProduct}`;

export function sumTotalPrice(cartObject: ObjectType): number{
    let sum = 0;
    if(isEmpty(cartObject)){
       sum = 0;
    }else{
        for(let key in cartObject){
           let keyOfProduct = Number(key) - 1;
           let count = cartObject[key];
            let priceItem = products[keyOfProduct].price * count;
            sum = sum + priceItem;
        }
    }
    return sum;
}

let totalPrice = sumTotalPrice(cartObject);
if(totalPriceElement) totalPriceElement.innerHTML = `${totalPrice} $`;

let btnMinusCart;
let btnPlusCart;
let inputProductsOnPage: HTMLElement = createHtmlElement('input', 'input-products-on-page', 'input-products-on-page');
if(inputProductsOnPage && inputProductsOnPage instanceof HTMLInputElement){
    inputProductsOnPage.type = 'text';
    inputProductsOnPage.value = '3';
}
let summaryTotalPrice: HTMLElement;
let summaryTotalPriceWithPromoBox = createHtmlElement('div', 'summary-total-price-box');
let summaryTotalPriceWithPromo: HTMLElement;
let promoInput: HTMLElement|undefined;
let promoNumber: number = 0;
export let sumPromoNumber = 0;
let promoContainer: HTMLElement;
const promoActiveContainer = createHtmlElement('div', 'promo-active-container');
const promoText = createHtmlElement('p', 'promo-text', '', 'Try to enter promo codes "HAPPYNY" , "RS" ');
const promoTextAddContainer = createHtmlElement('div', 'promo-text-add-container');
promoText.prepend(promoTextAddContainer);

// render cart and pagination 
let currentPage: number = 1;
let rows: number;
export function renderCart(cartObject: ObjectType){
    sectionCart.innerHTML = '';
    const arrKey = Object.keys(cartObject);
    const paginationContainer = createHtmlElement('div', 'pagination-container');
    const textPaginationProduct = createHtmlElement('p', 'text-pagination-product', '', 'Products on the page : ')
    const textPages = createHtmlElement('p', 'text-pages', '', 'Pages: ');
    const pagesBtnContainer = createHtmlElement('div', 'pages-btn-container');
    const productCartContainer = createHtmlElement('div', 'product-cart-container');
    const summaryCartContainer = createHtmlElement('div', 'summary-cart-container');
    const productAndPriceContainer = createHtmlElement('div', 'product-price-container');
    promoContainer = createHtmlElement('div', 'promo-container');
    const productsCount = createHtmlElement('p', 'products-count-summary', '', `Products : ${sumCartProduct(cartObject)}`);
    summaryTotalPrice = createHtmlElement('p', 'summary-total-price', '', `Total price: ${sumTotalPrice(cartObject)} $`);
    const btnBuyContainer = createHtmlElement('div', 'btn-buy-now-container');
    const btnBuyNow = createHtmlElement('button', 'btn-buy-now', '', 'Buy Now');
    promoInput = createHtmlElement('input', 'promo-input', 'input-promocode');
    if(promoInput && promoInput instanceof HTMLInputElement){
        promoInput.type = 'text';
        promoInput.value = '';
        promoInput.placeholder = 'Enter the promo code';
    }
    if(inputProductsOnPage && inputProductsOnPage instanceof HTMLInputElement) rows = Number(inputProductsOnPage.value);
        displayProduct(arrKey, rows, currentPage);
        showPagination(arrKey, rows);
  
    inputProductsOnPage.addEventListener('change', (event: Event)=>{
        if(event.target && event.target instanceof HTMLInputElement){
            rows = Number(event.target.value);
            currentPage = 1;
            let url = new URL(window.location.href);
            url.searchParams.set('product', event.target.value);
            url.searchParams.set('page', String(currentPage));
            window.history.pushState({},'', url.href);
            displayProduct(arrKey, rows, currentPage);
            showPagination(arrKey, rows);
        }
    })
    function displayProduct(arrKey: string[], rowPerPage: number, page: number){
        productCartContainer.innerHTML = "";
        page --;
        const start: number = rowPerPage * page;
        const end: number = start + rowPerPage;
        const paginatedProduct: string[] = arrKey.slice(start, end);

        paginatedProduct.forEach((key)=>{
            let keyOfProduct = Number(key) - 1;
            let count = cartObject[key];
            const productCartBoxItem = createHtmlElement('div', 'product-cart-box-item');
            const productInfoContainer = createHtmlElement('div', 'product-info-container');
            const productItemNumber = createHtmlElement('div', 'product-item-number', '', `${(arrKey.indexOf(key)) + 1}`);
            const imageCartItemContainer = createHtmlElement('div', 'image-cart-item-container');
            const productCartImageItem = createHtmlElement('img', 'product-cart-image-item');
            const productCartTextContainer = createHtmlElement('div', 'product-cart-text-container');
            const productCartTitle = createHtmlElement('h2', 'product-cart-title', '', );
            const linkCartProduct = createHtmlElement('a', 'link-cart-product', `${key}`, `${products[keyOfProduct].title}`);
            productCartTitle.append(linkCartProduct);

            if(linkCartProduct instanceof HTMLAnchorElement){
                linkCartProduct.href = `/product`;
                linkCartProduct.dataset.link = '';
            }
            const productCartDescription = createHtmlElement('p', 'product-cart-description', '', `${products[keyOfProduct].description}`);
            const productCartRating = createHtmlElement('p', 'product-cart-rating', '', `Rating: ${products[keyOfProduct].rating}`);
            const productCartCountContainer = createHtmlElement('div', 'product-cart-count-container');
            const cartCountFormContainer = createHtmlElement('div', 'cart-count-form-container');
            btnMinusCart = createHtmlElement('button', 'btn-cart minus', '', '-');
            btnPlusCart = createHtmlElement('button', 'btn-cart plus', '', '+');
            const divCount = createHtmlElement('div', 'area-count-cart-item', '', `${cartObject[key]}`);
            const stockCartItem = createHtmlElement('div', 'stock-cart-item', '', `Stock : ${products[keyOfProduct].stock}`);
            const priceCartItem = createHtmlElement('div', 'price-cart-item', '', `${products[keyOfProduct].price * count} $`);
            productCartBoxItem.dataset.id = key;
            btnMinusCart.dataset.id = key;
            btnPlusCart.dataset.id = key;
            if(productCartImageItem instanceof HTMLImageElement){
                productCartImageItem.src = products[keyOfProduct].thumbnail;
                productCartImageItem.alt = products[keyOfProduct].title;
            }
            imageCartItemContainer.append(productCartImageItem);
            productInfoContainer.append(productItemNumber);
            productInfoContainer.append(imageCartItemContainer);
            productInfoContainer.append(productCartTextContainer);
            productCartBoxItem.append(productInfoContainer);
            productCartTextContainer.append(productCartTitle);
            productCartTextContainer.append(productCartDescription);
            productCartTextContainer.append(productCartRating);
            productCartBoxItem.append(productCartCountContainer);
            productCartCountContainer.append(cartCountFormContainer);
            cartCountFormContainer.append(btnMinusCart);
            cartCountFormContainer.append(divCount);
            cartCountFormContainer.append(btnPlusCart);
            cartCountFormContainer.after(stockCartItem);
            productCartCountContainer.after(priceCartItem);
            productCartContainer.append(productCartBoxItem);
        })
    }

    function showPagination(arrKey: string[], rowPerPage: number){
        pagesBtnContainer.innerHTML = "";
        const pagesCount = Math.ceil(arrKey.length / rowPerPage);
        const ulElement = createHtmlElement('ul', 'pagination-list');
        for(let i = 0; i < pagesCount; i++){
            const pagesBtn = showPaginationBtn(i + 1);
            ulElement.append(pagesBtn);
        }
        pagesBtnContainer.append(ulElement);
    }

    function showPaginationBtn(page: number){
        const pagesBtn = createHtmlElement('li', 'pagination-btn', '', `${page}`);
        if(currentPage === page){
            pagesBtn.classList.add('active');
        }
        pagesBtn.addEventListener('click', ()=>{
            currentPage = page;
            let url = new URL(window.location.href);
            url.searchParams.set('page', String(currentPage));
            window.history.pushState({},'', url.href);
            displayProduct(arrKey, rows, currentPage);
            let currentPagesBtn = document.querySelector('li.active');
            if(currentPagesBtn)currentPagesBtn.classList.remove('active');
            pagesBtn.classList.add('active');
        })
        return pagesBtn;
    }
    sectionCart.append(paginationContainer);
    sectionCart.append(productCartContainer);
    paginationContainer.append(textPaginationProduct);
    textPaginationProduct.after(inputProductsOnPage);
    inputProductsOnPage.after(textPages);
    textPages.after(pagesBtnContainer);
    sectionCart.append(summaryCartContainer);
    sectionCart.append(btnBuyContainer);
    btnBuyContainer.append(btnBuyNow);
    summaryCartContainer.append(productAndPriceContainer);
    productAndPriceContainer.append(productsCount);
    productAndPriceContainer.append(summaryTotalPrice);
    productAndPriceContainer.append(summaryTotalPriceWithPromoBox)
    productAndPriceContainer.before(promoContainer);
    promoContainer.append(promoInput);
    promoInput.after(promoText);
    promoInput.addEventListener('input', checkPromo)
    if(!isEmpty(promoActive)){
        summaryTotalPrice.classList.add('active');
        changeTotalPriceWithPromo(sumPromoNumber);
        renderPromo(promoActive);
    }
    btnBuyNow.addEventListener('click', showModal);

    return sectionCart;
}

//add & delete promocode



function changeTotalPriceWithPromo(sumPromoNumber: number){
    summaryTotalPriceWithPromoBox.innerHTML = '';
    summaryTotalPriceWithPromo = createHtmlElement('p', 'summary-total-price-with-promo', '', `Total price: ${Math.ceil(sumTotalPrice(cartObject) * ((100 - sumPromoNumber)/100))} $`);
    summaryTotalPriceWithPromoBox.append(summaryTotalPriceWithPromo);
}

function checkPromo(event: Event){
    sumPromoNumber = sumPromoNumber;
    if(event.target && event.target instanceof HTMLInputElement){
        let promoKey = event.target.value;
    if(!promoObject.hasOwnProperty(promoKey)){
        promoTextAddContainer.innerHTML = '';
    }
    if(promoObject.hasOwnProperty(promoKey) && !promoActive.hasOwnProperty(promoKey)){
        promoNumber = promoObject[promoKey];
        const promoAddText = createHtmlElement('p', 'promo-add-text');
        promoTextAddContainer.append(promoAddText);
        const btnPromoAdd = createHtmlElement('button', 'btn-promo-add', '', 'Add');
        promoAddText.innerText = `${promoKey} - ${promoNumber} %`;
        promoAddText.after(btnPromoAdd);
        btnPromoAdd.addEventListener('click', ()=>{
            promoActive[promoKey] = promoNumber;
            sumPromoNumber += promoNumber;
            renderPromo(promoActive);
            summaryTotalPrice.classList.add('active');
            changeTotalPriceWithPromo(sumPromoNumber);
            promoTextAddContainer.innerHTML = '';
        })
    }
    }
}

function renderPromo(promoActive: ObjectType){
    promoActiveContainer.innerHTML = '';
    if(!isEmpty(promoActive)){
    const promoTitle = createHtmlElement('p', 'promo-title', '', 'PROMO CODE:');
    promoContainer.prepend(promoActiveContainer);
    promoActiveContainer.append(promoTitle);
        for (let key in promoActive){
        const promoActiveItem = createHtmlElement('div', 'promo-active-item');
        promoTitle.after(promoActiveItem);
        const promoTextActive = createHtmlElement('p', 'promo-text-active', '', `${key} - ${promoActive[key]}%`);
        promoActiveItem.append(promoTextActive);
        const btnPromoRemove = createHtmlElement('button', 'btn-promo-remove', '', 'Delete');
        promoTextActive.after(btnPromoRemove);
        btnPromoRemove.dataset.promo = key;
        btnPromoRemove.addEventListener('click', (event: Event)=>{
            if(event.target && event.target instanceof HTMLButtonElement){
                const key = event.target.dataset.promo;
                
                if(key !== undefined){
                    sumPromoNumber = sumPromoNumber - promoActive[key];
                    delete promoActive[key];
                } 
                renderPromo(promoActive);
                summaryTotalPriceWithPromoBox.innerHTML = '';
                if(sumPromoNumber > 0){
                    changeTotalPriceWithPromo(sumPromoNumber);
                    }
                }
            })
        }
    }else if(isEmpty(promoActive)){
        summaryTotalPrice.classList.remove('active');
        summaryTotalPriceWithPromoBox.innerHTML = '';
        promoActiveContainer.innerHTML = '';
    }
}

//add & delete product from cart

document.addEventListener('click', (event: MouseEvent)=>{
    if(event.target && event.target instanceof HTMLButtonElement && event.target.classList.contains('plus')){
       const id = event.target.dataset.id;
       if(typeof id !== 'undefined') {
        plus(id);
        localStorage.setItem('cart', JSON.stringify(cartObject));
       }
    }else if(event.target && event.target instanceof HTMLButtonElement && event.target.classList.contains('minus')){
        const id = event.target.dataset.id;
       if(typeof id !== 'undefined') {
        minus(id);
        localStorage.setItem('cart', JSON.stringify(cartObject));
       }
    }
})

function plus (id: string){
    let keyOfProduct = Number(id) - 1;
    let count = cartObject[id];
    let stockProduct = products[keyOfProduct].stock;
    if(count === stockProduct){
        return;
    }
    cartObject[id] = cartObject[id] + 1;
    sumOfCartProduct = sumCartProduct(cartObject);
    totalPrice = sumTotalPrice(cartObject);
    if(cartCountElement) cartCountElement.innerHTML = `${sumOfCartProduct}`;
    if(totalPriceElement) totalPriceElement.innerHTML = `${totalPrice} $`;
    renderCart(cartObject);
}

function minus (id: string){
    if(cartObject[id] - 1 === 0){
        currentPage = 1;
        deleteProduct(id);
        if(isEmpty(cartObject)){
            if(!isEmpty(promoActive)){
                Object.keys(promoActive).forEach(key => delete promoActive[key]);
            }
            sumPromoNumber = 0;
            sectionCart.innerHTML = "";
            const noProductInCart = createHtmlElement('div', 'no-product-in-cart', '', 'Cart is empty!');
            sectionCart.append(noProductInCart); 
        }
        return true;
    }
    cartObject[id] = cartObject[id] - 1;
    sumOfCartProduct = sumCartProduct(cartObject);
    totalPrice = sumTotalPrice(cartObject);
    if(cartCountElement) cartCountElement.innerHTML = `${sumOfCartProduct}`;
    if(totalPriceElement) totalPriceElement.innerHTML = `${totalPrice} $`;
    renderCart(cartObject);
}

function deleteProduct (id: string){
    delete cartObject[id];
    sumOfCartProduct = sumCartProduct(cartObject);
    totalPrice = sumTotalPrice(cartObject);
    if(cartCountElement) cartCountElement.innerHTML = `${sumOfCartProduct}`;
    if(totalPriceElement) totalPriceElement.innerHTML = `${totalPrice} $`;
    localStorage.setItem('cart', JSON.stringify(cartObject));
    renderCart(cartObject);
}

//Localstorage

function setLocalStorageCart(){
    localStorage.setItem('cart', JSON.stringify(cartObject));
    localStorage.setItem('promoActive', JSON.stringify(promoActive));
    localStorage.setItem('sumPromoNumber', JSON.stringify(sumPromoNumber));
}
window.addEventListener('beforeunload', setLocalStorageCart);

function getLocalStorage() {
    //localStorage.clear();
    if(localStorage.getItem('cart')) {
        if(cartObject == null){
            cartObject = {};
            if(isEmpty(cartObject)){
                sectionCart.innerHTML = 'Cart is empty!';
            }
        }
        cartObject = JSON.parse(localStorage.getItem('cart') || '{}');
        
        if(localStorage.getItem('promoActive')){
            promoActive = JSON.parse(localStorage.getItem('promoActive') || '{}');
            sumPromoNumber = JSON.parse(localStorage.getItem('sumPromoNumber') || '0');
        }
       
        sumOfCartProduct = sumCartProduct(cartObject);
        totalPrice = sumTotalPrice(cartObject);
        if(cartCountElement) cartCountElement.innerHTML = `${sumOfCartProduct}`;
        if(totalPriceElement) totalPriceElement.innerHTML = `${totalPrice} $`;
        if(isEmpty(cartObject)){
            return;
        }
        renderCart(cartObject);
    }

}

window.addEventListener('load', getLocalStorage); 

export default function cart(): void {
    if (mainContainer) {
        mainContainer.innerHTML = "";
    if(isEmpty(cartObject)){
        sectionCart.innerHTML = "";
        const noProductInCart = createHtmlElement('div', 'no-product-in-cart', '', 'Cart is empty!');
        sectionCart.append(noProductInCart); 
    }else{
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log('params', params);
        if(params.hasOwnProperty('page')){
            currentPage = Number(params.page);
        }else{
            currentPage = 1;
        }
        
        if(inputProductsOnPage && inputProductsOnPage instanceof HTMLInputElement){
            if(params.hasOwnProperty('product')){
                rows = Number(params.product);
                inputProductsOnPage.value = String(rows);
            }else{
                rows = 3;
                inputProductsOnPage.value = String(rows);
            }
        }
        renderCart(cartObject);
    }
        return mainContainer.append(sectionCart);
    } 
}

