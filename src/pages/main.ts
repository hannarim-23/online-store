import { mainContainer } from "../index";
import { createHtmlElement } from "../components/createlement";
import { products } from "../components/products";
import { getBrands, getCategory, maxPrice, minPrice, maxStock, minStock } from "../components/firstValues";
import { getChecked, getNumber, setChecked } from "../components/filter";
import { sorting } from "../components/btnFunc";
import { cartObject } from "./cart";
import { sumCartProduct } from "./cart";
import { sumTotalPrice } from "./cart";
import { cartCountElement } from "./product";
import { totalPriceElement } from "./product";

let found:number = products.length;
let priceMas: string[] = [String(minPrice(products)), String(maxPrice(products))];
let stockMas: string[] = [String(minStock(products)), String(maxStock(products))];
let searchItem: string = '';
localStorage.sortId;
localStorage.copyLink;
export let view: string; //= 'block';

export default function main(): void {
    if (mainContainer) {
      let url = new URL(window.location.href);
      //console.log(url);
            
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
        let checkedCategory: string[] = [];
        const pCategory = createHtmlElement('p', 'p-style', '', 'Category');
        categoryFilter.append(pCategory);
        const containerCategory = createHtmlElement('div', 'container-сategory container');
        categoryFilter.after(containerCategory);
        let inputVarCategory = getCategory(products);
        for (let i = 0; i < inputVarCategory.length; i += 1) {
            let input = createHtmlElement('input', 'input-line inputCategory', `var${[i]}`);
            input.setAttribute("type", "checkbox");
            let label = createHtmlElement('label', 'label-line ', '', inputVarCategory[i]);
            label.setAttribute("for", `var${[i]}`);
            containerCategory.append(input);
            containerCategory.append(label);
            containerCategory.append(document.createElement('br'));

//--------------------------------------------------
          if(url.searchParams.has('category')){
            let category = url.searchParams.get('category')!;
            checkedCategory = category.split(',');
           setChecked(containerCategory, checkedCategory);
          }
          
        input.addEventListener('change', (event) => {
        //  input.addEventListener('click', (event) =>{
                checkedCategory.push(label.innerText);
                input.setAttribute('checked', 'checked');
                console.log('checkedCategory', checkedCategory)
                found = getChecked(showProducts, numOfFound,products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;
                console.log('checkedCategory', getNumber(checkedCategory));
                let strCategory = getNumber(checkedCategory).join(',');
                console.log(strCategory);
                url.searchParams.set('category', strCategory);
                if(getNumber(checkedCategory).length === 0){
                  url.searchParams.delete('category');
                }
                window.history.pushState({},'', url.href);
                if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
            //return true
              });
        }

/*-----------------Brand-----------------------*/

        let checkedBrand: string[] = [];
        const pBrand = createHtmlElement('p', 'p-style', '', 'Brand');
        brandFilter.append(pBrand);
        const containerBrand = createHtmlElement('div', 'container-brand container');
        brandFilter.after(containerBrand);
        let inputVarBrand = getBrands(products);
        for (let i = 0; i < inputVarBrand.length; i += 1) {
            let input = createHtmlElement('input', 'input-line', `v${[i]}`);
            input.setAttribute("type", "checkbox");
            let label = createHtmlElement('label', 'label-line', '', inputVarBrand[i]);
            label.setAttribute("for", `v${[i]}`);
            containerBrand.append(input);
            containerBrand.append(label);
            containerBrand.append(document.createElement('br'));
//-----------------------------------++++++++++++++++++----------------
        if(url.searchParams.has('brand')){
           let brand = url.searchParams.get('brand')!;
           checkedBrand = brand.split(',');
           setChecked(containerCategory, checkedBrand);
          }
        input.addEventListener('click', (event) =>{
                checkedBrand.push(label.innerText);
                input.setAttribute('checked', 'checked');
                console.log('checkedBrand',checkedBrand)
                found = getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;
                console.log('checkedBrand', getNumber(checkedBrand));
                let strBrand = getNumber(checkedBrand).join(',');
                console.log(strBrand);
                url.searchParams.set('brand', strBrand);
                if(getNumber(checkedBrand).length === 0){
                  url.searchParams.delete('brand');
                }
                window.history.pushState({},'', url.href); 
                if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
            } 
        )
      }

/*-----------Price----------*/

        const pPrice = createHtmlElement('p', 'p-style', '', 'Price');
        priceFilter.append(pPrice);
        const priceContent = createHtmlElement('div', 'price-content price-content1');
        priceFilter.append(priceContent);
          let minPriceBox = createHtmlElement('input', 'input-box box-left');
          minPriceBox.setAttribute("type", "number");
          priceContent.append(minPriceBox);
          minPriceBox.setAttribute("value", `${minPrice(products)}`);
          let maxPriceBox = createHtmlElement('input', 'input-box box-right');
          maxPriceBox.setAttribute("type", "number");
          priceContent.append(maxPriceBox);
          maxPriceBox.setAttribute("value", `${maxPrice(products)}`);

        const rangeBox = createHtmlElement('div', 'range-box1 range-box', 'rangeBox');
        priceFilter.append(rangeBox);
            const rangePrice1 = createHtmlElement('input', 'input-range', 'rangePrice1');
            rangeBox.append(rangePrice1);
              rangePrice1.setAttribute("type", "range"); 
              rangePrice1.setAttribute("min", `${minPrice(products)}`);
              rangePrice1.setAttribute("max", `${maxPrice(products)}`);
              rangePrice1.setAttribute("step", "1");
            const rangePrice2 = createHtmlElement('input', 'input-range', 'rangePrice2');
            rangeBox.append(rangePrice2);
              rangePrice2.setAttribute("type", "range");
              rangePrice2.setAttribute("min", `${minPrice(products)}`);
              rangePrice2.setAttribute("max", `${maxPrice(products)}`);
              rangePrice2.setAttribute("step", "1");
              let rangeBoxs = rangeBox.getElementsByTagName("input");
              rangeBoxs[0].value = String(minPrice(products));
              rangeBoxs[1].value = String(maxPrice(products));

/*-----------------------------------------------*/

        function getVals(){
            let slides1 = rangeBox.getElementsByTagName("input");
            let slide1 = parseFloat( slides1[0].value );
            let slide2 = parseFloat( slides1[1].value );
            if ( slide1 > slide2 ) { 
                let a = slide2; slide2 = slide1; slide1 = a; 
            }
            let priceContents = priceContent.getElementsByTagName("input");
            priceContents[0].value = String(slide1);
            priceContents[1].value = String(slide2);
        }
        function setVals(){
            let boxess1 = priceContent.getElementsByTagName("input");//тянет boxes перед вызовом функции
            let box1 = parseFloat( boxess1[0].value );
            let box2 = parseFloat( boxess1[1].value );
            if ( box1 > box2 ) { 
                let a = box2; box2 = box1; box1 = a; 
            }
            let rangeBoxs = rangeBox.getElementsByTagName("input");
            rangeBoxs[0].value = String(box1);
            rangeBoxs[1].value = String(box2);
        }

    let sliderSections1 = document.getElementsByClassName("range-box1");
    let boxesSections1 = document.getElementsByClassName("price-content1");
            let sliders1 = sliderSections1[0].getElementsByTagName("input");
          for( let j = 0; j < sliders1.length; j++ ){
            if( sliders1[j].type ==="range" ){
              sliders1[j].oninput = getVals;
            }
          }
            let boxes1 = boxesSections1[0].getElementsByTagName("input");
          for( let j = 0; j < boxes1.length; j++ ){
            if( boxes1[j].type ==="number" ){
                boxes1[j].oninput = setVals;
            }
          }

/*----------------Stock--------------------*/

        const pStock = createHtmlElement('p', 'p-style', '', 'Stock');
        stockFilter.append(pStock);
        const stockContent = createHtmlElement('div', 'price-content price-content2');
        stockFilter.append(stockContent);
          let minStockBox = createHtmlElement('input', 'input-box');
          minStockBox.setAttribute("type", "number");
          stockContent.append(minStockBox);
          minStockBox.setAttribute("value", `${minStock(products)}`);
          let maxStockBox = createHtmlElement('input', 'input-box');
          maxStockBox.setAttribute("type", "number");
          stockContent.append(maxStockBox);
          maxStockBox.setAttribute("value", `${maxStock(products)}`);
        const rangeBox2 = createHtmlElement('div', 'range-box2 range-box', 'rangeBox2');
        stockFilter.append(rangeBox2);
          const rangeStock = createHtmlElement('input', 'input-range');
          rangeBox2.append(rangeStock);
            rangeStock.setAttribute("type", "range"); 
            rangeStock.setAttribute("value", "0");
            rangeStock.setAttribute("min", `${minStock(products)}`);
            rangeStock.setAttribute("max", `${maxStock(products)}`);
            rangeStock.setAttribute("step", "1");
          const rangeStock2 = createHtmlElement('input', 'input-range');
          rangeBox2.append(rangeStock2);
            rangeStock2.setAttribute("type", "range");
            rangeStock2.setAttribute("value", `${maxStock(products)}`);
            rangeStock2.setAttribute("min", `${minStock(products)}`);
            rangeStock2.setAttribute("max", `${maxStock(products)}`);
            rangeStock2.setAttribute("step", "1");
            let rangeBoxs2 = rangeBox2.getElementsByTagName("input");
            rangeBoxs2[0].value = String(minStock(products));
            rangeBoxs2[1].value = String(maxStock(products));

        function getVals2(){
            const slides2 = rangeBox2.getElementsByTagName("input");
              let slide1 = parseFloat( slides2[0].value );
              let slide2 = parseFloat( slides2[1].value );
            if ( slide1 > slide2 ) { 
                let a = slide2; slide2 = slide1; slide1 = a; 
            }
            let stockContents = stockContent.getElementsByTagName("input");
            stockContents[0].value = String(slide1);
            stockContents[1].value = String(slide2);
        }
        function setVals2(){
            let boxess2 = stockContent.getElementsByTagName("input");//тянет boxes перед вызовом функции
            let box1 = parseFloat( boxess2[0].value );
            let box2 = parseFloat( boxess2[1].value );
            if ( box1 > box2 ) {
                let a = box2; box2 = box1; box1 = a; 
            }
            let rangeBoxs2 = rangeBox2.getElementsByTagName("input");
            
            rangeBoxs2[0].value = String(box1);console.log('0= ', rangeBoxs2[0].value);
            rangeBoxs2[1].value = String(box2);console.log('1= ', rangeBoxs2[1].value);
        }

    let sliderSections2 = document.getElementsByClassName("range-box2");
    let boxesSections2 = document.getElementsByClassName("price-content2");
        let sliders = sliderSections2[0].getElementsByTagName("input");
          for( let j = 0; j < sliders.length; j++ ){
            if( sliders[j].type ==="range" ){
              sliders[j].oninput = getVals2;
            }
          }
        let boxes2 = boxesSections2[0].getElementsByTagName("input");
        for( let j = 0; j < boxes1.length; j++ ){
          if( boxes2[j].type ==="number" ){
              boxes2[j].oninput = setVals2;
          }
        }

    sideBar.oninput = function(event) {
        stockMas = []; 
        priceMas = [];
        stockMas.push(`${rangeBoxs2[0].value}`,`${rangeBoxs2[1].value}`);
        priceMas.push(`${rangeBoxs[0].value}`,`${rangeBoxs[1].value}`);

        found = getChecked(showProducts, numOfFound,products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;
        const priceStr = priceMas.join('-');
        const stockStr = stockMas.join('-');
        url.searchParams.set('price', priceStr);
        url.searchParams.set('stock', stockStr);
        window.history.pushState({},'', url.href);
        if (found == 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
    };
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
            lineView.src = '/img/line.svg';
            lineView.setAttribute("class", "view");
            viewSort.append(lineView);
            const blockView = new Image();
            blockView.src = '/img/block.svg';
            blockView.setAttribute("class", "active view");
            viewSort.append(blockView);

/*---------------Content-----------*/

        const showProducts = createHtmlElement('div', 'main-show block');
        mainPage.append(showProducts);
        if(url.searchParams.has('stock')){
          let stock = url.searchParams.get('stock')!;
          stockMas = stock.split('-');
          console.log('stockMas', stockMas);
          rangeBoxs2[0].value = stockMas[0];
          rangeBoxs2[1].value = stockMas[1];
          minStockBox.setAttribute('value', `${stockMas[0]}`);
          maxStockBox.setAttribute('value', `${stockMas[1]}`);
        }
        if(url.searchParams.has('price')){
          let stock = url.searchParams.get('price')!;
          priceMas = stock.split('-');
          console.log('priceMas', priceMas);
         minPriceBox.setAttribute('value', `${priceMas[0]}`);
          maxPriceBox.setAttribute('value', `${priceMas[1]}`);
          rangeBoxs[0].value = priceMas[0];
          rangeBoxs[1].value = priceMas[1];
        }
        getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem);
        
        let sortList = menuSort.children;

        if(url.searchParams.has('sort')){
          let i = Number(url.searchParams.get('sort')!);
          console.log('localStorage.sortId ---', localStorage.sortId);
          localStorage.sortId = i;
          switch(i){ 
            case 0:btnSort.innerHTML = 'From A to Z'; break; 
            case 1:btnSort.innerHTML = 'From Z to A'; break; 
            case 2:btnSort.innerHTML = 'From min price to max'; break; 
            case 3:btnSort.innerHTML = 'From max price to min'; break; 
            default:btnSort.innerHTML = 'Sort'; break; 
          }
          sorting(localStorage.sortId, getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem));
        }
        
        console.log('menuSort', menuSort, 'menuSort.children', menuSort.children)
        for (let i = 0; i < sortList.length; i++){
            sortList[i].addEventListener("click", function() {
                localStorage.sortId = i;
                switch(i){ 
                  case 0:btnSort.innerHTML = 'From A to Z'; break; 
                  case 1:btnSort.innerHTML = 'From Z to A'; break; 
                  case 2:btnSort.innerHTML = 'From min price to max'; break; 
                  case 3:btnSort.innerHTML = 'From max price to min'; break; 
                  default:btnSort.innerHTML = 'Sort'; break; 
                }
                sorting(localStorage.sortId, getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem));
                url.searchParams.set('sort', localStorage.sortId);
                window.history.pushState({},'', url.href);
            });
        }

/*---------------btns lineView & blockView-----------*/
        if(url.searchParams.has('view')){
            view = url.searchParams.get('view')!;
            if(view === 'block'){
              blockView.setAttribute("class", "active view");
              lineView.setAttribute("class", "view");
              getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem);
            }else if(view === 'line'){
              lineView.setAttribute("class", "active view");
              blockView.setAttribute("class", "view");
              getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem);
            }
            console.log('view', view);
        }else if(!url.searchParams.has('view')){
            view = 'block';
            blockView.setAttribute("class", "active view");
            lineView.setAttribute("class", "view");
        }
        blockView.addEventListener("click", function() {
            view = 'block';
            url.searchParams.set('view', view);
            window.history.pushState({},'', url.href);
            blockView.setAttribute("class", "active view");
            lineView.setAttribute("class", "view");
            showProducts.setAttribute("class", "main-show block");
            view = 'block';
            getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem)
        });

        lineView.addEventListener("click", function() {
            view = 'line';
            url.searchParams.set('view', view);
            window.history.pushState({},'', url.href);
            blockView.setAttribute("class", "view");
            lineView.setAttribute("class", "active view");
            showProducts.setAttribute("class", "main-show line");
            view = 'line';
            getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem)
        });

