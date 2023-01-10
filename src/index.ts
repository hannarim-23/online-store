import './style.css';
import product from './pages/product';
import main from './pages/main';
import cart from './pages/cart';
import error from './pages/404';

export const mainContainer = document.querySelector('#main-container');
export const overlay = document.querySelector('.overlay');
let links = document.querySelectorAll('[data-link]'); /**/


type Rout = {
		path: string,
	 	template: () => void,
}
const routes: Rout[] = [
	{
		path: '404',
		template: error,		
	},
    {
		path: '/cart',
		template: cart,
	},
   {
		path: '/product',
		template: product,
	},
	{
		path: '/',
		template: main,
	},
];

function router(link: HTMLAnchorElement) {
    const { href, id } = link;
    localStorage.setItem('idOfProduct', id);
    if (isNaN(Number(id))) {
        history.pushState('', '', href);
    } else {
        history.pushState('', '', `${href}/${id}`);
    }

    window.dispatchEvent(new Event('popstate'));
}

document.addEventListener('click', (event) => {

    if (event.target instanceof HTMLAnchorElement) {
		event.preventDefault();
        router(event.target);
    }

    const { parentElement } = event.target as HTMLLinkElement;

    if (parentElement instanceof HTMLAnchorElement) {
		event.preventDefault();
        router(parentElement);
    }
});
const regex = /(http[s]?:\/\/)?([^\/\s]+\/)([^\/\s]+\/)(.*)/;
const regex2 = /(\d+)*/;

let m: RegExpExecArray|null;

export const renderUI = () => {
	let url = window.location.pathname;

    //let route = routes.find((route) => window.location.pathname.includes(route.path));
	if(url.includes('/cart')){
		routes[1].template();
	}else if(url.includes('/product')){
		routes[2].template();
	}else if(url === '/' || url === '//'){
		routes[3].template();
	}else{
		routes[0].template();
	}
	
    /*if (route) {
        route.template();
    } else {
        routes[0].template();
    }*/
};

window.addEventListener('popstate', renderUI);

window.addEventListener('DOMContentLoaded', renderUI);