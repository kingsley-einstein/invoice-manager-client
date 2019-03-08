import { Role } from './role.type';
import { Ticket } from './ticket.type';

export type User = {
    id? : number;
    name? : string;
    email? : string;
    phone? : string;
    address? : string;
    password? : string;
    token? : string;
    dateJoined? : string;
    role? : Role;
    tickets?: Ticket[]
}