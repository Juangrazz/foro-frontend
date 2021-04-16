import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})


export class StadisticsComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    /*
    {
      data: [45, 37, 60, 70, 46, 33],
      label: 'Best Fruits',
      borderWidth: 2,
      pointBackgroundColor: "rgb(75, 192, 192)",
      pointHoverBorderColor: "rgb(75, 192, 192)",
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      lineTension: .1
    },
    */
    { 
      data: [28, 48, 40, 19, 86, 27],
      label: 'Posts',
      borderWidth: 2,
      pointBackgroundColor: "rgb(25, 119, 173)",
      pointHoverBorderColor: "rgb(25, 119, 173)",
      fill: false,
      borderColor: 'rgb(25, 119, 173)',
      lineTension: .1
     }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
