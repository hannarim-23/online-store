import { mainContainer } from "../index";
export default function error(): void{
    if(mainContainer) mainContainer.innerHTML = "";
    let p = document.createElement('p');
    p.innerText = "This is an ERRor!!404";
    if(mainContainer){
        return mainContainer.append(p);} 
}