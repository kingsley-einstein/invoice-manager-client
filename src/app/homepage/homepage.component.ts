import { Component, OnInit } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loginGroup: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  data: any;
  tokenModel: string = '';
  remember: boolean = true;

  constructor(private graphService: GraphqlRestService, fb: FormBuilder, private router: Router) { 
    this.loginGroup = fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    });

    this.email = this.loginGroup.controls['email'];
    this.password = this.loginGroup.controls['password'];
  }

  ngOnInit() {
  }

  login() {
    this.graphService.login(this.loginGroup.value).subscribe(value => {
      this.data = value.data.login;
    },
    err => {
      console.log(err);
    },
    () => {
      if(this.remember) localStorage.setItem('token', this.data.token);
      this.router.navigateByUrl(`main/dashboard/${this.data.id}/${this.data.role.value}`);
    })
  }

  loginByToken() {
    this.graphService.loginByToken(this.tokenModel).subscribe(value => {
      this.data = value.data['loginByToken'];
    },
    err => {
      console.log(err);
    },
    () => {
      localStorage.setItem('token', this.data.token);
      this.router.navigateByUrl(`main/dashboard/${this.data.id}/${this.data.role.value}`);
    });
  }

}
