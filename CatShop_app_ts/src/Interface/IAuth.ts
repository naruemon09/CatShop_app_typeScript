export interface IRegister {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  phone: string;
  address: string;
  password: string;
  gender: string;
  RoleList: Array<IRole>
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  user: string;
}

export interface IRole {
  roleId :string
  rolename: string;
}

export interface IRolesMapping {
  username: string;
  roleList: IRole[];
}

export interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}