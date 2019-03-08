import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, Query } from '../types';
import { GraphqlRestService } from '../graphql-rest.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  @Output()
  newUserRegistered: EventEmitter<User> = new EventEmitter<User>();

  addUserGroup: FormGroup;
  email: AbstractControl;
  name: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  address: AbstractControl;

  userData: User;


  constructor(private graphService: GraphqlRestService, fb: FormBuilder) {
    this.addUserGroup = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      name: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/\d+/)
      ])],
      password: ['', Validators.required],
      address: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/\d+, [a-z]/i)
      ])]
    });

    this.email = this.addUserGroup.controls['email'];
    this.name = this.addUserGroup.controls['name'];
    this.phone = this.addUserGroup.controls['phone'];
    this.password = this.addUserGroup.controls['password'];
    this.address = this.addUserGroup.controls['address'];
   }

  ngOnInit() {
  }

  addUser() {
    this.graphService.mutate(
      this.name.value, 
      this.email.value, 
      this.phone.value,
      this.address.value,
      this.password.value
      ).subscribe((r: User) => {
        this.userData = r;
      },
      err => {
        console.log(err);
      },
      () => {
        this.newUserRegistered.emit(this.userData);
      });
  }

}
