import { mainContainer } from "../index";
import { createHtmlElement } from "../components/createlement";
import { products } from "../components/products";
import { getBrands, getCategory, maxPrice, minPrice, maxStock, minStock } from "../components/firstValues";
import { getChecked } from "../components/filter";
let found:number;


export default function main(): void {
    if (mainContainer) {
        mainContainer.innerHTML = "";
        mainContainer.className = 'main-container';

        const sideBar = createHtmlElement('div', 'side-Bar');
        mainContainer.append(sideBar);
        const mainPage = createHtmlElement('div', 'main-page');
        sideBar.after(mainPage);

        const categoryFilter = createHtmlElement('div', 'category-filter filter');
        sideBar.append(categoryFilter);
        const brandFilter = createHtmlElement('div', 'brand-filter filter');
        categoryFilter.after(brandFilter);
        const priceFilter = createHtmlElement('div', 'price-filter filter');
        brandFilter.after(priceFilter);
        const stockFilter = createHtmlElement('div', 'stock-filter filter');
        priceFilter.after(stockFilter);


        let checkedCategory: string[] = []; //checked values
        const pCategory = createHtmlElement('p', 'p-style', '', 'Category');
        categoryFilter.append(pCategory);
        const containerCategory = createHtmlElement('div', 'container-сategory container');
        categoryFilter.after(containerCategory);
        let inputVarCategory = getCategory(products);
//console.log('qwe', inputVarCategory);
        for (let i = 0; i < inputVarCategory.length; i += 1) {
            let input = createHtmlElement('input', 'input-line inputCategory', `var${[i]}`);
            input.setAttribute("type", "checkbox");
            let label = createHtmlElement('label', 'label-line ', '', inputVarCategory[i]);
            label.setAttribute("for", `var${[i]}`);
            containerCategory.append(input);
            containerCategory.append(label);
            containerCategory.append(document.createElement('br'));

            input.oninput = function(){
                //console.log('input=', input.id);//
                //console.log('label=', label.innerText);//
                checkedCategory.push(label.innerText);
                //console.log('checkedCategory=', checkedCategory);//
                //getChecked(products, checkedCategory, checkedBrand);//fun
                getChecked(showProducts, products, checkedCategory, checkedBrand);
                //found = getChecked(products, checkedCategory, checkedBrand).length;
                //console.log('found=', found);//
                return checkedCategory;
            } ;
        }

        let checkedBrand: string[] = []; //checked values
        const pBrand = createHtmlElement('p', 'p-style', '', 'Brand');
        brandFilter.append(pBrand);
        const containerBrand = createHtmlElement('div', 'container-brand container');
        brandFilter.after(containerBrand);
        let inputVarBrand = getBrands(products);
//console.log('qwe', inputVarBrand);
        for (let i = 0; i < inputVarBrand.length; i += 1) {
            let input = createHtmlElement('input', 'input-line', '', `var${[i]}`);
            input.setAttribute("type", "checkbox");
            let label = createHtmlElement('label', 'label-line', '', inputVarBrand[i]);
            label.setAttribute("for", `var${[i]}`);
            containerBrand.append(input);
            containerBrand.append(label);
            containerBrand.append(document.createElement('br'));
            
            input.oninput = function(){
                //console.log('input=', input.id);//
                //console.log('label=', label.innerText);//
                checkedBrand.push(label.innerText);
                //console.log('checkedBrand=', checkedBrand);//
                //getChecked(products, checkedCategory, checkedBrand);//fun
                getChecked(showProducts, products, checkedCategory, checkedBrand);
                found = getChecked(showProducts, products, checkedCategory, checkedBrand).length;
                //console.log('found=', found);//
            } ;
        }

        const pPrice = createHtmlElement('p', 'p-style', '', 'Price');
        priceFilter.append(pPrice);
        const priceContent = createHtmlElement('div', 'price-content');
        priceFilter.append(priceContent);
        let minPriceBox = createHtmlElement('input', 'input-box box-left');
        priceContent.append(minPriceBox);
        minPriceBox.setAttribute("value", `${minPrice(products)}`);
        let maxPriceBox = createHtmlElement('input', 'input-box box-right');
        priceContent.append(maxPriceBox);
        maxPriceBox.setAttribute("value", `${maxPrice(products)}`);
        const rangeBox = createHtmlElement('div', 'range-box');
        priceFilter.append(rangeBox);


/*-----------Price----------*/
        const rangePrice1 = createHtmlElement('input', 'input-range');
        rangeBox.append(rangePrice1);
        rangePrice1.setAttribute("type", "range"); 
        rangePrice1.setAttribute("value", "0");
        rangePrice1.setAttribute("min", `${minPrice(products)}`);
        rangePrice1.setAttribute("max", `${maxPrice(products)}`);
        rangePrice1.setAttribute("step", "1");

        const rangePrice2 = createHtmlElement('input', 'input-range');
        rangeBox.append(rangePrice2);
        rangePrice2.setAttribute("type", "range");
        rangePrice2.setAttribute("value", `${maxPrice(products)}`);
        rangePrice2.setAttribute("min", `${minPrice(products)}`);
        rangePrice2.setAttribute("max", `${maxPrice(products)}`);
        rangePrice2.setAttribute("step", "1");

/*----------------Stock--------------------*/

        const pStock = createHtmlElement('p', 'p-style', '', 'Stock');
        stockFilter.append(pStock);
        const stockContent = createHtmlElement('div', 'price-content');
        stockFilter.append(stockContent);
        let minStockBox = createHtmlElement('input', 'input-box');
        stockContent.append(minStockBox);
        minStockBox.setAttribute("value", `${minStock(products)}`);
        let maxStockBox = createHtmlElement('input', 'input-box');
        stockContent.append(maxStockBox);
        maxStockBox.setAttribute("value", `${maxStock(products)}`);

        const rangeStock = createHtmlElement('input', 'input-range');
        stockFilter.append(rangeStock);
        rangeStock.setAttribute("type", "range");

/*---------------btns copy + reset-----------*/

        const btnsCopyLink = createHtmlElement('div', 'copy-link-box');
        sideBar.prepend(btnsCopyLink);

        const btnCopy = createHtmlElement('button', 'drop-btn btn', '', 'Copy filter');
        btnsCopyLink.append(btnCopy);
        const btnReset = createHtmlElement('button', 'drop-btn btn', '', 'Reset filter');
        btnsCopyLink.append(btnReset);
        //btnReset.addEventListener('click', resetFun());
        /* => {
            window.location.href = '../quiz/index.html';
        });

/*-----------------Sort-----------------------*/

        const sortContainer = createHtmlElement('div', 'sort-container');
        mainPage.append(sortContainer);

        const sortBox = createHtmlElement('div', 'sort-box');
        sortContainer.append(sortBox);
        const btnSort = createHtmlElement('button', 'drop-btn btn', '', 'Sort'); /*btn sort + variants*/
        sortBox.append(btnSort);
        const menuSort = createHtmlElement('ul', 'dropdown-content');
        sortBox.append(menuSort);
        const sortABC = createHtmlElement('li', 'content', '', 'From A to Z');
        menuSort.append(sortABC);
        const sortCBA = createHtmlElement('li', 'content', '', 'From Z to A');
        menuSort.append(sortCBA);
        const sortMinMax = createHtmlElement('li', 'content', '', 'From min price to max');
        menuSort.append(sortMinMax);
        const sortMaxMin = createHtmlElement('li', 'content', '', 'From max price to min');
        menuSort.append(sortMaxMin);

        const numOfFound = createHtmlElement('p', 'p-found', '', 'Found: 0');
        //numOfFound.innerHTML = 'Found: ${found}';
        sortContainer.append(numOfFound);

        const viewSort = createHtmlElement('div', 'view-sort', '', '');/*view*/
        sortContainer.append(viewSort);
        const lineView = new Image(); /*document.createElement('img');*/
        lineView.src = '/src/assets/line.svg';
        viewSort.append(lineView);
        const blockView = new Image();
        blockView.src = '/src/assets/block.svg';
        viewSort.append(blockView);

/*---------------Content-----------*/

        const showProducts = createHtmlElement('div', 'main-show');
        mainPage.append(showProducts);

//let items = getChecked(showProducts, products, checkedCategory, checkedBrand);//fun
found = getChecked(showProducts, products, checkedCategory, checkedBrand).length;
console.log('found=', found);//
console.log('00000checkedBrand=', checkedCategory);//

/*
function createHtmlElement (tagName: string, className: string, id?: string, innerText?: string):HTMLElement
*/
        


        


    } 
}

