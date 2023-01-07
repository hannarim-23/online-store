import { IProduct } from "./interface";
import { createItem } from "./createlement";
import { sorting } from "./btnFunc";


function getNumber(listChecked: string[]): string[] { //чекнутые нечетное колличесво раз
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

export function getChecked(tagParent: HTMLElement , mas: IProduct[], category: string[], brand: string[], Price: string[], Stock: string[]): IProduct[] {
    let newcategory = getNumber(category); //console.log('000newcategory', newcategory);
    let newbrand = getNumber(brand);//console.log('000brand= ', brand);
    let pricemin = parseInt(Price[0]);
    let pricemax = parseInt(Price[1]);
    let stockemin = parseInt(Stock[0]);
    let stockmax = parseInt(Stock[1]);
    let result;

    if (newcategory.length !== 0) {
        result = mas.filter(elem => newcategory.includes(elem.category[0].toUpperCase() + elem.category.slice(1).toLowerCase()));
    } else {
        result = mas;
    }

    if (newbrand.length !== 0) {
        result = result.filter(elem => newbrand.includes(elem.brand[0].toUpperCase() + elem.brand.slice(1).toLowerCase()));
    }

    result = result.filter(elem => (pricemin <= elem.price && elem.price <= pricemax));
    result = result.filter(elem => (stockemin <= elem.stock && elem.stock <= stockmax));

    if (localStorage.sortId) result = sorting(localStorage.sortId, result);
    
    createItem (tagParent, result);
    //console.log('localStorage.sortId.......= ', localStorage.sortId);

    return result;
}

