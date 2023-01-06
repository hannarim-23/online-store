import { mainContainer } from "../index";
import { createHtmlElement } from "../components/createlement";
import products from "../components/products";

const sectionProduct = createHtmlElement('section', 'section-product-item');
let productId: number;
const breadcrumbsContainer = createHtmlElement('div', 'breadcrumbs-container');
const productItemCardContainer = createHtmlElement('div', 'product-item-card-container');

function renderProductCard(productId: number){
    let keyOfProduct = productId - 1;
    addBreadCrumbs(productId);
    sectionProduct.append(breadcrumbsContainer);
    addProductItemCardContainer(productId);
    breadcrumbsContainer.after(productItemCardContainer);

    

   return sectionProduct;
}

function addBreadCrumbs(productId: number){
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
    let keyOfProduct = productId - 1;
    const cardProductItemTitle = createHtmlElement('h2', 'card-product-item-title', '', `${products[keyOfProduct].title}`);
    productItemCardContainer.append(cardProductItemTitle);
    const cardImgPriceBtnContainer = createHtmlElement('div', 'card-img-price-btn-container');
    cardProductItemTitle.after(cardImgPriceBtnContainer);
    const imagesCardContainer = createHtmlElement('div', "imgs-card-container");
    cardImgPriceBtnContainer.append(imagesCardContainer);
    const imagesOfProduct = products[keyOfProduct].images;
    console.log(imagesOfProduct);
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
    return productItemCardContainer;
}

export default function product(): void {
     if (mainContainer) {
        mainContainer.innerHTML = "";
        if(localStorage.getItem('idOfProduct')) {
            productId = JSON.parse(localStorage.getItem('idOfProduct')!);
            renderProductCard(productId);
        }

        return mainContainer.append(sectionProduct);
    } 
}