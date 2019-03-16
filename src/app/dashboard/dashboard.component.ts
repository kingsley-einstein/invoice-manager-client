import { Component, OnInit } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { ActivatedRoute } from '@angular/router';
import { faUserPlus, faClipboard, faChartArea, faComment, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  validatedInvoices: number;
  unvalidatedInvoices: number;
  detail: any;
  ticketDetail: any;
  userId: any;
  userRole: any;

  addUserIcon: any = faUserPlus;
  issueTicketIcon: any = faClipboard;
  statisticsIcon: any = faChartArea;
  chatIcon: any = faComment;
  usersIcon: any = faUsers;
  //icon = fa;

  users: number;

  constructor(private graphService: GraphqlRestService, activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(params => {
      this.userId = params.id;
      this.userRole = params.role;
    });
  }

  ngOnInit() {
    this.countUnvalidatedInvoices();
    this.countValidatedInvoices();
    this.countUsers();
    //console.log(String.fromCharCode(this.icon.xRay));
  }

  bindEvent(event: any) {
    this.detail = event.data.newUser;
    console.log(event.data.newUser);
  }

  bindTicketEvent(event: any) {
    this.ticketDetail = event.data.createTicket;
    console.log(event.data.createTicket);
  }

  clear(event: any) {
    this.detail = event;
  }

  clearTicketEvent(event: any) {
    this.ticketDetail = event;
  }

  countValidatedInvoices() {
    this.graphService.countInvoicesByStatus(true).subscribe(r => {
      this.validatedInvoices = r;
    });
  }
  
  countUnvalidatedInvoices() {
    this.graphService.countInvoicesByStatus(false).subscribe(r => {
      this.unvalidatedInvoices = r;
    });
  }

  countUsers() {
    this.graphService.countAllUsers().subscribe(r => {
      this.users = r;
    });
  }

}
