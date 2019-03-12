import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Query } from './types';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphqlRestService {

  ql = gql;

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: `${environment.server}/gql`
      }),
      cache: new InMemoryCache()
    });
   }

   mutate(name, email, phone, address, password) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          newUser(
            name: "${name}", 
            email: "${email}", 
            phone: "${phone}", 
            address: "${address}",
            password: "${password}"
            ) {
              id,
              name,
              email,
              phone,
              address
              token,
              dateJoined
            }
        }
       `
     });
   }

   login(formValue) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          login(
            email: "${formValue.email}",
            password: "${formValue.password}"
          ) {
            id,
            token,
            role {
              value
            }
          }
        }
       `
     });
   }

   modifyUser(id, name, email, phone, address, password) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          modifyUser(
            id: ${id},
            name: "${name}",
            email: "${email}",
            phone: "${phone}",
            address: "${address}",
            password: "${password}"
          ) {
            id,
            name,
            email,
            phone,
            address,
            token,
            dateJoined,
            role {
              value
            }
          }
        }
       `
     });
   }

   newTicket(id, parts, phone, client) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          createTicket(
            userId: ${id},
            parts: "${parts}",
            phone: "${phone}",
            client: "${client}"
          ) {
            id,
            phone,
            parts,
            client
          }
        }
       `
     });
   }

   findTicketById(id) {
     return this.apollo.query({
       query: this.ql `
        query {
          findTicketById(id: ${id}) {
            id,
            phone,
            parts,
            client,
            status
          }
        }   
       `
     });
   }

   changeTicketStatus(id, status) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          changeStatus(id: ${id}, status: "${status}") {
            id,
            phone,
            parts,
            client,
            status
          }
        }
       `
     });
   }

   invertRole(userId) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          invertRole(id: ${userId})
        }
       `
     });
   }

   generateInvoice(ticketId) {
     return this.apollo.mutate({
       mutation: this.ql `
        mutation {
          generateInvoice(id: ${ticketId}) {
            id,
            validated
          }
        }
       `
     });
   }

   validateInvoice(id) {
    return this.apollo.mutate({
      mutation: this.ql `
        mutation {
          validateInvoice(id: ${id}) {
            id,
            validated,
            ticket {
              id,
              phone,
              parts,
              client
            }
          }
        }
      `
    });
   }

   loginByToken(token) {
     return this.apollo.query({
       query: this.ql `
        query {
          loginByToken(token: "${token}") {
            id,
            token,
            role {
              value
            }
          }
        }
       `
     });
   }

   findAllUsers(page) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          findAllUsers(page: ${page}) {
            id,
            name,
            token,
            email,
            phone,
            address,
            role {
              value
            }
          }
        }
       `
     }).valueChanges.pipe(
       map(query => query.data.findAllUsers)
     );
   }

   countAllUsers() {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          countAllUsers
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.countAllUsers)
     );
   }

   findByToken(token) {
     return this.apollo.query({
       query: this.ql `
        query {
          findByToken(token: "${token}") {
            id,
            name,
            token,
            email,
            phone,
            address
          }
        }
       `
     });
   }

   findById(id) {
     return this.apollo.query({
       query: this.ql `
        query {
          findById(id: ${id}) {
            id,
            name,
            token,
            email,
            phone,
            address,
            dateJoined
          }
        }
       `
     });
   }

   findTicketsByUser(id, page) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          findTicketsByUser(
            id: ${id}, 
            page: ${page}
            ) {
              id,
              phone,
              client,
              parts,
              status
            }
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.findTicketsByUser)
     );
   }

   findValidatedInvoices(page) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          findValidatedInvoices(page: ${page}) {
            id
          }
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.findValidatedInvoices)
     );
   }

   findUnvalidatedInvoices(page) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          findUnvalidatedInvoices(page: ${page}) {
            id
          }
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.findUnvalidatedInvoices)
     );
   }

   findInvoiceById(id) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          findInvoiceById(id: ${id}) {
            id,
            validated,
            ticket {
              id,
              phone,
              client,
              parts,
              status
            }
          }
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.findInvoiceById)
     );
   }

   countTicketsByDay(day) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          countTicketsByDay(day: ${day})
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.countTicketsByDay)
     );
   }

   countTicketsByMonth(month) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          countTicketsByMonth(month: ${month})
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.countTicketsByMonth)
     );
   }

   countInvoicesByStatus(status) {
     return this.apollo.watchQuery<Query>({
       query: this.ql `
        query {
          countInvoicesByStatus(status: ${status})
        }
       `
     }).valueChanges.pipe(
       map(r => r.data.countInvoicesByStatus)
     );
   }
}
