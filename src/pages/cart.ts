import { mainContainer } from "../index";
export default function cart(): void{
    if(mainContainer) mainContainer.innerHTML = "";
    let p = document.createElement('p');
    p.innerText = "This is a cart";
    if(mainContainer){
        return mainContainer.append(p);} 
}