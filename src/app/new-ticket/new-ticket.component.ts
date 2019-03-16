import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { User, Ticket } from '../types';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {

  @Output()
  ticketCreated: EventEmitter<any> = new EventEmitter<any>();

  users: User[];
  ticketGroup: FormGroup;
  parts: AbstractControl;
  phone: AbstractControl;
  client: AbstractControl;
  id: string = '2';
  ticket: Ticket;

  constructor(private graphService: GraphqlRestService, fb: FormBuilder) {
    this.ticketGroup = fb.group({
      parts: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      client: ['', Validators.compose([
        Validators.required,
        Validators.minLength(7)
      ])]
    });

    this.parts = this.ticketGroup.controls['parts'];
    this.phone = this.ticketGroup.controls['phone'];
    this.client = this.ticketGroup.controls['client'];
   }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.graphService.findAllUsersWithNoLimit().subscribe(r => {
      this.users = r;
    });
  }

  createTicket() {
    this.graphService.newTicket(
      parseInt(this.id), 
      this.parts.value, 
      this.phone.value, 
      this.client.value
      ).subscribe((r: Ticket) => {
        this.ticket = r;
      },
      err => {
        console.log(err);
      },
      () => {
        this.ticketCreated.emit(this.ticket);
        this.ticketGroup.reset();
      });
  }

}
