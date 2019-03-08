import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { GraphqlRestService } from '../graphql-rest.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {

  datesChart: any;
  dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];
  datesData: number[] = [];
  datesColors = [
    "Yellow", "Purple", "Green", "Darkviolet", "Maroon", 
    "Beige", "Red", "Blue", "Orange", "Cyan", "Pink",
    "Silver", "Teal", "Gold", "Orangered", "Darkblue",
    "Aqua", "Aquamarine", "Brown", "Bisque", "Blanchedalmond",
    "Blueviolet", "Cadetblue", "Chartreuse", "Chocolate", "Coral",
    "Cornflowerblue", "Crimson", "Darkgoldenrod", "Firebrick",
    "Fuchsia"
  ];

  monthsChart: any;
  monthsNumber = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];
  monthsLabel = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November",
    "December"
  ];
  monthsColor = [
    "Maroon", "Cyan", "Cadetblue", "Forestgreen", "Greenyellow",
    "Fuchsia", "Crimson", "Cornflowerblue", "Pink", "Blue",
    "Red", "Teal"
  ];
  monthsData: number[] = [];
  
  constructor(private graphService: GraphqlRestService) {
    
  }

  async ngOnInit() {
    await setTimeout(async () => {
      await this.loadChart();
    }, 200);
  }

  ngAfterViewInit() {
    
  }

  async loadChart() {
    await this.dates.forEach(i => {
      this.graphService.countTicketsByDay(i).subscribe(r => {
        this.datesData.push(r);
      });
    });

    let ctx = document.getElementById('canvas');
    this.datesChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.datesData,
            label: 'Items Repaired Per Day',
            backgroundColor: this.datesColors
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        },
        title: {
          display: true,
          text: "Items Received Per Day"
        },
        showLines: false
      }
    });

    console.log(ctx);
    console.log(this.datesChart);

    await this.monthsNumber.forEach(i => {
      this.graphService.countTicketsByMonth(i).subscribe(r => {
        this.monthsData.push(r);
      })
    });
    
    let ctx2 = document.getElementById('canvas2');
    this.monthsChart = new Chart(ctx2, {
      type: 'polarArea',
      data: {
        labels: this.monthsLabel,
        datasets: [
          {
            data: this.monthsData,
            label: 'Items Repaired Per Month',
            backgroundColor: this.monthsColor
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        },
        title: {
          display: true,
          text: 'Items Received Per Month'
        },
        showLines: false
      }
    });

    console.log(ctx2);
    console.log(this.monthsChart);

  }

}
