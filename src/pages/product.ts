import { mainContainer } from "../index";

export default function product(): void {
     if (mainContainer) {
        mainContainer.innerHTML = "";
        let p = document.createElement('p');
        p.innerText = 'This is a Products';
        return mainContainer.append(p);
    } 
}