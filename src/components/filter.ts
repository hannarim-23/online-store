import { IProduct } from "./interface";
import { createItem } from "./createlement";
import { sorting } from "./btnFunc";


export function getNumber(listChecked: string[]): string[] {
    let newMas:string[] = [...new Set(listChecked)];
    let arr:string[] = [];

    newMas.forEach(function (el, index) {
        let n = 0;
        listChecked.forEach(function (item) {
            if (item === el) n++;
        })
        if (n % 2 !== 0) arr.push(el);
    })

    return arr;
}

/*+++++++++++++++++++++++
function filterOneParametr<T>(arr: T[], arrCheck: any[], key: keyof T){
    let result = arr.filter(elem => arrCheck.includes(elem[key][0].toUpperCase() + elem[key].slice(1).toLowerCase()));
}
*/

export function getChecked(tagParent: HTMLElement, Found: HTMLElement, mas: IProduct[], category: string[], brand: string[], Price: string[], Stock: string[], Search: string): IProduct[] {
    let newcategory = getNumber(category);
    let newbrand = getNumber(brand);
    let stockemin: number, stockmax: number, pricemin: number, pricemax: number;
    let result, search = Search;

    if (parseInt(Stock[0]) > parseInt(Stock[1])) {
        stockemin = parseInt(Stock[1]);
        stockmax = parseInt(Stock[0]);
    } else {
        stockemin = parseInt(Stock[0]);
        stockmax = parseInt(Stock[1]);
    }
    if (parseInt(Price[0]) > parseInt(Price[1])){
        pricemin = parseInt(Price[1]);
        pricemax = parseInt(Price[0]);
    } else {
        pricemin = parseInt(Price[0]);
        pricemax = parseInt(Price[1]);
    }
    
    if (newcategory.length !== 0) {
        result = mas.filter(elem => newcategory.includes(elem.category[0].toUpperCase() + elem.category.slice(1).toLowerCase()));
    } else {
        result = mas;
    }

    if (newbrand.length !== 0) {
        result = result.filter(elem => newbrand.includes(elem.brand[0].toUpperCase() + elem.brand.slice(1).toLowerCase()));
    }
    console.log('00000');

    result = result.filter(elem => (pricemin <= elem.price && elem.price <= pricemax));
    result = result.filter(elem => (stockemin <= elem.stock && elem.stock <= stockmax));

    if (localStorage.sortId) result = sorting(localStorage.sortId, result);
    console.log('search', search);
    if (search.length !== 0) {
        result = result.filter(elem => elem.brand.toLowerCase().includes(search.toLowerCase()) ||
                                       elem.category.toLowerCase().includes(search.toLowerCase()) ||
                                       elem.title.toLowerCase().includes(search.toLowerCase()) ||
                                       elem.description.toLowerCase().includes(search.toLowerCase()) ||
                                       elem.stock.toString().includes(search.toLowerCase()) ||
                                       elem.rating.toString().includes(search.toLowerCase()) ||
                                       elem.discountPercentage.toString().includes(search.toLowerCase()) ||
                                       elem.price.toString().includes(search.toLowerCase()));
    }
    Found.innerHTML = `Found: ${result.length}`;
    createItem (tagParent, result);
    return result;
}

export function setChecked(nodeCollection: HTMLElement, urlMas:string[]){
    let masInput = nodeCollection.getElementsByTagName('input');
    let masLabel = nodeCollection.getElementsByTagName('label');
    for (let i = 0; i < masLabel.length; i++){
      for (let j = 0; j < urlMas.length; j++){
        if (masLabel[i].innerHTML == urlMas[j]) 
        masInput[i].setAttribute("checked", "checked");
      }
    }
}