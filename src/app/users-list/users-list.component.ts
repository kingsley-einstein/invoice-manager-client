import { Component, OnInit, Input } from '@angular/core';
import { User } from '../types';
import { GraphqlRestService } from '../graphql-rest.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  savedForFilter: User[];
  size: any;
  page: number = 1;
  searchIcon: any = faSearch;

  @Input()
  userRole: any;

  constructor(private graphService: GraphqlRestService) { }

  ngOnInit() {
    this.loadUsers();
    this.countAllUsers();
  }

  async loadUsers() {
    await this.graphService.findAllUsers(this.page - 1).subscribe(r => {
      this.users = r;
      this.savedForFilter = r;
    });
  }

  async countAllUsers() {
    await this.graphService.countAllUsers().subscribe(r => {
      console.log(r);
      this.size = r;
    })
  }

  filter(event: any) {
    console.log(event.target.value);
    this.users = this.savedForFilter.filter((r, i) => {
      return r.name.toLowerCase().startsWith(event.target.value.toLowerCase());
    });
    
  }

  invertRole(userId) {
    this.graphService.invertRole(userId).subscribe(r => {
      console.log(r);
      alert("User's role changed");
    });
  }

}
