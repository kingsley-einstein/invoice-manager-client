import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { faAt, faPen, faPhone, faAddressBook, faKey } from '@fortawesome/free-solid-svg-icons';
import { GraphqlRestService } from '../graphql-rest.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  @Input()
  userId: any;

  updateUserGroup: FormGroup;
  email: AbstractControl;
  name: AbstractControl;
  phone: AbstractControl;
  password: AbstractControl;
  address: AbstractControl;

  emailIcon: any = faAt;
  nameIcon: any = faPen;
  phoneIcon: any = faPhone;
  addressIcon: any = faAddressBook;
  passwordIcon: any = faKey;

  user: any;

  constructor(private modal: NgbActiveModal, fb: FormBuilder, private graphService: GraphqlRestService) {
    //this.findUser();
    this.updateUserGroup = fb.group({
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

    this.email = this.updateUserGroup.controls['email'];
    this.name = this.updateUserGroup.controls['name'];
    this.phone = this.updateUserGroup.controls['phone'];
    this.password = this.updateUserGroup.controls['password'];
    this.address = this.updateUserGroup.controls['address'];
   }

  ngOnInit() {
    this.findUser();
  }

  async close() {
    await this.modal.close();
  }

  findUser() {
    console.log(this.userId);
    this.graphService.findById(this.userId).subscribe(r => {
      this.user = r.data['findById'];
    },
    err => {
      console.log(err);
    },
    () => {
      this.email.setValue(this.user.email);
      this.name.setValue(this.user.name);
      this.address.setValue(this.user.address);
      this.phone.setValue(this.user.phone);
    });
  }

  modifyUser() {
    this.graphService.modifyUser(
      this.userId,
      this.name.value,
      this.email.value,
      this.phone.value,
      this.address.value,
      this.password.value
    ).subscribe(r => {
      console.log(r);
    },
    err => {
      console.log(err);
    },
    () => {
      alert('Updated info');
    });
  }

}
