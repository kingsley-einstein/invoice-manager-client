import { Component, OnInit, Input } from '@angular/core';
import { GraphqlRestService } from '../graphql-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input()
  userId: any;

  user: any;

  constructor(private graphService: GraphqlRestService, private router: Router) { }

  ngOnInit() {
    this.findUserById();
  }

  findUserById() {
    this.graphService.findById(this.userId).subscribe(r => {
      this.user = r.data['findById'];
    });
  }

  async logout() {
    await localStorage.clear();
    await this.router.navigateByUrl('/main');
  }

}
