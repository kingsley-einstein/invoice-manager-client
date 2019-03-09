import { Invoice, User, Ticket } from '.';

export type Query  = {
    loginByToken? : User;
    findAllUsers? : User[];
    findTicketsByUser? : Ticket[]
    findValidatedInvoices? : Invoice[];
    findUnvalidatedInvoices? : Invoice[];
    findInvoiceById? : Invoice;
    countInvoicesByStatus: number;
    countTicketsByDay: number;
    countTicketsByMonth: number;
    countAllUsers: number;
}