import './style.css';
import product from './pages/product';
import main from './pages/main';
import cart from './pages/cart';
import error from './pages/404';

export let mainContainer = document.querySelector('#main-container');/*const*/
//const mainContainer = document.querySelector('#main-container');
let links = document.querySelectorAll('[data-link]'); /*???*/

type Rout = {
		path: string,
	 	template: () => void,
}
/*
type Rout = [
	{
		path: string,
	 	template: () => void,
    }, 
	{
		path: string,
		template: () => void,
	}, 
	{
		path: string,
		template: () => void,
	}, 
	{
		path: string,
		template: () => void,
	}, 
]
*/

function router (event: MouseEvent) {
	event.preventDefault();
	if (event.target instanceof HTMLLinkElement) {
		let href = event.target.href;
		console.log('href=', href);
		history.pushState({}, '', href);
	}
	
	let route = routes.find(route => route.path == window.location.pathname);
	if (route) {
		let html = (route.template)();
	}
}
/*
const routes: Rout = [*/
const routes: Rout[] = [
	{
		path: '404',
		template: error,		
	},
   {
		path: '/',
		template: main,
	},
   {
		path: '/cart',
		template: cart,
	},
   {
		path: '/product1',
		template: product,
	},
];

window.addEventListener('popstate', function() { 
	let route = routes.find(route => route.path == window.location.pathname); 
	if (route) {
		let html = (route.template)();
	}
});

window.addEventListener('DOMContentLoaded', function() { 
	let route = routes.find(route => route.path == window.location.pathname);//защита от обновлений
	if (route) {
		let html = (route.template)();
	}
});

/*window.onpopstate = function (event) {  
    var content = "";
    if(event.state) {
      content = event.state.plate;
    }
    changeMain(content);
  }*/

