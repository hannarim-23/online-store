import { mainContainer } from "../index";

export default function main(): void {
    if (mainContainer) {
        mainContainer.innerHTML = "";
        let p = document.createElement('p');
        p.innerText = 'This is a main';
        return mainContainer.append(p);
    } 
}