import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatabaseService } from '../../../services/database.service';

import keys from '../../../../global/keys';

declare var $: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})


export class StatisticsComponent implements OnInit {

  keys = keys;

  // ALL TIME PLACES CHART
  barChartOptionsAllTime: ChartOptions = {};
  barChartLabelsAllTime: Label[] = [];
  barChartTypeAllTime: ChartType = 'bar';
  barChartLegendAllTime = false;
  barChartPluginsAllTime = [];
  barChartDataAllTime: ChartDataSets[] = [
    {
      data: [],
      borderWidth: 0,
      backgroundColor: "rgba(0, 170, 228, .5)",
      hoverBackgroundColor: "rgba(2, 147, 196)",
      hoverBorderColor: "rgb(0, 103, 138)"
    }
  ];

  // THIRTY DAYS PLACES CHART
  barChartOptionsThirtyDays: ChartOptions = {};
  barChartLabelsThirtyDays: Label[] = [];
  barChartTypeThirtyDays: ChartType = 'bar';
  barChartLegendThirtyDays = false;
  barChartPluginsThirtyDays = [];
  barChartDataThirtyDays: ChartDataSets[] = [
    {
      data: [],
      borderWidth: 0,
      backgroundColor: "rgba(98, 219, 165, .5)",
      hoverBackgroundColor: "rgba(81, 180, 136)",
      hoverBorderColor: "rgb(65, 146, 110)"
    }
  ];

  // SEVEN DAYS CARDS CHART
  lineChartOptionsSevenDaysCards: ChartOptions = {};
  lineChartLabelsSevenDaysCards: Label[] = [];
  lineChartTypeSevenDaysCards: ChartType = 'line';
  lineChartLegendSevenDaysCards = true;
  lineChartPluginsSevenDaysCards = [];
  lineChartDataSevenDaysCards: ChartDataSets[] = [
    {
      data: [],
      label: keys.statistic_cards_seven_days_normal_label,
      borderWidth: 2,
      backgroundColor: "rgba(109, 44, 125, .5)",
      borderColor: 'rgb(109, 44, 125)',
      pointBackgroundColor: "rgb(109, 44, 125)",
      pointHoverBorderColor: "rgb(158, 106, 17)",
      lineTension: .2,
      fill: true
    },
    {
      data: [],
      label: keys.statistic_cards_seven_days_mymyv_label,
      borderWidth: 2,
      backgroundColor: "rgba(255, 102, 102, .5)",
      borderColor: 'rgb(255, 102, 102)',
      pointBackgroundColor: "rgb(255, 102, 102)",
      pointHoverBorderColor: "rgb(158, 106, 17)",
      lineTension: .2,
      fill: true
    }
  ];

  constructor(private databaseService: DatabaseService) {
    sessionStorage.removeItem("normal_search");
    this.getstatistics();
  }

  ngOnInit(): void {
  }

  getstatistics() {
    this.getStatisticsPlacesAllTime();
    this.getStatisticsPlacesThityDays();
    this.getStatisticsCardsSevenDays();
  }

  async getStatisticsPlacesAllTime() {
    await this.databaseService.getStatisticsPlacesAllTime()
      .then(resp => {
        let maxCounter = 0;
        for (const statistics of resp) {
          this.barChartLabelsAllTime.push(statistics.title);
          this.barChartDataAllTime[0].data?.push(statistics.quantity);

          if (statistics.quantity > maxCounter) maxCounter = statistics.quantity;
        }

        this.barChartOptionsAllTime = this.createBarChartOptions(this.barChartOptionsAllTime, maxCounter)
      })
      .catch(err => {
        $("#errorModalMessage").html(keys.error_modal_message_2);
        $('#errorModal').modal('show');
      });
  }

  async getStatisticsPlacesThityDays() {
    await this.databaseService.getStatisticsPlacesThirtyDays()
      .then(resp => {
        let maxCounter = 0;
        for (const statistics of resp) {
          this.barChartLabelsThirtyDays.push(statistics.title);
          this.barChartDataThirtyDays[0].data?.push(statistics.quantity);

          if (statistics.quantity > maxCounter) maxCounter = statistics.quantity;
        }
        this.barChartOptionsThirtyDays = this.createBarChartOptions(this.barChartOptionsThirtyDays, maxCounter)
      })
      .catch(err => {
        $("#errorModalMessage").html(keys.error_modal_message_2);
        $('#errorModal').modal('show');
      });
  }
  async getStatisticsCardsSevenDays() {
    await this.databaseService.getStatisticsCardsSevenDays()
      .then(resp => {
        let maxCounter = 0;

        for (const statistics of resp) {
          this.lineChartLabelsSevenDaysCards.push(keys.statistic_cards_seven_days_mymyv_text_label + " " + statistics.date);
          this.lineChartDataSevenDaysCards[0].data?.push(statistics.cards);
          this.lineChartDataSevenDaysCards[1].data?.push(statistics.mymyv_cards);

          if (statistics.cards > maxCounter) maxCounter = statistics.cards;
          if (statistics.mymyv_cards > maxCounter) maxCounter = statistics.mymyv_cards;
        }

        this.lineChartOptionsSevenDaysCards = this.createLineChartOptions(this.lineChartOptionsSevenDaysCards, maxCounter);
      })
      .catch(err => {
        $("#errorModalMessage").html(keys.error_modal_message_2);
        $('#errorModal').modal('show');
      });
  }

  createBarChartOptions(barChartOptions: ChartOptions, maxYAxes: number): ChartOptions {
    barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: maxYAxes + 1,
            stepSize: 1,
          }
        }],
      }
    }

    return barChartOptions;
  }

  createLineChartOptions(lineChartOptions: ChartOptions, maxYAxes: number): ChartOptions {
    lineChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: maxYAxes + 1,
            stepSize: 1,
          }
        }],
      }
    }

    return lineChartOptions;
  }
}
