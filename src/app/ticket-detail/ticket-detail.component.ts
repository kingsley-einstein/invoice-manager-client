import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlRestService } from '../graphql-rest.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  @Input()
  ticketId: any;

  ticket: any;

  status: string = 'Under Repair';

  statuses: string[] = ['Under Repair', 'Needing Parts', 'Cancelled', 'Repaired']

  constructor(private graphService: GraphqlRestService, private modal: NgbActiveModal) {

   }

  ngOnInit() {
    this.getTicketDetail();
  }

  getTicketDetail() {
    this.graphService.findTicketById(this.ticketId).subscribe(r => {
      console.log(r);
      this.ticket = r.data['findTicketById'];
    });
  }

  changeStatus() {
    this.graphService.changeTicketStatus(this.ticketId, this.status).subscribe(r => {
      console.log(r);
      this.ticket = r.data.changeStatus;
    });
  }

  async close() {
    await this.modal.close();
  }

  generateInvoice() {
    this.graphService.generateInvoice(this.ticketId).subscribe(r => {
      console.log(r);
    },
    err => {
      console.log(err);
    },
    () => {
      alert('Invoice generated. The Admin will print when he receives the invoice');
    })
  }

  print() {
    let printable = document.getElementById('printable');
    let windowPrint = window.open('', '_blank', 'left=0, top=0, scrollbars=0, status=0, height=100%, width=auto');
    windowPrint.document.write(`
      <html>
        <head>
          <style>
          .card {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
          }
          .card-body {
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            padding: 1.25rem;
          }
          
          .card-title {
            margin-bottom: 0.75rem;
          }
          .card-text:last-child {
            margin-bottom: 0;
          }
          .card-header {
            padding: 0.75rem 1.25rem;
            margin-bottom: 0;
            background-color: rgba(0, 0, 0, 0.03);
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
          }
          
          .card-header:first-child {
            border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
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
        </body>
      </html>
    `);
    windowPrint.document.close();
    windowPrint.focus();
    windowPrint.print();
    windowPrint.close();
  }

}
