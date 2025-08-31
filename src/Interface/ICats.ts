import type { IGetOrder } from "./IOrder";

export interface IBreeds {
  breedname:string;
}

export interface IGetBreeds {
  breedid: string;
  breedname: string;
}

export interface ICats {
  catName: string;
  catdetails: string;
  breedid: string;
  birthdate: string;
  gender: string;
  size: string;
  images: File | null;
  catStatus: string;
  price:string;
  idnumber:string;
}

export interface IGetCats {
  catId: string;
  catname: string;
  catdetails: string;
  breedid: string;
  breedname: string;
  birthdate: string;
  gender: string;
  size: string;
  images: File | null;
  catStatus: string;
  price:string;
  idnumber:string;
  addDateTime:string;
}

export interface CartProps {
  cats: IGetOrder[];
  totalPrice: number;
}