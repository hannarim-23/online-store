import { mainContainer } from "../index";
import { createHtmlElement } from "../components/createlement";
import { products } from "../components/products";
import { getBrands, getCategory, maxPrice, minPrice, maxStock, minStock } from "../components/firstValues";
import { getChecked } from "../components/filter";
import { sorting } from "../components/btnFunc";


var found:number = products.length;

//delete localStorage.found;

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

/*-----------------Category-----------------------*/
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
/*
            input.oninput = function(){
                checkedCategory.push(label.innerText);
                //console.log('checkedCategory=', checkedCategory);//
                //getChecked(products, checkedCategory, checkedBrand);//fun
                //getChecked(showProducts, products, checkedCategory, checkedBrand);
                
                found = getChecked(showProducts,products, checkedCategory, checkedBrand).length;
                //console.log('found=', found);//
                numOfFound.innerHTML = `Found: ${found}`;
                //return checkedCategory;
                if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
            } ;
*/ //-----------------------------------++++++++++++++++++----------------
            input.addEventListener('change', (event) =>{
                input.setAttribute('checked', 'checked');
                checkedCategory.push(label.innerText);


                found = getChecked(showProducts,products, checkedCategory, checkedBrand).length;
                numOfFound.innerHTML = `Found: ${found}`;
                if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
                sorting(localStorage.sortId, getChecked(showProducts,products, checkedCategory, checkedBrand));
            });
        }

/*-----------------Brand-----------------------*/

        let checkedBrand: string[] = []; //checked values
        const pBrand = createHtmlElement('p', 'p-style', '', 'Brand');
        brandFilter.append(pBrand);
        const containerBrand = createHtmlElement('div', 'container-brand container');
        brandFilter.after(containerBrand);
        let inputVarBrand = getBrands(products);
//console.log('qwe', inputVarBrand);
        for (let i = 0; i < inputVarBrand.length; i += 1) {
            let input = createHtmlElement('input', 'input-line', `v${[i]}`);
            input.setAttribute("type", "checkbox");
            let label = createHtmlElement('label', 'label-line', '', inputVarBrand[i]);
            label.setAttribute("for", `v${[i]}`);
            containerBrand.append(input);
            containerBrand.append(label);
            containerBrand.append(document.createElement('br'));
//-----------------------------------++++++++++++++++++----------------
            input.oninput = function() {
                checkedBrand.push(label.innerText);
                
                
                
                found = getChecked(showProducts, products, checkedCategory, checkedBrand).length;
                numOfFound.innerHTML = `Found: ${found}`;
                if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
                sorting(localStorage.sortId, getChecked(showProducts,products, checkedCategory, checkedBrand));
            } ;
        }

/*-----------Price----------*/

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
        
        const numOfFound = createHtmlElement('p', 'p-found', '', `Found: ${found}`);
        sortContainer.append(numOfFound);

        const viewSort = createHtmlElement('div', 'view-sort', '', '');/*view*/
        sortContainer.append(viewSort);
        const lineView = new Image();
        lineView.src = '/src/assets/line.svg';
        lineView.setAttribute("class", "view");
        viewSort.append(lineView);
        const blockView = new Image();
        blockView.src = '/src/assets/block.svg';
        blockView.setAttribute("class", "active view");
        viewSort.append(blockView);

/*---------------Content-----------*/

        const showProducts = createHtmlElement('div', 'main-show block');
        mainPage.append(showProducts);

        getChecked(showProducts, products, checkedCategory, checkedBrand);

        let sortList = menuSort.children;
        for (let i = 0; i < sortList.length; i++){
            sortList[i].addEventListener("click", function() {
                localStorage.sortId = i;
                console.log ('localStorage.sortId=====', localStorage.sortId);
                sorting(localStorage.sortId, getChecked(showProducts, products, checkedCategory, checkedBrand));
            });
        }
//        console.log ('sorting', sortList);


/*---------------btns lineView & blockView-----------*/

        let collectionItem = document.querySelectorAll('.item');
        let collectionPrice = document.querySelectorAll('.price');
        let collectionBtnItem = document.querySelectorAll('.btn-item');
        let collectionBtnBlock = document.querySelectorAll('.btn-Block');
//localStorage.style =
        blockView.addEventListener("click", function() {
            blockView.setAttribute("class", "active view");
            lineView.setAttribute("class", "view");
            showProducts.setAttribute("class", "main-show block");

            collectionItem.forEach(function(elem) { 
                elem.setAttribute("class", "item item-block");
              });
            collectionPrice.forEach(function(elem) { 
                elem.setAttribute("class", "price price-block");
              });
              collectionBtnItem.forEach(function(elem) { 
                elem.setAttribute("class", "btn-item btn btn-item-block");
            });
            collectionBtnBlock.forEach(function(elem) { 
                elem.setAttribute("class", "btn-Block");
            });
        });

        lineView.addEventListener("click", function() {
            blockView.setAttribute("class", "view");
            lineView.setAttribute("class", "active view");
            showProducts.setAttribute("class", "main-show line");

            collectionItem.forEach(function(elem) { 
                elem.setAttribute("class", "item item-line");
              });
            collectionPrice.forEach(function(elem) { 
                elem.setAttribute("class", "price price-line");
              });
            collectionBtnItem.forEach(function(elem) { 
                elem.setAttribute("class", "btn-item btn btn-item-line");
            });
            collectionBtnBlock.forEach(function(elem) { 
                elem.setAttribute("class", "btn-Block btn-Block-line");
            });
        });

/*---------------btns Add & Details-----------*/



/*---------------btns copy + reset-----------*/

        const btnsCopyLink = createHtmlElement('div', 'copy-link-box');
        sideBar.prepend(btnsCopyLink);

        const btnCopy = createHtmlElement('button', 'drop-btn btn', '', 'Copy filter');
        btnsCopyLink.append(btnCopy);
        const btnReset = createHtmlElement('button', 'drop-btn btn', '', 'Reset filter');
        btnsCopyLink.append(btnReset);


//---------------------------------------------------
        btnReset.addEventListener('click', () => {//!!!!!!!!!!!
            checkedCategory.length = 0;
            checkedBrand= [];



            getChecked(showProducts, products, checkedCategory, checkedBrand);
        });




        
/*
        function resetFun(category: string[], brand: string[], Price?: string[], Stock?: string[]): void {
            category.length = 0;
            console.log('delet', category);
            brand = [];
          
            getChecked(showProducts, products, category, brand);
          }

*/

        //btnReset.addEventListener('click', resetFun());
        /* => {
            window.location.href = '../quiz/index.html';
        });
*/
    } 
}
