import { Component, OnInit, Input } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { Invoice } from '../types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  @Input()
  invoiceId: any;

  invoice: Invoice;

  constructor(private graphService: GraphqlRestService, private modal: NgbActiveModal) { }

  ngOnInit() {
    this.findInvoiceById();
  }

  findInvoiceById() {
    this.graphService.findInvoiceById(this.invoiceId).subscribe(r => {
      this.invoice = r;
    });
  }

  validateInvoice() {
    this.graphService.validateInvoice(this.invoiceId).subscribe(r => {
      this.invoice = r.data.validateInvoice;
    },
    err => {
      console.log(err);
    },
    () => {
      alert('Invoice successfully validated');
    });
  }

  close() {
    this.modal.close();
  }

  print() {
    let printable = document.getElementById('printable');
    let windowPrint = window.open('', '_blank', `left=0, top=0, scrollbars=0, status=0, height=100%, width=auto`);
    windowPrint.document.write(`
      <html>
        <head>
          <style>
          table {
            border-collapse: collapse;
          }
          .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
          }
          
          .table th,
          .table td {
            padding: 0.75rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
          }
          
          .table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #dee2e6;
          }
          
          .table tbody + tbody {
            border-top: 2px solid #dee2e6;
          }
          
          .table-sm th,
          .table-sm td {
            padding: 0.3rem;
          }
          
          .table-bordered {
            border: 1px solid #dee2e6;
          }
          
          .table-bordered th,
          .table-bordered td {
            border: 1px solid #dee2e6;
          }
          
          .table-bordered thead th,
          .table-bordered thead td {
            border-bottom-width: 2px;
          }
          .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(0, 0, 0, 0.05);
          }
          .badge {
            display: inline-block;
            padding: 0.25em 0.4em;
            font-size: 75%;
            font-weight: 700;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .badge {
              transition: none;
            }
          }
          .badge-info {
            color: #fff;
            background-color: #17a2b8;
          }
          </style>
        </head>
        <body>
          <div>
            ${printable.innerHTML}
          </div>
        <body>
      </html>
    `);
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  }

}
