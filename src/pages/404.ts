import { mainContainer } from "../index";

export default function error(): void {
    if (mainContainer){
        mainContainer.innerHTML = "";
        let p = document.createElement('div');
        p.className = 'error-text-404';
        p.innerText = 'Page not found (404)';
        return mainContainer.append(p);
    } 
}