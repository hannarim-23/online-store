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
		path: '/',
		template: main,
	},
   {
		path: '/cart',
		template: cart,
	},
   {
		path: '/product',
		template: product,
	},
];

function router (event: Event|string) {
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
	let route = routes.find(route => route.path == window.location.pathname);
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


/*window.addEventListener('popstate', function() { 
	let route = routes.find(route => route.path == window.location.pathname); 
	console.log(route);
	if (route) {
		let html = (route.template)();
	}
});

window.addEventListener('DOMContentLoaded', function() { 
	let route = routes.find(route => route.path == window.location.pathname);//защита от обновлений
	console.log(route);
	if (route) {
		let html = (route.template)();
	}
});*/

/*const regex = /(http[s]?:\/\/)?([^\/\s]+\/)(.*)/;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('(http[s]?:\\/\\/)?([^\\/\\s]+\\/)(.*)', '')

const str = window.location.href;
let m;

if ((m = regex.exec(str)) !== null) {
	console.log(m);
	if(m[3] == 'product/'){
       console.log('im here!!!!!!!!!!!!!!!!!!!');
	   product();
	}
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}*/
/*window.onpopstate = function (event) {  
    var content = "";
    if(event.state) {
      content = event.state.plate;
    }
    changeMain(content);
  }*/

