import { Ticket } from './ticket.type';

export type Invoice = {
    id? : number;
    validated? : boolean;
    ticket?: Ticket;
}