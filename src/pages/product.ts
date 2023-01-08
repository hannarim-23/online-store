import { mainContainer } from "../index";
import { createHtmlElement } from "../components/createlement";
import { products } from "../components/products";
import { sumCartProduct } from "./cart";
import { sumTotalPrice } from "./cart";
import { cartObject } from "./cart";
import { showModal } from "../components/modal";

export const cartCountElement = document.querySelector('.cartCount');
export const totalPriceElement = document.querySelector('.totalPrice');
const sectionProduct = createHtmlElement('section', 'section-product-item');
let productId: number;
const breadcrumbsContainer = createHtmlElement('div', 'breadcrumbs-container');
const productItemCardContainer = createHtmlElement('div', 'product-item-card-container');

function renderProductCard(productId: number){
    sectionProduct.innerHTML = '';
    addBreadCrumbs(productId);
    sectionProduct.append(breadcrumbsContainer);
    addProductItemCardContainer(productId);
    breadcrumbsContainer.after(productItemCardContainer);
    return sectionProduct;
}

function addBreadCrumbs(productId: number){
    breadcrumbsContainer.innerHTML = '';
    let keyOfProduct = productId - 1;
    const breadStoreText = createHtmlElement('a', 'bread-text bread-link', '', 'STORE');
    if(breadStoreText instanceof HTMLAnchorElement){
        breadStoreText.href = '/';
        breadStoreText.dataset.link = '';
    }
    breadcrumbsContainer.append(breadStoreText);
    const breadArrow1 = createHtmlElement('div', 'bread-text', '', '>>>');
    breadStoreText.after(breadArrow1);
    const breadCategoryText = createHtmlElement('div', 'bread-text', '', `${products[keyOfProduct].category}`);
    breadArrow1.after(breadCategoryText);
    const breadArrow2 = createHtmlElement('div', 'bread-text', '', '>>>');
    breadCategoryText.after(breadArrow2);
    const breadBrandText = createHtmlElement('div', 'bread-text', '', `${products[keyOfProduct].brand}`);
    breadArrow2.after(breadBrandText);
    const breadArrow3 = createHtmlElement('div', 'bread-text', '', '>>>');
    breadBrandText.after(breadArrow3);
    const breadModelText = createHtmlElement('div', 'bread-text', '', `${products[keyOfProduct].title}`);
    breadArrow3.after(breadModelText);

    return breadcrumbsContainer;
}

