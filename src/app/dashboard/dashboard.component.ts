import { Component, OnInit } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  validatedInvoices: number;
  unvalidatedInvoices: number;
  detail: any;

  constructor(private graphService: GraphqlRestService) { 

  }

  ngOnInit() {
    this.countUnvalidatedInvoices();
    this.countValidatedInvoices();
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

}
