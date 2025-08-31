export interface IRegister {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  phone: string;
  address: string;
  provinceId: number;
  districtId: number;
  subdistrictId: number;
  zipcode: number;
  password: string;
  gender: string;
  userStatus: string;
  roleList: Array<IRole>
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  userid: string;
  userName: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  phone: string;
  address: string;
  provinceId: number;
  districtId: number;
  subdistrictId: number;
  zipcode: number;
  password: string;
  gender: string;
  userStatus: string;
  roleList: Array<IRole>
}

export interface IRole {
  roleid :string
  rolename: string;
}

export interface IRolesMapping {
  username: string;
  roleList: IRole[];
}

export interface IAddressData {
  houseNumber: string;
  district: string;
  subdistrict: string;
  province: string;
  zipcode: string;
}

export interface IProvince {
  id: number;
  nameInThai: string;
}

export interface IDistrict {
  id: number;
  nameInThai: string;
  provinceId: number;
}

export interface ISubdistrict {
  id: number;
  nameInThai: string;
  zipCode: number;
  districtId?: number;
}

export interface IPage {
  setPage?: React.Dispatch<React.SetStateAction<boolean>>;
}