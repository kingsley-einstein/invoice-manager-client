import { Component, OnInit } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { ActivatedRoute } from '@angular/router';
import fa from 'fontawesome';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  validatedInvoices: number;
  unvalidatedInvoices: number;
  detail: any;
  userId: any;
  userRole: any;
  icon = fa;
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
    console.log(String.fromCharCode(this.icon.xRay));
  }

  bindEvent(event: any) {
    this.detail = event.data.newUser;
    console.log(event.data.newUser);
  }

  clear(event: any) {
    this.detail = event;
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
