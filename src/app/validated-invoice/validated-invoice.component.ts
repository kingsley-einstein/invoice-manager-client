import { Component, OnInit } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { Invoice } from '../types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceDetailComponent } from '../invoice-detail/invoice-detail.component';

@Component({
  selector: 'app-validated-invoice',
  templateUrl: './validated-invoice.component.html',
  styleUrls: ['./validated-invoice.component.css']
})
export class ValidatedInvoiceComponent implements OnInit {

  data: Invoice[];
  size: number;
  page: number = 1;

  constructor(private graphService: GraphqlRestService, private modal: NgbModal) { }

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

  open(id: any) {
    this.modal.open(InvoiceDetailComponent, {
      size: 'lg',
      centered: true
    }).componentInstance.invoiceId = id;
  }

}
