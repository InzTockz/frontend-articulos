import { Role } from "./role";

export class Users {
  id?:number;
  name?:string;
  lastName?:string;
  username?:string;
  email?:string;
  password?:string;
  dateCreated?:Date;
  role?:Role;
}
