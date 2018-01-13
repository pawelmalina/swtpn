export class User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: Role;
}

export enum Role {
  USER,
  MENAGER
}

export class LoginUser {
  email: string;
  password: string;
}

export class NameAndId {
  id: number;
  name: string;
}

