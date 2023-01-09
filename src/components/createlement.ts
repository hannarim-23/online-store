
import {IProduct} from "./interface";
import { cartObject } from "../pages/cart";
import { view } from "../pages/main";

export function createHtmlElement (tagName: string, className: string, id?: string, innerText?: string):HTMLElement{
    let element = document.createElement(tagName);
    element.className = className;
    if(id) element.id = id;
    if(innerText) element.innerText = innerText;
    return element;
}



export function createItem (tagParent: HTMLElement , result: IProduct[]): void{
    tagParent.innerHTML = '';

    for (let i = 0; i < result.length; i += 1) {
        let item = createHtmlElement('div', 'item item-block');
        let price = createHtmlElement('span', 'price price-block');
        let btnBlock = createHtmlElement('div', 'btn-Block');
        let add = createHtmlElement('button', 'btn-item btn btn-item-add');

        //if (localStorage.view === 'line'){
        if (view === 'line'){
            item = createHtmlElement('div', 'item item-line');
            price = createHtmlElement('span', 'price price-line');
            btnBlock = createHtmlElement('div', 'btn-Block btn-Block btn-Block-line');
            add = createHtmlElement('button', 'btn-item btn btn-item-add btn-item-line');
        }
        //let item = createHtmlElement('div', 'item item-block');
        tagParent.append(item);
        let imgBox = createHtmlElement('div', 'img-box');
        item.append(imgBox);
        let img = new Image();
        img.src = result[i].thumbnail;
        imgBox.append(img);
        let contentBox = createHtmlElement('div', 'content-box');
        item.append(contentBox);
        //let price = createHtmlElement('span', 'price price-block');
        contentBox.append(price);
        price.innerHTML = String(result[i].price) + '$';
        let title = createHtmlElement('div', 'title');
        contentBox.append(title);
        title.innerHTML = result[i].title;
        //let btnBlock = createHtmlElement('div', 'btn-Block');
        contentBox.append(btnBlock);
        //let add = createHtmlElement('button', 'btn-item btn btn-item-add');
        
        add.dataset.id = `${result[i].id}`;
            if(cartObject.hasOwnProperty(`${result[i].id}`)){
                add.innerHTML = 'Drop';
            }else{
                add.innerHTML = 'Add';
            }
        btnBlock.append(add);
        let details = createHtmlElement('a', 'btn-item btn details', '', 'Details');
        details.id = `${result[i].id}`;
        if(details instanceof HTMLAnchorElement) details.href = '/product';
        btnBlock.append(details);
    }

    
}