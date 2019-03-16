import { Component, OnInit, Input } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { Ticket } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  @Input()
  userId: any;

  @Input()
  userRole: any;

  page: number = 1;

  tickets: Ticket[];
  count: number;

  constructor(private graphService: GraphqlRestService, private router: Router) { }

  ngOnInit() {
    this.loadTicketsByUser();
    this.countTicketsByUser();
  }

  loadTicketsByUser() {
    this.graphService.findTicketsByUser(this.userId, (this.page - 1)).subscribe(r => {
      this.tickets = r;
      console.log(r);
      console.log(this.tickets);
    });
  }

  countTicketsByUser() {
    this.graphService.countTicketsByUsers(this.userId).subscribe(r => {
      this.count = r;
      console.log(r);
    });
  }

  showDetail(id) {
    this.router.navigateByUrl(`main/ticket/${id}/${this.userId}/${this.userRole}`);
  }

}
