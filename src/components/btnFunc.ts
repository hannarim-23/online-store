import {IProduct} from "./interface";

export function sorting (i: number, collectionItem: IProduct[]): IProduct[]{
  let result;
  
    if (i == 0) {
      //console.log ('sorting', 'From A to Z');
      result = collectionItem.sort((a, b)=> a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1);
    }
    if (i == 1) {
      //console.log ('sorting', 'From Z to A');
      result = collectionItem.sort((a, b)=> a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1);
    }
    if (i == 2) {
      //console.log ('sorting', 'From min price to max');
      result = collectionItem.sort((a, b)=> a.price > b.price ? 1 : -1);
    }
    if (i == 3) {
      //console.log ('sorting', 'From max price to min');
      result = collectionItem.sort((a, b)=> a.price < b.price ? 1 : -1)
    }
    else result = collectionItem;

    return result;
}



