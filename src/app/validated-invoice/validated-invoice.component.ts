import { Component, OnInit } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { Invoice } from '../types';

@Component({
  selector: 'app-validated-invoice',
  templateUrl: './validated-invoice.component.html',
  styleUrls: ['./validated-invoice.component.css']
})
export class ValidatedInvoiceComponent implements OnInit {

  data: Invoice[];
  size: number;
  page: number = 1;

  constructor(private graphService: GraphqlRestService) { }

  ngOnInit() {
    this.loadInvoices();
    this.getCollectionSize();
  }

  async loadInvoices() {
    await this.graphService.findValidatedInvoices(this.page - 1).subscribe(r => {
      this.data = r;
    });
  }

  async getCollectionSize() {
    await this.graphService.countInvoicesByStatus(true).subscribe(r => {
      this.size = r;
    });
  }

}
