function createHtmlElement (tagName: string, className: string, id?: string, innerText?: string):HTMLElement{
    let element = document.createElement(tagName);
    element.className = className;
    if(id) element.id = id;
    if(innerText) element.innerText = innerText;
    return element;
}



let section1 = createHtmlElement("section", "section-property", "property", "This is very good");

export function changeMain(text: string){
  
let main = document.querySelector(".main-container");

    if(main){
        console.log(`${text}`);
        main.append(section1);
    };
    return main;
}


/*(() => {
    // get tab id from the hash
    const tabId = hashes.get(window.location.hash);
    // update the tab
    if (tabId) update(tabId);
})();*/
