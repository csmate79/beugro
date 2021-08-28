import { Permission } from "../enums/permission.enum";

export interface User {
    userName: string;
    email: string;
    password: string;
    permission: Permission[];
    sessionToken: string;
    sessionTokenExpirationDate: Date;
}