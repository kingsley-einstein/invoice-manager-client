import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphqlRestService } from '../graphql-rest.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticketId: any;
  userId: any;
  userRole: any;

  ticket: any;

  status: string = 'Under Repair';

  statuses: string[] = ['Under Repair', 'Needing Parts', 'Cancelled', 'Repaired']

  constructor(private route: ActivatedRoute, private graphService: GraphqlRestService) {
    route.params.subscribe(param => {
      this.ticketId = param.ticketid;
      this.userId = param.userid;
      this.userRole = param.userrole;
    });
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

}
