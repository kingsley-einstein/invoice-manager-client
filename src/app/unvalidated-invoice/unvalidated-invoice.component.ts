import { Component, OnInit } from '@angular/core';
import { Invoice } from '../types';
import { GraphqlRestService } from '../graphql-rest.service';

@Component({
  selector: 'app-unvalidated-invoice',
  templateUrl: './unvalidated-invoice.component.html',
  styleUrls: ['./unvalidated-invoice.component.css']
})
export class UnvalidatedInvoiceComponent implements OnInit {

  data: Invoice[];
  page: number = 1;
  size: number;

  constructor(private graphService: GraphqlRestService) { }

  ngOnInit() {
    this.loadInvoices();
    this.getCollectionSize();
  }

  async loadInvoices() {
    await this.graphService.findUnvalidatedInvoices(this.page - 1).subscribe(r => {
      this.data = r;
    });
  }

  async getCollectionSize() {
    await this.graphService.countInvoicesByStatus(false).subscribe(r => {
      this.size = r;
    });
  }

}
