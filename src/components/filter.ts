import {IProduct} from "./interface";
import { createHtmlElement } from "./createlement";

function getNumber(listChecked: string[]): string[] { //чекнутые нечетное колличесво раз
    let newMas:string[] = [...new Set(listChecked)];
    let arr:string[] = [];
    //console.log('newMas......', newMas);//

    newMas.forEach(function (el, index) {
        let n = 0;
        listChecked.forEach(function (item) {
            if (item === el) n++;
        })
        if (n % 2 !== 0) arr.push(el);
    })
    //console.log('arr', arr);//
    return arr;
}

/*+++++++++++++++++++++++
function filterOneParametr(arr: IProduct[], arrCheck: string[], key: string){
    let result = arr.filter(elem => arrCheck.includes(elem[key]));
    return result;
}
*/
export function getChecked(tagParent: HTMLElement , mas: IProduct[], category: string[], brand: string[], Price?: string[], Stock?: string[]): IProduct[] {
    let newcategory = getNumber(category); //console.log('000newcategory', newcategory);
    let newbrand = getNumber(brand);//console.log('brand= ', brand);
    let result: IProduct[] = [];

    if (newcategory.length !== 0) {
        //result = filterOneParametr(mas, newcategory, category);
        result = mas.filter(elem => newcategory.includes(elem.category[0].toUpperCase() + elem.category.slice(1).toLowerCase()));
        //console.log('result1= ', result);
    } else {
        result = mas;
    }

    if (newbrand.length !== 0) {
        result = result.filter(elem => newbrand.includes(elem.brand[0].toUpperCase() + elem.brand.slice(1).toLowerCase()));
        //console.log('result2= ', result);
    }



    for (let i = 0; i < result.length; i += 1) {
        let item = createHtmlElement('div', 'item');
        tagParent.append(item);
        let imgBox = createHtmlElement('div', 'img-box');
        item.append(imgBox);
        let img = new Image();
        img.src = result[i].thumbnail;
        imgBox.append(img);
        let contentBox = createHtmlElement('div', 'content-box');
        item.append(contentBox);
        let price = createHtmlElement('span', 'price');
        contentBox.append(price);
        price.innerHTML = String(result[i].price) + '$';
        let title = createHtmlElement('div', 'title');
        contentBox.append(title);
        title.innerHTML = result[i].title;
        let btnBlock = createHtmlElement('div', 'btn-Block');
        contentBox.append(btnBlock);
        let add = createHtmlElement('button', 'btn-item', '', 'Add');
        btnBlock.append(add);
        let details = createHtmlElement('button', 'btn-item', '', 'Details');
        btnBlock.append(details);

    }


console.log('result.......= ', result);
return result;
}

