import type { IGetCats } from "./ICats";

export interface IGetOrder {
    orderid: string;
    orderDateTime: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    pickupDateTime: string;
    orderStatus: string;
    catId: string;
    catName: string;
    breedname: string;
    gender: string;
    birthdate: string;
    size: string;
    images: string;
    price: string;
}

export interface IGetOrderById {
    id: string;
    orderid: string;
    orderDateTime: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    pickupDateTime: string;
    orderStatus: string;
    catsList: Array<IGetCats>;
}

export interface IGetCart {
    cartId: string;
    orderId: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    orderStatus: string;
    catsList: Array<IGetCats>;
}

export interface IBilling {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    pickupDateTime: string;
    notes: string;
}