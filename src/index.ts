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
    //event.preventDefault();
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
    let route = routes.find((route) => window.location.pathname.includes(route.path));
	
    if (route) {
        route.template();
    } else {
        routes[0].template();
    }
};

window.addEventListener('popstate', renderUI);

window.addEventListener('DOMContentLoaded', renderUI);
/*const str = window.location.href;
		if ((m = regex.exec(str)) !== null) {

			if(!isNaN(Number(m[4]))){
			   const path = window.location.pathname;
			   let id = Number(path.split('/')[2]);

			   routes[2].template();
			}}else{*/
/*function router (event: Event|string) {
	if(event instanceof Event){
		event.preventDefault();
	if (event.target instanceof HTMLAnchorElement) {
		console.log(event.target);
		console.log(event);
		let href = event.target.href;
		console.log('href=', href);
		let idOfProduct = event.target.id;
		localStorage.setItem('idOfProduct', idOfProduct);
		history.pushState({}, '', href);
		//window.dispatchEvent(new Event('popstate'));
	}
}
	let route = routes.find(route => route.path === window.location.pathname);
	if (route) {
		let html = (route.template)();
		//window.dispatchEvent(new Event('popstate'));
	}
}
router(window.location.pathname);
document.addEventListener('click', (event: Event)=>{
	if(event.target && event.target instanceof HTMLAnchorElement && event.target.closest("[data-link]")){
         router(event);
	}
})
//console.log('route.path', route!.path);
	/*const str = window.location.href;
	if ((m = regex.exec(str)) !== null) {
		let s = regex2.exec(m[4]);
		console.log("s", s);
		if(regex2.exec(m[4])){
			
			const idOfProduct = Number(m[4]);
		   console.log('idOfProduct', idOfProduct);
		   console.log("m", m);
		   //product();
		}*/

/*window.addEventListener('popstate', function() { 
	if(mainContainer) mainContainer.innerHTML = '';
	let route = routes.find(route => route.path === window.location.pathname); 
	console.log(route);
	if (route) {
		if(mainContainer) mainContainer.innerHTML = '';
		let html = (route.template)();
	}
});*/
/*const str = window.location.href;
m = regex.exec(str)
if(m) {
	const pathN = m[3];
route = routes.find((route) => pathN);
console.log('route', route);
}*/
// The result can be accessed through the `m`-variable.
//m.forEach((match, groupIndex) => {
//	console.log(`Found match, group ${groupIndex}: ${match}`);
//	});
/*window.addEventListener('DOMContentLoaded', function() { 
	let route = routes.find(route => route.path == window.location.pathname);//защита от обновлений
	console.log(route);
	if (route) {
		let html = (route.template)();
	}
});*/


// Alternative syntax using RegExp constructor
// const regex = new RegExp('(http[s]?:\\/\\/)?([^\\/\\s]+\\/)(.*)', '')






