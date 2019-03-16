import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewUserComponent } from './new-user/new-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { UnvalidatedInvoiceComponent } from './unvalidated-invoice/unvalidated-invoice.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { ValidatedInvoiceComponent } from './validated-invoice/validated-invoice.component';
import { MainComponent } from './main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminMainComponent,
    UsersListComponent,
    HomepageComponent,
    NewUserComponent,
    DashboardComponent,
    ChartComponent,
    NewTicketComponent,
    UnvalidatedInvoiceComponent,
    PrintInvoiceComponent,
    ValidatedInvoiceComponent,
    MainComponent,
    UserDetailComponent,
    TicketDetailComponent,
    InvoiceDetailComponent,
    UserInfoComponent,
    TicketInfoComponent,
    ChatComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
