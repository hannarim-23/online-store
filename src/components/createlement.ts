
import {IProduct} from "./interface";

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
        let item = createHtmlElement('div', 'item item-block', `${result[i].id}`);
        tagParent.append(item);
        let imgBox = createHtmlElement('div', 'img-box');
        item.append(imgBox);
        let img = new Image();
        img.src = result[i].thumbnail;
        imgBox.append(img);
        let contentBox = createHtmlElement('div', 'content-box');
        item.append(contentBox);
        let price = createHtmlElement('span', 'price price-block');
        contentBox.append(price);
        price.innerHTML = String(result[i].price) + '$';
        let title = createHtmlElement('div', 'title');
        contentBox.append(title);
        title.innerHTML = result[i].title;
        let btnBlock = createHtmlElement('div', 'btn-Block');
        contentBox.append(btnBlock);
        let add = createHtmlElement('button', 'btn-item btn btn-item-add', ``, 'Add');
        btnBlock.append(add);
        let details = createHtmlElement('button', 'btn-item btn', '', 'Details');
        btnBlock.append(details);
    }
}