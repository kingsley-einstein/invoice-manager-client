import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [{
      path: 'home',
      component: HomepageComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  }, 
  {
    path: 'dashboard/:id/:role',
    component: DashboardComponent
  }]
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