/*---------------btns Add & Details-----------*/

        let addBtns = document.querySelectorAll('.btn-item-add');

        document.addEventListener('click', (event)=>{
          if(event.target && event.target instanceof HTMLElement){
            if(event.target.classList.contains('btn-item-add')){
              const productId = event.target.dataset.id;
              if(productId !== undefined){
                  if(!cartObject.hasOwnProperty(productId)){
                    cartObject[productId] = 1;
                    if(cartCountElement) cartCountElement.innerHTML = `${sumCartProduct(cartObject)}`;
                    if(totalPriceElement) totalPriceElement.innerHTML = `${sumTotalPrice(cartObject)} $`;
                    event.target.innerHTML = 'Drop';
                    localStorage.setItem('cart', JSON.stringify(cartObject));
                  }else if(cartObject.hasOwnProperty(productId)){
                    delete cartObject[productId];
                    if(cartCountElement) cartCountElement.innerHTML = `${sumCartProduct(cartObject)}`;
                    if(totalPriceElement) totalPriceElement.innerHTML = `${sumTotalPrice(cartObject)} $`;
                    event.target.innerHTML = 'Add';
                    localStorage.setItem('cart', JSON.stringify(cartObject));
                  }
            }
          }
        }})

/*---------------SEARCH-----------*/

        let searchBox = (<HTMLInputElement>document.getElementById("catalogSearch"));
        if(url.searchParams.has('search')){
          searchItem = url.searchParams.get('search')!;
          searchBox.value = searchItem;
          found = getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;
          if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
        }
        let btnSearchDel = document.querySelector(".btnDel");
        btnSearchDel!.addEventListener('click', () => {
            searchItem = searchBox.value ='';
            url.searchParams.delete('search');
            window.history.pushState({},'', url.href);
            found = getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;
            if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
        });

        searchBox.onkeyup = function(event) {

            searchItem = searchBox.value;
            url.searchParams.set('search', searchItem);
            if(searchItem === ''){
              url.searchParams.delete('search');
            }
            window.history.pushState({},'', url.href);
            found = getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;
            if (found === 0) showProducts.append(createHtmlElement('p', 'warning', '', 'No products found'));
        };

