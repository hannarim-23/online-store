import {IProduct} from "./interface";

export function getCategory(mas: IProduct[]): string[] {
    let masCategory = mas.map(item => item.category[0].toUpperCase() + item.category.slice(1).toLowerCase());
    return [...new Set(masCategory)];
}
export function getBrands(mas: IProduct[]): string[] {
    let masBrands = mas.map(item => item.brand[0].toUpperCase() + item.brand.slice(1).toLowerCase());
    return [...new Set(masBrands)];
}
export function maxPrice(mas: IProduct[]): number {
    let res = mas.map(item => item.price);
    return Math.max(...res);
}
export function minPrice(mas: IProduct[]): number {
    let res = mas.map(item => item.price);
    return Math.min(...res);
}
export function maxStock(mas: IProduct[]): number {
    let res = mas.map(item => item.stock);
    return Math.max(...res);
}
export function minStock(mas: IProduct[]): number {
    let res = mas.map(item => item.stock);
    return Math.min(...res);
}