function addProductItemCardContainer(productId: number){
    productItemCardContainer.innerHTML = '';
    let keyOfProduct = productId - 1;
    const cardProductItemTitle = createHtmlElement('h2', 'card-product-item-title', '', `${products[keyOfProduct].title}`);
    productItemCardContainer.append(cardProductItemTitle);
    const cardProductRating = createHtmlElement('p', 'card-product-rating', '', `Rating ${products[keyOfProduct].rating}`);
    cardProductItemTitle.after(cardProductRating);
    const cardImgPriceBtnContainer = createHtmlElement('div', 'card-img-price-btn-container');
    cardProductRating.after(cardImgPriceBtnContainer);
    const imagesCardContainer = createHtmlElement('div', "imgs-card-container");
    cardImgPriceBtnContainer.append(imagesCardContainer);
    const imagesOfProduct = products[keyOfProduct].images;
    const imagesBox = createHtmlElement('div', 'imgs-card-box');
    imagesCardContainer.append(imagesBox);
    const mainImg = createHtmlElement('img', 'card-main-img');
    if(mainImg instanceof HTMLImageElement){
        mainImg.src = imagesOfProduct[0];
    }
    imagesBox.after(mainImg);
    imagesOfProduct.forEach(img =>{
        const imgItem = document.createElement('img');
        imgItem.className = 'card-img-item';
        imgItem.src = img;
        imgItem.alt = `image of ${products[keyOfProduct].title}`;
        imagesBox.prepend(imgItem);
        imgItem.addEventListener('click',()=>{
            let srcMain = imgItem.src;
            if(mainImg instanceof HTMLImageElement) mainImg.src = srcMain;
        })
    })
    imagesBox.after(mainImg);
    const cardProductPrice = createHtmlElement('div', 'card-product-price', '', `${products[keyOfProduct].price} $`);
    imagesCardContainer.after(cardProductPrice);
    const cardBtnBox = createHtmlElement('div', 'card-btn-box');
    cardProductPrice.after(cardBtnBox);
    const btnAddToCart = createHtmlElement('button', 'card-btn-add-to-cart', `${products[keyOfProduct].id}`);
    const id = btnAddToCart.id;
    if(cartObject.hasOwnProperty(id)){
        btnAddToCart.innerHTML = 'Drop From Cart';
    }else{
        btnAddToCart.innerHTML = 'Add To Cart';
    }
    btnAddToCart.addEventListener('click', ()=>{
        const id = btnAddToCart.id;
        if(cartObject.hasOwnProperty(id)){
            delete cartObject[id];
            if(cartCountElement) cartCountElement.innerHTML = `${sumCartProduct(cartObject)}`;
            if(totalPriceElement) totalPriceElement.innerHTML = `${sumTotalPrice(cartObject)} $`;
            btnAddToCart.innerHTML = 'Add To Cart';
        }else{
            cartObject[id] = 1;
            if(cartCountElement) cartCountElement.innerHTML = `${sumCartProduct(cartObject)}`;
            if(totalPriceElement) totalPriceElement.innerHTML = `${sumTotalPrice(cartObject)} $`;
            btnAddToCart.innerHTML = 'Drop From Cart';
        }
    })
    cardBtnBox.append(btnAddToCart);
    const btnCardBuyNow = createHtmlElement('a', 'card-btn-buy-now', '', 'Buy Now');
    btnAddToCart.after(btnCardBuyNow);
    if(btnCardBuyNow instanceof HTMLAnchorElement){
        btnCardBuyNow.href = '/cart';
        btnCardBuyNow.dataset.link = `${products[keyOfProduct].id}`;
        btnCardBuyNow.addEventListener('click', ()=>{
            const id = btnAddToCart.id;
            if(cartObject.hasOwnProperty(id)){
                showModal();
            }else{
                cartObject[id] = 1;
                showModal();
                if(cartCountElement) cartCountElement.innerHTML = `${sumCartProduct(cartObject)}`;
                if(totalPriceElement) totalPriceElement.innerHTML = `${sumTotalPrice(cartObject)} $`;
            }
        })
    }
    const descriptionContainer = createHtmlElement('div', 'card-description-container');
    cardImgPriceBtnContainer.after(descriptionContainer);
    const cardDescriptionTitle = createHtmlElement('div', 'card-description-title', '', 'Description');
    descriptionContainer.append(cardDescriptionTitle);
    const descriptionTitleText = createHtmlElement('div', 'card-description-text', '', `${products[keyOfProduct].description}`);
    cardDescriptionTitle.after(descriptionTitleText);
    const cardCategoryTitle = createHtmlElement('div', 'card-description-title', '', 'Category');
    descriptionTitleText.after(cardCategoryTitle);
    const categoryTitleText = createHtmlElement('div', 'card-description-text', '', `${products[keyOfProduct].category}`);
    cardCategoryTitle.after(categoryTitleText);
    const cardBrandTitle = createHtmlElement('div', 'card-description-title', '', 'Brand');
    categoryTitleText.after(cardBrandTitle);
    const brandTitleText = createHtmlElement('div', 'card-description-text', '', `${products[keyOfProduct].brand}`);
    cardBrandTitle.after(brandTitleText);
    const cardStockTitle = createHtmlElement('div', 'card-description-title', '', 'Stock');
    brandTitleText.after(cardStockTitle);
    const stockTitleText = createHtmlElement('div', 'card-description-text', '', `${products[keyOfProduct].stock}`);
    cardStockTitle.after(stockTitleText);
    return productItemCardContainer;
}

export default function product(): void {
    if (mainContainer) {
    console.log(window.location.pathname);
    const path = window.location.pathname;
    let id = Number(path.split('/')[2]);
    let isId = 0;
    products.forEach(product =>{
        if(product.id === id){
            isId += 1;
        }
    })
     console.log(isId);
     if(isId === 1){
        mainContainer.innerHTML = "";
        renderProductCard(id);
        return mainContainer.append(sectionProduct);
    }else if(isId === 0){
        mainContainer.innerHTML = "";
        const productNoDiv = createHtmlElement('div', 'product-no-div', '', `Product number ${id} not found`);
        return mainContainer.append(productNoDiv);
    }
    } 
}