/*---------------btns copy + reset-----------*/
        const btnsCopyLink = createHtmlElement('div', 'copy-link-box');
        sideBar.prepend(btnsCopyLink);
          const btnCopy = createHtmlElement('button', 'drop-btn btn', 'copyLink', 'Copy filter');
          btnsCopyLink.append(btnCopy);
          const btnReset = createHtmlElement('button', 'drop-btn btn reset-btn', '', 'Reset filter');
          btnsCopyLink.append(btnReset);

//--------------------RESET-------------------------------
        btnReset.addEventListener('click', () => {
            let c = document.getElementsByTagName("input");
            for (let i = 0; i < c.length; i++){
                c[i].checked = false;
            }
            checkedCategory = [];
            searchItem = searchBox.value ='';
            checkedBrand = [];
            btnSort.innerHTML = 'Sort';
            rangeBoxs[0].value = String(minPrice(products));
            rangeBoxs[1].value = String(maxPrice(products));
            rangeBoxs2[0].value = String(minStock(products));
            rangeBoxs2[1].value = String(maxStock(products));
            stockMas = [String(minStock(products)), String(maxStock(products))];
            priceMas = [String(minPrice(products)), String(maxPrice(products))];
            found = getChecked(showProducts, numOfFound, products, checkedCategory, checkedBrand, priceMas, stockMas, searchItem).length;

            btnSort.innerHTML = 'Sort'
            localStorage.sortId ='';
            /*url.searchParams.forEach((value, key) =>{
              console.log(key);
              url.searchParams.delete(key);
            })*/
            if (url.searchParams.has('sort')) {
              url.searchParams.delete('sort');
            }
            if (url.searchParams.has('price')) {
              url.searchParams.delete('price');
            }
            if (url.searchParams.has('stock')) {
              url.searchParams.delete('stock');
            }
            if (url.searchParams.has('brand')) {
              url.searchParams.delete('brand');
            }
            if (url.searchParams.has('category')) {
              url.searchParams.delete('category');
            }
            if (url.searchParams.has('search')) {
              url.searchParams.delete('search');
            }
            if (url.searchParams.has('view')) {
              url.searchParams.delete('view');
            }
            console.log('url.searchParams', url.searchParams.toString());
              window.history.pushState({}, '', window.location.pathname);
        });

//--------------------COPY-------------------------------
        btnCopy.addEventListener('click', () => {
            let copy = document.location.href;
            console.log('copyLink=', copy);
            navigator.clipboard.writeText(document.location.href);
            if (copy.length){
                btnCopy.setAttribute("class", "drop-btn btn copy-btn");
            }

        });
    } 
}
