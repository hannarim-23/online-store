import { getChecked } from "../components/filter";
import { products } from "../components/products";
import {IProduct} from "./interface";



/*
export function resetFun(category: string[], brand: string[], Price?: string[], Stock?: string[]): void {
  category.length = 0;
  console.log('delet', category);
  brand = [];

  getChecked(showProducts, products, category, brand);
}*/

export function sorting (i: number, collectionItem: IProduct[]): IProduct[]{
  let result;
  
    if (i == 0) {
      //console.log ('sorting', 'From A to Z');
      result = collectionItem.sort((a, b)=> a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1);
      //console.log ('+++++++++++', result);
    }
    if (i == 1) {
      //console.log ('sorting', 'From Z to A');
      result = collectionItem.sort((a, b)=> a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1);
      //console.log ('+++++++++++', result);
    }
    if (i == 2) {
      //console.log ('sorting', 'From min price to max');
      result = collectionItem.sort((a, b)=> a.price > b.price ? 1 : -1);
      //console.log ('+++++++++++', result);
    }
    if (i == 3) {
      //console.log ('sorting', 'From max price to min');
      result = collectionItem.sort((a, b)=> a.price < b.price ? 1 : -1)
      //console.log ('+++++++++++', result);
    }
    else result = collectionItem;

    return result;
}



